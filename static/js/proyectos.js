import { proyectos } from '/Portafolio/static/js/data.js';

$(function() {
    let html = '';
    proyectos.forEach((proyecto, item) => {
        html += `
            <tr>    
                <td>${proyecto.year}</td>
                <td>${proyecto.nombre}</td>
                <td class="column-tecnologias">
                    ${proyecto.tecnologias.map(tecnologia => {
                        return '<span>' + tecnologia + '</span>';
                    }).join('')}
                </td>
                <td class="column-links">
                    ${proyecto.url ? '<p><a href="' + proyecto.url + '" target="_blank"> Sitio Web <i class="fas fa-external-link-alt"></i></a></p>' : ''}
                    ${proyecto.github ? '<p><a href="' + proyecto.github + '" target="_blank"> GitHub <i class="fab fa-github"></i></a></p>' : ''}
                </td>
            </tr>
        `;
    });

    $('#tablaProyectos tbody').html(html);
});