document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });
  }

  // Highlight current page in nav
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Gallery filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".gallery-item");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      items.forEach((item) => {
        item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter);
      });
    });
  });

  // Gallery lightbox
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        lbImg.src = item.querySelector("img").src.replace(/w=\d+/, "w=1400");
        lightbox.classList.add("open");
      });
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target !== lbImg) lightbox.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lightbox.classList.remove("open");
    });
  }

  // Pre-select service on booking page via ?service=
  const serviceSelect = document.querySelector("#service");
  const preset = new URLSearchParams(location.search).get("service");
  if (serviceSelect && preset) serviceSelect.value = preset;

  // Booking date can't be in the past
  const dateInput = document.querySelector("#date");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  // Forms (front-end only)
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector(".form-msg");
      const name = form.querySelector("[name=name]")?.value.trim();
      if (msg) {
        msg.textContent =
          form.dataset.form === "booking"
            ? `Thank you${name ? ", " + name : ""}! Your appointment request has been received. We'll confirm by phone or email shortly.`
            : `Thank you${name ? ", " + name : ""}! Your message has been sent. We'll get back to you within 24 hours.`;
        msg.classList.add("show");
      }
      form.reset();
    });
  });

  document.querySelectorAll(".newsletter").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      input.value = "";
      input.placeholder = "Subscribed — thank you!";
    });
  });
});
