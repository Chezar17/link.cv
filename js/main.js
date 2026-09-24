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

  /* 3. Galeri contoh: hitung jarak gulir tiap miniatur, dan ketuk untuk memutar
        animasinya di layar sentuh. */
  function initGallery() {
    var minis = document.querySelectorAll(".mini");
    var shots = document.querySelectorAll(".shot");

    function measure() {
      minis.forEach(function (mini) {
        var distance = Math.max(
          0,
          mini.offsetHeight - mini.parentElement.clientHeight,
        );
        mini.style.setProperty("--s", distance + "px");
      });
    }

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(measure);

    shots.forEach(function (shot) {
      shot.addEventListener("click", function () {
        shot.classList.toggle("on");
      });
    });
  }

  initHeroStage();
  initSteps();
  initGallery();
})();
