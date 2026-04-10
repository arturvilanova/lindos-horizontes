// ==========================
// 🎞️ CARROSSEL INÍCIO (FINAL)
// ==========================
const trackInicio = document.querySelector('.track_1');
let slidesInicio = document.querySelectorAll('.slide_1');
const dots = document.querySelectorAll('.dot');

let startX = 0;

// ==========================
// 🔁 CRIA LOOP INFINITO (CLONES)
// ==========================
const firstClone = slidesInicio[0].cloneNode(true);
const lastClone = slidesInicio[slidesInicio.length - 1].cloneNode(true);

trackInicio.appendChild(firstClone);
trackInicio.insertBefore(lastClone, slidesInicio[0]);

// atualiza lista após clones
slidesInicio = document.querySelectorAll('.slide_1');

// começa no primeiro REAL (não no clone)
let indexInicio = 1;

// ==========================
// 🎯 CENTRALIZA
// ==========================
function updateCarouselInicio(smooth = true) {
  const slide = slidesInicio[indexInicio];
  const container = trackInicio.parentElement;

  const containerWidth = container.offsetWidth;
  const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
  const containerCenter = containerWidth / 2;

  const offset = containerCenter - slideCenter;

  trackInicio.style.transition = smooth ? "transform 0.5s ease" : "none";
  trackInicio.style.transform = `translateX(${offset}px)`;

  // 🎯 DOTS (corrigido por causa dos clones)
  const totalReais = slidesInicio.length - 2;
  let realIndex = indexInicio - 1;

  if (realIndex < 0) realIndex = totalReais - 1;
  if (realIndex >= totalReais) realIndex = 0;

  dots.forEach(d => d.classList.remove('active'));
  dots[realIndex].classList.add('active');
}

// ==========================
// 👉 PRÓXIMO
// ==========================
function nextSlide() {
  indexInicio++;
  updateCarouselInicio(true);

  // chegou no clone final → volta invisível
  if (indexInicio === slidesInicio.length - 1) {
    setTimeout(() => {
      indexInicio = 1;
      updateCarouselInicio(false);
    }, 500);
  }
}

// ==========================
// 👈 ANTERIOR
// ==========================
function prevSlide() {
  indexInicio--;
  updateCarouselInicio(true);

  // chegou no clone inicial → volta invisível
  if (indexInicio === 0) {
    setTimeout(() => {
      indexInicio = slidesInicio.length - 2;
      updateCarouselInicio(false);
    }, 500);
  }
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
// 🚀 INICIALIZA
// ==========================
window.addEventListener("load", () => {
  updateCarouselInicio(false);
});
