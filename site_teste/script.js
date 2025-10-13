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
