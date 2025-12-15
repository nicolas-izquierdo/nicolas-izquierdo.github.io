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
    <button id="reset">Reset view</button>
  </div>

  <div class="graph-card">
    <svg id="graph" role="img" aria-label="Network of labor politics resources"></svg>
  </div>

  <div class="note">
    Source list compiled from your PDF (63 entries). :contentReference[oaicite:1]{index=1}
  </div>
</div>

<div class="tooltip" id="tooltip"></div>

<!-- D3 (CDN) works fine on GitHub Pages -->
<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>

<script>
/**
 * Node "group" encodes color:
 *  - "red"   : datasets / data / methods / packages
 *  - "blue"  : teaching / syllabi / reading lists
 *  - "green" : archives / newspapers / historical docs
 *  - "gray"  : unclassified
 *
 * Everything below is based on the resources listed in your PDF. :contentReference[oaicite:2]{index=2}
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
  {id:"cornell_digital_wcwl", label:"Cornell Digital Collections – Working Conditions & Working Life", group:"green",
    url:"https://digitalcommons.ilr.cornell.edu/workingconditions/",
    desc:"Digital labor collections: films, photos, and archives (incl. FRASER links, projects, etc.)."},
  {id:"wcml", label:"Working Class Movement Library (UK)", group:"green",
    url:"https://www.wcml.org.uk/",
    desc:"Archive with materials on 200 years of working-class history and social movements."},
  {id:"labadie", label:"Joseph A. Labadie Collection (UMich)", group:"green",
    url:"https://www.lib.umich.edu/collection/labadie-collection",
    desc:"Collection on anarchism, labor, and social movements (books, pamphlets, posters, ephemera)."},
  {id:"tamiment", label:"Tamiment Library & Robert F. Wagner Labor Archives (NYU)", group:"green",
    url:"https://guides.nyu.edu/tamiment",
    desc:"Major labor & radical history archive; holds records of many unions and councils."},
  {id:"umd_labor_guide", label:"University of Maryland – Labor History Research Guide", group:"green",
    url:"https://lib.guides.umd.edu/labor",
    desc:"Guide to primary sources; highlights AFL-CIO archives and audiovisual collections."},
  {id:"aituc_iish", label:"All India Trade Union Congress Archives (IISH)", group:"green",
    url:"https://search.iisg.amsterdam/Record/ARCH04803",
    desc:"Digital archives (correspondence, minutes, reports) covering 1948–1991."},
  {id:"loc_afl_records", label:"American Federation of Labor Records (Library of Congress)", group:"green",
    url:"https://www.loc.gov/collections/american-federation-of-labor-records/",
    desc:"172k+ items (1883–1925) on union formation, charters, bylaws, politics."},
  {id:"umd_workers_rights", label:"Advancing Workers’ Rights Project (UMD)", group:"green",
    url:"https://digital.lib.umd.edu/collecting-areas/labor",
    desc:"Digitized AFL-CIO Civil Rights Department records (text, photos, audio, film)."},
  {id:"umd_labor_in_america", label:"Labor in America Digital Collection (UMD)", group:"green",
    url:"https://digital.lib.umd.edu/collecting-areas/labor",
    desc:"1,500+ digitized documents, photographs, and artifacts from labor/social-justice collections."},
  {id:"carpenter_mag", label:"Carpenter Magazine Archive (UBCJA)", group:"green",
    url:"https://www.lib.umd.edu/digital/collections/the-carpenter",
    desc:"Digitized, searchable archive of The Carpenter magazine (1881–1988)."},
  {id:"aflcio_news", label:"AFL-CIO News archive (1956–1996)", group:"green",
    url:"https://archive.org/details/afl-cio-news",
    desc:"Digitized AFL-CIO newspaper documenting organizing + anti-discrimination efforts."},
  {id:"cio_news", label:"CIO News archive (1937–1955)", group:"green",
    url:"https://archive.org/details/cio-news",
    desc:"Digitized CIO newspaper issues, record of industrial organizing."},

  // ===== Datasets / data / methods / packages (RED) =====
  {id:"unionstats", label:"UnionStats.com (Hirsch, Macpherson & Even)", group:"red",
    url:"https://unionstats.com/",
    desc:"Annual U.S. union membership + coverage estimates (CPS-based)."},
  {id:"cornell_stats_sources", label:"Cornell ILR – Statistical Sources: Labor & Union Data", group:"red",
    url:"https://guides.library.cornell.edu/StatisticalSources/laborunionstats",
    desc:"Gateway to labor/union datasets (membership, coverage, wages, etc.)."},
  {id:"oecd_ictwss", label:"OECD/AIAS ICTWSS database", group:"red",
    url:"https://www.oecd.org/employment/ictwss-database.htm",
    desc:"Cross-national union membership, bargaining coverage, wage-setting institutions."},
  {id:"ilostat_ir_desc", label:"ILOSTAT – Industrial Relations Data (IRdata)", group:"red",
    url:"https://ilostat.ilo.org/methods/concepts-and-definitions/description-industrial-relations-data/",
    desc:"ILO stats: union density, bargaining coverage, strikes/lockouts."},
  {id:"ilostat_ir_download", label:"ILOSTAT Data catalogue – IRdata downloads", group:"red",
    url:"https://ilostat.ilo.org/topics/industrial-relations/",
    desc:"Downloadable IRdata files (CSV/DTA/Excel)."},
  {id:"bls_wsp", label:"BLS Work Stoppages dataset (US major strikes)", group:"red",
    url:"https://www.bls.gov/wsp/",
    desc:"Monthly/annual major stoppages (≥1,000 workers): participants, location, days idle."},
  {id:"ilr_lat", label:"Cornell ILR – Labor Action Tracker", group:"red",
    url:"https://striketracker.ilr.cornell.edu/",
    desc:"Database of US strikes & labor protests; locations, industries, participants."},
  {id:"aflcio_strikemap", label:"AFL-CIO Strike Map", group:"red",
    url:"https://aflcio.org/strike-map",
    desc:"Strike map listing actions; points users to ILR Labor Action Tracker."},
  {id:"cornell_strikes_guide", label:"Cornell Strikes Research Guide", group:"green",
    url:"https://guides.library.cornell.edu/strikes",
    desc:"Research guide with sources for studying US strikes & lockouts."},
  {id:"clb", label:"China Labour Bulletin – strike/accident/help maps", group:"red",
    url:"https://clb.org.hk",
    desc:"Interactive maps tracking worker activism, accidents, calls for help; data + reports."},
  {id:"kaggle_clb", label:"Kaggle – Worker Strikes & Protests in China (from CLB)", group:"red",
    url:"https://www.kaggle.com/datasets/xxx/worker-strikes-and-protests-in-china",
    desc:"Dataset derived from CLB strike map (date, location, industry, description)."},
  {id:"labor_rights_indicators", label:"Labour Rights Indicators", group:"red",
    url:"https://labour-rights-indicators.la.psu.edu/",
    desc:"Country scores on freedom of association and collective bargaining rights."},
  {id:"ituc_rights", label:"ITUC Global Rights Index", group:"red",
    url:"https://www.ituc-csi.org/global-rights-index",
    desc:"Annual index ranking countries by respect for workers’ rights; reports violations."},
  {id:"wlg_silver", label:"World Labor Group (WLG) database (Silver)", group:"red",
    url:"https://irows.ucr.edu/conferences/globgis/papers/silver.htm",
    desc:"Historical dataset of mentions of strikes/demonstrations (168 countries, 1870–1996)."},
  {id:"stevedata_uniondensity", label:"R package dataset: Cross-National Trade Union Density (stevedata)", group:"red",
    url:"https://svmiller.com/stevedata/reference/uniondensity.html",
    desc:"R-package dataset: union density + predictors for multiple countries."},
  {id:"fec_data", label:"FEC Campaign Finance Data", group:"red",
    url:"https://www.fec.gov/data/",
    desc:"Browse candidate/committee receipts and contributions by source, amount, date."},
  {id:"ncsl_cba_leg", label:"NCSL Unions & Collective Bargaining Legislation Database", group:"red",
    url:"https://www.ncsl.org/labor-and-employment/unions-and-collective-bargaining-legislation-database",
    desc:"State legislation related to unions/collective bargaining since 2011."},
  {id:"accountability_money", label:"Accountability Project – Money in Politics datasets", group:"red",
    url:"https://publicaccountability.org/data/",
    desc:"State-level campaign contribution datasets (donor, amount, date)."},
  {id:"cnts", label:"Cross-National Time Series (CNTS) Data Archive", group:"red",
    url:"https://www.systemicpeace.org/inscr/cnts.htm",
    desc:"Long-term dataset (1815–2023) incl. general strikes and domestic conflict measures."},
  {id:"scad", label:"Social Conflict in Analysis Database (SCAD)", group:"red",
    url:"https://www.strausscenter.org/scad/",
    desc:"Event data on protests/strikes/riots/repression (Africa + Central America/Caribbean)."},
  {id:"etui_strikemap", label:"European Strike Map (ETUI)", group:"red",
    url:"https://www.worker-participation.eu/national_industrial_relations/european-strike-map",
    desc:"Map (2000–present): industrial action participation + days not worked in EU."},
  {id:"strikemap_org", label:"Strikemap.org (crowd-sourced)", group:"red",
    url:"https://strikemap.org",
    desc:"Crowd-sourced worldwide industrial action map; incomplete by design."},
  {id:"nber_pscbl", label:"NBER Public Sector Collective-Bargaining Law Dataset", group:"red",
    url:"https://www.nber.org/research/data/public-sector-collective-bargaining-law-data-set",
    desc:"State/local public-sector CBA laws (1955–1985) across US states."},
  {id:"opm_cba", label:"OPM Collective-Bargaining Agreement Database (US federal)", group:"red",
    url:"https://www.opm.gov/policy-data-oversight/labor-management-relations/collective-bargaining-agreements/",
    desc:"Federal-sector CBAs + arbitration awards; agencies submit agreements soon after issuance."},
  {id:"dol_olms_cba", label:"OLMS Online Public Disclosure Room (CBAs file)", group:"red",
    url:"https://www.dol.gov/agencies/olms/employer-and-labor-relations/collective-bargaining-agreements",
    desc:"US DoL file of CBAs (since 1947, voluntary submissions; earlier via Cornell)."},
  {id:"wageindicator_cba", label:"WageIndicator Collective Agreements Database", group:"red",
    url:"https://wageindicator.org/cba",
    desc:"Coded collective agreements (76 countries) across topics (wages, hours, equality, etc.)."},
  {id:"dfi_teacher_strikes", label:"Teacher Union Strike Tracker (DFI Policy)", group:"red",
    url:"https://defendinged.org/strike-tracker/",
    desc:"Map of K–12 teacher strikes since 2010 (NEA/AFT), days lost, employees involved."},
  {id:"ilostat_sd", label:"ILOSTAT – Social Dialogue & Industrial Relations indicators", group:"red",
    url:"https://ilostat.ilo.org/topics/industrial-relations/",
    desc:"Indicator catalogue: union membership, bargaining coverage, strikes/lockouts."},
  {id:"quest_union_data", label:"Quest Site Solutions – Union Data Services (proprietary)", group:"red",
    url:"https://questsitesolutions.com/union-data-services",
    desc:"Proprietary geocoded union offices + NLRB elections (10 years of organizing activity)."},
  {id:"jpferguson_nlrb", label:"JP Ferguson – NLRB Representation-case Data", group:"red",
    url:"https://www.jpferguson.net/nlrb-data/",
    desc:"Raw NLRB representation-case (R-case) data for union election analysis."},
  {id:"candid_unions", label:"Candid – U.S. Labor Unions: Facts & Financials", group:"red",
    url:"https://blog.candid.org/post/key-facts-figures-and-trends-among-u-s-labor-unions/",
    desc:"Analysis of IRS 501(c)(5) filings; unions’ assets/revenue/expenses."},
  {id:"elors", label:"Electronic Labor Dataset under OLMS (e.LORS)", group:"red",
    url:"https://www.dol.gov/agencies/olms/public-disclosure-room",
    desc:"Electronic filing/storage/disclosure system for labor-related reports."},
  {id:"unionelections", label:"UnionElection.org – Union Election Data", group:"red",
    url:"https://unionelections.org",
    desc:"NLRB-governed union elections since 2008; trends by state/union; largest elections."},
  {id:"kaggle_union_membership", label:"Kaggle – Union Membership & Coverage (state-level, 1983–2015)", group:"red",
    url:"https://www.kaggle.com/datasets/mrisdal/union-membership-coverage",
    desc:"State-level union membership/coverage compiled from CPS (UnionStats-related)."},
  {id:"unionfacts", label:"UnionFacts.com database", group:"red",
    url:"https://unionfacts.com",
    desc:"Large US database on unions: finances, leadership salaries, political ops, strikes, ULP charges."},
  {id:"sa_union_list", label:"List of Registered Trade Unions in South Africa (Labour Guide)", group:"red",
    url:"https://labourguide.co.za/general/trade-unions-in-south-africa",
    desc:"Reproduces May 2017 list of registered trade unions (registration numbers, contacts)."},
  {id:"hbs_union_hist", label:"Trade-Union Membership Historical Data (1880–2010) – HBS tool", group:"red",
    url:"https://www.hbs.edu/businesshistory/courses/teaching-resources/historical-data-visualization/details",
    desc:"Visualization + dataset links for union membership as % of workforce (1880–2010)."},
  {id:"gdads", label:"Global Digital Activism Data Set (GDADS) – ICPSR 34625", group:"red",
    url:"https://www.icpsr.umich.edu/web/ICPSR/studies/34625",
    desc:"Dataset on online activism cases (151 countries): goals, scope, software, outcomes."},

  // ===== Unclassified / needs review (GRAY) =====
  // (Keep this slot in case you add more items later that don’t fit cleanly.)
];

/** Create category hubs (so the network has structure) */
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

