(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = document.getElementById("nav");
  const progress = document.getElementById("progress");
  const parallax = document.querySelector("[data-parallax]");

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.setProperty("--progress", max > 0 ? String(Math.min(1, y / max)) : "0");
      if (parallax && !reduceMotion && y < window.innerHeight * 1.2) {
        parallax.style.translate = `0 ${Math.round(y * 0.08)}px`;
      }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  const revealables = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealables.forEach((el, i) => {
      el.style.setProperty("--delay", `${(i % 4) * 90}ms`);
      observer.observe(el);
    });
  }

  // A menu card opens that meal in the cook board below.
  for (const card of document.querySelectorAll("[data-pick-meal]")) {
    card.addEventListener("click", () => {
      const button = document.querySelector(`.cook [data-meal="${card.dataset.pickMeal}"]`);
      if (button && button.getAttribute("aria-pressed") !== "true") button.click();
    });
  }

  function countUp(el) {
    const target = Number(el.dataset.count);
    if (reduceMotion || !target) return;
    const start = performance.now();
    const duration = 1400;
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(frame);
    }
    el.textContent = "0";
    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll("[data-count]");
  if (window.PantryData) {
    const recipes = document.querySelector("[data-count]");
    const ingredients = document.querySelector('[data-count="51"]');
    if (recipes) recipes.dataset.count = String(window.PantryData.dishes.length);
    if (ingredients) ingredients.dataset.count = String(window.PantryData.ingredients.length);
  }
  counters.forEach(countUp);
})();
