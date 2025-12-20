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
      Workers’ Delegation Before the Magistrate
    </span>
    by Johann Peter Hasenclever
  </figcaption>
</figure>

<p>
Welcome! My name is Nicolás Izquierdo and I am a Master's student in Social Sciences at the
<a href="https://ic3jm.es/en/postgraduates/master-degree-social-sciences/">Carlos III–Juan March Institute (IC3JM)</a>.
I also hold both degrees in
<a href="https://www.uc3m.es/bachelor-degree/law">Law (LL.B.)</a>
and
<a href="https://www.uc3m.es/bachelor-degree/political-science">Political Science (B.A.)</a>
from the University Carlos III of Madrid.
</p>

<p>
My research interests lie in comparative political economy and labor politics, encompassing issues of political representation, contentious politics, and redistribution. I am particularly interested in how labor mobilization shapes policy outcomes and mass preferences across advanced democracies. I also study courts and legal processes, focusing on how private economic interests influence judicial decision-making.
</p>

<p>
Outside academia, I enjoy social and political
<a href="#" id="cinema-link" class="poplink" aria-haspopup="dialog" aria-expanded="false">cinema</a>
and
<a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.
</p>

<p>
You can find my full CV <a href="/CV-nicolas-izquierdo-11-25.pdf">here</a>.
</p>

<!-- POPOVER (initially hidden) -->
<div id="cinema-pop" class="popover" role="dialog" aria-hidden="true">
  <div class="popover-inner" id="cinema-pop-content">
    <div class="pop-title">Today’s movie</div>
    <div class="pop-loading">Loading…</div>
  </div>
</div>

<style>
  .poplink { color:#0057d9; text-decoration:underline; }
  .poplink:visited { color:#0057d9; }
  .poplink:hover { color:#0046b3; }

  .popover{
    position:fixed;
    z-index:999999;
    display:none;
    transform:translate(-50%,-100%);
    pointer-events:none;
  }
  .popover.show{ display:block; }

  .popover-inner{
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
  .popover-inner::after{
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

  .pop-title{
    font-weight:800;
    letter-spacing:.08em;
    font-size:12px;
    text-transform:uppercase;
    opacity:.9;
    margin-bottom:10px;
  }

  .movie-card{ display:flex; gap:12px; align-items:flex-start; }
  .movie-poster{
    width:78px; height:110px;
    border-radius:10px;
    object-fit:cover;
    background:#222;
    flex:0 0 auto;
  }
  .movie-name{ font-weight:800; font-size:14px; margin:0 0 4px 0; }
  .movie-year{ font-size:12px; opacity:.75; margin:0 0 8px 0; }
  .movie-desc{ font-size:12.5px; line-height:1.35; opacity:.92; margin:0 0 10px 0; }
  .movie-link{ color:#60a5fa; text-decoration:underline; font-weight:700; font-size:12.5px; }
  .movie-link:hover{ color:#93c5fd; }
</style>

<script>
(function () {
  const MOVIES_JSON_URL = "/movies/movies.json";
  const MOVIES_BASE_PATH = "/movies/";

  let moviesCache = null;
  let cacheKey = null;
  let cacheMovie = null;

  function t(x){ return (x ?? "").toString(); }

  function todayKeyUTC(){
    const d = new Date();
    return `${d.getUTCFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`;
  }

  function dayIndexUTC(){
    const d = new Date();
    return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000);
  }

  function posterSrc(m){
    if (m.image_file) return MOVIES_BASE_PATH + encodeURI(m.image_file);
    return m.image_url || "";
  }

  async function loadMovies(){
    if (moviesCache) return moviesCache;
    const res = await fetch(MOVIES_JSON_URL, { cache:"no-store" });
    moviesCache = await res.json();
    return moviesCache;
  }

  function pickMovie(movies){
    const key = todayKeyUTC();
    if (cacheKey === key && cacheMovie) return cacheMovie;
    cacheKey = key;
    cacheMovie = movies[dayIndexUTC() % movies.length];
    return cacheMovie;
  }

  function render(movie){
    const img = posterSrc(movie);
    document.getElementById("cinema-pop-content").innerHTML = `
      <div class="pop-title">Today’s movie</div>
      <div class="movie-card">
        ${img ? `<img class="movie-poster" src="${img}">` : ``}
        <div>
          <p class="movie-name">${t(movie.id_with_year || movie.id)}</p>
          <p class="movie-year">${t(movie.year)}</p>
          <p class="movie-desc">${t(movie.description)}</p>
          <a class="movie-link" href="${movie.url}" target="_blank">More info</a>
        </div>
      </div>
    `;
  }

  function position(link){
    const r = link.getBoundingClientRect();
    const pop = document.getElementById("cinema-pop");
    pop.style.left = `${r.left + r.width/2}px`;
    pop.style.top  = `${r.top - 12}px`;
  }

  document.addEventListener("click", async (e) => {
    const link = e.target.closest("#cinema-link");
    const pop = document.getElementById("cinema-pop");

    if (link) {
      e.preventDefault();
      if (pop.classList.contains("show")) {
        pop.classList.remove("show");
        return;
      }
      pop.classList.add("show");
      position(link);
      const movies = await loadMovies();
      render(pickMovie(movies));
      position(link);
      return;
    }

    if (pop.classList.contains("show")) pop.classList.remove("show");
  });

  window.addEventListener("scroll", () => {
    const link = document.getElementById("cinema-link");
    const pop = document.getElementById("cinema-pop");
    if (pop.classList.contains("show")) position(link);
  }, { passive:true });
})();
</script>
