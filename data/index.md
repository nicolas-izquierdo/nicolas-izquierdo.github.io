---
title: "Data"
layout: page
---

<style>
/* Wrapper with subtle left + top breathing room */
.data-wrapper {
  padding-left: 5px;  
  padding-right: 20px;
  padding-top: 45px;    
  max-width: 900px;
  margin: auto;
}

/* Card grid */
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px;
}

.card h3 {
  margin: 0 0 6px 0;
  font-size: 1.05rem;
}

.badge {
  display: inline-block;
  font-size: .78rem;
  padding: 2px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  margin-right: 6px;
}

.meta {
  font-size: .86rem;
  color: #6b7280;
  margin: 6px 0 10px;
}

.actions a {
  display: inline-block;
  margin-right: 8px;
  padding: 6px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  text-decoration: none;
}

.actions a:hover {
  background: #f9fafb;
}
</style>

<div class="data-wrapper">

Here you can find some (hopefully useful) datasets I have collected and maintain.

<div class="data-grid">

  <div class="card">
    <h3>Spanish Constitutional Court Amparo Dataset</h3>
    <div class="meta">Scope: 1980–2025 · 7,434 rulings</div>
    <div class="meta">judicial behavior, constitutional courts, Spain</div>
    <span class="badge">.rds</span>
    <span class="badge">Docs</span>
    <p>This dataset covers the full universe of <em>amparo</em> rulings issued by the Spanish Constitutional Court since its inception until June 2025, with each observation providing structured case-level data on parties, constitutional rights, outcomes, and dissenting opinions, together with the ruling's full text.</p>
    <div class="actions">
      <a href="https://doi.org/10.17605/OSF.IO/2A4WG" target="_blank">⬇ Download</a>
      <a href="./codebook-amparo.pdf">📄 Codebook</a>
    </div>
  </div>

</div>

</div>
