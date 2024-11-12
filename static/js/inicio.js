import { proyectos, experiencia } from '/static/data.js';

function mostrarJob() {
    // Hide all job elements
    $('.job').hide();
    // Get the data-id of the selected input
    const id = $(this).data('id');
    // Show only the selected job if checked
    if ($(this).is(':checked')) {
        $(`#job${id}`).show();
    }
}

function graficarProyectos() {
    let htmlPrincipales = '';
    let htmlSecundarios = '';
    proyectos.forEach((item, index) => {
        if (index < 5) {
            htmlPrincipales += `
                <div class="p-principal ${index % 2 === 1 ? 'p-invertido' : ''}">
                    <div class="p-info">
                        <div class="header">
                            <h3>${item.nombre}</h3>
                        </div>
                        <div class="descripcion">
                            <p>${item.descripcion}</p>
                        </div>
                        <div class="tecnologias">
                            <ul>
                                ${item.tecnologias.map(tecno => {
                                    return '<li>' + tecno + '</li>';
                                }).join('')}
                            </ul>
                            <div class="t-links">
                                ${item.github !== '' ? '<span><a href="'+ item.github +'"><i class="fab fa-github"></i></a></span>' : ''}
                                ${item.url !== '' ? '<span><a href="'+ item.url +'"><i class="fas fa-external-link-square-alt"></i></a></span>' : ''}
                            </div>
                        </div>
                    </div>
                    <div class="p-img">
                        <img src="static/${item.imagen !== '' ? item.imagen : 'img/murasa.png'}" alt="Proyecto 1">
                    </div>
                </div>       
            `;
        } else {
            htmlSecundarios += `
                <div class="s-proyecto">
                <div class="s-icono">
                    <i class="far fa-folder"></i>
                </div>
                <div class="s-info">
                    <div class="s-header">
                        <h4>${item.nombre}</h4>
                        <div>
                            ${item.github !== '' ? '<span><a href="'+item.github+'"><i class="fab fa-github"></i></a></span>' : ''}
                            ${item.url !== '' ? '<span><a href="'+item.url+'"><i class="fas fa-external-link-square-alt"></i></a></span>' : ''}
                        </div>
                    </div>
                    <div class="s-content">
                        <p>${item.descripcion}</p>
                    </div>
                    <div class="s-lenguages">
                        <ul>
                            ${item.tecnologias.map(tecno => {
                                return '<li>' + tecno + '</li>';
                            }).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            `;
        }
    });

    $('.p-principales').html(htmlPrincipales);
    $('.p-secundarios').html(htmlSecundarios);
}

function graficarExperiencia() {
    let htmlNAV = '';
    let htmlJobs = '';
    experiencia.forEach((item, index) => {
        htmlNAV += `
            <input id="idPuesto${index}" data-id="${index}" type="radio" name="jobs" ${index === 0 ? 'checked' : ''}>
            <label for="idPuesto${index}" class="label-job">${item.cargo}
            </label>
        `;
        htmlJobs += `
            <div class="job" id="job${index}">
                <div class="desc-puesto">
                    <p>${item.cargo}</p>
                    <p>${item.empresa}</p>
                    <p>${item.fecha_inicio} - ${item.fecha_fin}</p>
                </div>
                <div class="desc-tareas">
                    <ul>
                    ${item.actividades.map((tarea, i) => {
                        return '<li>' + tarea + '</li>'
                    }).join('')}
                    </ul>
                </div>
                <div class="desc-tecnologias">
                    ${item.tecnologias.map(tecnologia => {
                        return '<span>' + tecnologia + '</span>';
                    }).join('')}
                </div>
            </div>
        `;
    });
    $('.nav-experiencia').html(htmlNAV);
    $('.descripcion-experiencia').html(htmlJobs);
    
    // Set up the event listener and trigger it initially
    $('input[name="jobs"]').on('change', mostrarJob);
    // Check initial state of all inputs on page load
    $('input[name="jobs"]:checked').each(mostrarJob);
}


function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


$(function() {

    const $nav = document.querySelector('nav.main-header');
    const $navLinks = document.querySelectorAll('nav.main-header a');
    const $secciones = document.querySelectorAll('section');
    const topOfNav = $nav.offsetTop;
    let oneSeccion = '';
    function fixNav() {
        if (window.scrollY-5 >= topOfNav) {
            document.body.style.paddingTop = $nav.offsetHeight + 'px';
            document.body.classList.add('fixed-nav');
            $secciones.forEach(seccion => {
                let topSeccion = seccion.offsetTop;
                let heightSeccion = seccion.offsetHeight;
                let id = seccion.getAttribute('id');
                let top = window.scrollY + 100;
                if (top >= topSeccion && top < topSeccion + heightSeccion && oneSeccion !== id) {
                    oneSeccion = id;
                    $navLinks.forEach(link => {
                        link.classList.remove('active-link');
                        // document.querySelector(`nav.main-header a[href*="#${id}"]`).classList.add('active-link');
                        if (link.getAttribute('href') === `#${oneSeccion}`) link.classList.add('active-link');
                    });
                }
            });
        } else { // The top of the page
            document.body.style.paddingTop = 0;
            document.body.classList.remove('fixed-nav');
        }
    }
    window.addEventListener('scroll', fixNav);

    graficarExperiencia();
    graficarProyectos();

    // Usada para reducir el numero de veces que se ejecuta un evento

    // const $titulos = document.querySelectorAll('.titulo-seccion');
    // const $secciones  = document.querySelectorAll('section');

    // function checkSlide(e) {
    //     console.log('y');
    //     $titulos.forEach(titulo => {
    //         // Calculate halfway through the element's height
    //         const slideInAt = (window.scrollY + window.innerHeight) - titulo.offsetHeight / 2;
    //         // Calculate the bottom of the element
    //         const elementBottom = titulo.offsetTop + titulo.offsetHeight;
            
    //         // Check if the element is halfway shown
    //         const isHalfShown = slideInAt > titulo.offsetTop;
    //         // Check if the element has not been scrolled past
    //         const isNotScrolledPast = window.scrollY < elementBottom;
            
    //         // Add or remove the active class based on visibility
    //         if (isHalfShown && isNotScrolledPast) {
    //             titulo.classList.add('active');
    //         } else {
    //             titulo.classList.remove('active');
    //         }
    //     });
    // }
    // window.addEventListener('scroll', debounce(checkSlide));
});
