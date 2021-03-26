function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', evento=>{
            evento.preventDefault();
            const texto_enlace = document.querySelector(evento.target.attributes.href.value);//para obetener el texto del href y que el selector obtenga el id del elemento a hacer scroll
            texto_enlace.scrollIntoView({
                behavior: 'smooth'
            });
        })
    })
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    // Registrar el intersection observer
    const observer = new IntersectionObserver(entries=>{//entries da la informacion del elemento a observar
        console.log(entries[0]);//porque devuelve una lisa, con uno o mas elemento a observar, dependiendo los elementos que deseemos

        if(entries[0].isIntersecting){
            // console.log('elemento visible');
            barra.classList.remove('fijo')
        }else{
            barra.classList.add('fijo')
            // console.log('elemento no visible')
        }
    });
    
    //elemneto a observar
    observer.observe(document.querySelector('.sobre-festival'));
}

document.addEventListener('DOMContentLoaded', ()=>{
    scrollNav();
    navegacionFija();
});
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');//seleccionamos la clase de galeria imagenes
    for (let i=1; i<=12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;//agragamos un atributo data-imagen-id, es importante la mayúscula(I) por que da separacion

        imagen.onclick = mostrarImagen;//para asignar evente de click en cada imagen. Al dar click llamaremos a la funcion mostrar imagen, nótese que mostrar imagenes esta sin paréntesis.

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    //console.log(e.target);//para ver la etiqueta a la que le dimos click
    const id = parseInt(e.target.dataset.imagenId);//seleccionamos el data set que le dimos a la etiqueta
    
    //generar imagen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay-galeria');

    //mostrar en el html
    const body = document.querySelector('body')
    body.appendChild(overlay);
    body.classList.add('fijar-body');

    //boton para cerrar la imagen
    const boton = document.createElement('P');
    boton.textContent = 'X';
    boton.classList.add('btn-cerrar');

    overlay.appendChild(boton);

    //evento cerrar
    //primera manera de click
    boton.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //segunda manera de click
    // boton.addEventListener('click', _=> {
    // overlay.remove();
    // body.classList.remove('fijar-body');
    // })

    //cerrar cuando se da click fuera de la imagen
    overlay.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }
}

document.addEventListener('DOMContentLoaded', crearGaleria());//va a esperara a que el documento este listo o cargado y luego ejecuta la funcion