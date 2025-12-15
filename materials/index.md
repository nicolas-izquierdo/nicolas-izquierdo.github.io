---
title: "Resources"
layout: page
permalink: /resources/
---

<style>
:root{
  --bg: #0b0f17;
  --panel: rgba(255,255,255,0.06);
  --text: rgba(255,255,255,0.92);
  --muted: rgba(255,255,255,0.70);
  --stroke: rgba(255,255,255,0.14);

  --red:  #ff4d4d;   /* datasets / data / methods / packages */
  --blue: #4da3ff;   /* teaching / syllabi / reading lists */
  --green:#2ecc71;   /* archives / newspapers / historical docs */
  --gray: rgba(255,255,255,0.55);
}

.resources-wrap{
  max-width: 1100px;
  margin: 22px auto 0 auto;
  padding: 0 14px;
  color: var(--text);
}

.resources-hero{
  border: 1px solid var(--stroke);
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
  border-radius: 14px;
  padding: 18px 18px 14px 18px;
  margin-bottom: 14px;
}

.resources-hero h2{
  margin: 0 0 6px 0;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
}
.resources-hero p{
  margin: 0;
  color: var(--muted);
  line-height: 1.45;
}

.legend{
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--stroke);
  color: var(--muted);
  font-size: 0.95rem;
}
.legend .item{ display:flex; align-items:center; gap:8px; }
.dot{
  width: 10px; height: 10px;
  border-radius: 999px;
  display:inline-block;
  box-shadow: 0 0 0 2px rgba(255,255,255,0.10);
}
.dot.red{background:var(--red);}
.dot.blue{background:var(--blue);}
.dot.green{background:var(--green);}
.dot.gray{background:var(--gray);}

.controls{
  display:flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items:center;
  margin: 12px 0 10px 0;
}
.controls input{
  flex: 1 1 340px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,0.06);
  color: var(--text);
  padding: 10px 12px;
  border-radius: 12px;
  outline: none;
}
.controls button{
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,0.06);
  color: var(--text);
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
}
.controls button:hover{ background: rgba(255,255,255,0.10); }

.graph-card{
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,0.04);
  border-radius: 14px;
  overflow: hidden;
}

#graph{
  width: 100%;
  height: 640px;
  display: block;
  background:
    radial-gradient(1200px 500px at 20% 10%, rgba(77,163,255,0.15), transparent 55%),
    radial-gradient(900px 450px at 80% 30%, rgba(46,204,113,0.12), transparent 55%),
    radial-gradient(900px 450px at 60% 90%, rgba(255,77,77,0.10), transparent 55%),
    var(--bg);
}

.tooltip{
  position: absolute;
  pointer-events: none;
  max-width: 420px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--stroke);
  background: rgba(10,14,22,0.92);
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.35;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity .12s ease, transform .12s ease;
}
.tooltip .t-title{ font-weight: 700; margin-bottom: 4px; }
.tooltip .t-desc{ color: var(--muted); margin-bottom: 6px; }
.tooltip .t-url{ color: rgba(255,255,255,0.75); word-break: break-all; }

.note{
  color: var(--muted);
  margin-top: 10px;
  font-size: 0.95rem;
}
</style>

<div class="resources-wrap">
  <div class="resources-hero">
    <h2>Labor politics resources — interactive map</h2>
    <p>
      Drag nodes to explore. Scroll to zoom, click a node to open the resource, and use search to highlight items.
      Colors: data/methods (red), teaching (blue), archives & historical sources (green), unclassified (gray).
    </p>

    <div class="legend">
      <div class="item"><span class="dot red"></span> Datasets / data / methods / R packages</div>
      <div class="item"><span class="dot blue"></span> Teaching / syllabi / reading lists</div>
      <div class="item"><span class="dot green"></span> Archives / newspapers / historical documents</div>
      <div class="item"><span class="dot gray"></span> Unclassified</div>
    </div>
  </div>

  <div class="controls">
    <input id="search" type="text" placeholder="Search (e.g., ‘strike’, ‘union’, ‘Cornell’, ‘archive’, ‘ILO’)…" />
    <button id="reset" type="button">Reset view</button>
  </div>

  <div class="graph-card">
    <svg id="graph" role="img" aria-label="Network of labor politics resources"></svg>
  </div>

  <div class="note">
    Source list compiled from my PDF list.
  </div>
</div>

<div class="tooltip" id="tooltip"></div>

<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>

<script>
/**
 * group:
 *  - "red"   : datasets / data / methods / packages
 *  - "blue"  : teaching / syllabi / reading lists
 *  - "green" : archives / newspapers / historical docs
 *  - "gray"  : unclassified
 */

