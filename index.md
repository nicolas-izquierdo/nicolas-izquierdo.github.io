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

Outside academia, I enjoy <a href="#" id="movie-trigger" style="text-decoration:underline;cursor:pointer;color:inherit;">social and political cinema</a> and <a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.

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
}
#movie-card .title{font-weight:700;margin:0 0 6px 0;}
#movie-card a{color:#1a73e8;text-decoration:none;}
#movie-card a:hover{text-decoration:underline;}
#movie-card p{margin:0;font-size:.95rem;color:rgba(0,0,0,.8);}
</style>

<script>
(function(){
  const trigger = document.getElementById("movie-trigger");
  const card = document.getElementById("movie-card");
  const JSON_PATH = "/covers_movies/movies.json";

  function pickIndex(n){
    const d = new Date().toISOString().slice(0,10);
    let h = 0;
    for(const c of d) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return h % n;
  }

  function position(){
    const r = trigger.getBoundingClientRect();
    card.style.left = (window.scrollX + r.left) + "px";
    card.style.top  = (window.scrollY + r.bottom + 8) + "px";
  }

  function close(){
    card.style.display = "none";
    document.removeEventListener("mousedown", outside);
  }

  function outside(e){
    if(card.contains(e.target) || trigger.contains(e.target)) return;
    close();
  }

  async function open(){
    const res = await fetch(JSON_PATH, {cache:"no-store"});
    const movies = await res.json();
    const m = movies[pickIndex(movies.length)];

    const title = m.id_with_year || (m.year ? `${m.id} (${m.year})` : m.id);

    card.innerHTML = `
      <header>
        <span>Today’s movie recommendation!</span>
        <button id="close-movie">×</button>
      </header>
      <div class="grid">
        <img src="/covers_movies/${encodeURIComponent(m.image_file)}">
        <div>
          <p class="title">${title}</p>
          <p><a href="${m.url}" target="_blank">Link</a></p>
          <p>${m.description}</p>
        </div>
      </div>
    `;

    document.getElementById("close-movie").onclick = close;
    card.style.display = "block";
    position();
    document.addEventListener("mousedown", outside);
  }

  trigger.addEventListener("click", function(e){
    e.preventDefault();
    card.style.display === "block" ? close() : open();
  });
})();
</script>
<!-- ================================================================ -->
