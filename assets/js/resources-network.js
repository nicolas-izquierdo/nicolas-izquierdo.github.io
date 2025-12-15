document.addEventListener("DOMContentLoaded", () => {
  const svg = d3.select("#graph");
  if (svg.empty()) return;

  const width = svg.node().clientWidth || 900;
  const height = svg.node().clientHeight || 600;

  const colors = {
    red: "#d9534f",
    blue: "#357edd",
    green: "#2ca25f",
    gray: "#999999"
  };

  const resources = [
    { id:"apsa_labor_teach", label:"APSA Labor Politics – Teaching Resource Collection", group:"blue", url:"https://educate.apsanet.org/labor-politics-teaching-resource-collection" },
    { id:"rutgers_laborhistory", label:"Rutgers U.S. Labor & Working-Class History Guide", group:"green", url:"https://libguides.rutgers.edu/laborhistory" },
    { id:"cornell_ilr_guide", label:"Cornell ILR – Labor & Employment Research Guide", group:"green", url:"https://guides.library.cornell.edu/laborstudies" },
    { id:"unionstats", label:"UnionStats.com", group:"red", url:"https://unionstats.com/" },
    { id:"cornell_stats_sources", label:"Cornell ILR – Statistical Sources: Labor & Union Data", group:"red", url:"https://guides.library.cornell.edu/StatisticalSources/laborunionstats" },
    { id:"mit_ocw_ir", label:"MIT OCW – Work, Employment & Industrial Relations", group:"blue", url:"https://ocw.mit.edu/" },
    { id:"oecd_ictwss", label:"OECD/AIAS ICTWSS database", group:"red", url:"https://www.oecd.org/employment/ictwss-database.htm" },
    { id:"ilostat_ir", label:"ILOSTAT – Industrial Relations", group:"red", url:"https://ilostat.ilo.org/topics/industrial-relations/" },
    { id:"ilostat_methods", label:"ILOSTAT – Concepts & definitions (IR)", group:"red", url:"https://ilostat.ilo.org/methods/concepts-and-definitions/description-industrial-relations-data/" },
    { id:"bls_wsp", label:"BLS Work Stoppages (WSP)", group:"red", url:"https://www.bls.gov/wsp/" },
    { id:"ilr_lat", label:"Cornell ILR – Labor Action Tracker", group:"red", url:"https://striketracker.ilr.cornell.edu/" },
    { id:"aflcio_strikemap", label:"AFL-CIO Strike Map", group:"red", url:"https://aflcio.org/strike-map" },
    { id:"cornell_strikes_guide", label:"Cornell – Strikes Research Guide", group:"green", url:"https://guides.library.cornell.edu/strikes" },
    { id:"clb", label:"China Labour Bulletin", group:"red", url:"https://clb.org.hk" },
    { id:"kaggle", label:"Kaggle (datasets hub)", group:"red", url:"https://www.kaggle.com/" },
    { id:"labor_rights_indicators", label:"Labour Rights Indicators (PSU)", group:"red", url:"https://labour-rights-indicators.la.psu.edu/" },
    { id:"ituc_rights", label:"ITUC Global Rights Index", group:"red", url:"https://www.ituc-csi.org/global-rights-index" },
    { id:"wcml", label:"Working Class Movement Library (UK)", group:"green", url:"https://www.wcml.org.uk/" },
    { id:"tamiment", label:"Tamiment Library & Wagner Labor Archives (NYU)", group:"green", url:"https://guides.nyu.edu/tamiment" },
    { id:"wlg_silver", label:"World Labor Group database (Silver)", group:"red", url:"https://irows.ucr.edu/conferences/globgis/papers/silver.htm" },
    { id:"stevedata_uniondensity", label:"stevedata (R) – uniondensity", group:"red", url:"https://svmiller.com/stevedata/reference/uniondensity.html" },
    { id:"umd_labor", label:"UMD – Labor History Research Guide", group:"green", url:"https://lib.guides.umd.edu/labor" },
    { id:"lawcha_books", label:"LAWCHA – Twenty Best Labor Books", group:"blue", url:"https://lawcha.org/2015/06/08/twenty-best-labor-books-first-cut/" },
    { id:"fec_data", label:"FEC Campaign Finance Data", group:"red", url:"https://www.fec.gov/data/" },
    { id:"ncsl_cba", label:"NCSL – Unions & Collective Bargaining Legislation DB", group:"red", url:"https://www.ncsl.org/labor-and-employment/unions-and-collective-bargaining-legislation-database" },
    { id:"accountability_data", label:"Public Accountability – Data", group:"red", url:"https://publicaccountability.org/data/" },
    { id:"cnts", label:"Cross-National Time Series (CNTS)", group:"red", url:"https://www.systemicpeace.org/inscr/cnts.htm" },
    { id:"scad", label:"SCAD (Social Conflict in Africa Database)", group:"red", url:"https://www.strausscenter.org/scad/" },
    { id:"etui_strikemap", label:"European Strike Map (ETUI)", group:"red", url:"https://www.worker-participation.eu/national_industrial_relations/european-strike-map" },
    { id:"strikemap_org", label:"Strikemap.org", group:"red", url:"https://strikemap.org" },
    { id:"nber_pscbl", label:"NBER – Public Sector Collective Bargaining Law Dataset", group:"red", url:"https://www.nber.org/research/data/public-sector-collective-bargaining-law-data-set" },
    { id:"opm_cba", label:"OPM – Collective Bargaining Agreements", group:"red", url:"https://www.opm.gov/policy-data-oversight/labor-management-relations/collective-bargaining-agreements/" },
    { id:"dol_olms_cba", label:"DOL OLMS – Collective Bargaining Agreements", group:"red", url:"https://www.dol.gov/agencies/olms/employer-and-labor-relations/collective-bargaining-agreements" },
    { id:"wageindicator_cba", label:"WageIndicator – Collective Agreements DB", group:"red", url:"https://wageindicator.org/cba" },
    { id:"dfi_teacher_strikes", label:"Teacher Union Strike Tracker (DFI)", group:"red", url:"https://defendinged.org/strike-tracker/" },
    { id:"quest_union_data", label:"Quest Site Solutions – Union Data Services", group:"red", url:"https://questsitesolutions.com/union-data-services" },
    { id:"jpferguson_nlrb", label:"JP Ferguson – NLRB Data", group:"red", url:"https://www.jpferguson.net/nlrb-data/" },
    { id:"candid_unions", label:"Candid – Key facts on U.S. labor unions", group:"red", url:"https://blog.candid.org/post/key-facts-figures-and-trends-among-u-s-labor-unions/" },
    { id:"dol_olms_pdr", label:"DOL OLMS – Public Disclosure Room", group:"red", url:"https://www.dol.gov/agencies/olms/public-disclosure-room" },
    { id:"unionelections", label:"UnionElections.org", group:"red", url:"https://unionelections.org" },
    { id:"unionfacts", label:"UnionFacts.com", group:"red", url:"https://unionfacts.com" },
    { id:"labourguide_sa", label:"South Africa – Trade unions list (Labour Guide)", group:"red", url:"https://labourguide.co.za/general/trade-unions-in-south-africa" },
    { id:"hbs_union_hist", label:"HBS – Historical Union Membership Data (1880–2010)", group:"red", url:"https://www.hbs.edu/businesshistory/courses/teaching-resources/historical-data-visualization/details" },
    { id:"gdads", label:"ICPSR – Global Digital Activism Data Set (GDADS)", group:"red", url:"https://www.icpsr.umich.edu/web/ICPSR/studies/34625" },
    { id:"iish_aituc", label:"IISH – AITUC Archives", group:"green", url:"https://search.iisg.amsterdam/Record/ARCH04803" },
    { id:"loc_afl", label:"Library of Congress – AFL Records", group:"green", url:"https://www.loc.gov/collections/american-federation-of-labor-records/" },
    { id:"aflcio_news", label:"AFL-CIO News (Archive.org)", group:"green", url:"https://archive.org/details/afl-cio-news" },
    { id:"cio_news", label:"CIO News (Archive.org)", group:"green", url:"https://archive.org/details/cio-news" },
    { id:"boston_review_list", label:"Boston Review – Solidarity reading list", group:"blue", url:"https://www.bostonreview.net/reading-list/solidarity-makes-us-strong/" }
  ];

  const hubs = [
    { id:"hub_data", label:"DATA", group:"red" },
    { id:"hub_teach", label:"TEACHING", group:"blue" },
    { id:"hub_arch", label:"ARCHIVES", group:"green" },
    { id:"hub_other", label:"OTHER", group:"gray" }
  ];

  const nodes = hubs.concat(resources);

  const links = resources.map(r => ({
    source: r.group === "red" ? "hub_data" : r.group === "blue" ? "hub_teach" : r.group === "green" ? "hub_arch" : "hub_other",
    target: r.id
  }));

  const g = svg.append("g");

  const zoom = d3.zoom()
    .scaleExtent([0.5, 2.5])
    .on("zoom", e => g.attr("transform", e.transform));

  svg.call(zoom);

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => String(d.source.id || d.source).startsWith("hub_") ? 95 : 80).strength(0.9))
    .force("charge", d3.forceManyBody().strength(-520))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(d => String(d.id).startsWith("hub_") ? 26 : 16))
    .on("tick", ticked);

  const link = g.selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke", "#b5b5b5")
    .attr("stroke-width", 1);

  const node = g.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", d => String(d.id).startsWith("hub_") ? 16 : 9)
    .attr("fill", d => colors[d.group] || colors.gray)
    .attr("stroke", "#ffffff")
    .attr("stroke-width", d => String(d.id).startsWith("hub_") ? 2 : 1)
    .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended))
    .on("click", (_, d) => { if (d.url) window.open(d.url, "_blank"); });

  const label = g.selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .text(d => d.label)
    .attr("font-size", "11px")
    .attr("dx", d => String(d.id).startsWith("hub_") ? 20 : 14)
    .attr("dy", 4)
    .attr("fill", "#000000")
    .attr("font-weight", d => String(d.id).startsWith("hub_") ? 800 : 600)
    .style("pointer-events", "none");

  function ticked() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    label
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  }

  function dragstarted(e, d) {
    if (!e.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x; d.fy = d.y;
  }

  function dragged(e, d) {
    d.fx = e.x; d.fy = e.y;
  }

  function dragended(e, d) {
    if (!e.active) simulation.alphaTarget(0);
    d.fx = null; d.fy = null;
  }

  const resetBtn = document.getElementById("reset");
  if (resetBtn) {
    resetBtn.onclick = () => svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
  }

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        node.attr("opacity", 1);
        label.attr("opacity", 1);
        link.attr("opacity", 1);
        return;
      }
      const match = new Set(nodes.filter(n => (n.label || "").toLowerCase().includes(q) || (n.url || "").toLowerCase().includes(q)).map(n => n.id));
      node.attr("opacity", d => String(d.id).startsWith("hub_") || match.has(d.id) ? 1 : 0.12);
      label.attr("opacity", d => String(d.id).startsWith("hub_") || match.has(d.id) ? 1 : 0.10);
      link.attr("opacity", d => match.has(d.target.id) ? 0.9 : 0.06);
    });
  }
});
