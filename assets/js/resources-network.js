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
  { id:"unionstats", label:"UnionStats.com – CPS Union Membership & Coverage", group:"red", url:"https://unionstats.com" },
  { id:"oecd_ictwss", label:"OECD/AIAS ICTWSS Database", group:"red", url:"https://www.oecd.org/en/data/datasets/oecdaias-ictwss-database.html" },
  { id:"ilostat_ir_desc", label:"ILOSTAT – Industrial Relations Data (concepts & definitions)", group:"red", url:"https://ilostat.ilo.org/methods/concepts-and-definitions/description-industrial-relations-data/" },
  { id:"ilostat_ir_download", label:"ILOSTAT – Industrial Relations (topic page & data)", group:"red", url:"https://ilostat.ilo.org/topics/industrial-relations/" },
  { id:"bls_wsp", label:"BLS Work Stoppages Dataset (US)", group:"red", url:"https://www.bls.gov/wsp/" },
  { id:"ilr_lat", label:"Cornell ILR – Labor Action Tracker", group:"red", url:"https://striketracker.ilr.cornell.edu/" },
  { id:"aflcio_strikemap", label:"AFL-CIO Strike Map", group:"red", url:"https://aflcio.org/strike-map" },
  { id:"clb", label:"China Labour Bulletin", group:"red", url:"https://clb.org.hk/" },
  { id:"labour_rights_indicators", label:"Labour Rights Indicators (Penn State)", group:"red", url:"https://labour-rights-indicators.la.psu.edu/" },
  { id:"ituc_rights", label:"ITUC Global Rights Index", group:"red", url:"https://www.ituc-csi.org/global-rights-index" },
  { id:"wcml", label:"Working Class Movement Library (UK)", group:"green", url:"https://www.wcml.org.uk/" },
  { id:"lawcha_books", label:"LAWCHA – Twenty Best Labor Books", group:"blue", url:"https://lawcha.org/2015/06/08/twenty-best-labor-books-first-cut/" },
  { id:"boston_review_list", label:"Boston Review – “Solidarity Makes Us Strong” Reading List", group:"blue", url:"https://www.bostonreview.net/reading-list/solidarity-makes-us-strong/" },
  { id:"fec_data", label:"FEC Campaign Finance Data", group:"red", url:"https://www.fec.gov/data/" },
  { id:"ncsl_cba", label:"NCSL – Unions & Collective Bargaining Legislation Database", group:"red", url:"https://www.ncsl.org/labor-and-employment/unions-and-collective-bargaining-legislation-database" },
  { id:"strikemap_org", label:"Strikemap.org (crowd-sourced)", group:"red", url:"https://strikemap.org/" },
  { id:"opm_cba", label:"OPM – Federal Collective Bargaining Agreements", group:"red", url:"https://www.opm.gov/policy-data-oversight/labor-management-relations/collective-bargaining-agreements/" },
  { id:"candid_unions", label:"Candid – U.S. Labor Unions: Facts & Financials", group:"red", url:"https://blog.candid.org/post/key-facts-figures-and-trends-among-u-s-labor-unions/" },
  { id:"elors", label:"DOL OLMS – Online Public Disclosure Room", group:"red", url:"https://www.dol.gov/agencies/olms/public-disclosure-room" },
  { id:"kaggle_union_membership", label:"Union Membership & Coverage (Kaggle / CPS)", group:"red", url:"https://www.kaggle.com/datasets/mrisdal/union-membership-coverage" },
  { id:"unionfacts", label:"UnionFacts.com Database", group:"red", url:"https://unionfacts.com" },
  { id:"sa_union_list", label:"South Africa – Registered Trade Unions List", group:"red", url:"https://labourguide.co.za/general/trade-unions-in-south-africa" },
  { id:"hbs_union_hist", label:"HBS – Trade Union Membership Historical Data (1880–2010)", group:"red", url:"https://www.hbs.edu/businesshistory/courses/teaching-resources/historical-data-visualization/details" },
  { id:"loc_afl", label:"Library of Congress – American Federation of Labor Records", group:"green", url:"https://www.loc.gov/collections/american-federation-of-labor-records/" },
  { id:"gdads", label:"Global Digital Activism Data Set (ICPSR)", group:"red", url:"https://www.icpsr.umich.edu/web/ICPSR/studies/34625" },
  { id:"labor_in_america", label:"UMD Digital Collections – Labor", group:"green", url:"https://digital.lib.umd.edu/collecting-areas/labor" }
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

  function approxTextWidth(label, isHub) {
    const L = (label || "").length;
    const size = isHub ? 12 : 11;
    return Math.max(28, L * (size * 0.58));
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

    nodes.forEach(n => {
      n.x = w/2 + (Math.random() - 0.5) * w * 0.35;
      n.y = h/2 + (Math.random() - 0.5) * h * 0.35;
    });

    const link = g.selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#b5b5b5")
      .attr("stroke-width", 1)
      .attr("opacity", 0.80);

    let sim;

    const node = g.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", d => String(d.id).startsWith("hub_") ? 17 : 9)
      .attr("fill", d => colors[d.group] || colors.gray)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", d => String(d.id).startsWith("hub_") ? 2 : 1)
      .call(d3.drag()
        .on("start", (e,d) => {
          if (!e.active && sim) sim.alphaTarget(0.35).restart();
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
      .attr("font-size", d => String(d.id).startsWith("hub_") ? "12px" : "11px")
      .attr("dx", d => String(d.id).startsWith("hub_") ? 22 : 14)
      .attr("dy", 4)
      .attr("fill", "#000000")
      .attr("font-weight", d => String(d.id).startsWith("hub_") ? 900 : 650)
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .style("pointer-events", "none");

    const labelBoxes = nodes.map(n => {
      const isHub = String(n.id).startsWith("hub_");
      const wBox = approxTextWidth(n.label, isHub) + (isHub ? 34 : 26);
      const hBox = (isHub ? 18 : 16) + 8;
      return { node: n, w: wBox, h: hBox };
    });

    function forceLabelCollide() {
      for (let i = 0; i < labelBoxes.length; i++) {
        for (let j = i + 1; j < labelBoxes.length; j++) {
          const a = labelBoxes[i], b = labelBoxes[j];
          const ax = a.node.x + (String(a.node.id).startsWith("hub_") ? 22 : 14);
          const ay = a.node.y;
          const bx = b.node.x + (String(b.node.id).startsWith("hub_") ? 22 : 14);
          const by = b.node.y;

          const dx = bx - ax;
          const dy = by - ay;

          const minX = (a.w + b.w) / 2 + 14;
          const minY = (a.h + b.h) / 2 + 10;

          if (Math.abs(dx) < minX && Math.abs(dy) < minY) {
            const sx = (minX - Math.abs(dx)) * (dx === 0 ? (Math.random() - 0.5) : Math.sign(dx));
            const sy = (minY - Math.abs(dy)) * (dy === 0 ? (Math.random() - 0.5) : Math.sign(dy));
            const push = 0.035;

            a.node.vx -= sx * push;
            a.node.vy -= sy * push;
            b.node.vx += sx * push;
            b.node.vy += sy * push;
          }
        }
      }
    }

    sim = d3.forceSimulation(nodes)
      .alphaDecay(0.03)
      .velocityDecay(0.28)
      .force("link", d3.forceLink(links).id(d => d.id)
        .distance(() => 85 + Math.random() * 120)
        .strength(0.85)
      )
      .force("charge", d3.forceManyBody().strength(-520))
      .force("center", d3.forceCenter(w/2, h/2))
      .force("collide", d3.forceCollide().radius(d => String(d.id).startsWith("hub_") ? 34 : 24).iterations(3))
      .force("radial", d3.forceRadial(d => String(d.id).startsWith("hub_") ? 5 : 170 + Math.random() * 40, w/2, h/2).strength(0.03))
      .force("jitterX", d3.forceX(w/2 + (Math.random() - 0.5) * 40).strength(0.02))
      .force("jitterY", d3.forceY(h/2 + (Math.random() - 0.5) * 40).strength(0.02))
      .on("tick", () => {
        forceLabelCollide();

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
