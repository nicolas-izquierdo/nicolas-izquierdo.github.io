---
layout: page
permalink: /research/
title: research
description:
nav: true
nav_order: 2
hide_title: true
---

<div class="research-hero">
  <img
    src="{{ '/assets/img/hero_hasenclever.jpg' | relative_url }}"
    class="research-hero-img"
    alt="Workers' Delegation Before the Magistrate, Johann Peter Hasenclever (1848)"
  />
  <p class="research-hero-caption"><span class="hero-caption-title">Workers&#8217; Delegation Before the Magistrate</span>, J.&#8202;P. Hasenclever (1848).</p>
</div>

<div class="publications">

<h2 class="bibliography-section">Book Chapters</h2>
{% bibliography --query @incollection %}

<h2 class="bibliography-section">Working Papers</h2>
{% bibliography --query @unpublished %}

</div>
