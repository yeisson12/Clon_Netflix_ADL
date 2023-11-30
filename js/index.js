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
        
    });
});


const filaPelicula = document.querySelectorAll(".peliculas-top")
const fila = document.querySelector(".peliculas");
const peliculas = document.querySelector(".slide-dos");

const flechaIzquierda = document.querySelector(".topLeft");
const flechaDerecha = document.querySelector('.topRigth');

/* Evento Flecha derecha */

flechaDerecha.addEventListener('click', () => {

    peliculas.scrollLeft += peliculas.offsetWidth;

    const indicadorActivo = document.querySelector(".indicadores .activo")

    if (indicadorActivo.nextSibling) {
        indicadorActivo.nextSibling.classList.add("activo");
        indicadorActivo.classList.remove("activo");
    }
});

/* Evento Flecha derecha */

flechaIzquierda.addEventListener('click', () => {

    peliculas.scrollLeft -= peliculas.offsetWidth;

    const indicadorActivo = document.querySelector(".indicadores .activo")

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

peliculas.forEach((peliculas) => {
    peliculas.addEventListener("mouseenter", (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            peliculas.forEach(peliculas => peliculas.classList.remove("hover"));
            elemento.classList.add("hover")
        }, 300)
    })
}) 

