document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".links-menu");
    const secoes = document.querySelectorAll(".secao");
    const direitos = document.getElementById("direitos");
    const barra = document.querySelector(".barra-deslizante");

    // Atualiza o rodapé com o ano atual
    function atualizarFooter() {
        const ano = new Date().getFullYear();
        direitos.textContent = `© ${ano} - Lindos Horizontes. Todos os direitos reservados.`;
    }

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

});
