document.addEventListener('DOMContentLoaded', function () {
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
});

const links = [
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5cd1f737abdc18f94efc569d4d80bf6b',
    'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=5cd1f737abdc18f94efc569d4d80bf6b',
    'https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=5cd1f737abdc18f94efc569d4d80bf6b'
];

window.addEventListener('DOMContentLoaded', () => {
    const solicitudes = links.map(peticion => fetch(peticion));
    Promise.all(solicitudes).then(values => {
        return Promise.all(values.map(r => r.json()))
    }).then(catologos => {
        const [catalogoUno, catalogoDos, catalogoTres] = catologos;

        // Catalogo uno
        const populares = document.querySelector('#populares');
        catalogoUno.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/' + pelicula.poster_path;
            article.append(img);
            populares.append(article);
        });

        // Catalogo dos
        const estrenos = document.querySelector('#estreno');
        catalogoDos.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/' + pelicula.poster_path;
            article.append(img);
            estrenos.append(article);
        });

        // Catalogo tres
        const vistas = document.querySelector('#vistas');
        catalogoTres.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/' + pelicula.poster_path;
            article.append(img);
            vistas.append(article);
        });

        // Initialize sliders
        initializeSlider('populares');
        initializeSlider('estreno');
        initializeSlider('vistas');
        initializeSlider('top');
    });
});

function initializeSlider(sliderId) {
    const filaPelicula = document.querySelectorAll(`#${sliderId} .peliculas-top`);
    const fila = document.querySelector(`#${sliderId} .peliculas`);
    const peliculas = document.querySelector(`#${sliderId}`);
    
    const flechaIzquierda = document.querySelector(`#${sliderId} .topLeft`);
    const flechaDerecha = document.querySelector(`#${sliderId} .topRigth`);

    // Rest of your slider code...

    /* paginación */
    const numeroPagina = Math.ceil(filaPelicula.length / 5);
    for (let i = 0; i < numeroPagina; i++) {
        const indicador = document.createElement('button');

        if (i === 0) {
            indicador.classList.add("activo");
        }

        document.querySelector(`#${sliderId} .indicadores`).appendChild(indicador);
        indicador.addEventListener("click", (e) => {
            peliculas.scrollLeft = i * peliculas.offsetWidth;

            document.querySelector(`#${sliderId} .indicadores .activo`).classList.remove("activo")
            e.target.classList.add("activo")
        })
    }

    /* Hover */
    Array.from(peliculas.children).forEach((pelicula) => {
        pelicula.addEventListener("mouseenter", (e) => {
            const elemento = e.currentTarget;
            setTimeout(() => {
                Array.from(peliculas.children).forEach((pelicula) => pelicula.classList.remove("hover"));
                elemento.classList.add("hover");
            }, 300)
        })
    });
}
