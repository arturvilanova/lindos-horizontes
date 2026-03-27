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

// CARROSSEL IA COM SWIPE

const track = document.querySelector('.track');
const slides = document.querySelectorAll('.slide');
const carousel = document.querySelector('.carousel');

let index = 0;

// 👉 CENTRALIZA BASEADO NO CONTAINER REAL
function updateCarousel() {
  slides.forEach(s => s.classList.remove('active'));
  slides[index].classList.add('active');

  const slideWidth = slides[0].offsetWidth + 40; // margem total
  const containerWidth = carousel.offsetWidth;

  const offset = (containerWidth / 2) - (slideWidth / 2);

  track.style.transform = `translateX(${-index * slideWidth + offset}px)`;
}

updateCarousel();


// ==========================
// 🖱️ CLIQUE (OPCIONAL)
// ==========================
slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
});


// ==========================
// 🖐️ SWIPE REAL (FLUIDO)
// ==========================
let isDragging = false;
let startX = 0;
let currentTranslate = 0;

track.addEventListener('mousedown', start);
track.addEventListener('touchstart', start);

track.addEventListener('mousemove', move);
track.addEventListener('touchmove', move);

track.addEventListener('mouseup', end);
track.addEventListener('mouseleave', end);
track.addEventListener('touchend', end);

function start(e) {
  isDragging = true;
  startX = getX(e);
  track.style.transition = 'none';
}

function move(e) {
  if (!isDragging) return;

  const currentX = getX(e);
  const diff = currentX - startX;

  const slideWidth = slides[0].offsetWidth + 40;

  currentTranslate = -index * slideWidth + diff;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function end(e) {
  if (!isDragging) return;

  isDragging = false;

  const slideWidth = slides[0].offsetWidth + 40;
  const moved = currentTranslate + index * slideWidth;

  if (moved < -50) index++;
  else if (moved > 50) index--;

  // loop infinito
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  track.style.transition = 'transform 0.4s ease';
  updateCarousel();
}

function getX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

// Atualiza o rodapé com o ano atual
function AtualizarFooter() {
  const ano = new Date().getFullYear();
  direitos.textContent = `© ${ano} - Lindos Horizontes. Todos os direitos reservados.`;
}

AtualizarFooter(); // <- chama a função aqui

// FINALIZA PAGINA INICIAL


