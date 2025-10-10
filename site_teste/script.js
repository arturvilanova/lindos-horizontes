
// Espera o DOM estar pronto
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".links-menu");
    const conteudo = document.getElementById("conteudo");
    const direitos = document.getElementById("direitos");

    // Função que atualiza o rodapé
    function atualizarFooter() {
        const anoAtual = new Date().getFullYear();
        direitos.textContent = `© ${anoAtual} - Lindos Horizontes. Todos os direitos reservados.`;
    }

    // Função que carrega o conteúdo da página clicada
    async function carregarConteudo(pagina) {
        try {
            // Caso o link seja "Início", mostra o conteúdo padrão
            if (pagina === "inicio") {
                conteudo.innerHTML = `
                    <section id="inicio" class="secao ativa">
                        <h2>Início</h2>
                        <p>As novidades do site</p>
                    </section>
                `;
                
            } else {
                // Faz o fetch da página
                const resposta = await fetch(`${pagina}.html`);
                const texto = await resposta.text();

                // Extrai apenas o conteúdo do <main>
                const parser = new DOMParser();
                const doc = parser.parseFromString(texto, "text/html");
                const main = doc.querySelector("main");

                conteudo.innerHTML = main ? main.innerHTML : `<p>Erro ao carregar ${pagina}.html</p>`;
            }

            atualizarFooter();
        } catch (erro) {
            conteudo.innerHTML = `<p>Erro ao carregar o conteúdo.</p>`;
            console.error("Erro ao carregar:", erro);
        }
    }

    // Função para ativar visualmente o link
    function ativarLink(linkClicado) {
        links.forEach(link => link.classList.remove("ativo"));
        linkClicado.classList.add("ativo");
    }

    // Eventos de clique nos links
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const destino = link.dataset.target;
            ativarLink(link);
            carregarConteudo(destino);
        });
    });

    // Inicializa com "Início" ativo
    ativarLink(links[0]);
    atualizarFooter();
});
