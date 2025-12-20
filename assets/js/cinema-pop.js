window.__CINEMA_SCRIPT_LOADED__ = true;

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
    pop.className = "popover";
    pop.setAttribute("role","dialog");
    pop.setAttribute("aria-hidden","true");
    pop.innerHTML = `
      <div class="popover-inner" id="cinema-pop-content">
        <div class="pop-title">Today’s movie</div>
        <div class="pop-loading">Loading…</div>
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
    cachedKey = key;
    cachedMovie = movies[dayIndexUTC() % movies.length];
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

  async function renderMovie(){
    const content = document.getElementById("cinema-pop-content");
    if (!content) return;

    content.innerHTML = `<div class="pop-title">Today’s movie</div><div class="pop-loading">Loading…</div>`;
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

  document.addEventListener("click", async (e) => {
    const linkEl = e.target.closest ? e.target.closest("#cinema-link") : null;
    const pop = document.getElementById("cinema-pop");

    if (linkEl) {
      e.preventDefault();
      const p = ensurePopover();
      if (p.classList.contains("show")) { hide(p); return; }
      show(p, linkEl);
      await renderMovie();
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
