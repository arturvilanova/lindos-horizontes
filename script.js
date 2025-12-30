document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".links-menu");
    const secoes = document.querySelectorAll(".secao");
    const direitos = document.getElementById("direitos");
    const barra = document.querySelector(".barra-deslizante");

    // Exibe a seção correspondente
    function mostrarSecao(id) {
        secoes.forEach(secao => secao.classList.remove("ativa"));
        document.getElementById(id).classList.add("ativa");
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

    // Atualiza o rodapé com o ano atual
    function AtualizarFooter() {
        const ano = new Date().getFullYear();
        direitos.textContent = `© ${ano} - Lindos Horizontes. Todos os direitos reservados.`;
    }

    AtualizarFooter(); // <- chama a função aqui

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



document.addEventListener("DOMContentLoaded", function() {
  const menu = document.querySelector("ul");
  const headerHeight = document.querySelector("#caixa-logo").offsetHeight; 

  window.addEventListener("scroll", function() {
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

fetch("https://api.counterapi.dev/v1/lindoshorizontes/visitas/up")
  .then(res => res.json())
  .then(data => {
    document.getElementById("contador-visitas").textContent = data.value;
  })
  .catch(err => {
    console.error("Erro no contador:", err);
    document.getElementById("contador-visitas").textContent = "—";
  });




