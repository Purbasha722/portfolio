(function () {
  var root = document.documentElement;
  var STORAGE_KEY = "mzp-theme";

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }
  function setStored(val) {
    try {
      localStorage.setItem(STORAGE_KEY, val);
    } catch (e) {
      /* storage unavailable — theme just won't persist */
    }
  }

  var stored = getStored();
  var prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (stored === "dark" || (!stored && prefersDark)) {
    root.classList.add("dark");
  }

  function applyToggleIcon(toggle) {
    var isDark = root.classList.contains("dark");
    toggle.setAttribute("aria-checked", isDark ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    // fade the page in once styles/fonts have had a beat to apply
    requestAnimationFrame(function () {
      document.body.classList.add("ready");
    });

    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      applyToggleIcon(toggle);
      toggle.addEventListener("click", function () {
        root.classList.toggle("dark");
        var isDark = root.classList.contains("dark");
        setStored(isDark ? "dark" : "light");
        applyToggleIcon(toggle);
      });
    }

    // mark the active nav tab based on current file
    var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".tabs a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (href === page || (page === "" && href === "index.html")) {
        a.classList.add("active");
      }
    });

    // scroll-reveal animation
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("in");
      });
    }

    // skill-meter fill animation on load / on scroll into view
    var meters = document.querySelectorAll(".meter i");
    if (meters.length) {
      if ("IntersectionObserver" in window) {
        var meterIo = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                var target = entry.target.getAttribute("data-fill") || "0%";
                entry.target.style.width = target;
                meterIo.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.4 }
        );
        meters.forEach(function (bar) {
          meterIo.observe(bar);
        });
      } else {
        meters.forEach(function (bar) {
          bar.style.width = bar.getAttribute("data-fill") || "0%";
        });
      }
    }

    // contact form: no backend, just a friendly confirmation
    var form = document.querySelector("[data-contact-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var note = form.querySelector("[data-form-note]");
        if (note) {
          note.textContent =
            "Message drafted — connect a form service or mailto link to actually send this.";
        }
      });
    }
  });
})();
