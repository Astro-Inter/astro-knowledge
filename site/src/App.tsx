import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowDownToLine, ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, Code2, Copy, FileText, Folder, Github, Home, Link2, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { documents as rawDocuments, assets } from 'virtual:astro-knowledge';
import { documentHref, parseDocument, resolveLocalLink, searchDocuments, searchExcerpt } from './knowledge.mjs';

type Doc = ReturnType<typeof parseDocument>;
type Heading = { id: string; text: string; depth: number };
type Branch = { name: string; path: string; folders: Branch[]; documents: Doc[] };
type Route = { path: string | null; hash: string };
const documents: Doc[] = rawDocuments.map(parseDocument);
const names: Record<string, string> = { docs: 'Documentação', astro: 'Astro', acesso: 'Acesso e papéis', colaboradores: 'Colaboradores', conformidades: 'NRs e conformidades', decisoes: 'Decisões e evolução', eventos: 'Eventos', fontes: 'Documentos originais', ia: 'Inteligência artificial', operacao: 'Operação', produto: 'Produto', site: 'Guia do site' };
const folderName = (name: string) => names[name] || name.replace(/-/g, ' ').replace(/^./, (letter) => letter.toUpperCase());
const routeFromUrl = (): Route => ({ path: new URLSearchParams(location.search).get('doc'), hash: location.hash.slice(1) });

function createTree(docs: Doc[]): Branch {
  const root: Branch = { name: '', path: '', folders: [], documents: [] };
  for (const doc of docs) {
    let branch = root;
    for (const part of doc.folder.split('/').filter(Boolean)) {
      let next = branch.folders.find((folder) => folder.name === part);
      if (!next) { next = { name: part, path: [branch.path, part].filter(Boolean).join('/'), folders: [], documents: [] }; branch.folders.push(next); }
      branch = next;
    }
    branch.documents.push(doc);
  }
  return root;
}
const tree = createTree(documents);
const getCount = (branch: Branch): number => branch.documents.length + branch.folders.reduce((sum, child) => sum + getCount(child), 0);

function AstroMark({ small = false }: { small?: boolean }) {
  return <img className={`astro-logo${small ? ' small' : ''}`} src={`${import.meta.env.BASE_URL}astro.svg`} width="448" height="353" alt="" aria-hidden="true" />;
}

function TreeFolder({ branch, active, openDocument, level = 0 }: { branch: Branch; active: string | null; openDocument: (path: string) => void; level?: number }) {
  const [expanded, setExpanded] = useState(true);
  return <div className="tree-folder">
    <button className="folder-toggle" style={{ paddingLeft: 14 + level * 13 }} onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
      {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}<Folder size={15} /><span>{folderName(branch.name)}</span><small>{getCount(branch)}</small>
    </button>
    {expanded && <div className="folder-children">
      {branch.documents.map((doc) => <a key={doc.path} href={documentHref(doc.path)} aria-current={active === doc.path ? 'page' : undefined} className={`document-link ${active === doc.path ? 'active' : ''}`} style={{ paddingLeft: 30 + level * 13 }} onClick={(event) => intercept(event, () => openDocument(doc.path))} title={doc.title}><FileText size={14} /><span>{doc.isIndex ? 'Visão geral' : doc.title}</span></a>)}
      {branch.folders.map((folder) => <TreeFolder key={folder.path} branch={folder} active={active} openDocument={openDocument} level={level + 1} />)}
    </div>}
  </div>;
}

function intercept(event: MouseEvent<HTMLAnchorElement>, callback: () => void) {
  if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); callback(); }
}

function CodeBlock({ children }: { children?: ReactNode }) {
  const block = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return <div className="code-block"><button aria-label="Copiar bloco de código" title={failed ? 'Selecione o texto para copiar' : 'Copiar código'} onClick={async () => {
    try { await navigator.clipboard.writeText(block.current?.innerText || ''); setCopied(true); setFailed(false); setTimeout(() => setCopied(false), 1800); }
    catch { setFailed(true); }
  }}>{copied ? <Check size={14} /> : <Copy size={14} />}</button><pre ref={block}>{children}</pre>{failed && <small>Selecione o texto para copiar.</small>}</div>;
}

