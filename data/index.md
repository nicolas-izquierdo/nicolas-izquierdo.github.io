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

/* Modern card style (light green accent) */
.card {
  background: #ffffff;
  border-radius: 10px;
  border-left: 4px solid #6ee7b7; /* light green */
  padding: 1.4rem 1.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.07);
}

/* Card title */
.card h3 {
  margin: 0 0 8px 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: #000000;
  line-height: 1.35;
}

/* Badges (kept, but slightly modernized) */
.badge {
  display: inline-block;
  font-size: .78rem;
  padding: 2px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  margin-right: 6px;
}

/* Meta text */
.meta {
  font-size: 0.9rem;
  color: #000000;
  margin: 6px 0 10px;
}

/* Actions (button-like, light green) */
.actions a {
  display: inline-block;
  margin-right: 10px;
  margin-top: 6px;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  background: #6ee7b7;  /* light green */
  color: #000000;
  text-decoration: none;
  transition: background 0.2s ease;
}

.actions a:hover {
  background: #34d399; /* slightly darker green */
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
      <a href="/data/codebook_amparo_dataset.pdf" target="_blank">📄 Codebook</a>
    </div>
  </div>

</div>

</div>
