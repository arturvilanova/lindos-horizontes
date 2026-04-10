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
  // 🎞️ CARROSSEL INÍCIO (FINAL)
  // ==========================
  const trackInicio = document.querySelector('.track_1');
  let slidesInicio = document.querySelectorAll('.slide_1');
  const dots = document.querySelectorAll('.dot');

  let startXInicio = 0;

  // 🔁 CLONES
  const firstClone = slidesInicio[0].cloneNode(true);
  const lastClone = slidesInicio[slidesInicio.length - 1].cloneNode(true);

  trackInicio.appendChild(firstClone);
  trackInicio.insertBefore(lastClone, slidesInicio[0]);

  slidesInicio = document.querySelectorAll('.slide_1');

  let indexInicio = 1;

  function updateCarouselInicio(smooth = true) {
    const slide = slidesInicio[indexInicio];
    const container = trackInicio.parentElement;

    const containerWidth = container.offsetWidth;
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const containerCenter = containerWidth / 2;

    const offset = containerCenter - slideCenter;

    trackInicio.style.transition = smooth ? "transform 0.5s ease" : "none";
    trackInicio.style.transform = `translateX(${offset}px)`;

    const totalReais = slidesInicio.length - 2;
    let realIndex = indexInicio - 1;

    if (realIndex < 0) realIndex = totalReais - 1;
    if (realIndex >= totalReais) realIndex = 0;

    dots.forEach(d => d.classList.remove('active'));
    dots[realIndex].classList.add('active');
  }

  function nextSlideInicio() {
    indexInicio++;
    updateCarouselInicio(true);

    if (indexInicio === slidesInicio.length - 1) {
      setTimeout(() => {
        indexInicio = 1;
        updateCarouselInicio(false);
      }, 500);
    }
  }

  function prevSlideInicio() {
    indexInicio--;
    updateCarouselInicio(true);

    if (indexInicio === 0) {
      setTimeout(() => {
        indexInicio = slidesInicio.length - 2;
        updateCarouselInicio(false);
      }, 500);
    }
  }

  trackInicio.addEventListener("click", nextSlideInicio);

  trackInicio.addEventListener("touchstart", e => {
    startXInicio = e.touches[0].clientX;
  });

  trackInicio.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startXInicio - endX;

    if (diff > 50) nextSlideInicio();
    else if (diff < -50) prevSlideInicio();
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
