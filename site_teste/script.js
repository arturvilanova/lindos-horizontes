document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".links-menu");
    const secoes = document.querySelectorAll(".secao");
    const direitos = document.getElementById("direitos");

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

    // Gerencia o estado visual dos links
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            links.forEach(l => l.classList.remove("ativo"));
            link.classList.add("ativo");
            mostrarSecao(link.dataset.target);
        });
    });

    atualizarFooter();
});



// ===== EFEITO BARRA DESLIZANTE DO MENU =====
const indicador = document.querySelector(".menu-indicador");
const linksMenu = document.querySelectorAll(".links-menu");

// Função para posicionar a barra sob o link ativo
function moverIndicador(linkAtivo) {
    const rect = linkAtivo.getBoundingClientRect();
    const navRect = linkAtivo.closest("nav").getBoundingClientRect();

    indicador.style.width = `${rect.width + 6}px`; // ligeiramente maior que o texto
    indicador.style.left = `${rect.left - navRect.left}px`;
}

// Quando a página carregar, posiciona no "Início"
window.addEventListener("load", () => {
    const linkInicial = document.querySelector(".links-menu.ativo");
    if (linkInicial) moverIndicador(linkInicial);
});

// Atualiza a posição da barra quando clicamos
linksMenu.forEach(link => {
    link.addEventListener("click", e => {
        moverIndicador(link);
    });
});

// Reposiciona em caso de redimensionamento de tela
window.addEventListener("resize", () => {
    const linkAtivo = document.querySelector(".links-menu.ativo");
    if (linkAtivo) moverIndicador(linkAtivo);
});

