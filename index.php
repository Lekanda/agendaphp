<?php  include 'inc/layout/header.php'; ?>

<div class="contenedor-barra">
     <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
     <form id="contacto" action="#">
          <legend>Añada un contacto<span>Todos los campos son obligatorios</span></legend>

          <div class="campos">
              <div class="campo">
                  <label for="nombre">Nombre:</label>
                  <input type="text" placeholder="Pon tu nombre" id="nombre">
              </div>
              <div class="campo">
                  <label for="nombre">Empresa:</label>
                  <input type="text" placeholder="Pon tu empresa" id="empresa">
              </div>
              <div class="campo">
                  <label for="nombre">Telefono:</label>
                  <input type="tel" placeholder="Pon tu telefono" id="telefono">
              </div>
          </div>
          <div class="campo enviar">
                <input type="submit" value="Añadir">
          </div>
     </form>
</div>
<div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>

        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar contactos...">

        <p class="total-contactos"><span>2</span> Contactos</p>

        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Andres Bernaola</td>
                        <td>Lekanda S.A</td>
                        <td>685969898</td>
                        <td>
                            <a class="btn-editar btn" href="#">
                                <i class="fas fa-pen-square"></i>
                            </a>

                            <button data-id="1" type="button" class="btn-borrar btn">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Luis Lopez</td>
                        <td>Lekanda S.L</td>
                        <td>685962246</td>
                        <td>
                            <a class="btn-editar btn" href="#">
                                <i class="fas fa-pen-square"></i>
                            </a>

                            <button data-id="1" type="button" class="btn-borrar btn">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>
</div>



<?php  include 'inc/layout/footer.php'; ?>