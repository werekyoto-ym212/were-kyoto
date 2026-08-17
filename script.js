const flowSteps = document.querySelectorAll(".flow-step");
const flowBrowser = document.querySelector(".flow-browser");

if (flowSteps.length && flowBrowser && "IntersectionObserver" in window) {
  document.documentElement.classList.add("flow-enhanced");

  const setFlowStage = (step) => {
    flowSteps.forEach((item) => {
      item.classList.toggle("is-active", item === step);
    });

    flowBrowser.dataset.stage = step.dataset.step;
  };

  const flowObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) =>
          Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2)
          - Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2)
        )[0];

      if (activeEntry) {
        setFlowStage(activeEntry.target);
      }
    },
    {
      rootMargin: "-38% 0px -38% 0px",
      threshold: 0,
    }
  );

  flowSteps.forEach((step) => flowObserver.observe(step));
  setFlowStage(flowSteps[0]);
}

const menuToggle = document.querySelector(".menu-toggle");
const headerNav = document.querySelector(".header-nav");

if (menuToggle && headerNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");
    headerNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "メニューを閉じる" : "メニューを開く");
    headerNav.classList.toggle("is-open", willOpen);
  });

  headerNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const planItems = document.querySelectorAll(".plan-item");

if (planItems.length) {
  const activatePlan = (activeItem) => {
    planItems.forEach((item) => {
      const isActive = item === activeItem;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-expanded", String(isActive));
    });
  };

  planItems.forEach((item, index) => {
    item.addEventListener("click", () => activatePlan(item));
    item.addEventListener("focus", () => activatePlan(item));
    item.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
      const nextItem = planItems[(index + direction + planItems.length) % planItems.length];
      nextItem.focus();
    });
  });
}

const conceptGraphic = document.querySelector(".form-graphic-concept");

if (conceptGraphic && "IntersectionObserver" in window) {
  document.documentElement.classList.add("graphic-enhanced");

  const graphicObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-shaped");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -18% 0px" }
  );

  graphicObserver.observe(conceptGraphic);
}
