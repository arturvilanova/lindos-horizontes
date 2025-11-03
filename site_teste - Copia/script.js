// document.addEventListener("DOMContentLoaded", () => {
//   const links = document.querySelectorAll(".link-menu");
//   const barra = document.querySelector(".barra-deslizante");
//   const iframe = document.getElementById("iframe-secao");

//   function barraDeslizante(link) {
//     const rect = link.getBoundingClientRect();
//     const navRect = link.closest("nav").getBoundingClientRect();
//     const larguraExtra = 10;
//     barra.style.width = (rect.width + larguraExtra) + "px";
//     barra.style.left = (rect.left - navRect.left - larguraExtra/2) + "px";
//   }

//   links.forEach(link => {
//     link.addEventListener("click", e => {
//       e.preventDefault();
//       links.forEach(l => l.classList.remove("ativo"));
//       link.classList.add("ativo");
//       barraDeslizante(link);
//       iframe.src = link.dataset.target;

//       // SALVA a seção atual
//       localStorage.setItem("secaoAtual", link.dataset.target);
//     });
//   });

//   // Ao carregar, verifica se existe uma seção salva
//   const secaoSalva = localStorage.getItem("secaoAtual");
//   if (secaoSalva) {
//     iframe.src = secaoSalva;
//     const linkAtivo = document.querySelector(`.link-menu[data-target="${secaoSalva}"]`);
//     if (linkAtivo) linkAtivo.classList.add("ativo");
//     barraDeslizante(document.querySelector(".link-menu.ativo"));
//   } else {
//     // Nenhuma seção salva, usa o padrão
//     const linkAtivo = document.querySelector(".link-menu.ativo");
//     barraDeslizante(linkAtivo);
//   }

//   window.addEventListener("resize", () => {
//     const linkAtivo = document.querySelector(".link-menu.ativo");
//     if (linkAtivo) barraDeslizante(linkAtivo);
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a.link");
    const conteudo = document.getElementById("conteudo");

    async function carregarPagina(url, adicionarHistorico = true) {
        try {
            const resposta = await fetch(url);
            const texto = await resposta.text();

            const temp = document.createElement("div");
            temp.innerHTML = texto;

            const novoConteudo = temp.querySelector("main").innerHTML;
            conteudo.innerHTML = novoConteudo;

            if (adicionarHistorico) {
                history.pushState(null, '', url);
            }
        } catch (erro) {
            console.error("Erro ao carregar página:", erro);
            conteudo.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
        }
    }

    // Clique nos links
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const url = event.target.getAttribute("href");
            carregarPagina(url);
        });
    });

    // Suporte ao botão "voltar" do navegador
    window.addEventListener("popstate", () => {
        const url = location.pathname.split('/').pop() || "inicio.html";
        carregarPagina(url, false);
    });
});