const resources = [
  // ===== Teaching / syllabi / reading lists (BLUE) =====
  {id:"apsa_labor_teach", label:"APSA Labor Politics – Teaching Resource Collection", group:"blue",
    url:"https://educate.apsanet.org/labor-politics-teaching-resource-collection",
    desc:"Curated teaching materials (syllabi, podcasts) compiled by APSA’s Labor Politics Group."},
  {id:"mit_ocw_ir", label:"MIT OCW – Work, Employment & Industrial Relations Theory", group:"blue",
    url:"https://ocw.mit.edu/courses/15-663j-work-employment-and-industrial-relations-theory-spring-2008/",
    desc:"Graduate-level syllabus + reading list on comparative industrial relations."},
  {id:"lawcha_books", label:"LAWCHA – Twenty Best Labor Books", group:"blue",
    url:"https://lawcha.org/2015/06/08/twenty-best-labor-books-first-cut/",
    desc:"Essay listing influential books on unions and labor history."},
  {id:"boston_review_list", label:"Boston Review – “Solidarity Makes Us Strong” Reading List", group:"blue",
    url:"https://www.bostonreview.net/reading-list/solidarity-makes-us-strong/",
    desc:"Labor Day 2022 reading list on contemporary labor struggles and organizing."},

  // ===== Archives / newspapers / historical documents (GREEN) =====
  {id:"rutgers_laborhistory", label:"Rutgers U.S. Labor & Working-Class History Guide", group:"green",
    url:"https://libguides.rutgers.edu/laborhistory",
    desc:"Research guide with books, journals, media, and archives for U.S. labor history."},
  {id:"cornell_ilr_guide", label:"Cornell ILR – Labor & Employment Research Guide", group:"green",
    url:"https://guides.library.cornell.edu/laborstudies",
    desc:"Catherwood Library guide to collections, bargaining info, and employer research tools."},
  {id:"tamiment", label:"Tamiment Library & Robert F. Wagner Labor Archives (NYU)", group:"green",
    url:"https://guides.nyu.edu/tamiment",
    desc:"Major labor & radical history archive; holds records of many unions and councils."},
  {id:"loc_afl_records", label:"American Federation of Labor Records (Library of Congress)", group:"green",
    url:"https://www.loc.gov/collections/american-federation-of-labor-records/",
    desc:"Large collection (1883–1925) on union formation, charters, bylaws, politics."},
  {id:"aflcio_news", label:"AFL-CIO News archive (1956–1996)", group:"green",
    url:"https://archive.org/details/afl-cio-news",
    desc:"Digitized AFL-CIO newspaper."},
  {id:"cio_news", label:"CIO News archive (1937–1955)", group:"green",
    url:"https://archive.org/details/cio-news",
    desc:"Digitized CIO newspaper issues."},

  // ===== Datasets / data / methods / packages (RED) =====
  {id:"unionstats", label:"UnionStats.com (Hirsch, Macpherson & Even)", group:"red",
    url:"https://unionstats.com/",
    desc:"Annual U.S. union membership + coverage estimates (CPS-based)."},
  {id:"cornell_stats_sources", label:"Cornell ILR – Statistical Sources: Labor & Union Data", group:"red",
    url:"https://guides.library.cornell.edu/StatisticalSources/laborunionstats",
    desc:"Gateway to labor/union datasets and statistical repositories."},
  {id:"bls_wsp", label:"BLS Work Stoppages dataset (US major strikes)", group:"red",
    url:"https://www.bls.gov/wsp/",
    desc:"US major work stoppages (≥1,000 workers): participants, location, days idle."},
  {id:"ilr_lat", label:"Cornell ILR – Labor Action Tracker", group:"red",
    url:"https://striketracker.ilr.cornell.edu/",
    desc:"Database of US strikes & labor protests."},
  {id:"oecd_ictwss", label:"OECD/AIAS ICTWSS database", group:"red",
    url:"https://www.oecd.org/employment/ictwss-database.htm",
    desc:"Cross-national union membership, bargaining coverage, and wage-setting institutions."},

  // ... PEGA AQUÍ EL RESTO DE TUS NODOS (mantén el formato) ...
];

const hubs = [
  {id:"hub_red", label:"DATA / METHODS", group:"red", url:null, desc:"Datasets, indicators, R packages, measurement resources"},
  {id:"hub_blue", label:"TEACHING", group:"blue", url:null, desc:"Syllabi, teaching collections, reading lists"},
  {id:"hub_green", label:"ARCHIVES", group:"green", url:null, desc:"Archives, newspapers, historical documents, primary sources"},
  {id:"hub_gray", label:"UNCATEGORIZED", group:"gray", url:null, desc:"Items not yet classified"}
];

const nodes = hubs.concat(resources);
const links = resources.map(r => {
  const hub =
    r.group === "red" ? "hub_red" :
    r.group === "blue" ? "hub_blue" :
    r.group === "green" ? "hub_green" : "hub_gray";
  return {source: hub, target: r.id};
});

const svg = d3.select("#graph");
const tooltip = d3.select("#tooltip");

const gZoom = svg.append("g");

