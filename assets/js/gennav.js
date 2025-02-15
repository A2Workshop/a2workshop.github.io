function generarNavbar() {
    const navbar = `
        <nav>
            <div class="nav-container">
                <a href="/" class="hide-desktop"><img src="../assets/img/A2/logo.png" alt="logo" class="logo_nav"></a>
                <a href="/" class="hide-mobile"><img src="../assets/img/A2/full_logo.png" alt="logo" class="logo_nav"></a>
                <div class="megamenu">
                    <a href="#">Proyectos</a>
                    <div class="megamenu-content">
                    <button class="close-btn">&times;</button>
                    <a href="/proyectos/blackopsiiilatino.html">
                        <img src="../assets/img/BO3/logo.png" alt="bo3lalogo"> (PC) Call of Duty: Black Ops III Español
                        Latino
                    </a>
                    <a href="/proyectos/blackopslatino.html">
                        <img src="../assets/img/BO1/logo.jpg" alt="bolalogo">
                        (PC) Call of Duty: Black Ops Zombies Español Latino
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
                    <a href="/proyectos/blackopsiiilatino.html">
                        <img src="/assets/img/BO3/logo.png" alt="bo3lalogo"> (PC) Call of Duty: Black Ops III Español
                        Latino
                    </a>
                    <a href="/proyectos/blackopslatino.html">
                        <img src="/assets/img/BO1/logo.jpg" alt="bolalogo">
                        (PC) Call of Duty: Black Ops Zombies Español Latino
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
                <a href="/" class="hide-desktop"><img src="assets/img/A2/logo.png" alt="logo" class="logo_nav"></a>
                <a href="/" class="hide-mobile"><img src="assets/img/A2/full_logo.png" alt="logo" class="logo_nav"></a>
                <div class="megamenu">
                    <a href="#">Proyectos</a>
                    <div class="megamenu-content">
                    <button class="close-btn">&times;</button>
                    <a href="/proyectos/blackopsiiilatino.html">
                        <img src="assets/img/BO3/logo.png" alt="bo3lalogo"> (PC) Call of Duty: Black Ops III Español
                        Latino
                    </a>
                    <a href="/proyectos/blackopslatino.html">
                        <img src="assets/img/BO1/logo.jpg" alt="bolalogo">
                        (PC) Call of Duty: Black Ops Zombies Español Latino
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

    const navbarpq2install = `
        <nav>
            <div class="nav-container">
                <a href="/" class="hide-desktop"><img src="../../pq2/img/a2logo/logo.png" alt="logo" class="logo_nav"></a>
                <a href="/" class="hide-mobile"><img src="../../pq2/img/a2logo/full_logo.png" alt="logo" class="logo_nav"></a>
                <div class="megamenu">
                    <a href="#">Proyectos</a>
                    <div class="megamenu-content">
                    <button class="close-btn">&times;</button>
                    <a href="/proyectos/blackopsiiilatino.html">
                        <img src="../../assets/img/BO3/logo.png" alt="bo3lalogo"> (PC) Call of Duty: Black Ops III Español
                        Latino
                    </a>
                    <a href="/proyectos/blackopslatino.html">
                        <img src="../../assets/img/BO1/logo.jpg" alt="bolalogo">
                        (PC) Call of Duty: Black Ops Zombies Español Latino
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

    if (window.location.pathname === "/index.html" || window.location.pathname === "/" || window.location.pathname === "/index") {
        document.getElementById("navbar-container").innerHTML = navbar2;
    }
    
    else if (window.location.pathname === "/contacto.html" || window.location.pathname === "/contacto") {
        document.getElementById("navbar-container").innerHTML = navbar3;
    }
    
    else if (window.location.pathname === "/traducciones/pq2espanol/descargar.html" || window.location.pathname === "/traducciones/pq2espanol/descargar") {
        document.getElementById("navbar-container").innerHTML = navbarpq2install;
    }
    
    else {
        document.getElementById("navbar-container").innerHTML = navbar;
    }     

}

generarNavbar();
