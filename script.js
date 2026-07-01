
/* ===================== HELPERS ===================== */
function escapeHtml(str){ const d=document.createElement('div'); d.textContent=str; return d.innerHTML; }
function formatDate(iso){ return new Date(iso+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); }

/* ===================== STARFIELD ===================== */
function spawnStars(container, count){
  if(!container) return;
  const frag = document.createDocumentFragment();
  for(let i=0;i<count;i++){
    const s=document.createElement('span');
    s.className='star';
    const size=(Math.random()*1.6+0.6).toFixed(2);
    s.style.width=size+'px';
    s.style.height=size+'px';
    s.style.left=(Math.random()*100)+'%';
    s.style.top=(Math.random()*100)+'%';
    s.style.animationDuration=(Math.random()*3+2.5).toFixed(2)+'s';
    s.style.animationDelay=(Math.random()*4).toFixed(2)+'s';
    s.style.setProperty('--max-op',(Math.random()*0.5+0.5).toFixed(2));
    s.style.setProperty('--min-op',(Math.random()*0.2+0.05).toFixed(2));
    frag.appendChild(s);
  }
  container.appendChild(frag);
}
spawnStars(document.getElementById('starfield'), 170);
spawnStars(document.getElementById('planetStars'), 22);
spawnStars(document.getElementById('featuredStars'), 55);

/* ===================== POST DATA ===================== */
const POSTS = [
  { id:1, category:"movie", title:"Lost Between Stars", excerpt:"Sometimes the most profound journeys are the ones that take us inward. A meditation on finding yourself in the vast cosmic expanse of everyday life.", date:"2026-06-30", popularity:98 },
  { id:2, category:"movie", title:"Echoes in the Dark", excerpt:"How silence became the loudest character in modern cinema.", date:"2026-06-12", popularity:74 },
  { id:3, category:"movie", title:"The Last Frame", excerpt:"What a film's final shot tells us before the credits even roll.", date:"2026-05-20", popularity:61 },
  { id:4, category:"music", title:"Static and Stardust", excerpt:"An album that sounds like it was recorded somewhere between two galaxies.", date:"2026-06-22", popularity:88 },
  { id:5, category:"music", title:"Frequencies of Tomorrow", excerpt:"Tracking the sounds that feel like they arrived from the future.", date:"2026-06-02", popularity:55 },
  { id:6, category:"music", title:"The Sound of Distant Light", excerpt:"A quiet playlist for long nights and longer thoughts.", date:"2026-04-30", popularity:40 },
  { id:7, category:"book", title:"Ink and Orbit", excerpt:"A novel that treats memory like a planet you keep returning to.", date:"2026-06-18", popularity:80 },
  { id:8, category:"book", title:"The Library at the Edge of Time", excerpt:"Some books don't end so much as they drift away.", date:"2026-05-08", popularity:66 },
  { id:9, category:"book", title:"Pages from a Parallel World", excerpt:"A story collection that keeps rewriting its own rules.", date:"2026-03-26", popularity:35 }
];
const CAT_LABEL = { movie:"🎬 Movie", music:"🎵 Music", book:"📚 Book" };

/* ===================== BLOG: FILTER / SORT / PAGINATE ===================== */
let blogFilter='all', blogSort='newest', blogPage=1;
const PER_PAGE=3;

function renderBlog(){
  let list = POSTS.filter(p => blogFilter==='all' || p.category===blogFilter);
  list = list.slice().sort((a,b)=>{
    if(blogSort==='newest') return new Date(b.date)-new Date(a.date);
    if(blogSort==='oldest') return new Date(a.date)-new Date(b.date);
    return b.popularity-a.popularity;
  });

  const grid=document.getElementById('postsGrid');
  if(!list.length){
    grid.innerHTML='<div class="empty-state">No posts in this orbit yet — try a different category.</div>';
    document.getElementById('pagination').innerHTML='';
    return;
  }

  const totalPages=Math.max(1, Math.ceil(list.length/PER_PAGE));
  blogPage=Math.min(blogPage,totalPages);
  const start=(blogPage-1)*PER_PAGE;
  const pageItems=list.slice(start,start+PER_PAGE);

  grid.innerHTML=pageItems.map(p=>`
    <article class="post-card">
      <span class="post-tag">${CAT_LABEL[p.category]}</span>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      <div class="post-meta"><span>${formatDate(p.date)}</span><span>Read More →</span></div>
    </article>
  `).join('');

  renderPagination(totalPages);
}

