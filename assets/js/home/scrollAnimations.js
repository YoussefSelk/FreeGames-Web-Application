AOS.init({
  once: true, // Only initialize AOS once
  duration: 800, // Duration of animation
  easing: "ease-in-out", // Easing option
});

// Smooth scroll functionality for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
