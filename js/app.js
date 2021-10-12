const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody');


eventListeners();


function eventListeners() { 
    // Cuando el formulario de crear o editar se ejecuta.
    formularioContactos.addEventListener('submit', leerFormulario);

    // Listener para eliminar el boton
    if(listadoContactos){
        listadoContactos.addEventListener('click', eliminarContacto);
    }
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

        // Para poder leer los datos con console del formulario, hacerlo con los 3 puntos(...). Si no, no deja leerlos.
        // console.log(...infoContacto);

        if (accion === 'crear') {
            // Crear un nuevo contacto
            insertarDB(infoContacto);
        } else {
            // Editar el contacto
            //Leer el ID
            const idRegistro = document.querySelector('#id').value;
            // console.log(idRegistro);
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);

        }

        // mostrarNotificacion('Datos correctos', 'correcto');
    }
}

/* Inserta en la DB con AJAX */
function insertarDB(datos) {
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
            // console.log(respuesta.empresa);
            // console.log(respuesta.empresa);

            // Inserta un nuevo elemento a la tabla-contactos del index.
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            // Crear el contenedor
            const contenedorAcciones = document.createElement('td');

            // Crear el icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas','fa-pen-square');

            // Crea el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn-editar','btn');

            // Agregarlo al contenedor
            contenedorAcciones.appendChild(btnEditar);

            // Crear el boton de eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas','fa-trash-alt');

            // Crea el boton para Eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn-borrar','btn');

            // Agregar al padre
            contenedorAcciones.appendChild(btnEliminar);

            // Agregarlo al TR
            nuevoContacto.appendChild(contenedorAcciones);

            //Agregarlo con los contactos
            listadoContactos.appendChild(nuevoContacto);

            // Resetear el Formulario
            document.querySelector('form').reset();
            // Mostrar la notificacion
            mostrarNotificacion('Contacto creado correctamente', 'correcto');

        }
    }
    // Enviar los datos
    xhr.send(datos);
}


function actualizarRegistro(datos){
    // console.log(...datos);//Ver datos en una copia, solo se puede asi.

    // Conexion AJAX. Crear el objeto
    const xhr = new XMLHttpRequest();
    // Abrir la conexion
    xhr.open('POST','inc/modelos/modelo-contactos.php',true);
    // leer la respuesta
    xhr.onload = function(){
        if(this.status == 200){
            const respuesta = JSON.parse(xhr.responseText);
            // console.log(respuesta);

            if(respuesta.respuesta === 'correcto'){
                // Mostrar notificacion 
                mostrarNotificacion('Contacto actualizado correctamente','correcto');
            }else{
                // Hubo un error
                mostrarNotificacion('No se actualizo el contacto','error');
            }
            // Despues de 3 segundos redireciona al index
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 4000);
        }
    }
    // Enviar la peticion
    xhr.send(datos);
}



// Eliminar contacto del formulario del index
function eliminarContacto(e){
    // console.log('eliminado....');
    // console.log(e.target.parentElement.classList.contains('btn-borrar'));

    if (e.target.parentElement.classList.contains('btn-borrar')) {
        // Tomar el ID
        const id = e.target.parentElement.getAttribute('data-id');
        // console.log(id);

        //Preguntar al usuario si esta seguro
        const respuesta = confirm('¿Estas seguro?');
        if (respuesta) {
            // console.log('Estoy seguro');

            // Llamar a AJAX para borrar el contacto 
            // Crear el objeto
            const xhr = new XMLHttpRequest();
            // Abrir la conexion
            xhr.open('GET',`inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`,true);
            // Leer la respuesta
            xhr.onload = function () {
                if(this.status === 200){
                    const resultado = JSON.parse(xhr.responseText);
                    // console.log(resultado);
                    
                    if(resultado.respuesta == 'correcto'){
                        // Eliminar del DOM
                        // console.log(e.target.parentElement.parentElement.parentElement);
                        e.target.parentElement.parentElement.parentElement.remove();

                        //Mostrar Notificacion
                        mostrarNotificacion('Contacto eliminado','correcto');
                    } else {
                        //Mostramos una notificacion
                        // console.log(resultado);
                        mostrarNotificacion('Hubo un error','error');
                    }
                }
            }
            // Enviar la peticion
            xhr.send();
        }

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
