const formularioContactos = document.querySelector('#contacto');


eventListeners();


function eventListeners() { 
    // Cuando el formulario de crear o editar se ejecuta.
    formularioContactos.addEventListener('submit', leerFormulario);
}

function leerFormulario(e) { 
    e.preventDefault();// previene action del form
    // Leer datos de los inputs
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion = document.querySelector('#accion').value;
    // console.log(nombre);
    // console.log(empresa);
    // console.log(telefono);

    if (nombre === '' || empresa === '' || telefono === '') {
        // 2 parametros: txt y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        //Pasa la validacion, llamar a DB con AJAX.
        const  infoContacto = new FormData();// Para leer datos de 1 formulario.
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        // Para poder leer los datos del formulario hacerlo con los 3 puntos(...). Si no, no deja leerlos.
        // console.log(...infoContacto);

        if (accion === 'crear') {
            // Crear un nuevo contacto
            insertarDB(infoContacto);
        } else {
            // Editar el contacto

        }

        // mostrarNotificacion('Datos correctos', 'correcto');
    }
}

/* Inserta en la DB con AJAX */
function insertarDB(datos) {
    // Llamar a AJAX
    // Crear el Objeto
    const xhr = new XMLHttpRequest();
    // Abrir la conexion
    xhr.open('POST','inc/modelos/modelo-contactos.php', true);
    // Pasar los datos 
    xhr.onload = function () {
        if (this.status === 200) {
            // console.log(JSON.parse(xhr.responseText));// Convierte el string que viene de modelo-contactos.php a JSON.

            // Leemos la respuesta de PHP
            const respuesta = JSON.parse(xhr.responseText);
            // console.log(respuesta['empresa']);
            // console.log(respuesta.empresa);


        }
    }
    // Enviar los datos
    xhr.send(datos);
}







// Notificacion en pantalla de falta de datos en Form.
function mostrarNotificacion(mensaje,clase){
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase,'notificacion','sombra');
    notificacion.textContent = mensaje;

    //Formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
    // Ocultar y mostrar la notificacion.
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove(); 
            }, 500);
        }, 3000);
    }, 100);
}