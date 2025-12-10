
const container = document.querySelector('container')
// following navbar on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    } else {
    navbar.classList.remove('scrolled');
  }
});

// getting the search input in header
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let query = form.querySelector('input').value

    tvMazeApi()
});

// getting movie from API



async function tvMazeApi (query) {
    const request = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    const movies = await request.json() 
    console.log(movies);
    

    makeImages()
    
}

function makeImages(movies) {
  for (let movie in movies) {
    let src = movie.show.image.medium;

    const img = document.createElement("img")
    img.src-src;

    container.appendChild(img);
  }
    
}

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

