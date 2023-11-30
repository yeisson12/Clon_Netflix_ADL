document.addEventListener('DOMContentLoaded', function () {
    // Cambio de color al hacer scroll
    const content = document.querySelector('.main');

    function cambioColorScroll() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 0) {
            content.classList.add('scroll-color');
        } else {
            content.classList.remove('scroll-color');
        }
    }

    addEventListener('scroll', cambioColorScroll);

    // Slider de películas
    const slider = document.querySelector('.slider');
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        const translateValue = -currentSlide * 100 + '%';
        slider.style.transform = `translateX(${translateValue})`;
    }

    window.prevSlide = function () {
        showSlide(currentSlide - 1);
    }

    window.nextSlide = function () {
        showSlide(currentSlide + 1);
    }
});

// Carga de datos y construcción de catálogos
const links = [
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5cd1f737abdc18f94efc569d4d80bf6b',
    'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=5cd1f737abdc18f94efc569d4d80bf6b',
    'https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=5cd1f737abdc18f94efc569d4d80bf6b'
];

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.slider');
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        const translateValue = -currentSlide * 100 + '%';
        slider.style.transform = `translateX(${translateValue})`;
    }

    window.prevSlide = function () {
        showSlide(currentSlide - 1);
    }

    window.nextSlide = function () {
        showSlide(currentSlide + 1);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const solicitudes = links.map(peticion => fetch(peticion));
    Promise.all(solicitudes).then(values => {
        return Promise.all(values.map(r => r.json()))
    }).then(catologos => {
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
});

document.addEventListener('DOMContentLoaded', function () {
    // Slider de películas en la sección de "peliculas-top"
    const filaPelicula = document.querySelectorAll(".peliculas-top");
    const fila = document.querySelector(".peliculas");
    const peliculas = document.querySelector(".slide-dos");

    const flechaIzquierda = document.querySelector(".topLeft");
    const flechaDerecha = document.querySelector('.topRigth');

    /* Evento Flecha derecha */
    flechaDerecha.addEventListener('click', () => {
        peliculas.scrollLeft += peliculas.offsetWidth;

        const indicadorActivo = document.querySelector(".indicadores .activo");

        if (indicadorActivo.nextSibling) {
            indicadorActivo.nextSibling.classList.add("activo");
            indicadorActivo.classList.remove("activo");
        }
    });

    /* Evento Flecha izquierda */
    flechaIzquierda.addEventListener('click', () => {
        peliculas.scrollLeft -= peliculas.offsetWidth;

        const indicadorActivo = document.querySelector(".indicadores .activo");

        if (indicadorActivo.previousSibling) {
            indicadorActivo.previousSibling.classList.add("activo");
            indicadorActivo.classList.remove("activo");
        }
    });

    /* paginación */
    const numeroPagina = Math.ceil(filaPelicula.length / 5);
    for (let i = 0; i < numeroPagina; i++) {
        const indicador = document.createElement('button');

        if (i === 0) {
            indicador.classList.add("activo");
        }

        document.querySelector('.indicadores').appendChild(indicador);
        indicador.addEventListener("click", (e) => {
            peliculas.scrollLeft = i * peliculas.offsetWidth;

            document.querySelector(".indicadores .activo").classList.remove("activo")
            e.target.classList.add("activo")
        })
    }

    /* Hover */
    filaPelicula.forEach((pelicula) => {
        pelicula.addEventListener("mouseenter", (e) => {
            const elemento = e.currentTarget;
            setTimeout(() => {
                filaPelicula.forEach(pelicula => pelicula.classList.remove("hover"));
                elemento.classList.add("hover")
            }, 300)
        })
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const peliculasSlide = document.querySelector("#peliculas-slide");
    let currentVideo;

    function playVideo(element) {
        const video = element.querySelector("video");
        if (video) {
            video.play();
            currentVideo = video;
        }
    }

    function pauseVideo(element) {
        const video = element.querySelector("video");
        if (video && video !== currentVideo) {
            video.pause();
        }
    }

    peliculasSlide.addEventListener("mouseout", function () {
        if (currentVideo) {
            currentVideo.pause();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.slider');
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        const translateValue = -currentSlide * 100 + '%';
        slider.style.transform = `translateX(${translateValue})`;
    }

    window.prevSlide = function () {
        showSlide(currentSlide - 1);
    }

    window.nextSlide = function () {
        showSlide(currentSlide + 1);
    }
});
