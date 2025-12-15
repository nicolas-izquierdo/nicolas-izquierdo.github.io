document.addEventListener("DOMContentLoaded", () => {
  const svg = d3.select("#graph");
  if (svg.empty()) return;

  const colors = {
    red: "#d9534f",
    blue: "#357edd",
    green: "#2ca25f",
    gray: "#999999"
  };

  const hubs = {
    red:  { id: "hub_red",  label: "DATA",     group: "red" },
    blue: { id: "hub_blue", label: "TEACHING", group: "blue" },
    green:{ id: "hub_green",label: "ARCHIVES", group: "green" },
    gray: { id: "hub_gray", label: "OTHER",    group: "gray" }
  };

  const resources = [
    { id:"apsa_labor_teach", label:"APSA Labor Politics – Teaching Resource Collection", group:"blue", url:"https://educate.apsanet.org/labor-politics-teaching-resource-collection" },
    { id:"rutgers_laborhistory", label:"Rutgers U.S. Labor & Working-Class History Guide", group:"green", url:"https://libguides.rutgers.edu/laborhistory" },
    { id:"cornell_ilr_guide", label:"Cornell ILR – Labor & Employment Research Guide", group:"green", url:"https://guides.library.cornell.edu/laborstudies" },
    { id:"unionstats", label:"UnionStats.com – CPS Union Membership & Coverage", group:"red", url:"https://unionstats.com" },
    { id:"cornell_stats_sources", label:"Cornell ILR – Statistical Sources: Labor & Union Data", group:"red", url:"https://guides.library.cornell.edu/StatisticalSources/laborunionstats" },
    { id:"mit_ocw_ir", label:"MIT OCW – Work, Employment & Industrial Relations Theory", group:"blue", url:"https://ocw.mit.edu/courses/15-663j-work-employment-and-industrial-relations-theory-spring-2008/" },
    { id:"oecd_ictwss", label:"OECD/AIAS ICTWSS Database", group:"red", url:"https://www.oecd.org/employment/ictwss-database.htm" },
    { id:"ilostat_ir_desc", label:"ILOSTAT – Industrial Relations Data (concepts & definitions)", group:"red", url:"https://ilostat.ilo.org/methods/concepts-and-definitions/description-industrial-relations-data/" },
    { id:"ilostat_ir_download", label:"ILOSTAT – Industrial Relations Data downloads", group:"red", url:"https://ilostat.ilo.org/topics/industrial-relations/" },
    { id:"bls_wsp", label:"BLS Work Stoppages Dataset (US)", group:"red", url:"https://www.bls.gov/wsp/" },
    { id:"ilr_lat", label:"Cornell ILR – Labor Action Tracker", group:"red", url:"https://striketracker.ilr.cornell.edu/" },
    { id:"aflcio_strikemap", label:"AFL-CIO Strike Map", group:"red", url:"https://aflcio.org/strike-map" },
    { id:"cornell_strikes_guide", label:"Cornell – Strikes Research Guide", group:"green", url:"https://guides.library.cornell.edu/strikes" },
    { id:"clb", label:"China Labour Bulletin – Strike & Protest Maps", group:"red", url:"https://clb.org.hk" },
    { id:"labour_rights_indicators", label:"Labour Rights Indicators (Penn State)", group:"red", url:"https://labour-rights-indicators.la.psu.edu/" },
    { id:"ituc_rights", label:"ITUC Global Rights Index", group:"red", url:"https://www.ituc-csi.org/global-rights-index" },
    { id:"wcml", label:"Working Class Movement Library (UK)", group:"green", url:"https://www.wcml.org.uk/" },
    { id:"labadie", label:"Joseph A. Labadie Collection (University of Michigan)", group:"green", url:"https://www.lib.umich.edu/collection/labadie-collection" },
    { id:"tamiment", label:"Tamiment Library & Robert F. Wagner Labor Archives (NYU)", group:"green", url:"https://guides.nyu.edu/tamiment" },
    { id:"cornell_digital_wcwl", label:"Cornell Digital Collections – Working Conditions & Working Life", group:"green", url:"https://digitalcommons.ilr.cornell.edu/workingconditions/" },
    { id:"wlg_silver", label:"World Labor Group Strike Dataset (Silver)", group:"red", url:"https://irows.ucr.edu/conferences/globgis/papers/silver.htm" },
    { id:"stevedata_uniondensity", label:"stevedata (R) – Cross-National Trade Union Density", group:"red", url:"https://svmiller.com/stevedata/reference/uniondensity.html" },
    { id:"umd_labor_guide", label:"University of Maryland – Labor History Research Guide", group:"green", url:"https://lib.guides.umd.edu/labor" },
    { id:"lawcha_books", label:"LAWCHA – Twenty Best Labor Books", group:"blue", url:"https://lawcha.org/2015/06/08/twenty-best-labor-books-first-cut/" },
    { id:"boston_review_list", label:"Boston Review – “Solidarity Makes Us Strong” Reading List", group:"blue", url:"https://www.bostonreview.net/reading-list/solidarity-makes-us-strong/" },
    { id:"fec_data", label:"FEC Campaign Finance Data", group:"red", url:"https://www.fec.gov/data/" },
    { id:"ncsl_cba", label:"NCSL – Unions & Collective Bargaining Legislation Database", group:"red", url:"https://www.ncsl.org/labor-and-employment/unions-and-collective-bargaining-legislation-database" },
    { id:"accountability_money", label:"Public Accountability – Money in Politics Datasets", group:"red", url:"https://publicaccountability.org/data/" },
    { id:"cnts", label:"Cross-National Time Series (CNTS) Data Archive", group:"red", url:"https://www.systemicpeace.org/inscr/cnts.htm" },
    { id:"scad", label:"Social Conflict in Analysis Database (SCAD)", group:"red", url:"https://www.strausscenter.org/scad/" },
    { id:"etui_strikemap", label:"European Strike Map (ETUI)", group:"red", url:"https://www.worker-participation.eu/national_industrial_relations/european-strike-map" },
    { id:"strikemap_org", label:"Strikemap.org (crowd-sourced)", group:"red", url:"https://strikemap.org" },
    { id:"nber_pscbl", label:"NBER – Public Sector Collective Bargaining Law Dataset", group:"red", url:"https://www.nber.org/research/data/public-sector-collective-bargaining-law-data-set" },
    { id:"opm_cba", label:"OPM – Federal Collective Bargaining Agreements", group:"red", url:"https://www.opm.gov/policy-data-oversight/labor-management-relations/collective-bargaining-agreements/" },
    { id:"dol_olms_cba", label:"DOL OLMS – Collective Bargaining Agreements", group:"red", url:"https://www.dol.gov/agencies/olms/employer-and-labor-relations/collective-bargaining-agreements" },
    { id:"wageindicator_cba", label:"WageIndicator – Collective Agreements Database", group:"red", url:"https://wageindicator.org/cba" },
    { id:"dfi_teacher_strikes", label:"Teacher Union Strike Tracker (DFI Policy)", group:"red", url:"https://defendinged.org/strike-tracker/" },
    { id:"quest_union_data", label:"Quest Site Solutions – Union Data Services", group:"red", url:"https://questsitesolutions.com/union-data-services" },
    { id:"jpferguson_nlrb", label:"JP Ferguson – NLRB Representation Case Data", group:"red", url:"https://www.jpferguson.net/nlrb-data/" },
    { id:"candid_unions", label:"Candid – U.S. Labor Unions: Facts & Financials", group:"red", url:"https://blog.candid.org/post/key-facts-figures-and-trends-among-u-s-labor-unions/" },
    { id:"elors", label:"DOL OLMS – Electronic Labor Reporting (e.LORS)", group:"red", url:"https://www.dol.gov/agencies/olms/public-disclosure-room" },
    { id:"unionelections", label:"UnionElection.org", group:"red", url:"https://unionelections.org" },
    { id:"kaggle_union_membership", label:"Union Membership & Coverage (Kaggle / CPS)", group:"red", url:"https://www.kaggle.com/datasets/mrisdal/union-membership-coverage" },
    { id:"unionfacts", label:"UnionFacts.com Database", group:"red", url:"https://unionfacts.com" },
    { id:"sa_union_list", label:"South Africa – Registered Trade Unions List", group:"red", url:"https://labourguide.co.za/general/trade-unions-in-south-africa" },
    { id:"hbs_union_hist", label:"HBS – Trade Union Membership Historical Data (1880–2010)", group:"red", url:"https://www.hbs.edu/businesshistory/courses/teaching-resources/historical-data-visualization/details" },
    { id:"aituc_iish", label:"All India Trade Union Congress Archives (IISH)", group:"green", url:"https://search.iisg.amsterdam/Record/ARCH04803" },
    { id:"loc_afl", label:"Library of Congress – American Federation of Labor Records", group:"green", url:"https://www.loc.gov/collections/american-federation-of-labor-records/" },
    { id:"gdads", label:"Global Digital Activism Data Set (ICPSR)", group:"red", url:"https://www.icpsr.umich.edu/web/ICPSR/studies/34625" },
    { id:"advancing_workers_rights", label:"Advancing Workers’ Rights Project (UMD)", group:"green", url:"https://digital.lib.umd.edu/collecting-areas/labor" },
    { id:"labor_in_america", label:"Labor in America Digital Collection (UMD)", group:"green", url:"https://digital.lib.umd.edu/collecting-areas/labor" },
    { id:"carpenter_mag", label:"The Carpenter Magazine Archive (1881–1988)", group:"green", url:"https://www.lib.umd.edu/digital/collections/the-carpenter" },
    { id:"aflcio_news", label:"AFL-CIO News Archive (1956–1996)", group:"green", url:"https://archive.org/details/afl-cio-news" },
    { id:"cio_news", label:"CIO News Archive (1937–1955)", group:"green", url:"https://archive.org/details/cio-news" }
  ];

  let currentFilter = "red";
  let currentQuery = "";

  const g = svg.append("g");

  const zoom = d3.zoom()
    .scaleExtent([0.5, 2.6])
    .on("zoom", (e) => g.attr("transform", e.transform));

  svg.call(zoom);

  function getSize() {
    const r = svg.node().getBoundingClientRect();
    return { w: Math.max(360, r.width), h: Math.max(420, r.height) };
  }

  function setActiveButton(filter) {
    document.querySelectorAll(".filter").forEach(b => {
      b.classList.toggle("active", b.dataset.filter === filter);
    });
  }

  function buildGraph(filter, query) {
    g.selectAll("*").remove();

    const { w, h } = getSize();
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const hub = hubs[filter] || hubs.gray;

    const base = resources.filter(r => r.group === filter);

    const q = (query || "").trim().toLowerCase();
    const filtered =
      (!q)
        ? base
        : base.filter(r =>
            (r.label || "").toLowerCase().includes(q) ||
            (r.url || "").toLowerCase().includes(q)
          );

    const nodes = [hub].concat(filtered);
    const links = filtered.map(r => ({ source: hub.id, target: r.id }));

    const link = g.selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#b5b5b5")
      .attr("stroke-width", 1)
      .attr("opacity", 0.85);

    let sim;

    const node = g.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", d => String(d.id).startsWith("hub_") ? 16 : 9)
      .attr("fill", d => colors[d.group] || colors.gray)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", d => String(d.id).startsWith("hub_") ? 2 : 1)
      .call(d3.drag()
        .on("start", (e,d) => {
          if (!e.active && sim) sim.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on("drag", (e,d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e,d) => {
          if (!e.active && sim) sim.alphaTarget(0);
          d.fx = null; d.fy = null;
        })
      )
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
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .style("pointer-events", "none");

    sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id)
        .distance(() => 70 + Math.random() * 80)
        .strength(0.9)
      )
      .force("charge", d3.forceManyBody().strength(-420))
      .force("center", d3.forceCenter(w/2, h/2))
      .force("collide", d3.forceCollide().radius(d => String(d.id).startsWith("hub_") ? 30 : 20).iterations(2))
      .force("radial", d3.forceRadial(d => String(d.id).startsWith("hub_") ? 10 : 150, w/2, h/2).strength(0.04))
      .force("jitterX", d3.forceX(w/2).strength(0.015))
      .force("jitterY", d3.forceY(h/2).strength(0.015))
      .on("tick", () => {
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
      });
  }

  setActiveButton(currentFilter);
  buildGraph(currentFilter, "");

  const legend = document.getElementById("legend");
  if (legend) {
    legend.addEventListener("click", (e) => {
      const btn = e.target.closest("button.filter");
      if (!btn) return;

      currentFilter = btn.dataset.filter;
      currentQuery = "";

      const search = document.getElementById("search");
      if (search) search.value = "";

      setActiveButton(currentFilter);
      buildGraph(currentFilter, "");

      svg.transition().duration(250).call(zoom.transform, d3.zoomIdentity);
    });
  }

  const resetBtn = document.getElementById("reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      svg.transition().duration(250).call(zoom.transform, d3.zoomIdentity);
    });
  }

  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", () => {
      currentQuery = search.value || "";
      buildGraph(currentFilter, currentQuery);
    });
  }

  window.addEventListener("resize", () => buildGraph(currentFilter, currentQuery));
});
