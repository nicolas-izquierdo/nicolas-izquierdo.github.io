---
permalink: /
title: "Nicolás Izquierdo – Political Scientist"
description: "Official academic profile of Nicolás Izquierdo, Master's student in Social Sciences at IC3JM, with degrees in Law and Political Science from UC3M."
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<h1 style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
  Nicolás Izquierdo, Political Science, Political Scientist, Political Economy
</h1>

<figure style="margin:0;">
  <img src="marx-painting-HD.jpg"
       alt="Workers’ Delegation Before the Magistrate by Johann Peter Hasenclever"
       style="width:660px;height:200px;object-fit:cover;display:block;">
  <figcaption style="font-size:0.9em;margin-top:-13px;margin-bottom:20px;">
    <span style="font-style:italic;text-decoration:underline;">
      Workers’ Delegation Before the Magistrate</span>
    by Johann Peter Hasenclever
  </figcaption>
</figure>

Welcome! My name is Nicolás Izquierdo and I am a Master's student in Social Sciences at the 
[Carlos III–Juan March Institute (IC3JM)](https://ic3jm.es/en/postgraduates/master-degree-social-sciences/). 
I also hold both degrees in [Law (LL.B.)](https://www.uc3m.es/bachelor-degree/law) 
and [Political Science (B.A.)](https://www.uc3m.es/bachelor-degree/political-science) 
from the University Carlos III of Madrid.  

My research interests lie in comparative political economy and labor politics, encompassing issues of political representation, contentious politics, and redistribution. I am particularly interested in how labor mobilization shapes policy outcomes and mass preferences across advanced democracies. I also study courts and legal processes, focusing on how private economic interests influence judicial decision-making.

Outside academia, I enjoy
<a href="#" id="movie-trigger" style="text-decoration:underline;cursor:pointer;color:inherit;">
  social and political cinema
</a>
and <a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.

<div id="movie-card" style="display:none;"></div>

You can find my full CV [here](/CV-nicolas-izquierdo-11-25.pdf).

<style>
#movie-card{
  position:absolute;
  z-index:9999;
  width:560px;
  max-width:calc(100vw - 24px);
  background:rgba(255,255,255,.92);
  border:1px solid rgba(0,0,0,.10);
  border-radius:16px;
  padding:14px 14px 12px 14px;
  box-shadow:0 18px 46px rgba(0,0,0,.18);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

#movie-card .top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-bottom:10px;
}

#movie-card .badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  font-weight:700;
  font-size:.95rem;
  letter-spacing:.2px;
}

#movie-card .badge .dot{
  width:8px;
  height:8px;
  border-radius:999px;
  background:rgba(0,0,0,.35);
  display:inline-block;
}

#movie-card .close{
  border:1px solid rgba(0,0,0,.12);
  background:rgba(255,255,255,.9);
  border-radius:10px;
  width:34px;
  height:34px;
  cursor:pointer;
  font-size:18px;
  line-height:1;
  color:rgba(0,0,0,.7);
}

#movie-card .grid{
  display:grid;
  grid-template-columns:120px 1fr;
  gap:14px;
  align-items:start;
}

/* Fixed poster size (match your reference poster size consistently) */
#movie-card .poster{
  width:120px;
  height:176px;
  object-fit:cover;
  object-position:center;
  border-radius:12px;
  border:1px solid rgba(0,0,0,.10);
  box-shadow:0 10px 24px rgba(0,0,0,.16);
  background:rgba(0,0,0,.03);
  display:block;
}

#movie-card .title{
  margin:0 0 6px 0;
  font-weight:800;
  font-size:1.06rem;
  line-height:1.25;
  color:rgba(0,0,0,.86);
}

#movie-card .meta{
  margin:0 0 10px 0;
  font-size:.92rem;
  color:rgba(0,0,0,.62);
}

#movie-card .meta a{
  color:#1a73e8 !important;
  text-decoration:none;
  font-weight:600;
}

#movie-card .meta a:hover{
  text-decoration:underline;
}

#movie-card .desc{
  margin:0;
  font-size:.98rem;
  line-height:1.38;
  color:rgba(0,0,0,.78);
}

#movie-card .hint{
  margin-top:10px;
  font-size:.84rem;
  color:rgba(0,0,0,.50);
}

@media (max-width: 520px){
  #movie-card{ width:calc(100vw - 24px); }
  #movie-card .grid{ grid-template-columns:96px 1fr; }
  #movie-card .poster{ width:96px; height:140px; border-radius:10px; }
}
</style>

