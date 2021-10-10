const formularioContactos = document.querySelector('#contacto');


eventListeners();


function eventListeners() { 
    // Cuando el formulario de crear o editar se ejecuta.
    formularioContactos.addEventListener('submit', leerFormulario);
}

function leerFormulario(e) { 
    e.preventDefault();// previene action del form
    // console.log(e);
    // console.log('Presionaste');

    // Leer datos de los inputs
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value;
    // console.log(nombre);
    // console.log(empresa);
    // console.log(telefono);


    if (nombre === '' || empresa === '' || telefono === '') {
        // console.log('Los campos estan vacios');

        // 2 parametros: txt y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        // console.log('Tienen algo');

        mostrarNotificacion('Datos correctos', 'correcto');
    }
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