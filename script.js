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
      updateCarouselIA();
      updateCarouselInicio(false);
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

      requestAnimationFrame(() => {
        moverBarra(link, true);
      });
    });
  });

  const linkInicial = document.querySelector(".links-menu.ativo");
  if (linkInicial) {
    requestAnimationFrame(() => {
      moverBarra(linkInicial, false);
    });
  }

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
// 🎞️ CARROSSEL INÍCIO (INFINITO REAL)
// ==========================
const trackInicio = document.querySelector('.track_1');
let slidesInicio = document.querySelectorAll('.slide_1');
const dots = document.querySelectorAll('.dot');

let indexInicio = 1;
let startXInicio = 0;
let isDraggingInicio = false;

// 🔥 CLONES (segredo do infinito real)
const firstClone = slidesInicio[0].cloneNode(true);
const lastClone = slidesInicio[slidesInicio.length - 1].cloneNode(true);

trackInicio.appendChild(firstClone);
trackInicio.insertBefore(lastClone, slidesInicio[0]);

slidesInicio = document.querySelectorAll('.slide_1');

// 🔥 largura correta
function getWidth() {
  const slide = slidesInicio[0];
  const style = getComputedStyle(slide);
  const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  return slide.offsetWidth + margin;
}

// 🔥 posiciona corretamente
function setPosition(smooth = true) {
  const width = getWidth();

  trackInicio.style.transition = smooth ? "transform 0.5s ease" : "none";
  trackInicio.style.transform = `translateX(-${width * indexInicio}px)`;

  dots.forEach(d => d.classList.remove('active'));
  dots[(indexInicio - 1 + dots.length) % dots.length].classList.add('active');
}

// 👉 AVANÇA
function nextInicio() {
  indexInicio++;
  setPosition(true);
}

// 👉 VOLTA
function prevInicio() {
  indexInicio--;
  setPosition(true);
}

// 🔥 LOOP INVISÍVEL
trackInicio.addEventListener("transitionend", () => {
  const width = getWidth();

  if (indexInicio === slidesInicio.length - 1) {
    trackInicio.style.transition = "none";
    indexInicio = 1;
    trackInicio.style.transform = `translateX(-${width * indexInicio}px)`;
  }

  if (indexInicio === 0) {
    trackInicio.style.transition = "none";
    indexInicio = slidesInicio.length - 2;
    trackInicio.style.transform = `translateX(-${width * indexInicio}px)`;
  }
});

// 👉 CLIQUE
trackInicio.addEventListener("click", nextInicio);

// 👉 SWIPE
trackInicio.addEventListener("touchstart", e => {
  startXInicio = e.touches[0].clientX;
  isDraggingInicio = true;
});

trackInicio.addEventListener("touchend", e => {
  if (!isDraggingInicio) return;
  isDraggingInicio = false;

  const endX = e.changedTouches[0].clientX;
  const diff = startXInicio - endX;

  if (diff > 50) nextInicio();
  else if (diff < -50) prevInicio();
});

// 👉 INICIALIZA
window.addEventListener("load", () => {
  setPosition(false);
});

  // ==========================
  // 🎞️ CARROSSEL IA
  // ==========================
  const track = document.querySelector('.track');
  const slides = document.querySelectorAll('.slide');
  const carousel = document.querySelector('.carousel');

  let index = 0;
  let isDragging = false;
  let startX = 0;
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
  // 🚀 INICIALIZA TUDO
  // ==========================
  window.addEventListener("load", () => {
    updateCarouselInicio(false);
    updateCarouselIA(false);
  });

});