const zoom = d3.zoom()
  .scaleExtent([0.55, 2.6])
  .on("zoom", (event) => gZoom.attr("transform", event.transform));

svg.call(zoom);

const link = gZoom.append("g")
  .attr("stroke", "rgba(255,255,255,0.14)")
  .attr("stroke-width", 1)
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke-linecap", "round");

const node = gZoom.append("g")
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", d => d.id.startsWith("hub_") ? 16 : 8)
  .attr("fill", d => color(d.group))
  .attr("stroke", "rgba(255,255,255,0.16)")
  .attr("stroke-width", d => d.id.startsWith("hub_") ? 2 : 1)
  .style("cursor", d => d.url ? "pointer" : "grab");

const label = gZoom.append("g")
  .selectAll("text")
  .data(nodes)
  .join("text")
  .text(d => d.label)
  .attr("font-size", d => d.id.startsWith("hub_") ? 12.5 : 11)
  .attr("font-weight", d => d.id.startsWith("hub_") ? 800 : 600)
  .attr("fill", "rgba(255,255,255,0.88)")
  .attr("stroke", "rgba(0,0,0,0.55)")
  .attr("stroke-width", 3)
  .attr("paint-order", "stroke")
  .attr("dx", d => d.id.startsWith("hub_") ? 20 : 14)
  .attr("dy", 4)
  .style("user-select", "none")
  .style("pointer-events", "none");

const sim = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.source.id.startsWith("hub_") ? 90 : 70).strength(0.9))
  .force("charge", d3.forceManyBody().strength(-520))
  .force("center", d3.forceCenter(600, 340))
  .force("collide", d3.forceCollide().radius(d => d.id.startsWith("hub_") ? 30 : 18))
  .on("tick", ticked);

function ticked(){
  link
    .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x).attr("y2", d => d.target.y);

  node.attr("cx", d => d.x).attr("cy", d => d.y);
  label.attr("x", d => d.x).attr("y", d => d.y);
}

function size() {
  const r = svg.node().getBoundingClientRect();
  return { w: Math.max(320, r.width), h: Math.max(420, r.height) };
}

function initOrResize() {
  const { w, h } = size();
  svg.attr("viewBox", `0 0 ${w} ${h}`);
  sim.force("center", d3.forceCenter(w * 0.52, h * 0.52));
  sim.alpha(0.9).restart();
}

window.addEventListener("load", initOrResize);
window.addEventListener("resize", initOrResize);

const drag = d3.drag()
  .on("start", (event, d) => {
    if (!event.active) sim.alphaTarget(0.25).restart();
    d.fx = d.x; d.fy = d.y;
  })
  .on("drag", (event, d) => {
    d.fx = event.x; d.fy = event.y;
  })
  .on("end", (event, d) => {
    if (!event.active) sim.alphaTarget(0);
    d.fx = null; d.fy = null;
  });

node.call(drag);

node
  .on("mousemove", (event, d) => {
    const [x,y] = d3.pointer(event, document.body);
    tooltip
      .style("left", (x + 14) + "px")
      .style("top", (y + 14) + "px")
      .style("opacity", 1)
      .style("transform", "translateY(0px)")
      .html(`
        <div class="t-title">${escapeHtml(d.label)}</div>
        <div class="t-desc">${escapeHtml(d.desc || "")}</div>
        ${d.url ? `<div class="t-url">${escapeHtml(d.url)}</div>` : ``}
      `);
  })
  .on("mouseleave", () => {
    tooltip.style("opacity", 0).style("transform", "translateY(4px)");
  })
  .on("click", (event, d) => {
    if (d.url) window.open(d.url, "_blank", "noopener,noreferrer");
  });

document.getElementById("reset").addEventListener("click", () => {
  svg.transition().duration(350).call(zoom.transform, d3.zoomIdentity);
});

const search = document.getElementById("search");
search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  const matches = new Set();

  if (q.length > 0){
    for (const r of nodes){
      const hay = (r.label + " " + (r.desc||"") + " " + (r.url||"")).toLowerCase();
      if (hay.includes(q)) matches.add(r.id);
    }
  }

  node.attr("opacity", d => q.length === 0 ? 1 : ((matches.has(d.id) || d.id.startsWith("hub_")) ? 1 : 0.15));
  label.attr("opacity", d => q.length === 0 ? 1 : ((matches.has(d.id) || d.id.startsWith("hub_")) ? 1 : 0.12));
  link.attr("opacity", d => q.length === 0 ? 1 : (matches.has(d.target.id) ? 0.9 : 0.08));
});

function color(g){
  const root = getComputedStyle(document.documentElement);
  if (g === "red") return root.getPropertyValue('--red').trim();
  if (g === "blue") return root.getPropertyValue('--blue').trim();
  if (g === "green") return root.getPropertyValue('--green').trim();
  return root.getPropertyValue('--gray').trim();
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
</script>
