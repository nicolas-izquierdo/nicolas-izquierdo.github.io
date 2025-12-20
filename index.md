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
.main-text a:visited {
  color: #6495ED;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}
.main-text a:hover,
.main-text a:focus {
  color: #6495ED;
}
.main-text a:active {
  color: #6495ED;
}

/* Cinema box */
#cinema-box {
  display: none;
  margin: 10px 0 10px 0;
  padding: 14px;
  border: 1px solid rgba(0,0,0,.14);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 26px rgba(0,0,0,.10);
  max-width: 620px;
}

#cinema-box .row {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

#cinema-box img {
  width: 120px;   /* mid size, fixed */
  height: 180px;  /* mid size, fixed */
  object-fit: cover;
  border-radius: 12px;
  background: #f2f2f2;
  flex: 0 0 auto;
}

#cinema-box .meta {
  flex: 1 1 auto;
  min-width: 0;
}

#cinema-box .title {
  margin: 0 0 8px 0;
  font-size: 1.05rem;
  line-height: 1.25;
}

#cinema-box .title a {
  color: #6495ED;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

#cinema-box .desc {
  margin: 0;
  opacity: .88;
  font-size: .96rem;
  line-height: 1.4;
}

#cinema-box .actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

#cinema-close {
  border: 1px solid rgba(0,0,0,.18);
  background: #fff;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: .9rem;
  cursor: pointer;
}

#cinema-status {
  font-size: .9rem;
  opacity: .75;
}
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

<!-- Cinema box (we move it ABOVE the link with JS) -->
<div id="cinema-box" role="region" aria-live="polite">
  <div class="row">
    <img id="cinema-cover" alt="" decoding="async" loading="eager">
    <div class="meta">
      <h3 class="title">
        <a id="cinema-movie-link" href="#" target="_blank" rel="noopener noreferrer"></a>
      </h3>
      <p class="desc" id="cinema-desc"></p>
      <div class="actions">
        <button id="cinema-close" type="button">Close</button>
        <span id="cinema-status"></span>
      </div>
    </div>
  </div>
</div>

<p>
You can find my full CV <a href="/CV-nicolas-izquierdo-11-25.pdf">here</a>.
</p>

</div>

<script>
(function () {
  // Rutas: JSON en /movies/movies.json y las imágenes en /movies/<image_file>
  var JSON_URL = "/movies/movies.json";
  var IMG_BASE = "/movies/";

  var link = document.getElementById("political-cinema-link");
  var box = document.getElementById("cinema-box");
  var cover = document.getElementById("cinema-cover");
  var movieLink = document.getElementById("cinema-movie-link");
  var desc = document.getElementById("cinema-desc");
  var closeBtn = document.getElementById("cinema-close");
  var statusEl = document.getElementById("cinema-status");

  var cache = null;

  function placeBoxAboveLink() {
    var p = link.parentElement; // el <p> del texto
    if (p && box.parentElement !== p) {
      p.insertBefore(box, link); // queda justo antes del enlace
    }
  }

  function seedYYYYMMDDLocal() {
    // usa la FECHA LOCAL del visitante (Madrid en tu caso)
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function hashToIndex(s, n) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return n ? (h % n) : 0;
  }

  function pickMovie(movies) {
    var idx = hashToIndex(seedYYYYMMDDLocal(), movies.length);
    return movies[idx];
  }

  function movieTitle(m) {
    if (m.id_with_year && String(m.id_with_year).trim()) return m.id_with_year;
    var base = (m.id || "Untitled");
    return m.year ? (base + " (" + m.year + ")") : base;
  }

  function imgSrc(m) {
    if (m.image_file && String(m.image_file).trim()) return IMG_BASE + m.image_file;
    if (m.image_url && String(m.image_url).trim()) return m.image_url;
    return "";
  }

  function showLoading() {
    statusEl.textContent = "Loading…";
    box.style.display = "block";
  }

  function clearStatus() {
    statusEl.textContent = "";
  }

  function showMovie(m) {
    var title = movieTitle(m);
    var href = (m.url && String(m.url).trim()) ? m.url : "#";

    movieLink.textContent = title;
    movieLink.href = href;

    desc.textContent = m.description ? m.description : "";
    desc.style.display = m.description ? "" : "none";

    var src = imgSrc(m);
    if (src) {
      // para que sea instantáneo al abrir: asignamos src directo
      cover.src = src;
      cover.alt = title;
    } else {
      cover.removeAttribute("src");
      cover.alt = "";
    }

    clearStatus();
    box.style.display = "block";
  }

  function showError(msg) {
    movieLink.textContent = "Could not load political cinema";
    movieLink.href = "#";
    desc.style.display = "";
    desc.textContent = msg;
    cover.removeAttribute("src");
    cover.alt = "";
    statusEl.textContent = "";
    box.style.display = "block";
  }

  function loadJSON(cb) {
    if (cache) return cb(null, cache);

    fetch(JSON_URL, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status + " for " + JSON_URL);
        return res.json();
      })
      .then(function (data) {
        if (!Array.isArray(data) || data.length === 0) throw new Error("movies.json empty or invalid");
        cache = data;
        cb(null, cache);
      })
      .catch(function (err) {
        cb(err);
      });
  }

  // Click handler
  link.addEventListener("click", function (e) {
    e.preventDefault();
    placeBoxAboveLink();

    // toggle: si ya está abierto, ciérralo
    if (box.style.display === "block") {
      box.style.display = "none";
      return;
    }

    showLoading();
    loadJSON(function (err, movies) {
      if (err) {
        showError(String(err && err.message ? err.message : err));
        return;
      }
      var m = pickMovie(movies);
      showMovie(m);
    });
  });

  closeBtn.addEventListener("click", function () {
    box.style.display = "none";
  });

  // Cerrar al clicar fuera
  document.addEventListener("click", function (e) {
    if (box.style.display !== "block") return;
    var inside = box.contains(e.target) || e.target === link;
    if (!inside) box.style.display = "none";
  });

  // ESC para cerrar
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") box.style.display = "none";
  });
})();
</script>
