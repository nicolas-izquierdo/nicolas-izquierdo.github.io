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

  // ---- NEW: 1–2 line descriptions for the info box (keyed by resource id)
  const resourceDesc = {
    apsa_labor_teach: "Curated syllabi, assignments, and teaching materials for labor politics courses.",
    unionstats: "U.S. union membership and coverage series (CPS-based) with long-run trends and downloads.",
    oecd_ictwss: "Cross-national database on unions, bargaining, wages, and labor-market institutions (ICTWSS).",
    ilostat_ir_desc: "Definitions and methodological notes for ILO’s industrial relations indicators.",
    ilostat_ir_download: "ILOSTAT topic page to explore and download industrial relations indicators.",
    bls_wsp: "Official U.S. BLS series on major work stoppages (strikes/lockouts) with tables and notes.",
    ilr_lat: "Cornell ILR strike & labor action tracker with searchable events and metadata.",
    aflcio_strikemap: "AFL-CIO map of ongoing and recent strikes and labor actions in the U.S.",
    clb: "Independent NGO documenting labor rights, strikes, and industrial relations in China.",
    labour_rights_indicators: "Quantitative cross-national indicators of labor rights, protections, and violations.",
    ituc_rights: "Annual global index measuring workers’ rights and violations across countries.",
    wcml: "UK archive and library collections focused on working-class and labor movement history.",
    lawcha_books: "Reading list from LAWCHA highlighting influential labor history books.",
    boston_review_list: "Reading list on solidarity, labor, and working-class politics from Boston Review.",
    fec_data: "Official U.S. Federal Election Commission bulk and API campaign finance data.",
    ncsl_cba: "State-by-state database tracking collective bargaining legislation and related policies.",
    strikemap_org: "Crowd-sourced strike map and event listings for monitoring labor unrest.",
    opm_cba: "Repository of U.S. federal collective bargaining agreements from OPM.",
    candid_unions: "Overview of U.S. labor union finances and nonprofit reporting via Candid/GuideStar.",
    elors: "U.S. DOL-OLMS disclosure portal for union filings (LM reports) and compliance data.",
    kaggle_union_membership: "Convenient Kaggle mirror of CPS union membership/coverage data for quick use.",
    unionfacts: "Union governance, finances, and related summaries compiled from public filings.",
    sa_union_list: "Directory-style listing of registered trade unions in South Africa.",
    hbs_union_hist: "Historical union membership series and visualization resources (1880–2010).",
    loc_afl: "Library of Congress digital collection for American Federation of Labor records.",
    gdads: "ICPSR dataset on digital activism events across countries with standardized coding.",
    labor_in_america: "University of Maryland digital collections related to labor history and movements.",
    warwick: "Digitised journals and newspapers of British trade unions",
    tuc: "Research library for the study of trade unions, collective bargaining and labour history (UK and Commonwealth)
  };

  const resources = [
    { id:"apsa_labor_teach", label:"APSA Labor Politics", group:"blue", url:"https://educate.apsanet.org/labor-politics-teaching-resource-collection" },
    { id:"warwick", label:"Labour Movement Newspapers and Journals (UK)", group:"red", url:"https://warwick.ac.uk/services/library/mrc/collections/digital/unionjournals/#Agriculture" },
    { id:"tuc", label:"Trades Union Congress Library", group:"red", url:"https://libguides.londonmet.ac.uk/special-collections/TUC" },    
    { id:"unionstats", label:"UnionStats.com", group:"red", url:"https://unionstats.com" },
    { id:"oecd_ictwss", label:"OECD/AIAS ICTWSS Database", group:"red", url:"https://www.oecd.org/en/data/datasets/oecdaias-ictwss-database.html" },
    { id:"bls_wsp", label:"BLS Work Stoppages Dataset", group:"red", url:"https://www.bls.gov/wsp/" },
    { id:"ilr_lat", label:"Cornell ILR – Labor Action Tracker", group:"red", url:"https://striketracker.ilr.cornell.edu/" },
    { id:"aflcio_strikemap", label:"AFL-CIO Strike Map", group:"red", url:"https://aflcio.org/strike-map" },
    { id:"clb", label:"China Labour Bulletin", group:"red", url:"https://clb.org.hk/" },
    { id:"labour_rights_indicators", label:"Labour Rights Indicators (Penn State)", group:"red", url:"https://labour-rights-indicators.la.psu.edu/" },
    { id:"ituc_rights", label:"ITUC Global Rights Index", group:"red", url:"https://www.ituc-csi.org/global-rights-index" },
    { id:"wcml", label:"Salford's Working Class Movement Library", group:"green", url:"https://www.wcml.org.uk/" },
    { id:"lawcha_books", label:"LAWCHA – Twenty Best Labor Books", group:"blue", url:"https://lawcha.org/2015/06/08/twenty-best-labor-books-first-cut/" },
    { id:"boston_review_list", label:"“Solidarity Makes Us Strong” Reading List", group:"blue", url:"https://www.bostonreview.net/reading-list/solidarity-makes-us-strong/" },
    { id:"fec_data", label:"FEC Campaign Finance Data", group:"red", url:"https://www.fec.gov/data/" },
    { id:"ncsl_cba", label:"NCSL – Unions & Collective Bargaining Legislation Database", group:"red", url:"https://www.ncsl.org/labor-and-employment/unions-and-collective-bargaining-legislation-database" },
    { id:"strikemap_org", label:"Strikemap.org", group:"red", url:"https://strikemap.org/" },
    { id:"opm_cba", label:"OPM – Federal Collective Bargaining Agreements", group:"red", url:"https://www.opm.gov/policy-data-oversight/labor-management-relations/collective-bargaining-agreements/" },
    { id:"candid_unions", label:"Candid – U.S. Labor Unions: Facts & Financials", group:"red", url:"https://blog.candid.org/post/key-facts-figures-and-trends-among-u-s-labor-unions/" },
    { id:"elors", label:"DOL OLMS – Online Public Disclosure Room", group:"red", url:"https://www.dol.gov/agencies/olms/public-disclosure-room" },
    { id:"kaggle_union_membership", label:"Union Membership & Coverage", group:"red", url:"https://www.kaggle.com/datasets/mrisdal/union-membership-coverage" },
    { id:"unionfacts", label:"UnionFacts.com", group:"red", url:"https://unionfacts.com" },
    { id:"hbs_union_hist", label:"Trade Union Membership Historical Data (1880–2010)", group:"red", url:"https://www.hbs.edu/businesshistory/courses/teaching-resources/historical-data-visualization/details" },
    { id:"loc_afl", label:"American Federation of Labor Records", group:"green", url:"https://www.loc.gov/collections/american-federation-of-labor-records/" },
    { id:"gdads", label:"Global Digital Activism Data Set", group:"red", url:"https://www.icpsr.umich.edu/web/ICPSR/studies/34625" },
    { id:"labor_in_america", label:"UMD Digital Collections – Labor", group:"green", url:"https://digital.lib.umd.edu/collecting-areas/labor" }
  ];

  const dataBranches = [
    // ---- CHANGE #2: branch labels are now BOLD (via font-weight) and CAPITALIZED (via label text)
    { id: "branch_contentious", label: "CONTENTIOUS",          group: "red" },
    { id: "branch_finance",     label: "FINANCE",              group: "red" },
    { id: "branch_cba",         label: "COLLECTIVE BARGAINING", group: "red" },
    { id: "branch_general",     label: "GENERAL",              group: "red" }
  ];

  const redBranchOf = {
    bls_wsp: "branch_contentious",
    ilr_lat: "branch_contentious",
    aflcio_strikemap: "branch_contentious",
    strikemap_org: "branch_contentious",
    clb: "branch_contentious",
    gdads: "branch_contentious",
    fec_data: "branch_finance",
    candid_unions: "branch_finance",
    elors: "branch_finance",
    ncsl_cba: "branch_cba",
    opm_cba: "branch_cba",
    unionstats: "branch_general",
    oecd_ictwss: "branch_general",
    labour_rights_indicators: "branch_general",
    ituc_rights: "branch_general",
    kaggle_union_membership: "branch_general",
    unionfacts: "branch_general",
    hbs_union_hist: "branch_general"
  };

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

  function cmToPx(cm) {
    return (cm * 96) / 2.54;
  }

  // ---- NEW: Info box (tooltip) injected once and reused
  const wrap = svg.node().parentElement || document.body;
  wrap.style.position = wrap.style.position || "relative";

  const infoBox = document.createElement("div");
  infoBox.id = "node-info-box";
  infoBox.style.position = "absolute";
  infoBox.style.maxWidth = "280px";
  infoBox.style.padding = "10px 12px";
  infoBox.style.background = "#fff";
  infoBox.style.border = "1px solid rgba(0,0,0,0.15)";
  infoBox.style.borderRadius = "10px";
  infoBox.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
  infoBox.style.fontSize = "0.9rem";
  infoBox.style.lineHeight = "1.25";
  infoBox.style.zIndex = 9999;
  infoBox.style.display = "none";

  infoBox.innerHTML = `
    <div style="font-weight:800;margin:0 0 6px 0;" id="node-info-title"></div>
    <div style="margin:0 0 8px 0;color:#444;" id="node-info-desc"></div>
    <a id="node-info-link" target="_blank" rel="noopener" style="font-weight:700;text-decoration:none;">
      Click here →
    </a>
  `;

  wrap.appendChild(infoBox);

  const infoTitleEl = infoBox.querySelector("#node-info-title");
  const infoDescEl  = infoBox.querySelector("#node-info-desc");
  const infoLinkEl  = infoBox.querySelector("#node-info-link");

  function hideInfoBox() {
    infoBox.style.display = "none";
  }

  function showInfoBoxForNode(d, event) {
    if (!d || !d.url) return;

    infoTitleEl.textContent = d.label || "";
    infoDescEl.textContent  = resourceDesc[d.id] || "Open this resource for details and documentation.";
    infoLinkEl.href         = d.url;

    // Place box near click position, relative to wrapper
    const rect = wrap.getBoundingClientRect();
    const x = (event.clientX - rect.left) + 12;
    const y = (event.clientY - rect.top) + 12;

    infoBox.style.left = `${x}px`;
    infoBox.style.top  = `${y}px`;
    infoBox.style.display = "block";
  }

  // Click outside: close box
  document.addEventListener("click", (e) => {
    const isCircle = e.target && e.target.tagName && e.target.tagName.toLowerCase() === "circle";
    const isInsideBox = e.target && infoBox.contains(e.target);
    if (!isCircle && !isInsideBox) hideInfoBox();
  });

  // Escape key: close box
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideInfoBox();
  });

  function buildGraph(filter, query) {
    g.selectAll("*").remove();
    hideInfoBox();

    const { w, h } = getSize();
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const cx = w / 2;
    const cy = h / 2;

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

    let nodes, links;

    if (filter === "red") {
      nodes = [hub].concat(dataBranches).concat(filtered);
      links = dataBranches.map(b => ({ source: hub.id, target: b.id, _kind: "hub-branch" }));
      filtered.forEach(r => {
        const bid = redBranchOf[r.id] || "branch_general";
        links.push({ source: bid, target: r.id, _kind: "branch-leaf" });
      });
    } else {
      nodes = [hub].concat(filtered);
      links = filtered.map(r => ({ source: hub.id, target: r.id, _kind: "hub-leaf" }));
    }

    const branchAngles = {};
    const branchCenters = {};
    if (filter === "red") {
      const N = dataBranches.length;
      const maxR = Math.max(180, Math.min(w, h) / 2 - 55);
      const branchR = maxR * 0.50;
      const leafR = maxR * 0.86;

      dataBranches.forEach((b, i) => {
        const ang = (-Math.PI / 2) + (2 * Math.PI * i / N);
        branchAngles[b.id] = ang;
        branchCenters[b.id] = {
          x: cx + Math.cos(ang) * branchR,
          y: cy + Math.sin(ang) * branchR,
          leafX: cx + Math.cos(ang) * leafR,
          leafY: cy + Math.sin(ang) * leafR
        };
      });
    }

    nodes.forEach(n => {
      const isHub = String(n.id).startsWith("hub_");
      const isBranch = String(n.id).startsWith("branch_");

      if (isHub) {
        n.x = cx; n.y = cy;
        n._branch = null;
      } else if (filter === "red" && isBranch) {
        n._branch = n.id;
        const c = branchCenters[n.id];
        n.x = c.x + (Math.random() - 0.5) * 14;
        n.y = c.y + (Math.random() - 0.5) * 14;
      } else if (filter === "red") {
        const bId = redBranchOf[n.id] || "branch_general";
        n._branch = bId;
        const c = branchCenters[bId];
        n.x = c.leafX + (Math.random() - 0.5) * 36;
        n.y = c.leafY + (Math.random() - 0.5) * 36;
      } else {
        n._branch = null;
        n.x = cx + (Math.random() - 0.5) * w * 0.35;
        n.y = cy + (Math.random() - 0.5) * h * 0.35;
      }
    });

    const link = g.selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#b5b5b5")
      .attr("stroke-width", d => d._kind === "hub-branch" ? 1.3 : 1)
      .attr("opacity", 0.80);

    let sim;

    const node = g.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", d => {
        if (String(d.id).startsWith("hub_")) return 17;
        if (String(d.id).startsWith("branch_")) return 13;
        return 9;
      })
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
      // ---- CHANGE #1: click shows info box instead of opening link immediately
      .on("click", (event, d) => {
        event.stopPropagation();
        if (d.url) showInfoBoxForNode(d, event);
      });

    const label = g.selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text(d => d.label)
      .attr("font-size", d => String(d.id).startsWith("hub_") ? "12px" : "11px")
      .attr("dx", d => String(d.id).startsWith("hub_") ? 22 : 14)
      .attr("dy", 4)
      .attr("fill", "#000000")
      // ---- CHANGE #2 (continued): branch labels are bold (and already capitalized via label text)
      .attr("font-weight", d => {
        if (String(d.id).startsWith("hub_")) return 900;
        if (String(d.id).startsWith("branch_")) return 900;
        return 650;
      })
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .style("pointer-events", "none");

    const PERIM_PAD_PX = cmToPx(0.8);
    const labelBoxes = nodes.map(n => {
      const isHub = String(n.id).startsWith("hub_");
      const wBox = approxTextWidth(n.label, isHub) + (isHub ? 34 : 26);
      const hBox = (isHub ? 18 : 16) + 8;
      const dx = isHub ? 22 : 14;
      return { node: n, dx, w: wBox, h: hBox };
    });

    function forceLabelCollide() {
      for (let i = 0; i < labelBoxes.length; i++) {
        for (let j = i + 1; j < labelBoxes.length; j++) {
          const a = labelBoxes[i], b = labelBoxes[j];

          const aCx = a.node.x + a.dx + a.w / 2;
          const aCy = a.node.y;
          const bCx = b.node.x + b.dx + b.w / 2;
          const bCy = b.node.y;

          const aHx = a.w / 2 + PERIM_PAD_PX;
          const aHy = a.h / 2 + PERIM_PAD_PX;
          const bHx = b.w / 2 + PERIM_PAD_PX;
          const bHy = b.h / 2 + PERIM_PAD_PX;

          const dx = bCx - aCx;
          const dy = bCy - aCy;

          const overlapX = (aHx + bHx) - Math.abs(dx);
          const overlapY = (aHy + bHy) - Math.abs(dy);

          if (overlapX > 0 && overlapY > 0) {
            const push = 0.013;
            if (overlapX < overlapY) {
              const sx = (dx === 0 ? (Math.random() - 0.5) : Math.sign(dx)) * overlapX;
              a.node.vx -= sx * push;
              b.node.vx += sx * push;
            } else {
              const sy = (dy === 0 ? (Math.random() - 0.5) : Math.sign(dy)) * overlapY;
              a.node.vy -= sy * push;
              b.node.vy += sy * push;
            }
          }
        }
      }
    }

    function forceClusters(alpha) {
      if (filter !== "red") return;

      const branchIds = dataBranches.map(b => b.id);
      const sepRadius = Math.max(220, Math.min(w, h) * 0.40);
      const sepStrength = 0.060 * alpha;

      for (const n of nodes) {
        if (!n._branch) continue;

        if (String(n.id).startsWith("branch_")) {
          const c = branchCenters[n._branch];
          const k = 0.34 * alpha;
          n.vx += (c.x - n.x) * k;
          n.vy += (c.y - n.y) * k;
        } else {
          const c = branchCenters[n._branch];
          const k = 0.22 * alpha;
          n.vx += (c.leafX - n.x) * k;
          n.vy += (c.leafY - n.y) * k;
        }

        for (const bId of branchIds) {
          if (bId === n._branch) continue;
          const c = branchCenters[bId];
          const dx = n.x - c.leafX;
          const dy = n.y - c.leafY;
          const dist = Math.hypot(dx, dy) || 1e-6;
          if (dist < sepRadius) {
            const m = (sepRadius - dist) / sepRadius;
            n.vx += (dx / dist) * m * sepStrength * 160;
            n.vy += (dy / dist) * m * sepStrength * 160;
          }
        }
      }
    }

    sim = d3.forceSimulation(nodes)
      .alpha(1)
      .alphaDecay(0.17)
      .velocityDecay(0.62)
      .force("link", d3.forceLink(links).id(d => d.id)
        .distance(l => {
          if (filter === "red") {
            if (l._kind === "hub-branch") return 140;
            if (l._kind === "branch-leaf") return 260 + Math.random() * 70;
          }
          return 110 + Math.random() * 80;
        })
        .strength(l => {
          if (filter === "red") {
            if (l._kind === "hub-branch") return 1.0;
            if (l._kind === "branch-leaf") return 0.92;
          }
          return 0.85;
        })
      )
      .force("charge", d3.forceManyBody()
        .strength(filter === "red" ? -360 : -520)
        .distanceMax(filter === "red" ? Math.max(w, h) * 0.38 : Math.max(w, h))
      )
      .force("center", d3.forceCenter(cx, cy))
      .force("collide", d3.forceCollide().radius(d => {
        if (String(d.id).startsWith("hub_")) return 42;
        if (String(d.id).startsWith("branch_")) return 40;
        return filter === "red" ? 30 : 24;
      }).iterations(4))
      .on("tick", () => {
        forceClusters(sim.alpha());
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

    const settleMs = 900;
    setTimeout(() => {
      sim.alphaTarget(0);
    }, settleMs);
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
