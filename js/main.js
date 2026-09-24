/* Link CV - interaksi halaman */
(function () {
  "use strict";

  /* 1. Hero: CV PDF berubah menjadi webpage dengan link pribadi.
        Fase (atribut data-p pada #stage): 0 = CV kertas, 1 = webpage muncul,
        2 = link tersalin. */
  function initHeroStage() {
    var stage = document.getElementById("stage");
    var urlEl = document.getElementById("url");
    if (!stage || !urlEl) return;

    /* JavaScript aktif: lepas mode fallback (.no-js) supaya animasi berjalan. */
    document.documentElement.classList.remove("no-js");

    var FULL_URL = "linkcv.id/rani-putri";
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function typeUrl() {
      var i = 0;
      var timer = setInterval(function () {
        urlEl.textContent = FULL_URL.slice(0, ++i);
        if (i >= FULL_URL.length) {
          clearInterval(timer);
          setTimeout(function () {
            stage.dataset.p = "2";
          }, 500);
          setTimeout(runLoop, 4200);
        }
      }, 75);
    }

    function runLoop() {
      stage.dataset.p = "0";
      urlEl.textContent = "";
      setTimeout(function () {
        stage.dataset.p = "1";
        setTimeout(typeUrl, 700);
      }, 2400);
    }

    if (reduceMotion) {
      stage.dataset.p = "2";
      urlEl.textContent = FULL_URL;
    } else {
      runLoop();
    }
  }

  /* 2. Cara kerja: garis penghubung tergambar saat section terlihat. */
  function initSteps() {
    var steps = document.getElementById("steps");
    if (!steps) return;

    if (!("IntersectionObserver" in window)) {
      steps.classList.add("in");
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          steps.classList.add("in");
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(steps);
  }

  /* 3. Galeri contoh: pratinjau bergulir saat hover (desktop), dan pratinjau
        penuh di dalam dialog saat diklik atau diketuk (semua perangkat). */
  function initGallery() {
    var minis = document.querySelectorAll(".mini");
    var shots = document.querySelectorAll(".shot");
    var dialog = document.getElementById("pv");
    var body = document.getElementById("pvBody");
    var urlEl = document.getElementById("pvUrl");
    var cta = document.getElementById("pvCta");
    var closeBtn = document.getElementById("pvClose");
    var BASE_WIDTH = 270; /* lebar miniatur di dalam kartu (px) */
    var current = null; /* kartu yang sedang dibuka */

    /* Jarak gulir otomatis saat hover = tinggi miniatur - tinggi jendela kartu */
    function measure() {
      minis.forEach(function (mini) {
        var distance = Math.max(
          0,
          mini.offsetHeight - mini.parentElement.clientHeight,
        );
        mini.style.setProperty("--s", distance + "px");
        /* miniatur yang lebih panjang bergulir lebih lama */
        mini.style.setProperty(
          "--t",
          Math.min(14, Math.max(4.5, distance / 80)) + "s",
        );
      });
    }

    measure();
    window.addEventListener("load", measure);
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(measure);
    window.addEventListener("resize", function () {
      measure();
      if (dialog && dialog.open) fitPreview();
    });

    if (!dialog || typeof dialog.showModal !== "function") return;

    /* Tautan WhatsApp diambil dari tombol yang sudah ada, jadi nomor cukup diubah sekali. */
    function whatsappLink(text) {
      var base = document.querySelector('a[href^="https://wa.me/"]');
      if (!base) return "#";
      var url = new URL(base.href);
      url.searchParams.set("text", text);
      return url.toString();
    }

    /* Perbesar miniatur agar memenuhi lebar dialog */
    function fitPreview() {
      var mini = body.firstElementChild;
      if (mini) mini.style.setProperty("--z", body.clientWidth / BASE_WIDTH);
    }

    function openPreview(shot) {
      var clone = shot.querySelector(".mini").cloneNode(true);
      clone.style.removeProperty("--s");
      body.replaceChildren(clone);
      body.scrollTop = 0;
      urlEl.textContent = shot.querySelector(".fbar span").textContent;
      cta.href = whatsappLink(
        "Halo Link CV, saya mau CV seperti contoh " +
          shot.querySelector("h3").textContent +
          ".",
      );
      current = shot;
      document.documentElement.style.overflow = "hidden";
      dialog.showModal();
      body.style.background = getComputedStyle(clone).backgroundColor;
      fitPreview();
    }

    shots.forEach(function (shot) {
      shot.setAttribute("role", "button");
      shot.setAttribute(
        "aria-label",
        "Buka pratinjau penuh: " + shot.querySelector("h3").textContent,
      );
      shot.addEventListener("click", function () {
        openPreview(shot);
      });
      shot.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPreview(shot);
        }
      });
    });

    closeBtn.addEventListener("click", function () {
      dialog.close();
    });
    /* klik di luar kartu dialog (pada latar) menutup pratinjau */
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      document.documentElement.style.overflow = "";
      if (current) {
        current.focus({ preventScroll: true });
        current = null;
      }
    });
  }

  initHeroStage();
  initSteps();
  initGallery();
})();