const width = svg.node().clientWidth;
const height = svg.node().clientHeight;

const color = (g) => {
  if (g === "red") return getComputedStyle(document.documentElement).getPropertyValue('--red').trim();
  if (g === "blue") return getComputedStyle(document.documentElement).getPropertyValue('--blue').trim();
  if (g === "green") return getComputedStyle(document.documentElement).getPropertyValue('--green').trim();
  return getComputedStyle(document.documentElement).getPropertyValue('--gray').trim();
};

const gZoom = svg.append("g");

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
  .force("charge", d3.forceManyBody().strength(-320))
  .force("center", d3.forceCenter(width * 0.52, height * 0.52))
  .force("collide", d3.forceCollide().radius(d => d.id.startsWith("hub_") ? 26 : 14))
  .on("tick", ticked);

function ticked(){
  link
    .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x).attr("y2", d => d.target.y);

  node.attr("cx", d => d.x).attr("cy", d => d.y);
  label.attr("x", d => d.x).attr("y", d => d.y);
}

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

svg.call(d3.zoom()
  .scaleExtent([0.55, 2.6])
  .on("zoom", (event) => gZoom.attr("transform", event.transform))
);

document.getElementById("reset").addEventListener("click", () => {
  svg.transition().duration(350).call(
    d3.zoom().transform,
    d3.zoomIdentity.translate(0,0).scale(1)
  );
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

  node.attr("opacity", d => {
    if (q.length === 0) return 1;
    return (matches.has(d.id) || d.id.startsWith("hub_")) ? 1 : 0.15;
  });
  label.attr("opacity", d => {
    if (q.length === 0) return 1;
    return (matches.has(d.id) || d.id.startsWith("hub_")) ? 1 : 0.12;
  });
  link.attr("opacity", d => {
    if (q.length === 0) return 1;
    return (matches.has(d.target.id)) ? 0.9 : 0.08;
  });
});

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
</script>
