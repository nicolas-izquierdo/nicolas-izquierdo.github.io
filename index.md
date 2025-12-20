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

<p>
Welcome! My name is Nicolás Izquierdo and I am a Master's student in Social Sciences at the
<a href="https://ic3jm.es/en/postgraduates/master-degree-social-sciences/">Carlos III–Juan March Institute (IC3JM)</a>.
I also hold both degrees in <a href="https://www.uc3m.es/bachelor-degree/law">Law (LL.B.)</a>
and <a href="https://www.uc3m.es/bachelor-degree/political-science">Political Science (B.A.)</a>
from the University Carlos III of Madrid.
</p>

<p>
My research interests lie in comparative political economy and labor politics, encompassing issues of political representation, contentious politics, and redistribution. I am particularly interested in how labor mobilization shapes policy outcomes and mass preferences across advanced democracies. I also study courts and legal processes, focusing on how private economic interests influence judicial decision-making.
</p>

<p>
Outside academia, I enjoy social and political
<a href="#" id="cinema-link" class="poplink" aria-haspopup="dialog" aria-expanded="false">cinema</a>
and <a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.
</p>

<p>
You can find my full CV <a href="/CV-nicolas-izquierdo-11-25.pdf">here</a>.
</p>

<style>
  .poplink { color:#0057d9; text-decoration:underline; }
  .poplink:visited { color:#0057d9; }
  .poplink:hover { color:#0046b3; }

  #cinema-pop{
    position:fixed;
    z-index:999999;
    display:none;
    transform:translate(-50%,-100%);
    pointer-events:none;
  }
  #cinema-pop.show{ display:block; }

  #cinema-pop .popover-inner{
    pointer-events:auto;
    background:#111;
    color:#fff;
    border-radius:14px;
    box-shadow:0 10px 30px rgba(0,0,0,.25);
    padding:12px;
    min-width:280px;
    max-width:360px;
    position:relative;
    font-family:inherit;
  }
  #cinema-pop .popover-inner::after{
    content:"";
    position:absolute;
    left:50%;
    bottom:-8px;
    transform:translateX(-50%);
    width:0;height:0;
    border-left:8px solid transparent;
    border-right:8px solid transparent;
    border-top:8px solid #111;
  }

  #cinema-pop .pop-title{
    font-weight:800;
    letter-spacing:.08em;
    font-size:12px;
    text-transform:uppercase;
    opacity:.9;
    margin-bottom:10px;
  }

  #cinema-pop .movie-card{ display:flex; gap:12px; align-items:flex-start; }
  #cinema-pop .movie-poster{
    width:78px; height:110px; border-radius:10px; object-fit:cover;
    flex:0 0 auto; background:#222;
  }
  #cinema-pop .movie-name{ font-weight:800; font-size:14px; line-height:1.2; margin:0 0 4px 0; }
  #cinema-pop .movie-year{ font-size:12px; opacity:.75; margin:0 0 8px 0; }
  #cinema-pop .movie-desc{ font-size:12.5px; line-height:1.35; opacity:.92; margin:0 0 10px 0; }
  #cinema-pop .movie-link{ color:#60a5fa; text-decoration:underline; font-size:12.5px; font-weight:700; }
  #cinema-pop .movie-link:hover{ color:#93c5fd; }
</style>

