const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Python Developer"
];

let index = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing-text");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeEffect() {
  if (charIndex < roles[index].length) {
    typingElement.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 60);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(typeEffect, 300);
  }
}

if (typingElement) {
  if (prefersReducedMotion) {
    typingElement.textContent = roles[0];
  } else {
    typeEffect();
  }
}


/* ===== SCROLL ANIMATION ===== */
const hiddenBlocks = document.querySelectorAll(".hidden");

if (prefersReducedMotion) {
  hiddenBlocks.forEach(el => el.classList.add("show"));
} else {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  hiddenBlocks.forEach(el => observer.observe(el));
}

/* ===== MOBILE NAV ===== */
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".glass-nav");
const navOverlay = document.querySelector(".nav-overlay");

if (navToggle && navPanel && navOverlay) {
  const closeNav = () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const openNav = () => {
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
  };

  navToggle.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) {
      closeNav();
      return;
    }
    openNav();
  });

  navOverlay.addEventListener("click", closeNav);
  navPanel.querySelectorAll("a").forEach(link => link.addEventListener("click", closeNav));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeNav();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}