function Welcome({ openDocument }: { openDocument: (path: string) => void }) {
  const collections = useMemo(() => {
    const folders = new Map<string, Doc[]>();
    for (const doc of documents) {
      if (!doc.folder || doc.folder === 'docs/astro' || doc.folder === 'site') continue;
      folders.set(doc.folder, [...(folders.get(doc.folder) || []), doc]);
    }
    return [...folders.entries()].sort(([a], [b]) => a.localeCompare(b, 'pt-BR'));
  }, []);
  const guide = documents.find((doc) => doc.path === 'docs/astro/README.md') || documents[0];
  return <div className="welcome">
    <section className="welcome-hero">
      <div className="hero-copy"><span className="eyebrow"><span className="tiny-star">✦</span> BIBLIOTECA DA EQUIPE</span><h1>O conhecimento do Astro, <br /><em>no mesmo lugar.</em></h1><p>Explore o produto, encontre uma regra e conecte as ideias. A documentação cresce junto com o projeto.</p>
        {guide && <button className="primary-button" onClick={() => openDocument(guide.path)}><BookOpen size={17} />Começar pela visão geral<ArrowRight size={17} /></button>}
      </div>
      <figure className="hero-mascot">
        <img src={`${import.meta.env.BASE_URL}images/sath.png`} width="1254" height="1254" alt="SATH, mascote do Astro" />
      </figure>
    </section>
    <div className="library-summary"><span><FileText size={15} /><strong>{documents.length}</strong> documentos</span><span><Folder size={15} /><strong>{collections.length}</strong> assuntos</span><span className="summary-note">Um lugar para consultar e aprender</span></div>
    <section className="collections-section"><div className="section-heading"><div><span className="eyebrow">EXPLORE A BASE</span><h2>Por onde você quer começar?</h2></div><span className="section-hint">Organizado por assunto</span></div>
      <div className="collection-grid">{collections.map(([folder, docs]) => <button className="collection-card" key={folder} onClick={() => openDocument((docs.find((doc) => doc.isIndex) || docs[0]).path)}><span className="collection-icon"><Folder size={20} /></span><div><h3>{folderName(folder.split('/').pop()!)}</h3><p>{docs[0].excerpt}</p></div><div className="collection-footer"><span>{docs.length} {docs.length === 1 ? 'documento' : 'documentos'}</span><ArrowRight size={17} /></div></button>)}</div>
      {collections.length === 0 && <div className="empty-state"><BookOpen size={28} /><h2>A biblioteca está começando</h2><p>Abra um documento pelo menu lateral para começar a leitura.</p></div>}
    </section>
  </div>;
}

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromUrl);
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sourceMode, setSourceMode] = useState(false);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('astro-knowledge-theme') === 'dark' ? 'dark' : 'light'; } catch { return 'light'; } });
  const [activeHeading, setActiveHeading] = useState('');
  const [notice, setNotice] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const current = documents.find((doc) => doc.path === route.path);
  const results: Doc[] = useMemo(() => searchDocuments(documents, query), [query]);
  const searching = query.trim().length > 0;

  function navigate(path: string | null, hash = '') {
    const url = new URL(location.href);
    if (path) url.searchParams.set('doc', path); else url.searchParams.delete('doc');
    url.hash = hash;
    history.pushState(null, '', url);
    setRoute({ path, hash }); setQuery(''); setSourceMode(false); setMobileOpen(false);
  }
  function closeMenu() { setMobileOpen(false); menuRef.current?.focus(); }

  useEffect(() => {
    const update = () => { setRoute(routeFromUrl()); setQuery(''); setSourceMode(false); setMobileOpen(false); };
    window.addEventListener('popstate', update); window.addEventListener('hashchange', update);
    return () => { window.removeEventListener('popstate', update); window.removeEventListener('hashchange', update); };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('astro-knowledge-theme', theme); } catch { /* Theme still works without storage. */ }
  }, [theme]);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); if (innerWidth < 860) setMobileOpen(true); setTimeout(() => searchRef.current?.focus(), 0); }
      if (event.key === 'Escape') { if (mobileOpen) closeMenu(); else if (query) setQuery(''); }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [mobileOpen, query]);
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    searchRef.current?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const elements = [...(sidebarRef.current?.querySelectorAll<HTMLElement>('a[href], button, input') || [])].filter((el) => el.offsetParent !== null);
      const first = elements[0], last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener('keydown', trap);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', trap); };
  }, [mobileOpen]);
  useEffect(() => {
    document.title = current ? `${current.title} — Astro Knowledge` : 'Astro Knowledge — Biblioteca';
    const frame = requestAnimationFrame(() => {
      if (route.hash && !sourceMode && !searching) {
        let id = route.hash;
        try { id = decodeURIComponent(id); } catch { /* Use literal fragment. */ }
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      } else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [route.path, route.hash, sourceMode, searching, current]);
  useEffect(() => {
    if (!current || sourceMode || searching) { setActiveHeading(''); return; }
    const observer = new IntersectionObserver((entries) => {
      const heading = entries.find((entry) => entry.isIntersecting);
      if (heading) setActiveHeading(heading.target.id);
    }, { rootMargin: '-90px 0px -65% 0px' });
    articleRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [current, sourceMode, searching]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 2500); return () => clearTimeout(timer); }, [notice]);

  async function copyLink() {
    try { await navigator.clipboard.writeText(location.href); setNotice('Link copiado'); }
    catch { setNotice('Copie o endereço pela barra do navegador'); }
  }
  function download() {
    if (!current) return;
    const url = URL.createObjectURL(new Blob([current.content], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = current.path.split('/').pop()!; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const toc: Heading[] = current?.headings.slice(1) || [];
  const orderedDocuments = documents.filter((doc) => !doc.isIndex);
  const currentIndex = current ? orderedDocuments.findIndex((doc) => doc.path === current.path) : -1;

  return <div className="app-shell">
    <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
    {mobileOpen && <button className="sidebar-backdrop" aria-label="Fechar navegação" onClick={closeMenu} />}
    <aside ref={sidebarRef} className={`sidebar ${mobileOpen ? 'is-open' : ''}`} aria-label="Navegação da biblioteca" {...(mobileOpen ? { role: 'dialog', 'aria-modal': true } : {})}>
      <div className="brand-row"><a className="brand" href={location.pathname} onClick={(e) => intercept(e, () => navigate(null))}><AstroMark /><span><b>ASTRO</b><small>knowledge</small></span></a><button className="mobile-close icon-button" aria-label="Fechar menu" onClick={closeMenu}><X size={20} /></button></div>
      <label className="search-box"><Search size={16} /><input ref={searchRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && mobileOpen) closeMenu(); }} placeholder="Buscar na biblioteca…" aria-label="Buscar na biblioteca" /><kbd>{navigator.userAgent.includes('Mac') ? '⌘ K' : 'Ctrl K'}</kbd></label>
      <nav className="sidebar-nav"><a className={`home-link ${!route.path && !searching ? 'active' : ''}`} href={location.pathname} onClick={(event) => intercept(event, () => navigate(null))}><Home size={17} /><span>Biblioteca</span><ArrowRight size={15} /></a><div className="nav-caption">DOCUMENTOS<span>{documents.length}</span></div>
        {tree.documents.map((doc) => <a key={doc.path} href={documentHref(doc.path)} className={`document-link root-document ${route.path === doc.path ? 'active' : ''}`} aria-current={route.path === doc.path ? 'page' : undefined} onClick={(event) => intercept(event, () => navigate(doc.path))}><FileText size={15} /><span>{doc.isIndex ? 'Sobre a base' : doc.title}</span></a>)}
        {tree.folders.map((folder) => <TreeFolder key={folder.path} branch={folder} active={route.path} openDocument={(path) => navigate(path)} />)}
      </nav>
      <div className="sidebar-bottom"><a href="https://github.com/Astro-Inter" target="_blank" rel="noreferrer"><Github size={15} />Repositório do projeto<ArrowRight size={14} /></a></div>
    </aside>
    <div className="workspace"><header className="topbar"><div className="breadcrumb"><button ref={menuRef} className="mobile-menu icon-button" aria-label="Abrir menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Menu size={22} /></button><button onClick={() => navigate(null)}>Biblioteca</button><ChevronRight size={13} /><span>{searching ? 'Resultados da busca' : current ? folderName(current.folder.split('/').pop() || 'Sobre a base') : 'Visão geral'}</span></div><div className="topbar-actions"><button className="icon-button theme-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'} title={theme === 'light' ? 'Tema escuro' : 'Tema claro'}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button></div></header>
      <main id="main-content" className={`main-content ${current && !searching ? 'reading-layout' : ''}`} tabIndex={-1}>
        {searching ? <section className="search-results"><span className="eyebrow">BUSCA NA BASE</span><h1>Encontre uma ideia.</h1><p className="search-summary">{results.length} {results.length === 1 ? 'documento encontrado' : 'documentos encontrados'} para <strong>“{query.trim()}”</strong></p><button className="clear-search" onClick={() => { setQuery(''); if (innerWidth < 860) setMobileOpen(false); }}>Limpar busca<X size={14} /></button>
          <div className="results-list">{results.map((doc) => <a key={doc.path} href={documentHref(doc.path)} className="search-result" onClick={(event) => intercept(event, () => navigate(doc.path))}><div className="result-icon"><FileText size={20} /></div><div><small>{doc.path}</small><h2>{doc.title}</h2><p>{searchExcerpt(doc, query)}</p></div><ArrowRight size={18} /></a>)}</div>
          {!results.length && <div className="empty-state"><Search size={30} /><h2>Nenhum documento encontrado</h2><p>Tente outro termo ou busque por uma palavra mais curta.</p></div>}
        </section> : !route.path ? <Welcome openDocument={(path) => navigate(path)} /> : !current ? <section className="empty-state missing-document"><FileText size={35} /><h1>Documento não encontrado</h1><p>Esse arquivo pode ter sido movido ou estar fora da biblioteca.</p><code>{route.path}</code><button className="primary-button" onClick={() => navigate(null)}>Voltar à biblioteca<ArrowRight size={16} /></button></section> : <>
          <div className="reading-column"><div className="reader-toolbar"><div className="view-switch" aria-label="Modo de leitura"><button className={!sourceMode ? 'selected' : ''} onClick={() => setSourceMode(false)} aria-pressed={!sourceMode}><BookOpen size={14} />Leitura</button><button className={sourceMode ? 'selected' : ''} onClick={() => setSourceMode(true)} aria-pressed={sourceMode}><Code2 size={14} />Markdown</button></div><div className="reader-actions"><button className="icon-button" onClick={copyLink} aria-label="Copiar link do documento" title="Copiar link"><Link2 size={17} /></button><button className="icon-button" onClick={download} aria-label="Baixar documento Markdown" title="Baixar Markdown"><ArrowDownToLine size={17} /></button></div></div>
            <div className="document-meta"><span><FileText size={12} />{current.path}</span><span>{current.minutes} min de leitura</span></div>
            {sourceMode ? <section className="source-view"><h1>{current.title}</h1><pre><code>{current.content}</code></pre></section> : <article className="markdown-body" ref={articleRef}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} skipHtml components={{
                a: ({ href, children }) => {
                  const local = resolveLocalLink(current.path, href || '');
                  if (local && /\.md$/i.test(local.path)) return <a href={documentHref(local.path, local.hash)} onClick={(event) => intercept(event, () => navigate(local.path, local.hash))}>{children}</a>;
                  if (local && assets[local.path]) return <a href={assets[local.path]} target="_blank" rel="noreferrer">{children}</a>;
                  if (local && local.path === current.path) return <a href={documentHref(current.path, local.hash)} onClick={(event) => intercept(event, () => navigate(current.path, local.hash))}>{children}</a>;
                  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
                },
                img: ({ src, alt, ...props }) => { const local = resolveLocalLink(current.path, src || ''); return <img {...props} src={local ? assets[local.path] || src : src} alt={alt || ''} loading="lazy" />; },
                pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                table: ({ children }) => <div className="table-scroll"><table>{children}</table></div>,
              }}>{current.body}</ReactMarkdown>
            </article>}
            <div className="document-bottom"><span><AstroMark small />Astro Knowledge</span><button onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Voltar ao topo ↑</button></div>
            {currentIndex >= 0 && <nav className="document-pagination" aria-label="Outros documentos">{currentIndex > 0 ? <button onClick={() => navigate(orderedDocuments[currentIndex - 1].path)}><ArrowLeft size={17} /><span><small>Anterior</small>{orderedDocuments[currentIndex - 1].title}</span></button> : <div />}{currentIndex < orderedDocuments.length - 1 && <button onClick={() => navigate(orderedDocuments[currentIndex + 1].path)}><span><small>Próximo</small>{orderedDocuments[currentIndex + 1].title}</span><ArrowRight size={17} /></button>}</nav>}
          </div>
          <aside className="table-of-contents" aria-label="Seções do documento"><div className="toc-sticky"><span className="eyebrow">NESTA PÁGINA</span>{!sourceMode && toc.length ? <nav>{toc.map((heading) => <a key={heading.id} href={documentHref(current.path, heading.id)} className={`${activeHeading === heading.id ? 'is-active' : ''} ${heading.depth > 2 ? 'toc-nested' : ''}`} onClick={(event) => intercept(event, () => navigate(current.path, heading.id))}>{heading.text}</a>)}</nav> : <p>{sourceMode ? 'Você está vendo o arquivo Markdown.' : 'Este documento não possui outras seções.'}</p>}<div className="toc-footer"><FileText size={15} /><span>Documento da base<br /><b>{current.minutes} min de leitura</b></span></div></div></aside>
        </>}
      </main><footer className="site-footer"><span>ASTRO<span className="footer-dot">/</span>KNOWLEDGE</span><span>A memória compartilhada do projeto.</span></footer>
    </div>{notice && <div className="toast" role="status"><Check size={16} />{notice}</div>}
  </div>;
}
