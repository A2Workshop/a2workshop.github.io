(function () {
    const currentPath = window.location.pathname;
    const prefix = currentPath.includes("/traducciones/") ? "../" : "./";

    const navbarHTML = `
<nav class="navbar navbar-expand-lg d-flex justify-content-center">
    <a href="${prefix}" class="logo-link hide-desktop2">
        <img src="${prefix}pq2/img/a2logo/logo_outline.webp" alt="A2W" class="logo">
    </a>
    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 448 512">
            <path fill="#fff"
                d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32z" />
        </svg>
    </button>
    <a class="nav-link hide-desktop-contact" href="${prefix}contacto.html">Contacto</a>
    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
            <a href="${prefix}" class="logo-link hide-mobile2">
                <img src="${prefix}pq2/img/a2logo/logo_outline.webp" alt="A2W" class="logo">
            </a>
            <li class="nav-item dropdown hide-mobile2">
                <h1 class="nav-link dropdown-toggle text-decoration-underline" id="navbarDropdown"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Proyectos | Persona Q2 Traducción al Español
                </h1>
                <ul class="dropdown-menu bg-black" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="/proyectos/blackopsiiilatino.html">(PC) Call of Duty:
                                Black
                                Ops III Español Latino</a></li>
                    <li><a class="dropdown-item" href="/proyectos/blackopslatino.html">(PC) Call of Duty: Black
                                Ops
                                Español Latino</a></li>
                    <li><a class="dropdown-item" href="/proyectos/infinitewarfarelatino.html">(PC) Call of Duty:
                                Infinite Warfare Español Latino</a></li>
                    <li><a class="dropdown-item" href="/proyectos/modernwarfarerlatino.html">(PC) Call of Duty:
                                Modern Warfare Remastered Español Latino</a></li>
                    <li><a class="dropdown-item" href="/traducciones/pq2espanol.html">(3DS) Persona Q2 Traducción al
                                Español</a></li>
                    <li><a class="dropdown-item" href="/traducciones/p4despanol.html">(PS4/PSV) Persona 4 Dancing
                                Traducción al Español</a></li>
                </ul>
            </li>
            <li class="nav-item hide-mobile2">
                <a class="nav-link desktop-contact" href="${prefix}contacto.html">Contacto</a>
            </li>
            <div class="dropdown-mobile hide-desktop2 flex-column align-items-center d-flex bg-black border-3">
                <a class="nav-link text-decoration-underline navtitle-mobile" id="navbarDropdown" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Proyectos | Persona Q2 Traducción al Español
                </a>
                <li><a class="dropdown-item mt-2" href="/proyectos/blackopsiiilatino.html">(PC) Call of Duty:
                            Black Ops III Español Latino</a></li>
                <li><a class="dropdown-item mt-2" href="/proyectos/blackopslatino.html">(PC) Call of Duty:
                            Black Ops Español Latino</a></li>
                <li><a class="dropdown-item mt-2" href="/proyectos/infinitewarfarelatino.html">(PC) Call of Duty:
                            Infinite Warfare Español Latino</a></li>
                <li><a class="dropdown-item mt-2" href="/proyectos/modernwarfarerlatino.html">(PC) Call of Duty:
                            MWR Español Latino</a></li>
                <li><a class="dropdown-item mt-2" href="/traducciones/pq2espanol.html">(3DS) Persona Q2 Traducción
                            al Español</a></li>
                <li><a class="dropdown-item mt-2 mb-3" href="/traducciones/p4despanol.html">(PS4/PSV) P4D
                            Traducción al Español</a></li>
            </div>
        </ul>
    </div>
</nav>`;

    document.addEventListener("DOMContentLoaded", function () {
        const container = document.createElement("div");
        container.innerHTML = navbarHTML;
        document.body.insertBefore(container, document.body.firstChild);
    });
})();