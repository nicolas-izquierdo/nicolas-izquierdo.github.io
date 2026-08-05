---
layout: page
title: data
permalink: /data/
description:
nav: true
nav_order: 4
horizontal: false
hide_title: true
---

<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
<div class="row row-cols-1 row-cols-md-2">
  {% for project in sorted_projects %}
    {% include projects.liquid %}
  {% endfor %}
</div>
</div>
