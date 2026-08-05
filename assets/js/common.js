$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });
  }

  // NOTE: upstream al-folio styles Jupyter notebook iframes here. That block was
  // removed. It called determineComputedTheme(), which lives in theme.js — a file
  // that is never loaded because dark mode is disabled. The call ran unconditionally
  // (before the iframe loop), so it threw ReferenceError on EVERY page and aborted
  // the rest of this ready handler, silently killing the popover init below.
  // This site has no notebooks, so the whole block was dead weight. If notebooks are
  // ever added, restore it from upstream AND guard the call, e.g.
  //   const t = typeof determineComputedTheme === "function" ? determineComputedTheme() : "light";

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
