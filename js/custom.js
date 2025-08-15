
let menuIcon = document.getElementById('menuIcon');
let menuClose = document.getElementById('nav_close');
let responsiveHeader = document.getElementById('responsiveHeader');

menuIcon.addEventListener("click", (e) => {
  responsiveHeader.classList.add("show")
  document.body.classList.add('scroll_off')
})

menuClose.addEventListener("click", (e) => {
  responsiveHeader.classList.remove("show")
  document.body.classList.remove('scroll_off')
})

$(document).ready(function () {
  $("#baking_area_carausel").owlCarousel({
    items: 4,
    loop: true,
    nav: true,
    smartSpeed: 550,
    navText: ['<div class="btn_left"><i class="far fa-chevron-left"></i></div>',
      '<div class="btn_left btn_right"><i class="far fa-chevron-right"></i></div>'],
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      576: {
        items: 3,
        nav: true,
      },
      1000: {
        items: 4,
        nav: true,
        loop: true
      }
    }
  });
});

$(document).ready(function () {
  $("#product_area_carausel").owlCarousel({
    items: 4,
    loop: true,
    nav: true,
    smartSpeed: 550,
    navText: ['<div class="btn_left"><i class="far fa-chevron-left"></i></div>',
      '<div class="btn_left btn_right"><i class="far fa-chevron-right"></i></div>'],
    responsive: {
      0: {
        items: 2,
        nav: true
      },
      576: {
        items: 3,
        nav: true,
      },

      1000: {
        items: 4,
        nav: true,
        loop: true
      }
    }
  });
});

const targetDate = new Date("August 09, 2025 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.getElementById("countdown-timer").innerHTML = "<li> The Celebration of BrotherHood & SisterHood!</li>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, '0');
  document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


const userImages = [
  "images/happy_c6.png",
  "images/happy_c3.png",
  "images/happy_c4.png",
  "images/happy_c5.png"
];


document.querySelectorAll('.donut_user').forEach((user, index) => {
  user.innerHTML = `<img src="${userImages[index]}" />`;
});

let currentRotation = 0;
let prevIndex = 0;
const totalUsers = 4;


$('.testimonial-carousel').owlCarousel({
  items: 1,
  loop: true,
  nav: true,
  navText: [
    '<div class="btn_left1"><i class="fal fa-long-arrow-left"></i></div>',
    '<div class="btn_left1 btn_right1"><i class="fal fa-long-arrow-right"></i></div>'
  ]
});


function getTranslateDistance() {
  const width = window.innerWidth;

  if (width < 576) return 100;    
  if (width < 991) return 112 ;   
  if (width < 1199) return 155;     
  return 185;                     
}


function updateUserTransforms(currentIndex) {
  document.querySelectorAll('.donut_user').forEach((user, i) => {
    const baseRotation = i * 90;
    const netRotation = currentRotation + baseRotation;
    const distance = getTranslateDistance();

    user.style.transform = `rotate(${baseRotation}deg) translate(${distance}px) rotate(${-netRotation}deg)`;
    user.classList.toggle('active', i === currentIndex);
  });
}

$('.testimonial-carousel').on('changed.owl.carousel', function (event) {
  const currentIndex = ((event.item.index - event.relatedTarget._clones.length / 2) % totalUsers + totalUsers) % totalUsers;

  let diff = currentIndex - prevIndex;
  if (diff === 3) diff = -1;
  if (diff === -3) diff = 1;

  currentRotation -= diff * 90;

  const wrapper = document.getElementById('usersWrapper');
  wrapper.style.transform = `rotate(${currentRotation}deg)`;

  updateUserTransforms(currentIndex);
  prevIndex = currentIndex;
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.donut_user[data-index="0"]').classList.add('active');
  updateUserTransforms(0);
});


window.addEventListener('resize', () => {
  updateUserTransforms(prevIndex);
});

function animateCounter(id, target, duration) {
  const el = document.getElementById(id);
  let start = 0;
  const increment = target / (duration / 20);

  function updateCounter() {
    start += increment;
    if (start < target) {
      el.innerText = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      el.innerText = target + 'k';
    }
  }
  updateCounter();
}


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter('customerCount', 789, 1000);
      observer.disconnect();
    }
  });
});

observer.observe(document.getElementById('customerCount'));
