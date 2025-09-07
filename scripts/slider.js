document.addEventListener("DOMContentLoaded", function(){
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots .dot");
  let idx = 0;
  function showSlide(i) {
    slides.forEach((s,j) => s.classList.toggle('active', j === i));
    dots.forEach((d,j) => d.classList.toggle('active', j === i));
    idx = i;
  }
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
  Optional: Auto-play
  setInterval(() => showSlide((idx+1)%slides.length), 7000);
});




