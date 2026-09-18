---
layout: page
permalink: /research/
title: research
description:
nav: true
nav_order: 2
hide_title: true
medium_zoom: true # bibliography preview images are zoomable; see scripts.liquid
---

<div class="research-hero">
  {% comment %}
    The -480/-800/-1400.webp variants are generated at build time by jekyll-imagemagick from
    the JPEG (see `imagemagick:` in _config.yml). The hero renders at most 900px wide.
  {% endcomment %}
  <picture>
    <source
      type="image/webp"
      srcset="{{ '/assets/img/hero_hasenclever-480.webp' | relative_url }} 480w, {{ '/assets/img/hero_hasenclever-800.webp' | relative_url }} 800w, {{ '/assets/img/hero_hasenclever-1400.webp' | relative_url }} 1400w"
      sizes="(min-width: 930px) 900px, 95vw"
    />
    <img
      src="{{ '/assets/img/hero_hasenclever.jpg' | relative_url }}"
      class="research-hero-img"
      alt="Workers' Delegation Before the Magistrate, Johann Peter Hasenclever (1848)"
    />
  </picture>
  <p class="research-hero-caption"><span class="hero-caption-title">Workers&#8217; Delegation Before the Magistrate</span>, J.&#8202;P. Hasenclever (1848).</p>
</div>

<div class="publications">

<h2 class="bibliography-section">Book Chapters</h2>
{% bibliography --query @incollection %}


</div>
