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
    red:  { id: "hub_red",  label: "DATA / METHODS", group: "red" },
    blue: { id: "hub_blue", label: "TEACHING",      group: "blue" },
    green:{ id: "hub_green",label: "ARCHIVES",      group: "green" },
    gray: { id: "hub_gray", label: "OTHER",         group: "gray" }
  };

  const resources = [
    { id:"apsa_labor_teach", label:"APSA Labor Politics – Teaching Resource Collection", group:"blue", url:"https://educate.apsanet.org/labor-politics-teaching-resource-collection" },
    { id:"rutgers_laborhistory", label:"Rutgers U.S. Labor & Working-Class History Guide", group:"green", url:"https://libguides.rutgers.edu/laborhistory" },
    { id:"cornell_ilr_guide", label:"Cornell ILR – Labor & Employment Research Guide", group:"green", url:"https://guides.library.cornell.edu/laborstudies" },
    { id:"unionstats", label:"UnionStats.com", group:"red", url:"https://unionstats.com/" },
    { id:"cornell_stats_sources", label:"Cornell ILR – Statistical Sources: Labor & Union Data", group:"red", url:"https://guides.library.cornell.edu/StatisticalSources/laborunionstats" },
    { id:"oecd_ictwss", label:"OECD/AIAS ICTWSS database", group:"red", url:"https://www.oecd.org/employment/ictwss-database.htm" },
    { id:"ilostat_ir", label:"ILOSTAT – Industrial Relations", group:"red", url:"https://ilostat.ilo.org/topics/industrial-relations/" },
    { id:"bls_wsp", label:"BLS Work Stoppages (WSP)", group:"red", url:"https://www.bls.gov/wsp/" },
    { id:"ilr_lat", label:"Cornell ILR – Labor Action Tracker", group:"red", url:"https://striketracker.ilr.cornell.edu/" },
    { id:"tamiment", label:"Tamiment Library & Wagner Labor Archives (NYU)", group:"green", url:"https://guides.nyu.edu/tamiment" },
    { id:"lawcha_books", label:"LAWCHA – Twenty Best Labor Books", group:"blue", url:"https://lawcha.org/2015/06/08/twenty-best-labor-books-first-cut/" },
    { id:"boston_review_list", label:"Boston Review – Solidarity reading list", group:"blue", url:"https://www.bostonreview.net/reading-list/solidarity-makes-us-strong/" }
  ];

  let currentFilter = "all";
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

  function buildGraph(filter, query) {
    g.selectAll("*").remove();

    const { w, h } = getSize();
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const filtered =
      (filter === "all")
        ? resources
        : resources.filter(r => r.group === filter);

    const q = (query || "").trim().toLowerCase();
    const filtered2 =
      (!q)
        ? filtered
        : filtered.filter(r =>
            (r.label || "").toLowerCase().includes(q) ||
            (r.url || "").toLowerCase().includes(q)
          );

    let nodes = [];
    let links = [];

    if (filter === "all") {
      const hubList = [hubs.red, hubs.blue, hubs.green, hubs.gray];
      nodes = hubList.concat(filtered2);

      links = filtered2.map(r => ({
        source: hubs[r.group]?.id || hubs.gray.id,
        target: r.id
      }));
    } else {
      const hub = hubs[filter] || hubs.gray;
      nodes = [hub].concat(filtered2);

      links = filtered2.map(r => ({
        source: hub.id,
        target: r.id
      }));
    }

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
      .call(d3.drag()
        .on("start", (e,d) => {
          if (!e.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on("drag", (e,d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e,d) => {
          if (!e.active) sim.alphaTarget(0);
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
      .style("pointer-events", "none");

    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(95).strength(0.9))
      .force("charge", d3.forceManyBody().strength(-520))
      .force("center", d3.forceCenter(w/2, h/2))
      .force("collide", d3.forceCollide().radius(d => String(d.id).startsWith("hub_") ? 26 : 16))
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

  function setActiveButton(filter) {
    document.querySelectorAll(".filter").forEach(b => {
      b.classList.toggle("active", b.dataset.filter === filter);
    });
  }

  buildGraph("all", "");
  setActiveButton("all");

  document.getElementById("legend").addEventListener("click", (e) => {
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

  document.getElementById("reset").addEventListener("click", () => {
    svg.transition().duration(250).call(zoom.transform, d3.zoomIdentity);
  });

  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", () => {
      currentQuery = search.value || "";
      buildGraph(currentFilter, currentQuery);
    });
  }

  window.addEventListener("resize", () => buildGraph(currentFilter, currentQuery));
});
