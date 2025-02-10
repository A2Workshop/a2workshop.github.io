function generarNavbar() {
    const navbar = `
        <nav>
            <div class="nav-container">
                <a href="/index.html" class="hide-desktop"><img src="../assets/img/A2/logo.png" alt="logo" class="logo_nav"></a>
                <a href="/index.html" class="hide-mobile"><img src="../assets/img/A2/full_logo.png" alt="logo" class="logo_nav"></a>
                <div class="megamenu">
                    <a href="#">Proyectos</a>
                    <div class="megamenu-content">
                    <button class="close-btn">&times;</button>
                    <a href="/traducciones/blackopsiiilatino.html">
                        <img src="../assets/img/BO3/logo.png" alt="bo3lalogo"> (PC) Call of Duty: Black Ops III Traducción Español
                        Latino
                    </a>
                    <a href="/traducciones/blackopslatino.html">
                        <img src="../assets/img/BO1/logo.jpg" alt="bolalogo">
                        (PC) Call of Duty: Black Ops Zombies Traducción Español Latino
                    </a>
                    <a href="/traducciones/pq2espanol.html">
                        <img src="../pq2/img/es_logo/blackbg.png" alt="pq2eslogo"> (3DS) Persona Q2 Traducción al Español
                    </a>
                    </div>
                </div>
                <a href="/contacto.html">Contacto</a>
            </div>
        </nav>
    `;

    const navbar2 = `
        <nav>
            <div class="nav-container">
                <div class="megamenu">
                    <a href="#">Proyectos</a>
                    <div class="megamenu-content">
                    <button class="close-btn">&times;</button>
                    <a href="/traducciones/blackopsiiilatino.html">
                        <img src="/assets/img/BO3/logo.png" alt="bo3lalogo"> (PC) Call of Duty: Black Ops III Traducción Español
                        Latino
                    </a>
                    <a href="/traducciones/blackopslatino.html">
                        <img src="/assets/img/BO1/logo.jpg" alt="bolalogo">
                        (PC) Call of Duty: Black Ops Zombies Traducción Español Latino
                    </a>
                    <a href="/traducciones/pq2espanol.html">
                        <img src="/pq2/img/es_logo/blackbg.png" alt="pq2eslogo"> (3DS) Persona Q2 Traducción al Español
                    </a>
                    </div>
                </div>
                <a href="/contacto.html">Contacto</a>
            </div>
        </nav>
    `;

    const navbar3 = `
        <nav>
            <div class="nav-container">
                <a href="/index.html" class="hide-desktop"><img src="assets/img/A2/logo.png" alt="logo" class="logo_nav"></a>
                <a href="/index.html" class="hide-mobile"><img src="assets/img/A2/full_logo.png" alt="logo" class="logo_nav"></a>
                <div class="megamenu">
                    <a href="#">Proyectos</a>
                    <div class="megamenu-content">
                    <button class="close-btn">&times;</button>
                    <a href="/traducciones/blackopsiiilatino.html">
                        <img src="assets/img/BO3/logo.png" alt="bo3lalogo"> (PC) Call of Duty: Black Ops III Traducción Español
                        Latino
                    </a>
                    <a href="/traducciones/blackopslatino.html">
                        <img src="assets/img/BO1/logo.jpg" alt="bolalogo">
                        (PC) Call of Duty: Black Ops Zombies Traducción Español Latino
                    </a>
                    <a href="/traducciones/pq2espanol.html">
                        <img src="pq2/img/es_logo/blackbg.png" alt="pq2eslogo"> (3DS) Persona Q2 Traducción al Español
                    </a>
                    </div>
                </div>
                <a href="/contacto.html">Contacto</a>
            </div>
        </nav>
    `;

    const navbarQ2Descargar = `
        <nav>
            <div class="nav-container">
                <a href="/index.html" class="hide-desktop"><img src="../../assets/img/A2/logo.png" alt="logo" class="logo_nav"></a>
                <a href="/index.html" class="hide-mobile"><img src="../../assets/img/A2/full_logo.png" alt="logo" class="logo_nav"></a>
                <div class="megamenu">
                    <a href="#">Proyectos</a>
                    <div class="megamenu-content">
                    <button class="close-btn">&times;</button>
                    <a href="/traducciones/blackopsiiilatino.html">
                        <img src="../../assets/img/BO3/logo.png" alt="bo3lalogo"> (PC) Call of Duty: Black Ops III Traducción Español
                        Latino
                    </a>
                    <a href="/traducciones/blackopslatino.html">
                        <img src="../../assets/img/BO1/logo.jpg" alt="bolalogo">
                        (PC) Call of Duty: Black Ops Zombies Traducción Español Latino
                    </a>
                    <a href="/traducciones/pq2espanol.html">
                        <img src="../../pq2/img/es_logo/blackbg.png" alt="pq2eslogo"> (3DS) Persona Q2 Traducción al Español
                    </a>
                    </div>
                </div>
                <a href="/contacto.html">Contacto</a>
            </div>
        </nav>
    `;

    // Añadir tambien /web/ a las rutas

    if (window.location.pathname === "/index.html" || window.location.pathname === "/" || window.location.pathname === "/web/index.html" || window.location.pathname === "/web/" || window.location.pathname === "/index" || window.location.pathname === "/" || window.location.pathname === "/web/index" || window.location.pathname === "/web/") {
        document.getElementById("navbar-container").innerHTML = navbar2;
    }

    else if (window.location.pathname === "/contacto.html" || window.location.pathname === "/web/contacto.html" || window.location.pathname === "/contacto" || window.location.pathname === "/web/contacto") {
        document.getElementById("navbar-container").innerHTML = navbar3;
    
    } else if (window.location.pathname === "/pq2espanol/Descargar.html" || window.location.pathname === "/pq2espanol/Descargar" || window.location.pathname === "/web/pq2espanol/Descargar.html" || window.location.pathname === "/web/pq2espanol/Descargar") {
        document.getElementById("navbar-container").innerHTML = navbarQ2Descargar;

    } else {
        document.getElementById("navbar-container").innerHTML = navbar;
    }    

}

generarNavbar();
