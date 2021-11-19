let formulario = document.querySelector('form');
let listarCitas = document.getElementById('listarCitas');
let citas = [];
let buscar = document.getElementById('btnBuscar');
let busqueda = document.getElementById('busquedaLista');
let filtro = [];
if (localStorage.getItem('Citas')) {
    citas = JSON.parse(localStorage.getItem('Citas'));
}


const capturarDatos = () => {
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let sintomas = document.getElementById('sintomas').value;

    let registro = {
        nombre,
        fecha,
        hora,
        sintomas
    }
    swal.fire({
        title: '¿Seguro que quieres agendar la cita?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            swal.fire('¡Agenda guardada!', '', 'success')
            citas.unshift(registro)
            localStorage.setItem('Citas', JSON.stringify(citas));
            formulario.reset();
            pintarDatos();
        } else if (result.isDenied) {
            swal.fire('La agenda no fue guardada', '', 'info')
        }
    })


}

formulario.addEventListener('submit', e => {
    e.preventDefault();
    capturarDatos();
})

const pintarDatos = () => {
    listarCitas.innerHTML = '';
    let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'));
    console.log(citasLocalStorage);

    citasLocalStorage.map((cita) => {
        const { nombre, fecha, hora, sintomas } = cita
        listarCitas.innerHTML += `
        <tr>
            <td>${nombre}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>${sintomas}</td>
        </tr>
        `;

    })
}

document.addEventListener('DOMContentLoaded', pintarDatos());

buscar.addEventListener('click', e => {
    let contador = 0;
    e.preventDefault();
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('Citas'));

    filtro = data.filter(cita => cita.nombre.toLowerCase() === input.toLowerCase());
    console.log(filtro);

    filtro.length === 0 ?
        busqueda.innerHtml += `
            <tr>
                 <td>El nombre ${input} no existe</td>
            </tr>
        ` :
        filtro.map((cita) => {

            const { nombre, fecha, hora, sintomas } = cita;
            busqueda.innerHTML += `
            <tr>
            <td>${nombre}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>${sintomas}</td>
            <button class="boton" id="${nombre} ${contador}">Borrar</button>
            </tr>
            `
            contador++;
        });
});
let contador = 0;
filtro.forEach((result) => {
    let borrar = document.getElementById(result.nombre)
    borrar.addEventListener('click', function() {
        citas.splice(contador, 1);
        localStorage.setItem('Citas', JSON.stringify(citas));
    })
    contador++;
})

// arrayId.forEach(indice => {
//     let boton = document.getElementById(indice);
//     boton.addEventListener('click', function() {
//         arrayCarrito.splice(indice, 1);
//         localStorage.setItem('Carrito', JSON.stringify(arrayCarrito));
//         actualizar();
//     });

// })