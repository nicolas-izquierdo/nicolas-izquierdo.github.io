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

Outside academia, I enjoy social and political <a href="#" id="cinema-link" class="poplink" aria-haspopup="dialog" aria-expanded="false">cinema</a>
and <a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.


You can find my full CV [here](/CV-nicolas-izquierdo-11-25.pdf).

<div id="cinema-pop" class="popover" role="dialog" aria-hidden="true">
  <div class="popover-inner">CINEMA</div>
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
    font-weight:700;
    letter-spacing:.08em;
    font-size:12px;
    padding:10px 12px;
    border-radius:12px;
    box-shadow:0 10px 30px rgba(0,0,0,.25);
    position:relative;
    text-transform:uppercase;
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
</style>

<script>
  (function () {
    const link = document.getElementById("cinema-link");
    const pop = document.getElementById("cinema-pop");

    function showPopover() {
      const r = link.getBoundingClientRect();
      const x = r.left + (r.width / 2);
      const y = r.top - 12;

      pop.style.left = `${x}px`;
      pop.style.top = `${y}px`;
      pop.classList.add("show");
      pop.setAttribute("aria-hidden", "false");
      link.setAttribute("aria-expanded", "true");
    }

    function hidePopover() {
      pop.classList.remove("show");
      pop.setAttribute("aria-hidden", "true");
      link.setAttribute("aria-expanded", "false");
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (pop.classList.contains("show")) hidePopover();
      else showPopover();
    });

    window.addEventListener("scroll", () => {
      if (pop.classList.contains("show")) showPopover();
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (pop.classList.contains("show")) showPopover();
    });

    document.addEventListener("click", (e) => {
      if (e.target !== link && pop.classList.contains("show")) hidePopover();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && pop.classList.contains("show")) hidePopover();
    });
  })();
</script>


