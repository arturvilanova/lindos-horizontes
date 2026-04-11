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
      updateCarouselInicio(false);
      updateCarouselIA(false);
    }, 50);
  }

  function moverBarra(linkAtivo, animar = true) {
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
      moverBarra(link, true);
    });
  });

  const linkInicial = document.querySelector(".links-menu.ativo");
  if (linkInicial) moverBarra(linkInicial, false);

  window.addEventListener("resize", () => {
    const ativo = document.querySelector(".links-menu.ativo");
    if (ativo) moverBarra(ativo, false);
  });

  // ==========================
  // 📌 FOOTER
  // ==========================
  function atualizarFooter() {
    const ano = new Date().getFullYear();
    direitos.textContent = `© ${ano} - Lindos Horizontes. Todos os direitos reservados.`;
  }
  atualizarFooter();

// ==========================
// 🎞️ CARROSSEL INÍCIO (LOOP INFINITO REAL)
// ==========================
const trackInicio = document.querySelector('.track_1');
let slidesInicio = document.querySelectorAll('.slide_1');
const dots = document.querySelectorAll('.dot');

let indexInicio = 1; // começa no primeiro REAL (por causa do clone)
let startX = 0;

// 🔥 CLONAR PRIMEIRO E ÚLTIMO
const firstClone = slidesInicio[0].cloneNode(true);
const lastClone = slidesInicio[slidesInicio.length - 1].cloneNode(true);

trackInicio.appendChild(firstClone);
trackInicio.insertBefore(lastClone, trackInicio.firstElementChild);

// atualizar lista
slidesInicio = document.querySelectorAll('.slide_1');

// 🎯 ATUALIZA POSIÇÃO
function updateCarouselInicio(smooth = true) {
  const slideWidth = slidesInicio[0].offsetWidth;

  trackInicio.style.transition = smooth ? "transform 0.5s ease" : "none";
  trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;

  // bolinhas (ignora clones)
  dots.forEach(d => d.classList.remove('active'));
  let realIndex = indexInicio - 1;

  if (realIndex < 0) realIndex = dots.length - 1;
  if (realIndex >= dots.length) realIndex = 0;

  dots[realIndex].classList.add('active');
}

// 👉 PRÓXIMO
function nextSlide() {
  indexInicio++;
  updateCarouselInicio(true);
}

// 👉 ANTERIOR
function prevSlide() {
  indexInicio--;
  updateCarouselInicio(true);
}

// 🔥 CORREÇÃO INVISÍVEL DO LOOP
trackInicio.addEventListener("transitionend", () => {
  const slideWidth = slidesInicio[0].offsetWidth;

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

// 👉 CLICK
trackInicio.addEventListener("click", nextSlide);

// 👉 SWIPE
trackInicio.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

trackInicio.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) nextSlide();
  else if (diff < -50) prevSlide();
});

// 👉 INICIALIZA
// 👉 ESPERA TODAS AS IMAGENS CARREGAREM
function iniciarCarrosselInicio() {
  const slideWidth = slidesInicio[0].offsetWidth;

  trackInicio.style.transition = "none";
  trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;

  updateCarouselInicio(false);
}

window.addEventListener("load", () => {
  const imagens = document.querySelectorAll('.slide_1 img');
  let carregadas = 0;

  imagens.forEach(img => {
    if (img.complete) {
      carregadas++;
    } else {
      img.addEventListener("load", () => {
        carregadas++;
        if (carregadas === imagens.length) iniciarCarrosselInicio();
      });
    }
  });

  // fallback
  if (carregadas === imagens.length) {
    iniciarCarrosselInicio();
  }
});

  // ==========================
  // 🎞️ CARROSSEL IA
  // ==========================
  const track = document.querySelector('.track');
  const slides = document.querySelectorAll('.slide');
  const carousel = document.querySelector('.carousel');

  let index = 0;
  let isDragging = false;
  let startXIA = 0;
  let currentX = 0;

  function updateCarouselIA(smooth = true) {
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
      updateCarouselIA(true);
    });
  });

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startXIA = e.touches[0].clientX;
    track.style.transition = 'none';
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    const diff = currentX - startXIA;

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

    const diff = currentX - startXIA;
    const threshold = 50;

    if ((index === 0 && diff > 0) || (index === slides.length - 1 && diff < 0)) {
      updateCarouselIA(true);
      return;
    }

    if (diff < -threshold) index++;
    else if (diff > threshold) index--;

    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    updateCarouselIA(true);
  });

  // ==========================
  // 🚀 INICIALIZA
  // ==========================
  window.addEventListener("load", () => {
    updateCarouselInicio(false);
    updateCarouselIA(false);
  });

});
