
"use strict";

// IMPORTANT:
// Replace this with your real WhatsApp number.
// Indian example format: 919876543210
// Do not include +, spaces, or hyphens.
const WHATSAPP_NUMBER = "919342568248";

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// PORTFOLIO FILTERS
const filterButtons = document.querySelectorAll(".filter-button");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    portfolioCards.forEach((card) => {
      const shouldShow =
        selectedFilter === "all" ||
        card.dataset.category === selectedFilter;

      card.hidden = !shouldShow;
    });
  });
});

// PRESELECT SERVICE FROM SERVICE LINKS
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.getElementById("service");
    serviceSelect.value = link.dataset.service;
  });
});

// AUTOMATIC COPYRIGHT YEAR
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// WHATSAPP ENQUIRY FORM
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const formData = new FormData(contactForm);

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const service = String(formData.get("service") || "");
  const message = String(formData.get("message") || "").trim();

  const whatsappMessage = [
    "Hello ControlPlusWe!",
    "",
    "I'd like to enquire about your services.",
    "",
    `Name: ${name}`,
    `Email: ${email || "Not provided"}`,
    `Service: ${service}`,
    `Project details: ${message}`
  ].join("\n");

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    formStatus.textContent =
      "Please add your real WhatsApp number in script.js before submitting.";
    formStatus.style.color = "#C33429";
    return;
  }

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const whatsappWindow = window.open(whatsappURL, "_blank");

  if (whatsappWindow) {
    whatsappWindow.opener = null;

    formStatus.textContent =
      "WhatsApp opened. Review your enquiry and press Send.";
    formStatus.style.color = "#167536";
  } else {
    formStatus.textContent =
      "Your browser blocked the new window. Allow pop-ups and try again.";
    formStatus.style.color = "#C33429";
  }
});
