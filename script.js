document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // 🔗 MENU + SEÇÕES
  // ==========================
  const links = document.querySelectorAll(".links-menu");
  const secoes = document.querySelectorAll(".secao");
  const barra = document.querySelector(".barra-deslizante");
  const direitos = document.getElementById("direitos");

  function mostrarSecao(id) {
    secoes.forEach(secao => secao.classList.remove("ativa"));
    document.getElementById(id).classList.add("ativa");

    setTimeout(() => {
      updateCarousel();
    }, 50);
  }

  function MoverBarra(linkAtivo, animar = true) {
    const largura = linkAtivo.offsetWidth;
    const esquerda = linkAtivo.offsetLeft;

    if (!animar) barra.style.transition = "none";

    barra.style.width = `${largura}px`;
    barra.style.left = `${esquerda}px`;

    if (!animar) {
      requestAnimationFrame(() => {
        barra.style.transition = "left 0.3s ease, width 0.3s ease";
      });
    }
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      links.forEach(l => l.classList.remove("ativo"));
      link.classList.add("ativo");

      mostrarSecao(link.dataset.target);

      requestAnimationFrame(() => {
        MoverBarra(link, true);
      });
    });
  });

  const linkInicial = document.querySelector(".links-menu.ativo");
  if (linkInicial) {
    requestAnimationFrame(() => {
      MoverBarra(linkInicial, false);
    });
  }

  window.addEventListener("resize", () => {
    const ativo = document.querySelector(".links-menu.ativo");
    if (ativo) MoverBarra(ativo, false);
  });

  function AtualizarFooter() {
    const ano = new Date().getFullYear();
    direitos.textContent = `© ${ano} - Lindos Horizontes. Todos os direitos reservados.`;
  }

  AtualizarFooter();
});


// ==========================
// 🎞️ CARROSSEL INÍCIO (INFINITO REAL)
// ==========================
const trackInicio = document.querySelector('.track_1');
let slidesInicio = document.querySelectorAll('.slide_1');
const dots = document.querySelectorAll('.dot');

let indexInicio = 1;

// 🔥 CLONA PRIMEIRO E ÚLTIMO
const firstClone = slidesInicio[0].cloneNode(true);
const lastClone = slidesInicio[slidesInicio.length - 1].cloneNode(true);

trackInicio.appendChild(firstClone);
trackInicio.insertBefore(lastClone, slidesInicio[0]);

slidesInicio = document.querySelectorAll('.slide_1');

// 👉 POSIÇÃO INICIAL
function setPosition() {
  const slideWidth = slidesInicio[0].offsetWidth + 10; // gap
  trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;
}

// 👉 ATUALIZA VISUAL
function updateCarouselInicio() {
  slidesInicio.forEach(s => s.classList.remove('active'));

  if (slidesInicio[indexInicio]) {
    slidesInicio[indexInicio].classList.add('active');
  }

  dots.forEach(d => d.classList.remove('active'));
  dots[(indexInicio - 1 + dots.length) % dots.length].classList.add('active');
}

// 👉 AVANÇA
function moveNextInicio() {
  const slideWidth = slidesInicio[0].offsetWidth + 10;

  indexInicio++;

  trackInicio.style.transition = "transform 0.5s ease";
  trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;

  updateCarouselInicio();
}

// 👉 VOLTA
function movePrevInicio() {
  const slideWidth = slidesInicio[0].offsetWidth + 10;

  indexInicio--;

  trackInicio.style.transition = "transform 0.5s ease";
  trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;

  updateCarouselInicio();
}

// 👉 LOOP REAL (SEM PULO)
trackInicio.addEventListener('transitionend', () => {
  const slideWidth = slidesInicio[0].offsetWidth + 10;

  if (indexInicio === slidesInicio.length - 1) {
    trackInicio.style.transition = "none";
    indexInicio = 1;
    trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;
  }

  if (indexInicio === 0) {
    trackInicio.style.transition = "none";
    indexInicio = slidesInicio.length - 2;
    trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;
  }
});

// 👉 CLIQUE
slidesInicio.forEach(() => {
  trackInicio.addEventListener("click", moveNextInicio);
});

// 👉 SWIPE
let startXInicio = 0;

trackInicio.addEventListener("touchstart", e => {
  startXInicio = e.touches[0].clientX;
});

trackInicio.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  let diff = startXInicio - endX;

  if (diff > 50) moveNextInicio();
  else if (diff < -50) movePrevInicio();
});

// 👉 INICIALIZA
window.addEventListener("load", () => {
  setPosition();
  updateCarouselInicio();
});


// ==========================
// 🎞️ CARROSSEL IA (SEM ALTERAÇÃO)
// ==========================
const track = document.querySelector('.track');
const slides = document.querySelectorAll('.slide');
const carousel = document.querySelector('.carousel');

let index = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

function updateCarousel(smooth = true) {
  slides.forEach(s => s.classList.remove('active'));
  slides[index].classList.add('active');

  const slide = slides[index];

  const containerWidth = carousel.offsetWidth;
  const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
  const containerCenter = containerWidth / 2;

  const offset = containerCenter - slideCenter;

  track.style.transition = smooth
    ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
    : 'none';

  track.style.transform = `translateX(${offset}px)`;
}

slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    index = i;
    updateCarousel(true);
  });
});

track.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  track.style.transition = 'none';
});

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  const baseSlide = slides[index];
  const containerWidth = carousel.offsetWidth;
  const slideCenter = baseSlide.offsetLeft + baseSlide.offsetWidth / 2;
  const containerCenter = containerWidth / 2;

  const baseOffset = containerCenter - slideCenter;

  track.style.transform = `translateX(${baseOffset + diff * 0.6}px)`;
});

track.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;

  const diff = currentX - startX;
  const threshold = 50;

  if ((index === 0 && diff > 0) || (index === slides.length - 1 && diff < 0)) {
    updateCarousel(true);
    return;
  }

  if (diff < -threshold) index++;
  else if (diff > threshold) index--;

  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;

  updateCarousel(true);
});
