// following navbar on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// featured movies carousel
const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll(".slide").length;
let index = 0;

function nextSlide() {
  index++;
  slides.style.transition = "transform 0.6s ease";
  slides.style.transform = `translateX(-${index * 100}vw)`;

  if (index >=   slideCount) {
    setTimeout(() => {
      slides.style.transition = "none";
      index = 0;
      slides.style.transform = `translateX(0)`;
    }, 600);
  }
}

setInterval(nextSlide, 15000);

