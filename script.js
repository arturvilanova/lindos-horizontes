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
// 🎞️ CARROSSEL INÍCIO (FINAL LIMPO)
// ==========================
const trackInicio = document.querySelector('.track_1');
const dots = document.querySelectorAll('.dot');

let indexInicio = 0;

// 🔥 ATUALIZA VISUAL
function updateCarouselInicio() {
  const slides = document.querySelectorAll('.slide_1');

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  // slide central (sempre o segundo visível)
  if (slides[1]) slides[1].classList.add('active');

  dots[indexInicio].classList.add('active');
}

// 👉 AVANÇA (LOOP NATURAL)
function moveNextInicio() {

  const slide = document.querySelector('.slide_1');
  const slideWidth = slide.offsetWidth + 10;

  trackInicio.style.transition = "transform 0.5s ease";
  trackInicio.style.transform = `translateX(-${slideWidth}px)`;

  setTimeout(() => {

    trackInicio.style.transition = "none";

    // 🔥 move primeiro pro final (mantém ordem correta)
    trackInicio.appendChild(trackInicio.firstElementChild);

    trackInicio.style.transform = "translateX(0)";

    indexInicio = (indexInicio + 1) % dots.length;

    updateCarouselInicio();

  }, 500);
}

// 👉 VOLTA
function movePrevInicio() {

  const slide = document.querySelector('.slide_1');
  const slideWidth = slide.offsetWidth + 10;

  trackInicio.style.transition = "none";

  trackInicio.insertBefore(trackInicio.lastElementChild, trackInicio.firstElementChild);

  trackInicio.style.transform = `translateX(-${slideWidth}px)`;

  requestAnimationFrame(() => {
    trackInicio.style.transition = "transform 0.5s ease";
    trackInicio.style.transform = "translateX(0)";
  });

  indexInicio = (indexInicio - 1 + dots.length) % dots.length;

  updateCarouselInicio();
}

// 👉 CLIQUE
trackInicio.addEventListener("click", moveNextInicio);

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
