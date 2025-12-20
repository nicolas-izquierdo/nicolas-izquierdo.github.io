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
  historical and political cinema
</a>
and <a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.

<div id="movie-card" style="display:none;"></div>

You can find my full CV [here](/CV-nicolas-izquierdo-11-25.pdf).

<!-- ================= MOVIE POPOVER (SELF-CONTAINED) ================= -->
<style>
#movie-card{
  position:absolute;
  z-index:9999;
  width:520px;
  max-width:calc(100vw - 24px);
  background:#fff;
  border:1px solid rgba(0,0,0,.12);
  border-radius:14px;
  padding:14px;
  box-shadow:0 10px 28px rgba(0,0,0,.14);
}
#movie-card header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-weight:700;
  margin-bottom:10px;
}
#movie-card button{
  border:1px solid rgba(0,0,0,.15);
  background:#fff;
  border-radius:8px;
  width:32px;height:32px;
  cursor:pointer;
  font-size:18px;
  line-height:30px;
}
#movie-card .grid{
  display:grid;
  grid-template-columns:110px 1fr;
  gap:12px;
}
#movie-card img{
  width:110px;height:160px;
  object-fit:cover;
  border-radius:10px;
  border:1px solid rgba(0,0,0,.1);
  background:#f2f2f2;
}
#movie-card .title{font-weight:700;margin:0 0 6px 0;}
#movie-card a{color:#1a73e8;text-decoration:none;}
#movie-card a:hover{text-decoration:underline;}
#movie-card p{margin:0;font-size:.95rem;color:rgba(0,0,0,.82);}
#movie-card .meta p + p{margin-top:6px;}
</style>

<script>
(function(){
  const trigger = document.getElementById("movie-trigger");
  const card = document.getElementById("movie-card");

  // ✅ YOUR REAL PATHS
  const JSON_PATH = "/movies/movies.json";
  const IMG_BASE  = "/movies/";

  let moviesCache = null;
  let prefetched = false;

  function pickIndex(n){
    // stable per local day
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth()+1).padStart(2,"0");
    const dd = String(d.getDate()).padStart(2,"0");
    const s = `${yyyy}-${mm}-${dd}`;

    let h = 0;
    for (let i=0;i<s.length;i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h % n;
  }

  function position(){
    const r = trigger.getBoundingClientRect();
    let left = window.scrollX + r.left;
    let top  = window.scrollY + r.bottom + 8;

    card.style.left = left + "px";
    card.style.top  = top  + "px";

    // keep in viewport
    const rect = card.getBoundingClientRect();
    const overflowRight = rect.right - window.innerWidth;
    if (overflowRight > 12) card.style.left = (left - overflowRight - 12) + "px";
    if (rect.left < 12) card.style.left = (window.scrollX + 12) + "px";
  }

  function close(){
    card.style.display = "none";
    document.removeEventListener("mousedown", outside);
    window.removeEventListener("resize", position);
    window.removeEventListener("scroll", position, true);
  }

  function outside(e){
    if (card.contains(e.target) || trigger.contains(e.target)) return;
    close();
  }

  async function loadMovies(){
    if (moviesCache) return moviesCache;

    const res = await fetch(JSON_PATH, { cache:"no-store" });
    if (!res.ok) throw new Error(`Could not load ${JSON_PATH} (HTTP ${res.status})`);

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("movies.json empty or invalid array");
    }

    moviesCache = data;
    return moviesCache;
  }

  function titleFor(m){
    if (m.id_with_year && String(m.id_with_year).trim()) return m.id_with_year;
    const base = m.id || "Untitled";
    return (m.year && String(m.year).trim()) ? `${base} (${m.year})` : base;
  }

  function imgFor(m){
    if (m.image_file && String(m.image_file).trim()){
      // encode only filename
      return IMG_BASE + encodeURIComponent(String(m.image_file));
    }
    if (m.image_url && String(m.image_url).trim()){
      return m.image_url;
    }
    return "";
  }

  async function prefetch(){
    if (prefetched) return;
    prefetched = true;

    try{
      const movies = await loadMovies();
      const m = movies[pickIndex(movies.length)];
      const src = imgFor(m);
      if (src){
        const img = new Image();
        img.src = src;
      }
    } catch (_) {}
  }

  async function open(){
    const movies = await loadMovies();
    const m = movies[pickIndex(movies.length)];

    const title = titleFor(m);
    const imgSrc = imgFor(m);
    const url = (m.url && String(m.url).trim()) ? m.url : "#";
    const description = (m.description && String(m.description).trim()) ? m.description : "";

    card.innerHTML = `
      <header>
        <span>Today’s movie recommendation!</span>
        <button id="close-movie" aria-label="Close">×</button>
      </header>
      <div class="grid">
        ${imgSrc ? `<img src="${imgSrc}" alt="${title}" loading="eager" decoding="async">` : ``}
        <div class="meta">
          <p class="title">${title}</p>
          <p><a href="${url}" target="_blank" rel="noopener noreferrer">Link</a></p>
          ${description ? `<p>${description}</p>` : ``}
        </div>
      </div>
    `;

    document.getElementById("close-movie").onclick = close;

    card.style.display = "block";
    position();

    document.addEventListener("mousedown", outside);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
  }

  // Prefetch makes it feel instant
  window.addEventListener("load", prefetch);
  trigger.addEventListener("mouseenter", prefetch);

  trigger.addEventListener("click", function(e){
    e.preventDefault();
    if (card.style.display === "block") { close(); return; }

    open().catch(err => {
      card.innerHTML = `
        <header>
          <span>Today’s movie recommendation!</span>
          <button id="close-movie" aria-label="Close">×</button>
        </header>
        <p style="margin:0;font-size:.95rem;color:rgba(0,0,0,.82);">
          Couldn’t load the movie list.<br>
          ${String(err && err.message ? err.message : err)}
        </p>
      `;
      document.getElementById("close-movie").onclick = close;
      card.style.display = "block";
      position();
    });
  });
})();
</script>
<!-- ================================================================ -->
