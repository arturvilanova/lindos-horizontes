// ==========================
// 🎞️ CARROSSEL INÍCIO (DEFINITIVO)
// ==========================
const trackInicio = document.querySelector('.track_1');
const dots = document.querySelectorAll('.dot');

let indexInicio = 0;

// 🔥 ATUALIZA VISUAL (slide central)
function updateCarouselInicio() {
  const slides = document.querySelectorAll('.slide_1');

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  if (slides[1]) slides[1].classList.add('active'); // sempre o centro

  dots[indexInicio].classList.add('active');
}

// 👉 AVANÇAR
function moveNextInicio() {

  const slide = document.querySelector('.slide_1');
  const slideWidth = slide.offsetWidth + 10;

  trackInicio.style.transition = "transform 0.5s ease";
  trackInicio.style.transform = `translateX(-${slideWidth}px)`;

  setTimeout(() => {

    trackInicio.style.transition = "none";

    // move o primeiro pro final (mantém ordem correta)
    trackInicio.appendChild(trackInicio.firstElementChild);

    trackInicio.style.transform = "translateX(0)";

    indexInicio = (indexInicio + 1) % dots.length;

    updateCarouselInicio();

  }, 500);
}

// 👉 VOLTAR (MESMO EFEITO)
function movePrevInicio() {

  const slide = document.querySelector('.slide_1');
  const slideWidth = slide.offsetWidth + 10;

  // move último para o começo
  trackInicio.insertBefore(trackInicio.lastElementChild, trackInicio.firstElementChild);

  // posiciona já deslocado
  trackInicio.style.transition = "none";
  trackInicio.style.transform = `translateX(-${slideWidth}px)`;

  // anima igual ao avançar
  requestAnimationFrame(() => {
    trackInicio.style.transition = "transform 0.5s ease";
    trackInicio.style.transform = "translateX(0)";
  });

  indexInicio = (indexInicio - 1 + dots.length) % dots.length;

  setTimeout(() => {
    updateCarouselInicio();
  }, 500);
}

// 👉 CLIQUE (avança)
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
