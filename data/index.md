---
title: "Data"
layout: page
---

<style>
/* Center container slightly with left padding */
.data-wrapper {
  padding-left: 40px;
  padding-right: 20px;
  max-width: 900px;
  margin: auto;
}

/* Card grid */
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 8px;
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

Here you can find datasets I have collected and maintain.

<div class="data-grid">

  <div class="card">
    <h3>Spanish Constitutional Court Amparo Dataset (v2025-10)</h3>
    <div class="meta">Scope: 1981–2025 · 7,434 decisions</div>
    <span class="badge">CSV</span>
    <span class="badge">Docs</span>
    <p>Case-level data on <em>amparo</em> rulings (rights, outcomes, dissents, litigants, metadata).</p>
    <div class="actions">
      <a href="./dataset-amparo.csv" download>⬇ Download CSV</a>
      <a href="./codebook-amparo.pdf">📄 Codebook</a>
      <a href="./sample-10rows.csv">👁 Preview (10 rows)</a>
    </div>
  </div>

</div>

</div>
