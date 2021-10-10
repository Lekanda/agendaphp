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

    if (nombre === '' || empresa === '' || telefono === '') {
        console.log('Los campos estan vacios');
    } else {
        console.log('Tienen algo');
    }





    // const empresa = document.querySelector('#empresa').value;
    // const telefono = document.querySelector('#telefono').value;
    // console.log(nombre);
    // console.log(empresa);
    // console.log(telefono);





}