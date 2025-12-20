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

Outside academia, I enjoy social and political 
<a href="#" id="cinema-link" class="poplink" aria-haspopup="dialog" aria-expanded="false">cinema</a>
and <a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.


You can find my full CV [here](/CV-nicolas-izquierdo-11-25.pdf).

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
  .poplink:focus { outline:2px solid rgba(0,87,217,.35); outline-offset:2px; border-radius:4px; }

  .popover{
    position:fixed;
    z-index:9999;
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

  .movie-card{
    display:flex;
    gap:12px;
    align-items:flex-start;
  }

  .movie-poster{
    width:78px;
    height:110px;
    border-radius:10px;
    object-fit:cover;
    flex:0 0 auto;
    background:#222;
  }

  .movie-meta{ min-width:0; }
  .movie-name{
    font-weight:800;
    font-size:14px;
    line-height:1.2;
    margin:0 0 4px 0;
  }
  .movie-year{
    font-size:12px;
    opacity:.75;
    margin:0 0 8px 0;
  }
  .movie-desc{
    font-size:12.5px;
    line-height:1.35;
    opacity:.92;
    margin:0 0 10px 0;
  }

  .movie-link{
    display:inline-block;
    color:#60a5fa;
    text-decoration:underline;
    font-size:12.5px;
    font-weight:700;
  }
  .movie-link:hover{ color:#93c5fd; }

  .pop-loading, .pop-error{
    font-size:12.5px;
    opacity:.9;
  }
</style>

<script>
  (function () {
    const link = document.getElementById("cinema-link");
    const pop = document.getElementById("cinema-pop");
    const content = document.getElementById("cinema-pop-content");

    const MOVIES_JSON_URL = "/movies/movies.json";
    const MOVIES_BASE_PATH = "/movies/"; // where image_file lives

    let moviesCache = null;
    let movieOfDayCacheKey = null;
    let movieOfDayCacheValue = null;

    function todayKeyUTC() {
      const d = new Date();
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,"0")}-${String(d.getUTCDate()).padStart(2,"0")}`;
    }

    function dayIndexUTC() {
      const d = new Date();
      const ms = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
      return Math.floor(ms / 86400000);
    }

    function sanitizeText(s) {
      return (s ?? "").toString();
    }

    function posterSrc(movie) {
      const file = sanitizeText(movie.image_file).trim();
      if (file) return MOVIES_BASE_PATH + encodeURI(file);
      const url = sanitizeText(movie.image_url).trim();
      return url || "";
    }

    function buildMovieHTML(movie) {
      const title = sanitizeText(movie.id_with_year || movie.id || "Untitled");
      const year = sanitizeText(movie.year);
      const desc = sanitizeText(movie.description);
      const url = sanitizeText(movie.url);

      const img = posterSrc(movie);
      const imgTag = img
        ? `<img class="movie-poster" src="${img}" alt="${title} poster" loading="eager" decoding="async"
              onerror="this.style.display='none';" />`
        : `<div class="movie-poster" style="display:flex;align-items:center;justify-content:center;font-size:11px;opacity:.75;">No poster</div>`;

      const linkTag = url
        ? `<a class="movie-link" href="${url}" target="_blank" rel="noopener noreferrer">More info</a>`
        : ``;

      return `
        <div class="pop-title">Today’s movie</div>
        <div class="movie-card">
          ${imgTag}
          <div class="movie-meta">
            <p class="movie-name">${title}</p>
            ${year ? `<p class="movie-year">${year}</p>` : `<p class="movie-year" style="opacity:.5;">&nbsp;</p>`}
            ${desc ? `<p class="movie-desc">${desc}</p>` : ``}
            ${linkTag}
          </div>
        </div>
      `;
    }

    async function loadMoviesOnce() {
      if (moviesCache) return moviesCache;

      const res = await fetch(MOVIES_JSON_URL, { cache: "force-cache" });
      if (!res.ok) throw new Error(`Could not load ${MOVIES_JSON_URL} (HTTP ${res.status})`);

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error("movies.json is empty or not an array.");

      moviesCache = data;
      return moviesCache;
    }

    function pickDailyMovie(movies) {
      const key = todayKeyUTC();
      if (movieOfDayCacheKey === key && movieOfDayCacheValue) return movieOfDayCacheValue;

      const idx = dayIndexUTC() % movies.length;
      const movie = movies[idx];

      movieOfDayCacheKey = key;
      movieOfDayCacheValue = movie;
      return movie;
    }

    async function ensureMovieRendered() {
      try {
        const movies = await loadMoviesOnce();
        const movie = pickDailyMovie(movies);

        content.innerHTML = buildMovieHTML(movie);

        // warm-cache the poster (so it appears instantly)
        const img = posterSrc(movie);
        if (img) {
          const pre = new Image();
          pre.decoding = "async";
          pre.src = img;
        }
      } catch (err) {
        content.innerHTML = `
          <div class="pop-title">Today’s movie</div>
          <div class="pop-error">Couldn’t load the movie list.</div>
          <div class="pop-error" style="opacity:.75;margin-top:6px;">${sanitizeText(err.message)}</div>
        `;
      }
    }

    function positionPopover() {
      const r = link.getBoundingClientRect();
      const x = r.left + (r.width / 2);
      const y = r.top - 12;
      pop.style.left = `${x}px`;
      pop.style.top = `${y}px`;
    }

    function showPopover() {
      positionPopover();
      pop.classList.add("show");
      pop.setAttribute("aria-hidden", "false");
      link.setAttribute("aria-expanded", "true");
    }

    function hidePopover() {
      pop.classList.remove("show");
      pop.setAttribute("aria-hidden", "true");
      link.setAttribute("aria-expanded", "false");
    }

    link.addEventListener("click", async (e) => {
      e.preventDefault();

      if (pop.classList.contains("show")) {
        hidePopover();
        return;
      }

      // show immediately, then render movie (so it feels snappy)
      showPopover();
      await ensureMovieRendered();
      positionPopover(); // adjust after content changes height
    });

    window.addEventListener("scroll", () => {
      if (pop.classList.contains("show")) positionPopover();
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (pop.classList.contains("show")) positionPopover();
    });

    document.addEventListener("click", (e) => {
      if (e.target !== link && pop.classList.contains("show")) hidePopover();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && pop.classList.contains("show")) hidePopover();
    });
  })();
</script>
