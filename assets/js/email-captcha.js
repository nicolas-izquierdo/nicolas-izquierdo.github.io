(() => {
  const init = () => {
    const q = document.getElementById("captchaQ");
    const a = document.getElementById("captchaA");
    const show = document.getElementById("captchaBtn");
    const fresh = document.getElementById("captchaNew");
    const msg = document.getElementById("captchaMsg");
    const box = document.getElementById("revealSuccess");
    const link = document.getElementById("revealLink");

    if (!q || !a || !show || !fresh || !msg || !box || !link) return;

    const buildEmail = () => {
      const p1 = String.fromCharCode(112,97,105,122,113,117,105,101);
      const p2 = String.fromCharCode(99,108,105,111);
      const p3 = String.fromCharCode(117,99,51,109);
      const p4 = String.fromCharCode(101,115);
      return `${p1}@${p2}.${p3}.${p4}`;
    };

    let answer = null;

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const newCaptcha = () => {
      const x = rand(2, 9);
      const y = rand(2, 9);
      const add = Math.random() < 0.7;
      answer = add ? x + y : x * y;
      q.textContent = add ? `${x} + ${y}` : `${x} * ${y}`;
      a.value = "";
      msg.textContent = "";
      box.style.display = "none";
    };

    const reveal = () => {
      const v = a.value.trim();
      if (!v) { msg.textContent = "Type the answer."; return; }
      const n = Number(v);
      if (!Number.isFinite(n)) { msg.textContent = "Numbers only."; return; }
      if (n !== answer) { msg.textContent = "Not quite — try again."; return; }

      const e = buildEmail();
      link.textContent = e;
      link.href = `mailto:${e}?subject=Labor%20Politics%20Resources%20Suggestion`;
      box.style.display = "block";
      msg.textContent = "";
    };

    show.onclick = reveal;
    fresh.onclick = newCaptcha;
    a.addEventListener("keydown", ev => { if (ev.key === "Enter") reveal(); });

    newCaptcha();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
