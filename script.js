// ==========================================
// 🚀 LINDOS HORIZONTES - JS CORRIGIDO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 🔘 TOGGLE APRESENTAÇÃO / LOJA
    // ==========================================

    const switchBtn = document.querySelector(".switch");

    const iconApresentacao = document.querySelector(".icon-apresentacao");
    const iconLoja = document.querySelector(".icon-loja");

    if (switchBtn && iconApresentacao && iconLoja) {

        switchBtn.addEventListener("click", () => {

            switchBtn.classList.toggle("ativo");

            if (switchBtn.classList.contains("ativo")) {

                iconApresentacao.classList.add("ativo");
                iconLoja.classList.remove("ativo");

            } else {

                iconApresentacao.classList.remove("ativo");
                iconLoja.classList.add("ativo");

            }

        });

    }

    // ==========================================
    // 🔗 MENU + SEÇÕES
    // ==========================================

    const links = document.querySelectorAll(".links-menu");
    const secoes = document.querySelectorAll(".secao");
    const barra = document.querySelector(".barra-deslizante");
    const direitos = document.getElementById("direitos");

    function mostrarSecao(id) {

        secoes.forEach(secao => {
            secao.classList.remove("ativa");
        });

        const secao = document.getElementById(id);

        if (secao) {
            secao.classList.add("ativa");
        }

        // Atualiza carrossel se existir
        setTimeout(() => {

            if (typeof updateCarouselInicio === "function") {
                updateCarouselInicio(false);
            }

        }, 50);

    }

    // ==========================================
    // 📍 MOVER BARRA
    // ==========================================

    function moverBarra(linkAtivo, animar = true) {

        if (!barra || !linkAtivo) return;

        let largura;
        let esquerda;

        const isMobile = window.innerWidth <= 480;

        if (isMobile) {

            const container = document.querySelector("#links");

            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const linkRect = linkAtivo.getBoundingClientRect();

            largura = linkRect.width;
            esquerda = linkRect.left - containerRect.left;

        } else {

            largura = linkAtivo.offsetWidth;
            esquerda = linkAtivo.offsetLeft;

        }

        if (!animar) {
            barra.style.transition = "none";
        }

        barra.style.width = `${largura}px`;
        barra.style.left = `${esquerda}px`;

        if (!animar) {

            requestAnimationFrame(() => {

                barra.style.transition =
                    "left 0.3s ease, width 0.3s ease";

            });

        }

    }

    // ==========================================
    // 🔥 MENU CLICK
    // ==========================================

    links.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const alvo = link.dataset.target;

            links.forEach(l => {
                l.classList.remove("ativo");
            });

            link.classList.add("ativo");

            mostrarSecao(alvo);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            moverBarra(link, true);

        });

    });

    // ==========================================
    // 🚀 LINK INICIAL
    // ==========================================

    const linkInicial = document.querySelector(".links-menu.ativo");

    if (linkInicial) {
        moverBarra(linkInicial, false);
    }

    // ==========================================
    // 📱 RESIZE
    // ==========================================

    window.addEventListener("resize", () => {

        const ativo = document.querySelector(".links-menu.ativo");

        if (ativo) {
            moverBarra(ativo, false);
        }

    });

    // ==========================================
    // 📌 FOOTER
    // ==========================================

    function atualizarFooter() {

        if (!direitos) return;

        const ano = new Date().getFullYear();

        direitos.textContent =
            `© ${ano} - Lindos Horizontes. Todos os direitos reservados.`;

    }

    atualizarFooter();

    // ==========================================
    // 🎞️ CARROSSEL
    // ==========================================

    const trackInicio = document.querySelector(".track_1");
    const dots = document.querySelectorAll(".dot");

    let slidesInicio = [];
    let indexInicio = 1;
    let startX = 0;
    let carouselInicializado = false;

    // ==========================================
    // 🚀 INICIAR CARROSSEL
    // ==========================================

    function iniciarCarousel() {

        if (!trackInicio) return;

        if (carouselInicializado) return;

        carouselInicializado = true;

        const slidesOriginais = Array.from(
            trackInicio.querySelectorAll(".slide_1")
        );

        if (slidesOriginais.length === 0) return;

        trackInicio.innerHTML = "";

        const firstClone = slidesOriginais[0].cloneNode(true);

        const lastClone =
            slidesOriginais[slidesOriginais.length - 1].cloneNode(true);

        trackInicio.appendChild(lastClone);

        slidesOriginais.forEach(slide => {
            trackInicio.appendChild(slide);
        });

        trackInicio.appendChild(firstClone);

        slidesInicio = document.querySelectorAll(".slide_1");

        updateCarouselInicio(false);

        requestAnimationFrame(() => {

            trackInicio.style.transition =
                "transform 0.4s ease";

        });

    }

    // ==========================================
    // 🎯 UPDATE
    // ==========================================

    function updateCarouselInicio(smooth = true) {

        if (!trackInicio || slidesInicio.length === 0) return;

        const slideWidth = slidesInicio[0].clientWidth;

        trackInicio.style.transition = smooth
            ? "transform 0.4s ease"
            : "none";

        trackInicio.style.transform =
            `translateX(-${slideWidth * indexInicio}px)`;

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        let realIndex = indexInicio - 1;

        if (realIndex < 0) {
            realIndex = dots.length - 1;
        }

        if (realIndex >= dots.length) {
            realIndex = 0;
        }

        if (dots[realIndex]) {
            dots[realIndex].classList.add("active");
        }

    }

    // ==========================================
    // 👉 NEXT
    // ==========================================

    function nextSlide() {

        if (slidesInicio.length === 0) return;

        indexInicio++;

        updateCarouselInicio(true);

    }

    // ==========================================
    // 👈 PREV
    // ==========================================

    function prevSlide() {

        if (slidesInicio.length === 0) return;

        indexInicio--;

        updateCarouselInicio(true);

    }

    // ==========================================
    // 🔄 LOOP INFINITO
    // ==========================================

    if (trackInicio) {

        trackInicio.addEventListener("transitionend", () => {

            if (slidesInicio.length === 0) return;

            const slideWidth = slidesInicio[0].clientWidth;

            // último clone
            if (indexInicio === slidesInicio.length - 1) {

                trackInicio.style.transition = "none";

                indexInicio = 1;

                trackInicio.style.transform =
                    `translateX(-${slideWidth * indexInicio}px)`;

            }

            // primeiro clone
            if (indexInicio === 0) {

                trackInicio.style.transition = "none";

                indexInicio = slidesInicio.length - 2;

                trackInicio.style.transform =
                    `translateX(-${slideWidth * indexInicio}px)`;

            }

        });

    }

    // ==========================================
    // 🖱️ CLICK
    // ==========================================

    if (trackInicio) {

        trackInicio.addEventListener("click", nextSlide);

    }

    // ==========================================
    // 📱 TOUCH
    // ==========================================

    if (trackInicio) {

        trackInicio.addEventListener("touchstart", e => {

            startX = e.touches[0].clientX;

        });

        trackInicio.addEventListener("touchend", e => {

            const endX = e.changedTouches[0].clientX;

            const diff = startX - endX;

            if (diff > 50) {

                nextSlide();

            } else if (diff < -50) {

                prevSlide();

            }

        });

    }

    // ==========================================
    // 🚀 START
    // ==========================================

    iniciarCarousel();

    requestAnimationFrame(() => {
        updateCarouselInicio(false);
    });

    setTimeout(() => {
        updateCarouselInicio(false);
    }, 120);

    // ==========================================
    // ✍️ FRASE DO DIA
    // ==========================================

    const frases = [
        "A natureza nunca se repete.",
        "A Beleza está nos pequenos detalhes.",
        "O simples também encanta.",
        "Cada olhar revela um novo mundo.",
        "A luz transforma tudo.",
        "O natural é a maior arte."
    ];

    function atualizarFrase() {

        const frase =
            frases[Math.floor(Math.random() * frases.length)];

        const fraseElemento =
            document.getElementById("frase-dia");

        if (fraseElemento) {

            fraseElemento.textContent =
                "✨ " + frase;

        }

    }

    atualizarFrase();

    // ==========================================
    // 🔒 NAVEGAÇÃO INTERNA
    // ==========================================

    document
        .querySelectorAll("[data-target].nav-trigger")
        .forEach(botao => {

            botao.addEventListener("click", e => {

                e.preventDefault();

                const alvo = botao.dataset.target;

                mostrarSecao(alvo);

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                const linkMenu =
                    document.querySelector(
                        `.links-menu[data-target="${alvo}"]`
                    );

                if (linkMenu) {

                    links.forEach(l => {
                        l.classList.remove("ativo");
                    });

                    linkMenu.classList.add("ativo");

                    moverBarra(linkMenu, true);

                }

            });

        });

    // ==========================================
    // 🖼️ LIGHTBOX
    // ==========================================

    const imagens =
        document.querySelectorAll("#div-das-fotos img");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImg =
        document.getElementById("lightbox-img");

    const fechar =
        document.getElementById("fechar");

    if (lightbox && lightboxImg && fechar) {

        imagens.forEach(img => {

            img.addEventListener("click", () => {

                lightbox.classList.add("ativo");

                lightboxImg.src = img.src;

            });

        });

        fechar.addEventListener("click", () => {

            lightbox.classList.remove("ativo");

        });

        lightbox.addEventListener("click", e => {

            if (e.target === lightbox) {

                lightbox.classList.remove("ativo");

            }

        });

    }

});
