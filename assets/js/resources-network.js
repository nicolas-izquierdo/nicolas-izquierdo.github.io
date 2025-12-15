document.addEventListener("DOMContentLoaded", () => {

  const svg = d3.select("#graph");
  if (svg.empty()) {
    console.error("SVG not found");
    return;
  }

  const width = svg.node().clientWidth;
  const height = svg.node().clientHeight;

  const colors = {
    red: "#ff4d4d",
    blue: "#4da3ff",
    green: "#2ecc71",
    gray: "#aaa"
  };

  const nodes = [
    {id:"hub_data", label:"DATA", group:"red"},
    {id:"hub_teach", label:"TEACHING", group:"blue"},
    {id:"hub_arch", label:"ARCHIVES", group:"green"},

    {id:"unionstats", label:"UnionStats", group:"red", url:"https://unionstats.com"},
    {id:"ilr_lat", label:"Labor Action Tracker", group:"red", url:"https://striketracker.ilr.cornell.edu"},
    {id:"apsa", label:"APSA Teaching", group:"blue", url:"https://educate.apsanet.org/labor-politics-teaching-resource-collection"},
    {id:"tamiment", label:"Tamiment Archive", group:"green", url:"https://guides.nyu.edu/tamiment"}
  ];

  const links = [
    {source:"hub_data", target:"unionstats"},
    {source:"hub_data", target:"ilr_lat"},
    {source:"hub_teach", target:"apsa"},
    {source:"hub_arch", target:"tamiment"}
  ];

  const g = svg.append("g");

  const zoom = d3.zoom()
    .scaleExtent([0.5, 2.5])
    .on("zoom", e => g.attr("transform", e.transform));

  svg.call(zoom);

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(90))
    .force("charge", d3.forceManyBody().strength(-350))
    .force("center", d3.forceCenter(width/2, height/2))
    .on("tick", ticked);

  const link = g.selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke", "#888")
    .attr("stroke-width", 1);

  const node = g.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", d => d.id.startsWith("hub") ? 16 : 9)
    .attr("fill", d => colors[d.group] || colors.gray)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
    )
    .on("click", (_,d) => {
      if (d.url) window.open(d.url, "_blank");
    });

  const label = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
    .text(d => d.label)
    .attr("font-size", "11px")
    .attr("dx", 14)
    .attr("dy", 4)
    .attr("fill", "#eee");

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

  function dragstarted(e,d){
    if (!e.active) simulation.alphaTarget(0.3).restart();
    d.fx=d.x; d.fy=d.y;
  }
  function dragged(e,d){
    d.fx=e.x; d.fy=e.y;
  }
  function dragended(e,d){
    if (!e.active) simulation.alphaTarget(0);
    d.fx=null; d.fy=null;
  }

  document.getElementById("reset").onclick = () => {
    svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
  };

});
