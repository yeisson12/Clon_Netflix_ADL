document.addEventListener('DOMContentLoaded', function () {
    // Cambio de color al hacer scroll
    const content = document.querySelector('.main');

    function cambioColorScroll() {
        const scrollPosition = window.scrollY;
        content.classList.toggle('scroll-color', scrollPosition > 0);
    }

    window.addEventListener('scroll', cambioColorScroll);

    // Pausar video
    const video = document.getElementById('miVideo');
    const poster = document.getElementById('miPoster');

    video.addEventListener('ended', function () {
        video.style.display = 'none';
        poster.style.display = 'block';
    });

    // Reproducir el video
    video.play();

    // Slider de películas
    const slider = document.querySelector('.slider');
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        currentSlide = (index + slides.length) % slides.length;
        const translateValue = -currentSlide * 100 + '%';
        slider.style.transform = `translateX(${translateValue})`;
    }

    window.prevSlide = function () {
        showSlide(currentSlide - 1);
    };

    window.nextSlide = function () {
        showSlide(currentSlide + 1);
    };
});

// Carga de datos y construcción de catálogos
document.addEventListener('DOMContentLoaded', async function () {
    const links = [
        'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5cd1f737abdc18f94efc569d4d80bf6b',
        'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=5cd1f737abdc18f94efc569d4d80bf6b',
        'https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=5cd1f737abdc18f94efc569d4d80bf6b'
    ];

    const responses = await Promise.all(links.map(peticion => fetch(peticion)));
    const catologos = await Promise.all(responses.map(r => r.json()));

    const [catalogoUno, catalogoDos, catalogoTres] = catologos;

    function construirCatalogo(contenedor, catalogo) {
        catalogo.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/' + pelicula.poster_path;
            article.append(img);
            contenedor.append(article);
        });
    }

    // Catalogo uno
    const populares = document.querySelector('#populares');
    construirCatalogo(populares, catalogoUno);

    // Catalogo dos
    const estrenos = document.querySelector('#estreno');
    construirCatalogo(estrenos, catalogoDos);

    // Catalogo tres
    const vistas = document.querySelector('#vistas');
    construirCatalogo(vistas, catalogoTres);
});

document.addEventListener('DOMContentLoaded', function () {
    // Slider de películas en la sección de "peliculas-top"
    const filaPelicula = document.querySelectorAll(".peliculas-top");
    const peliculas = document.querySelector(".slide-dos");
    const flechaIzquierda = document.querySelector(".topLeft");
    const flechaDerecha = document.querySelector('.topRigth');
    const indicadoresContenedor = document.querySelector('.indicadores');

    flechaDerecha.addEventListener('click', () => {
        peliculas.scrollLeft += peliculas.offsetWidth;
        actualizarIndicadores(1);
    });

    flechaIzquierda.addEventListener('click', () => {
        peliculas.scrollLeft -= peliculas.offsetWidth;
        actualizarIndicadores(-1);
    });

    function actualizarIndicadores(direction) {
        const indicadores = Array.from(indicadoresContenedor.children);
        const currentIndex = indicadores.findIndex(indicador => indicador.classList.contains('activo'));
        const newIndex = (currentIndex + direction + indicadores.length) % indicadores.length;
        
        indicadores[currentIndex].classList.remove('activo');
        indicadores[newIndex].classList.add('activo');
    }

    /* paginación */
    const numeroPagina = Math.ceil(filaPelicula.length / 5);
    for (let i = 0; i < numeroPagina; i++) {
        const indicador = document.createElement('button');
        indicador.classList.toggle('activo', i === 0);
        indicadoresContenedor.appendChild(indicador);

        indicador.addEventListener("click", () => {
            peliculas.scrollLeft = i * peliculas.offsetWidth;
            actualizarIndicadores(i);
        });
    }

    /* Hover */
    filaPelicula.forEach((pelicula) => {
        pelicula.addEventListener("mouseenter", () => {
            setTimeout(() => {
                filaPelicula.forEach(pelicula => pelicula.classList.remove("hover"));
                pelicula.classList.add("hover");
            }, 300);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        currentSlide = (index + slides.length) % slides.length;
        const translateValue = -currentSlide * 100 + '%';
        slider.style.transform = `translateX(${translateValue})`;
    }

    window.prevSlide = function () {
        showSlide(currentSlide - 1);
    };

    window.nextSlide = function () {
        showSlide(currentSlide + 1);
    };
});
