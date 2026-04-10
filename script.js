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
      updateCarouselIA(false);
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
// 🎞️ CARROSSEL INÍCIO (CENTRAL + LOOP INFINITO)
// ==========================
const trackInicio = document.querySelector('.track_1');
let slidesInicio = document.querySelectorAll('.slide_1');
const dots = document.querySelectorAll('.dot');

let indexInicio = 0;
let startX = 0;

// ==========================
// 🎯 CENTRALIZA CORRETAMENTE
// ==========================
function updateCarouselInicio(smooth = true) {
  slidesInicio = document.querySelectorAll('.slide_1'); // atualiza lista

  const slide = slidesInicio[1]; // sempre o do meio (visual)
  const container = trackInicio.parentElement;

  const containerWidth = container.offsetWidth;
  const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
  const containerCenter = containerWidth / 2;

  const offset = containerCenter - slideCenter;

  trackInicio.style.transition = smooth ? "transform 0.5s ease" : "none";
  trackInicio.style.transform = `translateX(${offset}px)`;

  // dots
  dots.forEach(d => d.classList.remove('active'));
  dots[indexInicio].classList.add('active');
}

// ==========================
// 👉 PRÓXIMO (loop infinito)
// ==========================
function nextSlide() {
  trackInicio.style.transition = "transform 0.5s ease";
  trackInicio.style.transform = "translateX(-320px)";

  setTimeout(() => {
    trackInicio.style.transition = "none";

    // move o primeiro pro final
    trackInicio.appendChild(trackInicio.firstElementChild);

    trackInicio.style.transform = "translateX(0)";

    indexInicio = (indexInicio + 1) % slidesInicio.length;

    updateCarouselInicio(false);
  }, 500);
}

// ==========================
// 👈 ANTERIOR (loop infinito)
// ==========================
function prevSlide() {
  trackInicio.style.transition = "none";

  // move o último pro início
  trackInicio.insertBefore(
    trackInicio.lastElementChild,
    trackInicio.firstElementChild
  );

  trackInicio.style.transform = "translateX(-320px)";

  requestAnimationFrame(() => {
    trackInicio.style.transition = "transform 0.5s ease";
    trackInicio.style.transform = "translateX(0)";
  });

  indexInicio = (indexInicio - 1 + slidesInicio.length) % slidesInicio.length;

  updateCarouselInicio(false);
}

// ==========================
// 🖱️ CLICK
// ==========================
trackInicio.addEventListener("click", nextSlide);

// ==========================
// 📱 SWIPE
// ==========================
trackInicio.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

trackInicio.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) nextSlide();
  else if (diff < -50) prevSlide();
});

// ==========================
// 🚀 INICIALIZA CENTRALIZADO
// ==========================
window.addEventListener("load", () => {
  updateCarouselInicio(false);
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
