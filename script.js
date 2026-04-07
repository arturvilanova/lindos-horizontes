document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".links-menu");
  const secoes = document.querySelectorAll(".secao");
  const direitos = document.getElementById("direitos");
  const barra = document.querySelector(".barra-deslizante");

  // Exibe a seção correspondente
  function mostrarSecao(id) {
    secoes.forEach(secao => secao.classList.remove("ativa"));
    document.getElementById(id).classList.add("ativa");

    setTimeout(() => {
      updateCarousel();
    }, 50);
  }

  // Função que posiciona a barra sob o link ativo
  function MoverBarra(linkAtivo, animar = true) {
    const rect = linkAtivo.getBoundingClientRect();
    const navRect = linkAtivo.closest("nav").getBoundingClientRect();

    const larguraExtra = 10; // 🔹 Deixa a barra um pouco maior que o texto (5px de cada lado)
    const largura = rect.width + larguraExtra;
    const esquerda = rect.left - navRect.left - larguraExtra / 2;

    if (!animar) barra.style.transition = "none"; // desliga animação no carregamento

    barra.style.width = `${largura}px`;
    barra.style.left = `${esquerda}px`;

    if (!animar) {
      // Reativa animação após pequeno atraso
      setTimeout(() => {
        barra.style.transition = "left 0.3s ease, width 0.3s ease";
      }, 50);
    }
  }

  // Marca o link ativo e mostra seção
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove("ativo"));
      link.classList.add("ativo");
      mostrarSecao(link.dataset.target);
      MoverBarra(link, true);
    });
  });

  // Ao carregar, posiciona no link "Início" sem animação
  window.addEventListener("load", () => {
    const linkInicial = document.querySelector(".links-menu.ativo");
    if (linkInicial) MoverBarra(linkInicial, false);
  });

  // Reposiciona a barra se a janela for redimensionada
  window.addEventListener("resize", () => {
    const linkAtivo = document.querySelector(".links-menu.ativo");
    if (linkAtivo) MoverBarra(linkAtivo, false);
  });


});

// Animação do slide de imagens

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll("#slide-show img");
  let indice = 0;

  function mostrarSlide(index) {
    slides.forEach(img => img.classList.remove("ativo"));
    slides[index].classList.add("ativo");
  }

  function proximoSlide() {
    indice = (indice + 1) % slides.length;
    mostrarSlide(indice);
  }

  // Mostra o primeiro
  mostrarSlide(indice);

  // Troca a cada 5 segundos
  setInterval(proximoSlide, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector("ul");
  const headerHeight = document.querySelector("#caixa-logo").offsetHeight;

  window.addEventListener("scroll", function () {

    // Só aplica no modo celular
    if (window.innerWidth <= 480) {
      if (window.scrollY > headerHeight) {
        menu.classList.add("fixo");
      } else {
        menu.classList.remove("fixo");
      }

    } else {
      // Remove a classe se estiver em tela grande
      menu.classList.remove("fixo");
    }
  });
});

// ISLIDES INÍCIO 

const track5 = document.querySelector('.track_1');
let slides5 = document.querySelectorAll('.slide_1');
const dots = document.querySelectorAll('.dot');

let index5 = 0;

// ==========================
// 🎯 ATUALIZA VISUAL
// ==========================
function updateCarousel5() {
    slides5.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides5[1].classList.add('active'); // centro visual

    dots[index5].classList.add('active');
}

// ==========================
// 👉 MOVIMENTO PARA ESQUERDA
// ==========================
function moveNext() {

    track5.style.transition = "transform 0.6s ease";
    track5.style.transform = "translateX(-320px)";

    setTimeout(() => {
        track5.style.transition = "none";

        // move o primeiro pro final (loop infinito)
        track5.appendChild(track5.firstElementChild);

        track5.style.transform = "translateX(0)";
        
        // atualiza index
        index = (index + 1) % dots.length;

        updateCarousel5();

    }, 600);
}

// ==========================
// 🖱️ CLICK (DESKTOP)
// ==========================
slides5.forEach(slide => {
    slide.addEventListener("click", moveNext);
});

// ==========================
// 📱 SWIPE (MOBILE)
// ==========================
let startX = 0;

track5.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

track5.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        moveNext(); // direita → esquerda
    }
});

// ==========================
updateCarousel5();

// FIM ISLIDES INÍCIO 

// CARROSSEL IA

const track = document.querySelector('.track');
const slides = document.querySelectorAll('.slide');
const carousel = document.querySelector('.carousel');

let index = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

// ==========================
// 🎯 CENTRALIZA COM ANIMAÇÃO
// ==========================

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

// ==========================
// 🖱️ DESKTOP (APENAS CLIQUE)
// ==========================
slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    index = i;
    updateCarousel(true);
  });
});

// ==========================
// 📱 MOBILE (SWIPE REAL)
// ==========================
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

  // 👉 movimento suave durante arraste
  track.style.transform = `translateX(${baseOffset + diff * 0.6}px)`;
});

track.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;

  const diff = currentX - startX;
  const threshold = 50;

  // 👉 efeito de fim (bounce)
  if ((index === 0 && diff > 0) || (index === slides.length - 1 && diff < 0)) {
    updateCarousel(true);
    return;
  }

  if (diff < -threshold) index++;
  else if (diff > threshold) index--;

  // limites
  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;

  updateCarousel(true);
});

// FIM CARROSSEL IA 

// Atualiza o rodapé com o ano atual
function AtualizarFooter() {
  const ano = new Date().getFullYear();
  direitos.textContent = `© ${ano} - Lindos Horizontes. Todos os direitos reservados.`;
}

AtualizarFooter(); // <- chama a função aqui

// FINALIZA PAGINA INICIAL