function renderPagination(totalPages){
  const wrap=document.getElementById('pagination');
  let html='';
  for(let i=1;i<=totalPages;i++){
    html+=`<button class="page-btn ${i===blogPage?'active':''}" data-pg="${i}" type="button">${i}</button>`;
  }
  wrap.innerHTML=html;
  wrap.querySelectorAll('.page-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      blogPage=parseInt(btn.dataset.pg,10);
      renderBlog();
      const controls=document.getElementById('blogControls');
      window.scrollTo({ top: controls.offsetTop-100, behavior:'smooth' });
    });
  });
}

document.querySelectorAll('.filter-pill').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-pill').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    blogFilter=btn.dataset.filter;
    blogPage=1;
    renderBlog();
  });
});
document.getElementById('sortSelect').addEventListener('change', e=>{
  blogSort=e.target.value; blogPage=1; renderBlog();
});

/* ===================== PAGE ROUTING ===================== */
const PAGES=['home','about','blog'];

function showPage(id, opts={}){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target=document.getElementById('page-'+id);
  if(target) target.classList.add('active');

  document.querySelectorAll('[data-page]').forEach(el=>{
    el.classList.toggle('is-active', el.dataset.page===id && !el.dataset.category);
  });

  if(!opts.skipHash) location.hash=id;
  window.scrollTo({ top:0, behavior:'auto' });
  closeMobileMenu();
  document.getElementById('navDropdown').classList.remove('open');

  if(id==='blog'){
    document.querySelectorAll('.filter-pill').forEach(b=>b.classList.toggle('active', b.dataset.filter===blogFilter));
    renderBlog();
  }
}

document.querySelectorAll('[data-page]').forEach(el=>{
  el.addEventListener('click', e=>{
    e.preventDefault();
    const id=el.dataset.page;
    const cat=el.dataset.category;
    if(cat){ blogFilter=cat; blogPage=1; }
    showPage(id);
  });
});

function initFromHash(){
  const id=(location.hash||'#home').replace('#','');
  showPage(PAGES.includes(id)?id:'home', {skipHash:true});
}
window.addEventListener('hashchange', initFromHash);

/* ===================== MOBILE MENU ===================== */
function closeMobileMenu(){ document.getElementById('mobileMenu').classList.remove('open'); }
document.getElementById('hamburgerBtn').addEventListener('click', ()=> document.getElementById('mobileMenu').classList.toggle('open'));
document.getElementById('mobileCloseBtn').addEventListener('click', closeMobileMenu);
document.getElementById('mobileSearchBtn').addEventListener('click', ()=>{ closeMobileMenu(); openSearch(); });

/* ===================== NAV DROPDOWN ===================== */
document.getElementById('dropdownTrigger').addEventListener('click', e=>{
  e.stopPropagation();
  document.getElementById('navDropdown').classList.toggle('open');
});
document.addEventListener('click', ()=> document.getElementById('navDropdown').classList.remove('open'));

/* ===================== SEARCH MODAL ===================== */
const searchModal=document.getElementById('searchModal');
const searchInput=document.getElementById('searchInput');

function openSearch(){ searchModal.classList.add('open'); searchInput.value=''; renderSearchResults(''); setTimeout(()=>searchInput.focus(),50); }
function closeSearch(){ searchModal.classList.remove('open'); }

document.getElementById('searchTrigger').addEventListener('click', openSearch);
document.getElementById('searchCloseBtn').addEventListener('click', closeSearch);
searchModal.addEventListener('click', e=>{ if(e.target===searchModal) closeSearch(); });
searchInput.addEventListener('input', e=> renderSearchResults(e.target.value));

function renderSearchResults(query){
  const q=query.trim().toLowerCase();
  const wrap=document.getElementById('searchResults');
  if(!q){ wrap.innerHTML='<div class="search-empty">Start typing to search posts, movies, music, and books…</div>'; return; }

  const matches=POSTS.filter(p=>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.category.includes(q)
  );

  if(!matches.length){
    wrap.innerHTML=`<div class="search-empty">No results for "${escapeHtml(query)}" — try a different search.</div>`;
    return;
  }

  wrap.innerHTML=matches.map(p=>`
    <div class="search-result-item" data-cat="${p.category}">
      <span>${p.title}</span>
      <span class="post-tag">${CAT_LABEL[p.category]}</span>
    </div>
  `).join('');

  wrap.querySelectorAll('.search-result-item').forEach(item=>{
    item.addEventListener('click', ()=>{
      closeSearch();
      blogFilter=item.dataset.cat; blogPage=1;
      showPage('blog');
    });
  });
}

document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){ closeSearch(); closeMobileMenu(); }
});

/* ===================== SCROLL FADE-IN ===================== */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold:0.15 });
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

/* ===================== MISC ===================== */
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('featuredDate').textContent=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});

/* ===================== INIT ===================== */
initFromHash();