<script>
(function () {
  const MOVIES_JSON_URL = "/movies/movies.json";
  const MOVIES_BASE_PATH = "/movies/";

  let moviesCache = null;
  let cachedKey = null;
  let cachedMovie = null;

  function t(s){ return (s ?? "").toString(); }

  function ensurePopover() {
    let pop = document.getElementById("cinema-pop");
    if (pop) return pop;

    pop = document.createElement("div");
    pop.id = "cinema-pop";
    pop.setAttribute("role","dialog");
    pop.setAttribute("aria-hidden","true");
    pop.innerHTML = `
      <div class="popover-inner" id="cinema-pop-content">
        <div class="pop-title">Today’s movie</div>
        <div style="font-size:12.5px;opacity:.9;">Loading…</div>
      </div>
    `;
    document.body.appendChild(pop);
    return pop;
  }

  function todayKeyUTC(){
    const d = new Date();
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,"0")}-${String(d.getUTCDate()).padStart(2,"0")}`;
  }

  function dayIndexUTC(){
    const d = new Date();
    const ms = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    return Math.floor(ms / 86400000);
  }

  function posterSrc(movie){
    const file = t(movie.image_file).trim();
    if (file) return MOVIES_BASE_PATH + encodeURI(file);
    const url = t(movie.image_url).trim();
    return url || "";
  }

  function buildMovieHTML(movie){
    const title = t(movie.id_with_year || movie.id || "Untitled");
    const year  = t(movie.year).trim();
    const desc  = t(movie.description).trim();
    const url   = t(movie.url).trim();
    const img   = posterSrc(movie);

    const imgTag = img
      ? `<img class="movie-poster" src="${img}" alt="${title} poster" loading="eager" decoding="async" onerror="this.style.display='none';" />`
      : `<div class="movie-poster" style="display:flex;align-items:center;justify-content:center;font-size:11px;opacity:.75;">No poster</div>`;

    const linkTag = url
      ? `<a class="movie-link" href="${url}" target="_blank" rel="noopener noreferrer">More info</a>`
      : ``;

    return `
      <div class="pop-title">Today’s movie</div>
      <div class="movie-card">
        ${imgTag}
        <div style="min-width:0;">
          <p class="movie-name">${title}</p>
          <p class="movie-year">${year || "&nbsp;"}</p>
          ${desc ? `<p class="movie-desc">${desc}</p>` : ``}
          ${linkTag}
        </div>
      </div>
    `;
  }

  async function loadMovies(){
    if (moviesCache) return moviesCache;

    const res = await fetch(MOVIES_JSON_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Could not load ${MOVIES_JSON_URL} (HTTP ${res.status})`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("movies.json is empty or not an array.");
    moviesCache = data;
    return moviesCache;
  }

  function pickDailyMovie(movies){
    const key = todayKeyUTC();
    if (cachedKey === key && cachedMovie) return cachedMovie;

    const idx = dayIndexUTC() % movies.length;
    cachedKey = key;
    cachedMovie = movies[idx];
    return cachedMovie;
  }

  function position(pop, linkEl){
    const r = linkEl.getBoundingClientRect();
    pop.style.left = `${r.left + r.width/2}px`;
    pop.style.top  = `${r.top - 12}px`;
  }

  function show(pop, linkEl){
    position(pop, linkEl);
    pop.classList.add("show");
    pop.setAttribute("aria-hidden","false");
    linkEl.setAttribute("aria-expanded","true");
  }

  function hide(pop){
    pop.classList.remove("show");
    pop.setAttribute("aria-hidden","true");
    const linkEl = document.getElementById("cinema-link");
    if (linkEl) linkEl.setAttribute("aria-expanded","false");
  }

  async function renderIntoPopover(){
    const content = document.getElementById("cinema-pop-content");
    if (!content) return;

    content.innerHTML = `<div class="pop-title">Today’s movie</div><div style="font-size:12.5px;opacity:.9;">Loading…</div>`;
    try{
      const movies = await loadMovies();
      const movie = pickDailyMovie(movies);
      content.innerHTML = buildMovieHTML(movie);

      const img = posterSrc(movie);
      if (img) { const pre = new Image(); pre.decoding = "async"; pre.src = img; }
    }catch(err){
      content.innerHTML = `
        <div class="pop-title">Today’s movie</div>
        <div style="font-size:12.5px;opacity:.9;">Couldn’t load the movie list.</div>
        <div style="font-size:12.5px;opacity:.75;margin-top:6px;">${t(err.message)}</div>
      `;
    }
  }

  // Works even if the theme swaps content / link is re-rendered
  document.addEventListener("click", async (e) => {
    const linkEl = e.target.closest ? e.target.closest("#cinema-link") : null;
    const pop = document.getElementById("cinema-pop");

    if (linkEl) {
      e.preventDefault();
      const p = ensurePopover();
      const open = p.classList.contains("show");
      if (open) { hide(p); return; }
      show(p, linkEl);
      await renderIntoPopover();
      position(p, linkEl);
      return;
    }

    if (pop && pop.classList.contains("show")) hide(pop);
  });

  window.addEventListener("scroll", () => {
    const pop = document.getElementById("cinema-pop");
    const linkEl = document.getElementById("cinema-link");
    if (pop && linkEl && pop.classList.contains("show")) position(pop, linkEl);
  }, { passive:true });

  window.addEventListener("resize", () => {
    const pop = document.getElementById("cinema-pop");
    const linkEl = document.getElementById("cinema-link");
    if (pop && linkEl && pop.classList.contains("show")) position(pop, linkEl);
  });

  document.addEventListener("keydown", (e) => {
    const pop = document.getElementById("cinema-pop");
    if (e.key === "Escape" && pop && pop.classList.contains("show")) hide(pop);
  });
})();
</script>
