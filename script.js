// 1. CONFIGURAÇÃO DA SUA MENSAGEM COM O SEU LINK REAL
        const TEXTO_MENSAGEM = "Olha esse projeto incrível! 🚀\n\nAchei muito maneiro a iniciativa deste jovem e resolvi apoiar! Dá uma olhada você também.\n\n👉 https://arturvilanova.github.io/lindos-horizontes/index.html";

        const mensagemCodificada = encodeURIComponent(TEXTO_MENSAGEM);

        // 2. MONTA A ROTA OFICIAL DE COMPARTILHAMENTO
        const linkApi = "https://api.whatsapp.com/send?text=" + mensagemCodificada;

        // Injeta a rota diretamente no atributo href do HTML para o navegador não travar
        document.getElementById('linkZap').href = linkApi;
        document.getElementById('linkStatus').href = linkApi;

        // Abre o card automaticamente 1.5 segundos após carregar a página
        window.onload = function() {
            setTimeout(function() {
                document.getElementById('modalOverlay').classList.add('ativo');
            }, 1500); 
        };

        // Fecha o card
        function fecharCard() {
            document.getElementById('modalOverlay').classList.remove('ativo');
        }
// ===========================

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

  const secao = document.getElementById(id);

  if (secao) {
    secao.classList.add("ativa");
  } else {
    console.warn("Seção ainda não existe:", id);
    return; // 🔥 impede bugs
  }

  setTimeout(() => {
    updateCarouselInicio(false);

    if (typeof updateCarouselIA === "function") {
      updateCarouselIA(false);
    }

  }, 50);
  }

  function moverBarra(linkAtivo, animar = true) {
  let largura, esquerda;

  const isMobile = window.innerWidth <= 480;

  if (isMobile) {
    // 🔥 CÁLCULO CORRETO PARA MOBILE
    const container = document.querySelector("#links");
    const containerRect = container.getBoundingClientRect();
    const linkRect = linkAtivo.getBoundingClientRect();

    largura = linkRect.width;
    esquerda = linkRect.left - containerRect.left;

  } else {
    // ✅ DESKTOP (mantém seu comportamento atual)
    largura = linkAtivo.offsetWidth;
    esquerda = linkAtivo.offsetLeft;
  }

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
// 🎞️ CARROSSEL INÍCIO (FIXED)
// ==========================

const trackInicio = document.querySelector('.track_1');
let slidesInicio = document.querySelectorAll('.slide_1');
const dots = document.querySelectorAll('.dot');

let indexInicio = 1; // 🔥 começa no primeiro real
let startX = 0;

// ==========================
// 🔁 CLONE PARA LOOP INFINITO
// ==========================
const firstClone = slidesInicio[0].cloneNode(true);
const lastClone = slidesInicio[slidesInicio.length - 1].cloneNode(true);

trackInicio.appendChild(firstClone);
trackInicio.insertBefore(lastClone, slidesInicio[0]);

// Atualiza lista de slides após clone
slidesInicio = document.querySelectorAll('.slide_1');

// ==========================
// 🎯 ATUALIZA POSIÇÃO
// ==========================
function updateCarouselInicio(smooth = true) {
  const slideWidth = slidesInicio[0].clientWidth;

  trackInicio.style.transition = smooth ? "transform 0.4s ease" : "none";
  trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;

  // Bolinhas
  dots.forEach(d => d.classList.remove('active'));
  let realIndex = indexInicio - 1;

  if (realIndex < 0) realIndex = dots.length - 1;
  if (realIndex >= dots.length) realIndex = 0;

  dots[realIndex].classList.add('active');
}

// ==========================
// 👉 AVANÇAR
// ==========================
function nextSlide() {
  indexInicio++;
  updateCarouselInicio(true);
}

// ==========================
// 👉 VOLTAR
// ==========================
function prevSlide() {
  indexInicio--;
  updateCarouselInicio(true);
}

// ==========================
// 🔄 CORREÇÃO LOOP (SEM BUG)
// ==========================
trackInicio.addEventListener("transitionend", () => {
  const slideWidth = slidesInicio[0].clientWidth;

  // Se passou do último clone → volta pro primeiro real
  if (indexInicio === slidesInicio.length - 1) {
    trackInicio.style.transition = "none";
    indexInicio = 1;
    trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;
  }

  // Se voltou antes do primeiro clone → vai pro último real
  if (indexInicio === 0) {
    trackInicio.style.transition = "none";
    indexInicio = slidesInicio.length - 2;
    trackInicio.style.transform = `translateX(-${slideWidth * indexInicio}px)`;
  }
});

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
// 🚀 INICIALIZA SEM BUG VISUAL
// ==========================
window.addEventListener("load", () => {
  trackInicio.style.transition = "none";
  updateCarouselInicio(false);

  // 🔥 evita flicker da imagem errada
  setTimeout(() => {
    trackInicio.style.transition = "transform 0.4s ease";
  }, 50);

  // 🔥 mostra o carrossel suavemente
  document.querySelector(".carousel_1").style.opacity = "1";
});
  
  // ==========================
  // ✍️ Frase do dia
  // ==========================

  const frases = [
  "A natureza nunca se repete.",
  "Beleza está nos pequenos detalhes.",
  "O simples também encanta.",
  "Cada olhar revela um novo mundo.",
  "A luz transforma tudo.",
  "O natural é a maior arte."
];

function atualizarFrase() {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById("frase-dia").textContent = "✨ " + frase;
}

window.addEventListener("load", atualizarFrase);
  

// ==========================
// 🖼️ LIGHTBOX (ABRIR IMAGEM)
// ==========================

const imagens = document.querySelectorAll("#div-das-fotos img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const fechar = document.getElementById("fechar");

imagens.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("ativo");
    lightboxImg.src = img.src;
  });
});

// fechar clicando no X
fechar.addEventListener("click", () => {
  lightbox.classList.remove("ativo");
});

// fechar clicando fora da imagem
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("ativo");
  }
});

});
