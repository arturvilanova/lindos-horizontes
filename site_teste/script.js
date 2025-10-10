
// SCRIPT DO MENU 
    
const links = document.querySelectorAll('.links-menu');
const secoes = document.querySelectorAll('.secao');

function ativarSecao(id) {
    secoes.forEach(sec => sec.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
}

function ativarLink(linkClicado) {
    links.forEach(link => link.classList.remove('ativo'));
    linkClicado.classList.add('ativo');
}

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const destino = link.dataset.target;
        ativarSecao(destino);
        ativarLink(link);
    });
});

// Começa com "inicio" ativo
ativarSecao('inicio');
links[0].classList.add('ativo');
    

// SCRIPT DO FOOTER 
    
const anoAtual = new Date().getFullYear();
document.getElementById("direitos").innerText = `© ${anoAtual} - Lindos Horizontes. Todos os direitos reservados.`;
    
