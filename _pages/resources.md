---
layout: page
title: labor
permalink: /labor/
description:
nav: true
nav_order: 5
hide_title: true
---

<p class="lead mb-4">
  A curated collection of datasets, reading lists, and archival sources for research in <span style="color: var(--global-theme-color)">labor politics</span>.
</p>

{% assign categories = "data,reading,archives" | split: "," %}
{% assign category_labels = "Data,Reading,Archives" | split: "," %}

{% for i in (0..2) %}
  {% assign cat = categories[i] %}
  {% assign label = category_labels[i] %}
  {% assign items = site.data.resources | where: "category", cat %}
  {% if items.size > 0 %}
<h2 class="resources-section-heading mt-5 mb-3">{{ label }}</h2>
<div class="row">
  {% for item in items %}
  <div class="col-12 col-md-6 col-lg-4 mb-3">
    <div class="card h-100 resources-card">
      <div class="card-body">
        <h5 class="card-title resources-card-title mb-0">
          <a href="{{ item.url }}" target="_blank" rel="noopener">
            {{ item.title }}&thinsp;<i class="fa-solid fa-arrow-up-right-from-square fa-xs resources-ext-icon"></i>
          </a>
        </h5>
      </div>
    </div>
  </div>
  {% endfor %}
</div>
  {% endif %}
{% endfor %}
