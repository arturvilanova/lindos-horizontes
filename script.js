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

  // ✅ BARRA CORRIGIDA (sem bug de posição)
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

  // ✅ POSICIONA AO CARREGAR
  const linkInicial = document.querySelector(".links-menu.ativo");
  if (linkInicial) {
    requestAnimationFrame(() => {
      MoverBarra(linkInicial, false);
    });
  }

  // ✅ RESPONSIVO
  window.addEventListener("resize", () => {
    const ativo = document.querySelector(".links-menu.ativo");
    if (ativo) MoverBarra(ativo, false);
  });

  // ==========================
  // 📌 FOOTER (CORRIGIDO)
  // ==========================
  function AtualizarFooter() {
    const ano = new Date().getFullYear();
    direitos.textContent = `© ${ano} - Lindos Horizontes. Todos os direitos reservados.`;
  }

  AtualizarFooter();

});


// ==========================
// 🎞️ CARROSSEL INÍCIO (CORRIGIDO)
// ==========================
const trackInicio = document.querySelector('.track_1');
const slidesInicio = document.querySelectorAll('.slide_1');
const dots = document.querySelectorAll('.dot');

let indexInicio = 0;

// 🔥 FUNÇÃO PRINCIPAL (CENTRALIZA O SLIDE)
function updateCarouselInicio() {
  slidesInicio.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slidesInicio[indexInicio].classList.add('active');
  dots[indexInicio].classList.add('active');

  const slide = slidesInicio[indexInicio];

  const containerWidth = trackInicio.parentElement.offsetWidth;
  const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
  const containerCenter = containerWidth / 2;

  const offset = containerCenter - slideCenter;

  trackInicio.style.transition = 'transform 0.6s ease';
  trackInicio.style.transform = `translateX(${offset}px)`;
}

// 👉 Clique nas imagens
slidesInicio.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    indexInicio = i;
    updateCarouselInicio();
  });
});

// 👉 Swipe
let startXInicio = 0;

trackInicio.addEventListener("touchstart", e => {
  startXInicio = e.touches[0].clientX;
});

trackInicio.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  let diff = startXInicio - endX;

  if (diff > 50) indexInicio++;
  else if (diff < -50) indexInicio--;

  if (indexInicio < 0) indexInicio = 0;
  if (indexInicio >= slidesInicio.length) indexInicio = slidesInicio.length - 1;

  updateCarouselInicio();
});

// 👉 Inicializa
updateCarouselInicio();


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

// Clique
slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    index = i;
    updateCarousel(true);
  });
});

// Swipe
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
