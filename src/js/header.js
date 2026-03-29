document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".announcement-slider");

  // safety check
  if (!slider) return;

  const slides = slider.children;
  let slideIndex = 0;

  function slide() {
    slideIndex++;

    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }

    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    slider.style.transition = "transform 0.8s ease-in-out";
  }

  // slide every 5 seconds
  setInterval(slide, 5000);
});