<script>
(function(){
  const trigger = document.getElementById("movie-trigger");
  const card = document.getElementById("movie-card");
  const JSON_PATH = "/covers_movies/movies.json";

  function hashDay(){
    const d = new Date().toISOString().slice(0,10);
    let h = 2166136261;
    for (let i = 0; i < d.length; i++){
      h ^= d.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0);
  }

  function position(){
    const r = trigger.getBoundingClientRect();
    const pad = 12;
    card.style.display = "block";
    const maxLeft = window.scrollX + document.documentElement.clientWidth - card.offsetWidth - pad;

    let left = window.scrollX + r.left;
    left = Math.min(left, maxLeft);
    left = Math.max(left, window.scrollX + pad);

    card.style.left = left + "px";
    card.style.top  = (window.scrollY + r.bottom + 10) + "px";
  }

  function close(){
    card.style.display = "none";
    document.removeEventListener("mousedown", outside);
    window.removeEventListener("resize", position);
    window.removeEventListener("scroll", position, {passive:true});
  }

  function outside(e){
    if(card.contains(e.target) || trigger.contains(e.target)) return;
    close();
  }

  function esc(s){
    return String(s ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function titleOf(m){
    const t = (m.id_with_year || "").trim();
    if (t) return t;
    const id = (m.id || "Untitled").trim();
    const y = String(m.year || "").trim();
    return y ? `${id} (${y})` : id;
  }

  function loadingUI(){
    card.innerHTML = `
      <div class="top">
        <div class="badge"><span class="dot"></span><span>Today’s movie recommendation</span></div>
        <button class="close" id="close-movie" aria-label="Close">×</button>
      </div>
      <div class="hint">Loading…</div>
    `;
    document.getElementById("close-movie").onclick = close;
  }

  function errorUI(msg){
    card.innerHTML = `
      <div class="top">
        <div class="badge"><span class="dot"></span><span>Today’s movie recommendation</span></div>
        <button class="close" id="close-movie" aria-label="Close">×</button>
      </div>
      <p class="desc">Couldn’t load today’s recommendation.</p>
      <div class="hint">${esc(msg)}</div>
    `;
    document.getElementById("close-movie").onclick = close;
  }

  function render(m, imgSrc){
    const t = titleOf(m);
    const link = m.url ? `<a href="${esc(m.url)}" target="_blank" rel="noopener">Link</a>` : "";
    const desc = m.description ? esc(m.description) : "";

    card.innerHTML = `
      <div class="top">
        <div class="badge"><span class="dot"></span><span>Today’s movie recommendation</span></div>
        <button class="close" id="close-movie" aria-label="Close">×</button>
      </div>
      <div class="grid">
        <img class="poster" src="${imgSrc}" alt="Poster for ${esc(t)}" loading="lazy">
        <div>
          <p class="title">${esc(t)}</p>
          <p class="meta">${link}</p>
          <p class="desc">${desc}</p>
        </div>
      </div>
      <div class="hint">Selection updates daily.</div>
    `;
    document.getElementById("close-movie").onclick = close;
  }

  async function loadMovies(){
    const res = await fetch(JSON_PATH, {cache:"no-store"});
    if(!res.ok) throw new Error(`Could not load ${JSON_PATH} (HTTP ${res.status})`);
    const movies = await res.json();
    if(!Array.isArray(movies)) throw new Error("movies.json is not an array.");
    return movies;
  }

  function imageLoads(src){
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  let coverReady = null;
  let initPromise = null;
  let chosen = null;

  async function initCoversOnce(){
    if (coverReady) return coverReady;
    if (initPromise) return initPromise;

    initPromise = (async () => {
      const movies = await loadMovies();
      const candidates = movies
        .filter(m => m && m.image_file && String(m.image_file).trim().length > 0)
        .map(m => ({ m, imgSrc: "/covers_movies/" + encodeURIComponent(m.image_file) }));

      if (candidates.length === 0) throw new Error("No movies with image_file found.");

      const ok = [];
      for (const c of candidates){
        if (await imageLoads(c.imgSrc)) ok.push(c);
      }

      if (ok.length === 0) throw new Error("No movie covers could be loaded from /covers_movies/.");
      coverReady = ok;
      return ok;
    })();

    return initPromise;
  }

  function pickToday(list){
    const idx = hashDay() % list.length;
    return list[idx];
  }

  async function open(){
    if(card.style.display === "block"){ close(); return; }

    card.style.display = "block";
    position();
    document.addEventListener("mousedown", outside);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, {passive:true});

    loadingUI();
    position();

    try{
      const list = await initCoversOnce();
      if (!chosen) chosen = pickToday(list);
      render(chosen.m, chosen.imgSrc);
      position();
    }catch(e){
      errorUI(e.message || String(e));
      position();
      console.error(e);
    }
  }

  trigger.addEventListener("click", function(e){
    e.preventDefault();
    open();
  });
})();
</script>
