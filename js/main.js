document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".filter-link");
  const sections = document.querySelectorAll(".menu-section[id]");
  const filterWrapper = document.querySelector(".filter");

  // REAL sticky filter height
  function getOffset() {
    return (filterWrapper ? filterWrapper.offsetHeight : 0) + 80;
  }

  // =========================
  // CLICK SCROLL (anchor override)
  // =========================
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) return;

      const targetSection = document.querySelector(targetId);

      if (!targetSection) return;

      // Default anchor-u tam blokla
      e.preventDefault();
      e.stopPropagation();

      const offset = getOffset();

      // Daha stabil absolute top calculation
      const y =
        targetSection.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      // URL hash dəyişsin amma jump etməsin
      history.replaceState(null, null, targetId);
    });
  });

  // =========================
  // SCROLLSPY
  // =========================
  function setActiveLink() {
  // Sticky filter + safety space
  const triggerLine = window.scrollY + getOffset() + 10;

  let currentSection = null;

  // Məntiq:
  // Trigger xəttini keçən SON section active qalır
  sections.forEach((section) => {
    if (section.offsetTop <= triggerLine) {
      currentSection = section;
    }
  });

  // Əgər heç biri yoxdursa birincini seç
  if (!currentSection && sections.length > 0) {
    currentSection = sections[0];
  }

  // Bütün active-ləri sil
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Yalnız cari section linkini aktiv et
  if (currentSection) {
    const activeLink = document.querySelector(
      `.filter-link[href="#${currentSection.id}"]`
    );

    if (activeLink) {
      activeLink.classList.add("active");

      // Horizontal center
      if (filterWrapper) {
        const x =
          activeLink.offsetLeft -
          filterWrapper.offsetWidth / 2 +
          activeLink.offsetWidth / 2;

        filterWrapper.scrollTo({
          left: x,
          behavior: "smooth",
        });
      }
    }
  }
}

  // Scroll zamanı aktiv et
  window.addEventListener("scroll", setActiveLink);

  // Page load-da da aktiv et
  setActiveLink();
});
