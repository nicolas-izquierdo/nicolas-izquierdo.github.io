---
permalink: /
title: "Nicolás Izquierdo – Political Scientist"
description: "Official academic profile of Nicolás Izquierdo, Master's student in Social Sciences at IC3JM, with degrees in Law and Political Science from UC3M."
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<h1 style="
  position:absolute;
  left:-9999px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;
">
  Nicolás Izquierdo, Political Science, Political Scientist, Political Economy
</h1>

<figure style="margin:0;">
  <img src="marx-painting-HD.jpg"
       alt="Workers’ Delegation Before the Magistrate by Johann Peter Hasenclever"
       style="width:660px; height:200px; object-fit:cover; display:block;">
  <figcaption style="font-size:0.9em; margin-top:-13px; margin-bottom:20px;">
    <span style="font-style:italic;
                 text-decoration:underline;
                 text-decoration-skip-ink:auto;">
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
<a href="javascript:void(0)" id="movie-trigger" style="text-decoration: underline;">historical and political cinema</a>
and <a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.

<div id="movie-card" class="movie-card" aria-live="polite" style="display:none;"></div>


You can find my full CV [here](/CV-nicolas-izquierdo-11-25.pdf).

<style>
  .movie-card{
    margin-top: 14px;
    max-width: 720px;
    border: 1px solid rgba(0,0,0,.10);
    border-radius: 14px;
    padding: 14px 16px;
    box-shadow: 0 6px 18px rgba(0,0,0,.08);
    background: #fff;
  }
  .movie-card-header{
    font-weight: 700;
    font-size: 1.02rem;
    margin-bottom: 10px;
  }
  .movie-card-grid{
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 14px;
    align-items: start;
  }
  .movie-poster{
    width: 120px;
    height: 175px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,.10);
    background: rgba(0,0,0,.03);
    display: block;
  }
  .movie-title{
    font-weight: 700;
    font-size: 1.05rem;
    line-height: 1.25;
    margin: 0 0 6px 0;
  }
  .movie-link{
    margin: 0 0 8px 0;
    font-size: 0.95rem;
  }
  .movie-link a{
    color: #1a73e8;
    text-decoration: none;
  }
  .movie-link a:hover{
    text-decoration: underline;
  }
  .movie-desc{
    margin: 0;
    font-size: 0.96rem;
    line-height: 1.35;
    color: rgba(0,0,0,.78);
  }
  .movie-note{
    margin-top: 10px;
    font-size: 0.86rem;
    color: rgba(0,0,0,.55);
  }

  /* Small screens */
  @media (max-width: 520px){
    .movie-card-grid{ grid-template-columns: 92px 1fr; }
    .movie-poster{ width: 92px; height: 134px; }
  }
</style>

<script>
  (function () {
    const trigger = document.getElementById("movie-trigger");
    const card = document.getElementById("movie-card");

    // Adjust if your JSON path is different
    const MOVIES_JSON_PATH = "/covers_movies/movies.json";

    // Covers are in the same folder as movies.json (as you said)
    function coverPath(imageFile) {
      return "/covers_movies/" + encodeURIComponent(imageFile);
    }

    function ymdLocal() {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }

    // Simple deterministic "hash" from date string -> integer
    function hashStringToInt(s) {
      let h = 2166136261; // FNV-ish
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return (h >>> 0);
    }

    function escapeHtml(str) {
      return String(str ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function renderMovie(movie) {
      const title = movie.id_with_year?.trim()
        ? movie.id_with_year.trim()
        : (movie.id?.trim() ? movie.id.trim() : "Untitled");

      // If you ever have id_with_year missing, build "Title (Year)" only if year exists
      let displayTitle = title;
      if (!movie.id_with_year && movie.id) {
        const y = (movie.year || "").trim();
        displayTitle = y ? `${movie.id} (${y})` : movie.id;
      }

      const link = movie.url || "";
      const desc = movie.description || "";
      const imgFile = movie.image_file || "";
      const poster = imgFile ? coverPath(imgFile) : "";

      const posterHtml = poster
        ? `<img class="movie-poster" src="${poster}" alt="Poster for ${escapeHtml(displayTitle)}" loading="lazy">`
        : `<div class="movie-poster" aria-hidden="true"></div>`;

      card.innerHTML = `
        <div class="movie-card-header">Today’s movie recommendation!</div>
        <div class="movie-card-grid">
          ${posterHtml}
          <div>
            <p class="movie-title">${escapeHtml(displayTitle)}</p>
            ${link ? `<p class="movie-link"><a href="${escapeHtml(link)}" target="_blank" rel="noopener">Link</a></p>` : ""}
            ${desc ? `<p class="movie-desc">${escapeHtml(desc)}</p>` : ""}
          </div>
        </div>
        <div class="movie-note">Selection updates daily.</div>
      `;
    }

    async function loadAndPickMovie() {
      const res = await fetch(MOVIES_JSON_PATH, { cache: "no-store" });
      if (!res.ok) throw new Error(`Could not load ${MOVIES_JSON_PATH}`);
      const movies = await res.json();

      if (!Array.isArray(movies) || movies.length === 0) {
        throw new Error("movies.json is empty or not an array.");
      }

      const today = ymdLocal();
      const idx = hashStringToInt(today) % movies.length;
      return movies[idx];
    }

    let loaded = false;
    let loading = false;

    trigger.addEventListener("click", async () => {
      // Toggle close if open
      if (card.style.display === "block") {
        card.style.display = "none";
        return;
      }

      card.style.display = "block";

      if (loaded || loading) return;
      loading = true;

      try {
        card.innerHTML = `<div class="movie-card-header">Today’s movie recommendation!</div><div class="movie-note">Loading…</div>`;
        const movie = await loadAndPickMovie();
        renderMovie(movie);
        loaded = true;
      } catch (e) {
        card.innerHTML = `
          <div class="movie-card-header">Today’s movie recommendation!</div>
          <p class="movie-desc">Couldn’t load the movie list. Please check the JSON path and GitHub Pages build.</p>
          <div class="movie-note">${escapeHtml(e.message || e)}</div>
        `;
      } finally {
        loading = false;
      }
    });
  })();
</script>

