// Dark mode is disabled site-wide (enable_darkmode: false), so al-folio never loads
// theme.js — yet several of its scripts call determineComputedTheme() unconditionally
// at top level (search-setup, no_defer, mermaid-, plotly-, vega-, echarts-,
// diff2html-setup). Without a definition each one throws ReferenceError and aborts,
// which silently killed the popover initialisation in common.js.
//
// Defining the light-mode answer once fixes every current and future call site without
// pulling in theme.js, which would add localStorage writes and media-query listeners
// this site has no use for.
//
// If dark mode is ever enabled, head.liquid loads theme.js instead of this file and
// the real implementation takes over.
window.determineComputedTheme = function () {
  return "light";
};
