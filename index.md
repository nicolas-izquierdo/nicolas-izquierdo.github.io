---
permalink: /
title: "Nicolás Izquierdo – Political Scientist"
description: "Official academic profile of Nicolás Izquierdo, Master's student in Social Sciences at IC3JM, with degrees in Law and Political Science from UC3M."
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<style>
/* Links ONLY for main text */
.main-text a,
.main-text a:visited{
  color:#6495ED;
  text-decoration:underline;
  text-decoration-thickness:1px;
  text-underline-offset:2px;
}
.main-text a:hover,
.main-text a:focus{
  color:#6495ED;
  text-decoration:underline;
}
.main-text a:active{ color:#6495ED; }

/* ---- Political cinema box ---- */
#cinema-popover{
  display:none;
  margin:10px 0 10px 0;
  padding:14px 14px;
  border:1px solid rgba(0,0,0,.12);
  border-radius:14px;
  background:#fff;
  box-shadow:0 10px 28px rgba(0,0,0,.10);
  max-width:620px;
}

#cinema-popover .cinema-row{
  display:flex;
  gap:14px;
  align-items:flex-start;
}

#cinema-popover img{
  width:120px;      /* fixed => all the same */
  height:180px;     /* fixed => all the same */
  object-fit:cover;
  border-radius:12px;
  flex:0 0 auto;
  background:#f2f2f2;
}

#cinema-popover .cinema-meta{
  flex:1 1 auto;
  min-width:0;
}

#cinema-popover .cinema-title{
  margin:0 0 8px 0;
  font-size:1.06rem;
  line-height:1.25;
}

#cinema-popover .cinema-title a{
  color:#6495ED;
  text-decoration:underline;
  text-decoration-thickness:1px;
  text-underline-offset:2px;
}

#cinema-popover .cinema-desc{
  margin:0;
  opacity:.88;
  font-size:.96rem;
  line-height:1.4;
}

#cinema-popover .cinema-actions{
  margin-top:10px;
  display:flex;
  gap:10px;
  align-items:center;
  flex-wrap:wrap;
}

#cinema-close{
  appearance:none;
  border:1px solid rgba(0,0,0,.16);
  background:#fff;
  border-radius:999px;
  padding:6px 10px;
  font-size:.9rem;
  cursor:pointer;
}
#cinema-close:hover{ border-color:rgba(0,0,0,.30); }
</style>

<h1 style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
  Nicolás Izquierdo, Political Science, Political Scientist, Political Economy
</h1>

<figure style="margin:0;">
  <img src="marx-painting-HD.jpg"
       alt="Workers’ Delegation Before the Magistrate by Johann Peter Hasenclever"
       style="width:660px;height:200px;object-fit:cover;display:block;"
       loading="eager"
       decoding="async">
  <figcaption style="font-size:0.9em;margin-top:-13px;margin-bottom:20px;">
    <span style="font-style:italic;text-decoration:underline;">
      Workers’ Delegation Before the Magistrate</span>
    by Johann Peter Hasenclever
  </figcaption>
</figure>

<div class="main-text">

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
Outside academia, I enjoy social and political cinema —
<a href="#" id="political-cinema-link">political cinema</a> —
and <a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.
</p>

<!-- box (we insert it above the link with JS) -->
<div id="cinema-popover" role="region" aria-live="polite">
  <div class="cinema-row">
    <img id="cinema-cover" alt="" decoding="async">
    <div class="cinema-meta">
      <h3 class="cinema-title">
        <a id="cinema-title-link" href="#" target="_blank" rel="noopener noreferrer"></a>
      </h3>
      <p class="cinema-desc" id="cinema-desc"></p>
      <div class="cinema-actions">
        <button id="cinema-close" type="button">Close</button>
      </div>
    </div>
  </div>
</div>

<p>
You can find my full CV <a href="/CV-nicolas-izquierdo-11-25.pdf">here</a>.
</p>

</div>

<script>
(() => {
  const JSON_URL = "/movies/movies.json";
  const MOVIES_BASE = "/movies/"; // covers live next to movies.json

  const link = document.getElementById("political-cinema-link");
  const popover = document.getElementById("cinema-popover");
  const cover = document.getElementById("cinema-cover");
  const titleLink = document.getElementById("cinema-title-link");
  const desc = document.getElementById("cinema-desc");
  const closeBtn = document.getElementById("cinema-close");

  let moviesCache = null;
  let prefetchedMovie = null;

  function todaySeedUTC() {
    const d = new Date();
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function hashStringToInt(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0);
  }

  function pickDailyMovie(movies) {
    const idx = hashStringToInt(todaySeedUTC()) % movies.length;
    return movies[idx];
  }

  async function loadMovies() {
    if (moviesCache) return moviesCache;
    const res = await fetch(JSON_URL, { cache: "force-cache" });
    if (!res.ok) throw new Error(`Failed to load ${JSON_URL} (${res.status})`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("movies.json is empty or not an array");
    moviesCache = data;
    return moviesCache;
  }

  function imagePath(m) {
    if (m.image_file && String(m.image_file).trim()) return MOVIES_BASE + m.image_file;
    if (m.image_url && String(m.image_url).trim()) return m.image_url;
    return "";
  }

  function niceTitle(m) {
    if (m.id_with_year && String(m.id_with_year).trim()) return m.id_with_year;
    return `${m.id || "Untitled"}${m.year ? ` (${m.year})` : ""}`;
  }

  function placePopoverAboveLink() {
    const parent = link.parentElement;
    if (parent && popover.parentElement !== parent) parent.insertBefore(popover, link);
  }

  function showMovie(m) {
    const title = niceTitle(m);
    const href = (m.url && String(m.url).trim()) ? m.url : "#";

    titleLink.textContent = title;
    titleLink.href = href;

    if (m.description) {
      desc.textContent = m.description;
      desc.style.display = "";
    } else {
      desc.textContent = "";
      desc.style.display = "none";
    }

    const src = imagePath(m);
    if (src) {
      cover.src = src;
      cover.alt = title;
    } else {
      cover.removeAttribute("src");
      cover.alt = "";
    }

    popover.style.display = "block";
  }

  function hidePopover() {
    popover.style.display = "none";
  }

  // Prefetch JSON + today’s cover ASAP (so click feels instant)
  async function prefetch() {
    try {
      const movies = await loadMovies();
      prefetchedMovie = pickDailyMovie(movies);

      const src = imagePath(prefetchedMovie);
      if (src) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
      }
    } catch (_) {
      // ignore; click handler will show error if needed
    }
  }

  prefetch();

  link.addEventListener("click", async (e) => {
    e.preventDefault();
    placePopoverAboveLink();

    if (popover.style.display === "block") { hidePopover(); return; }

    try {
      const movies = await loadMovies();
      const movie = prefetchedMovie || pickDailyMovie(movies);
      showMovie(movie);
    } catch (err) {
      titleLink.textContent = "Could not load political cinema";
      titleLink.href = "#";
      desc.textContent = String(err && err.message ? err.message : err);
      desc.style.display = "";
      cover.removeAttribute("src");
      cover.alt = "";
      popover.style.display = "block";
    }
  });

  closeBtn.addEventListener("click", () => hidePopover());

  document.addEventListener("click", (e) => {
    if (popover.style.display !== "block") return;
    const isInside = popover.contains(e.target) || e.target === link;
    if (!isInside) hidePopover();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hidePopover();
  });
})();
</script>
