// King's Chair — global scripts

(function () {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

(function () {
  const burger = document.getElementById("nav-burger");
  const mobileMenu = document.getElementById("nav-mobile-panel");
  const iconOpen = document.getElementById("icon-hamburger");
  const iconClose = document.getElementById("icon-close");
  if (!burger || !mobileMenu || !iconOpen || !iconClose) return;

  function isOpen() {
    return mobileMenu.classList.contains("is-open");
  }

  function openMenu() {
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    iconOpen.classList.add("is-hidden");
    iconClose.classList.remove("is-hidden");
  }

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    iconOpen.classList.remove("is-hidden");
    iconClose.classList.add("is-hidden");
  }

  burger.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (burger.contains(e.target) || mobileMenu.contains(e.target)) return;
    closeMenu();
  });
})();

(function () {
  const header = document.getElementById("site-header");
  const progress = document.getElementById("scroll-progress");
  if (!header) return;

  let ticking = false;

  function updateChrome() {
    header.classList.toggle("is-sticky", window.scrollY > 10);

    if (progress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct + "%";
    }
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateChrome);
  }

  updateChrome();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateChrome);
})();

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
})();

(function () {
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const tiles = document.querySelectorAll("[data-gallery-src]");
  if (!lightbox || !lightboxImage || !tiles.length) return;

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function isOpen() {
    return !lightbox.classList.contains("hidden");
  }

  function getFocusable() {
    return Array.from(lightbox.querySelectorAll(FOCUSABLE)).filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );
  }

  function openLightbox(src, alt, caption) {
    lastFocused = document.activeElement;
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || alt || "";
    }
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    document.body.classList.remove("overflow-hidden");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const src = tile.getAttribute("data-gallery-src");
      const alt = tile.getAttribute("data-gallery-alt") || "";
      const caption = tile.getAttribute("data-gallery-caption") || "";
      if (src) openLightbox(src, alt, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;

    if (e.key === "Escape") {
      closeLightbox();
      return;
    }

    if (e.key !== "Tab") return;

    const focusable = getFocusable();
    if (!focusable.length) {
      e.preventDefault();
      lightbox.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && (active === first || !lightbox.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !lightbox.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  });
})();

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = reduceMotion ? "auto" : "smooth";

  function initCarousel(trackId, prevId, nextId, itemSelector) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!track) return;

    function scrollBySlide(direction) {
      const item = track.querySelector(itemSelector);
      if (!item) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
      track.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: scrollBehavior });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => scrollBySlide(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => scrollBySlide(1));
  }

  initCarousel("gallery-track", "gallery-prev", "gallery-next", ".gallery-tile");
  initCarousel("reviews-track", "reviews-prev", "reviews-next", ".review-card");
})();

(function () {
  const gallery = document.getElementById("gallery");
  const header = document.getElementById("site-header");
  if (!gallery || !header) return;

  const rail = gallery.querySelector(".gallery-rail");
  const pin = gallery.querySelector(".gallery-wordmark-pin");
  const wordmark = gallery.querySelector(".gallery-wordmark");
  const mark = gallery.querySelector(".gallery-mark");
  if (!rail || !pin || !wordmark || !mark) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const STICK_GAP = 20;
  const FADE_RANGE = 28;
  let startOffset = 0;
  let fullPinHeight = 0;
  let measuring = false;

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function measurePin() {
    measuring = true;
    const prevFade = gallery.style.getPropertyValue("--gallery-fade");
    const wasActive = gallery.classList.contains("is-mark-active");
    const wasFixed = pin.classList.contains("is-fixed");

    // Measure the full wordmark at rest (not fixed, words visible)
    pin.classList.remove("is-fixed");
    pin.style.position = "";
    pin.style.top = "";
    pin.style.left = "";
    pin.style.width = "";
    gallery.style.setProperty("--gallery-fade", "0");
    gallery.classList.remove("is-mark-active");

    fullPinHeight = pin.offsetHeight || 160;
    startOffset = Math.max(0, gallery.offsetHeight / 2 - fullPinHeight / 2);

    if (prevFade) gallery.style.setProperty("--gallery-fade", prevFade);
    else gallery.style.removeProperty("--gallery-fade");
    gallery.classList.toggle("is-mark-active", wasActive);
    pin.classList.toggle("is-fixed", wasFixed);
    measuring = false;
  }

  function setResting() {
    pin.classList.remove("is-fixed");
    pin.style.position = "absolute";
    pin.style.top = startOffset + "px";
    pin.style.left = "0";
    pin.style.width = "100%";
  }

  function setFixed(stickTop, railRect) {
    pin.classList.add("is-fixed");
    pin.style.position = "fixed";
    pin.style.top = stickTop + "px";
    pin.style.left = railRect.left + "px";
    pin.style.width = railRect.width + "px";
  }

  function updateGalleryMark() {
    if (measuring) return;

    const headerBottom = header.getBoundingClientRect().bottom;
    const stickTop = headerBottom + STICK_GAP;
    const galleryRect = gallery.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();

    // Where the mark's resting point sits in the viewport right now
    const startViewTop = galleryRect.top + startOffset;

    let fade = 0;

    if (startViewTop > stickTop) {
      // Still below the nav — sit at the gallery start point
      setResting();
      fade = clamp((stickTop + FADE_RANGE - startViewTop) / FADE_RANGE, 0, 1);
    } else {
      // Past the start point — fix under the nav so it can travel into About+
      setFixed(stickTop, railRect);
      fade = 1;
    }

    if (reduceMotion.matches) fade = fade > 0.5 ? 1 : 0;

    gallery.style.setProperty("--gallery-fade", fade.toFixed(3));
    gallery.classList.toggle("is-mark-active", fade > 0.85);
    markTicking = false;
  }

  let markTicking = false;

  function onMarkScroll() {
    if (markTicking) return;
    markTicking = true;
    requestAnimationFrame(updateGalleryMark);
  }

  function refresh() {
    measurePin();
    updateGalleryMark();
  }

  refresh();
  window.addEventListener("scroll", onMarkScroll, { passive: true });
  window.addEventListener("resize", refresh);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refresh);
  }
})();

(function () {
  const track = document.getElementById("gallery-track");
  const indexEl = document.getElementById("gallery-index");
  if (!track || !indexEl) return;

  const tiles = Array.from(track.querySelectorAll(".gallery-tile"));
  if (!tiles.length) return;

  const total = String(tiles.length).padStart(2, "0");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateIndex() {
    const trackRect = track.getBoundingClientRect();
    let bestIdx = 0;
    let bestDist = Infinity;
    tiles.forEach((tile, i) => {
      const rect = tile.getBoundingClientRect();
      const dist = Math.abs(rect.left - trackRect.left);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    indexEl.textContent = pad(bestIdx + 1) + " — " + total;
  }

  track.addEventListener("scroll", updateIndex, { passive: true });
  window.addEventListener("resize", updateIndex);
  updateIndex();
})();
