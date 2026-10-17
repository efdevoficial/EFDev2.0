
// =========================================
// EFDEV 2.0 — CONFIGURAÇÕES
// =========================================

const CONFIG = {
    email: "efdevoficial@gmail.com",
    discord: "https://discord.gg/sUMZ5sjq5s",
    github: "https://github.com/efdevoficial"
};

// =========================================
// INICIALIZAÇÃO
// =========================================

document.documentElement.classList.add("js-ready");

// =========================================
// MENU RESPONSIVO
// =========================================

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll("#nav-links a");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Abrir menu" : "Fechar menu"
    );

    navLinks.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
});

navItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});

// =========================================
// ANIMAÇÕES AO ROLAR A PÁGINA
// =========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -25px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// =========================================
// BOTÃO VOLTAR AO TOPO
// =========================================

const backToTop = document.querySelector("#back-to-top");

function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 400);
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

updateBackToTop();

// =========================================
// ANO AUTOMÁTICO
// =========================================

document.querySelector("#current-year").textContent =
    new Date().getFullYear();

// =========================================
// CONTATOS DA EFDEV
// =========================================

const emailLink = document.querySelector("#email-link");
const discordLink = document.querySelector("#discord-link");
const careersDiscord = document.querySelector("#careers-discord");

const validEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONFIG.email);

if (validEmail) {
    emailLink.href =
        `mailto:${CONFIG.email}?subject=${encodeURIComponent(
            "Contato pelo site da EFDev"
        )}`;
} else {
    emailLink.href = "#";
    emailLink.addEventListener("click", (event) => {
        event.preventDefault();

        alert(
            "Configure o e-mail oficial no arquivo JS/script.js."
        );
    });
}

const validDiscord =
    /^https:\/\/discord\.gg\/[A-Za-z0-9-]+\/?$/.test(CONFIG.discord);

if (validDiscord) {
    discordLink.href = CONFIG.discord;
    careersDiscord.href = CONFIG.discord;
} else {
    discordLink.href = "#";
    careersDiscord.href = "#";

    function discordNotConfigured(event) {
        event.preventDefault();

        alert(
            "Configure o convite oficial do Discord no arquivo JS/script.js."
        );
    }

    discordLink.addEventListener("click", discordNotConfigured);
    careersDiscord.addEventListener("click", discordNotConfigured);
}

// =========================================
// NAVEGAÇÃO ATIVA
// =========================================

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const sectionId = entry.target.id;

                navItems.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${sectionId}`;

                    if (isActive) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

console.log("EFDev 2.0 carregada com sucesso.");


// =========================================
// INDICADOR DE PROGRESSO DA PÁGINA
// =========================================

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";
progressBar.setAttribute("aria-hidden", "true");

document.body.prepend(progressBar);

let progressTicking = false;

function updateScrollProgress() {
    if (progressTicking) return;

    progressTicking = true;

    window.requestAnimationFrame(() => {
        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;

        progressTicking = false;
    });
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();
