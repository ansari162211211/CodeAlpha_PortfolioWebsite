/* Mobile nav toggle */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const icon = navToggle.querySelector("i");
    if (navLinks.classList.contains("open")) {
      icon.classList.replace("fa-bars", "fa-xmark");
    } else {
      icon.classList.replace("fa-xmark", "fa-bars");
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      const icon = navToggle.querySelector("i");
      icon.classList.replace("fa-xmark", "fa-bars");
    });
  });
}

/* Navbar shadow on scroll */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* Resume modal — Show Resume */
const resumeModal = document.getElementById("resume-modal");
const showResumeBtn = document.getElementById("show-resume-btn");
const heroResumeBtn = document.getElementById("hero-resume-btn");
const resumeClose = document.getElementById("resume-close");
const resumeOverlay = document.getElementById("resume-modal-overlay");

function openResume() {
  resumeModal.classList.add("active");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeResume() {
  resumeModal.classList.remove("active");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (showResumeBtn) {
  showResumeBtn.addEventListener("click", openResume);
}

if (heroResumeBtn) {
  heroResumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openResume();
  });
}

if (resumeClose) resumeClose.addEventListener("click", closeResume);
if (resumeOverlay) resumeOverlay.addEventListener("click", closeResume);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && resumeModal.classList.contains("active")) {
    closeResume();
  }
});

/* Scroll reveal animations */
const revealCards = document.querySelectorAll(
  ".about-card, .feature-card, .skill-card, .project-card-pro, .internship-banner, .contact-card, .resume-card",
);

/* Section title underline animation */
const animateTitles = document.querySelectorAll(".section-title.animate-title");
const titleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("title-visible");
      }
    });
  },
  { threshold: 0.5 },
);
animateTitles.forEach((title) => titleObserver.observe(title));

/* Stagger project cards on reveal */
const projectCards = document.querySelectorAll(".project-card-pro");
projectCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.08}s`;
});

revealCards.forEach((card) => card.classList.add("reveal-card"));

const revealOnScroll = () => {
  revealCards.forEach((card) => {
    const position = card.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;
    if (position < trigger) {
      card.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* Animate skill bars when section is visible */
const skillBars = document.querySelectorAll(".skill-bar span[data-width]");
const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const card = bar.closest(".skill-card");
    if (!card || card.classList.contains("bars-animated")) return;
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      bar.style.width = bar.dataset.width;
      card.classList.add("bars-animated");
    }
  });
};

skillBars.forEach((bar) => {
  bar.style.width = "0%";
});

window.addEventListener("scroll", animateSkillBars);
animateSkillBars();
