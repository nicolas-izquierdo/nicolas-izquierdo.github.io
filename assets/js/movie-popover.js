<script>
document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("movie-trigger");
  const card = document.getElementById("movie-card");
  if (!trigger || !card) return;

  const MOVIES_JSON_PATH = "/covers_movies/movies.json";

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

  function hashStringToInt(s) {
    let h = 2166136261;
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

  function positionPopover() {
    const r = trigger.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // default: to the right of the link
    let left = scrollX + r.left;
    let top  = scrollY + r.bottom + 8;

    // if there isn't room on the right, align to left edge but keep inside viewport
    const maxLeft = scrollX + document.documentElement.clientWidth - card.offsetWidth - 12;
    left = Math.min(left, maxLeft);
    left = Math.max(left, scrollX + 12);

    card.style.left = left + "px";
    card.style.top  = top  + "px";
  }

  function renderMovie(movie) {
    let displayTitle = (movie.id_with_year || "").trim();
    if (!displayTitle) {
      const id = (movie.id || "Untitled").trim();
      const y = (movie.year || "").trim();
      displayTitle = y ? `${id} (${y})` : id;
    }

    const link = movie.url || "";
    const desc = movie.description || "";
    const imgFile = movie.image_file || "";
    const poster = imgFile ? coverPath(imgFile) : "";

    card.innerHTML = `
      <div class="movie-top">
        <p class="movie-card-header">Today’s movie recommendation!</p>
        <button class="movie-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="movie-card-grid">
        ${poster
          ? `<img class="movie-poster" src="${poster}" alt="Poster for ${escapeHtml(displayTitle)}" loading="lazy">`
          : `<div class="movie-poster" aria-hidden="true"></div>`
        }
        <div>
          <p class="movie-title">${escapeHtml(displayTitle)}</p>
          ${link ? `<p class="movie-link"><a href="${escapeHtml(link)}" target="_blank" rel="noopener">Link</a></p>` : ""}
          ${desc ? `<p class="movie-desc">${escapeHtml(desc)}</p>` : ""}
        </div>
      </div>
      <div class="movie-note">Selection updates daily.</div>
    `;

    card.querySelector(".movie-close").addEventListener("click", closePopover);
  }

  async function loadAndPickMovie() {
    const res = await fetch(MOVIES_JSON_PATH, { cache: "no-store" });
    if (!res.ok) throw new Error(`Could not load ${MOVIES_JSON_PATH} (HTTP ${res.status})`);
    const movies = await res.json();
    if (!Array.isArray(movies) || movies.length === 0) throw new Error("movies.json empty or not an array.");

    const idx = hashStringToInt(ymdLocal()) % movies.length;
    return movies[idx];
  }

  let loaded = false;
  let loading = false;

  function openPopover() {
    card.style.display = "block";
    positionPopover();
    window.addEventListener("scroll", positionPopover, { passive: true });
    window.addEventListener("resize", positionPopover);
    document.addEventListener("mousedown", outsideClick);
  }

  function closePopover() {
    card.style.display = "none";
    window.removeEventListener("scroll", positionPopover);
    window.removeEventListener("resize", positionPopover);
    document.removeEventListener("mousedown", outsideClick);
  }

  function outsideClick(e) {
    if (card.contains(e.target) || trigger.contains(e.target)) return;
    closePopover();
  }

  trigger.addEventListener("click", async (ev) => {
    ev.preventDefault();

    if (card.style.display === "block") { closePopover(); return; }
    openPopover();

    if (loaded || loading) return;
    loading = true;

    card.innerHTML = `
      <div class="movie-top">
        <p class="movie-card-header">Today’s movie recommendation!</p>
        <button class="movie-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="movie-note">Loading…</div>
    `;
    card.querySelector(".movie-close").addEventListener("click", closePopover);

    try {
      const movie = await loadAndPickMovie();
      renderMovie(movie);
      loaded = true;
      positionPopover();
    } catch (e) {
      card.innerHTML = `
        <div class="movie-top">
          <p class="movie-card-header">Today’s movie recommendation!</p>
          <button class="movie-close" type="button" aria-label="Close">×</button>
        </div>
        <p class="movie-desc">Couldn’t load the movie list.</p>
        <div class="movie-note">${escapeHtml(e.message || e)}</div>
      `;
      card.querySelector(".movie-close").addEventListener("click", closePopover);
      console.error(e);
    } finally {
      loading = false;
    }
  });
});
</script>
