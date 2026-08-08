---
layout: about
title: about
permalink: /

subtitle: "/nikoˈlas iθˈkjeɾdo/"
pronouns: "he/him"

profile:
  align: right
  image: prof_pic.png
  image_circular: false

selected_papers: false
social: true

announcements:
  enabled: false

latest_posts:
  enabled: false
---

<span class="first-word">Welcome!</span> I am a PhD student in
[Politics](https://as.nyu.edu/departments/politics.html) at
[New York University](https://gsas.nyu.edu/).
I also hold an
[MA in Social Sciences](https://ijlinz.es/en/postgraduates/master-degree-social-sciences/sc-plan/)
from the [Juan Linz Institute](https://www.uc3m.es/ss/Satellite/UC3MInstitucional/en/Detalle/Organismo_C/1384792655838/1371206581851/_Juan_Linz__Institute)
(formerly the [Juan March Institute](https://en.wikipedia.org/wiki/Instituto_Carlos_III-Juan_March)).

My research interests lie in the political economy of democratic
representation in Europe and North America. I am interested in why the economic
preferences of some groups translate into policy while others do not, and in
the role that organized interests (especially labor unions) and electoral
institutions play in that gap.

You can download my updated CV <a href="/assets/pdf/cv.pdf" target="_blank" rel="noopener">here</a>.

Feel free to reach out to me at <span id="contact-email">pi2100 [at] nyu [dot] edu</span>.

<script>
  // The address is never written out in the page source — a scraper reading the
  // HTML only sees "pi2100 [at] nyu [dot] edu". The link is assembled in the
  // browser; with JS off the obfuscated text simply stays as plain text.
  (function () {
    var el = document.getElementById("contact-email");
    if (!el) return;
    var link = document.createElement("a");
    link.href = "mailto:" + "pi2100" + "@" + "nyu" + "." + "edu";
    link.textContent = el.textContent;
    el.parentNode.replaceChild(link, el);
  })();
</script>
