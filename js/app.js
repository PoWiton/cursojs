const lista = [];
let total = 0;

class Item {
  nombre;
  precio;
  cantidad;
  rubro;
}
//me traigo los valores del dom para generar los elementos de la lista//
function ingresoPlu() {
  let plu = new Item();
  total = 0;
  plu.nombre = document.getElementById("descripcion").value;
  plu.precio = document.getElementById("precio").value * document.getElementById("cantidad").value;
  plu.cantidad = document.getElementById("cantidad").value;
  plu.rubro = document.getElementById("rubro").value;
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("cantidad").value = 1;
  document.getElementById("rubro").value = "";
  return plu;
}
//Checkea que esten completos los campos para adicionar y invoca las funciones principales del simulador //
function cargoPlu(lista) {
  if (
    document.getElementById("precio").value &&
    document.getElementById("rubro").value && //checkea que los campos de cantidad,precio,rubro y nombre no esten vacios.//
    document.getElementById("cantidad").value &&
    document.getElementById("descripcion").value != ""
  ) {
    let plu;
    plu = ingresoPlu(); //invoca a la funcion que toma los datos de carga//
    lista.push(plu); //pushea los datos al array//
    suma(lista); // funcion que genera el Total//
    cargarTabla(lista); //invoca la funcion que carga la tabla que se muestra//
  }
}
//Recorre la lista y genera las tablas//
function cargarTabla(lista) {
  let tabla = document.getElementById("trRow");
  tabla.innerHTML = "";
  lista.forEach((element) => {
    let pos = lista.indexOf(element);
    tabla.innerHTML += `
                    <tr>
                       <td> ${element.cantidad}</td>  
                       <td> ${element.nombre}</td> 
                       <td> ${element.rubro}</td> 
                       <td> ${element.precio}</td> 
                       <td><input class="my-1 mx-1" type="button" id="${pos}" value="Eliminar" onclick="eliminar(this.id)" /></td> 
                       </tr>`;
  });
  let tablaTotal = document.getElementById("trTotal");
  tablaTotal.innerHTML = "";
  tablaTotal.innerHTML = `<tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="table-light">Total  $ ${total}</td>
                            </tr>`;
}

//Elimina el objeto deseado mediante el indice y vuelve a generar la tabla//
function eliminar(obj) {
  let id = obj;
  lista.splice(id, 1);
  total = 0;
  suma(lista);
  cargarTabla(lista);
}
//guarda el array en el localstorage y vacia el array, luego me traigo del localstorage el json , lo parseo y genero un nuevo array para
//mostrar el total del ultimo ticket en un imput (lo hice todo en un una misma funcion para cumplir con la consigna)
function guardaTicket() {
  localStorage.setItem("lista", JSON.stringify(lista));
  lista.length = 0;
  total = 0;
  cargarTabla(lista);
  let lista2 = JSON.parse(localStorage.getItem("lista"));
  document.getElementById("totalUltimo").value = lista2.reduce((suma, plu) => suma + plu.precio, 0);
}
//filtro totales por rubros y lleno la tabla asignada para esto.//
function filtradoRubros() {
  let totalPerfumeria = 0;
  let totalAlimentos = 0;
  const listaAlimentos = lista.filter((plu) => plu.rubro == "Alimentos");
  const listaPerfumeria = lista.filter((plu) => plu.rubro == "Perfumeria");
  for (let plu of listaAlimentos) {
    totalAlimentos += parseFloat(plu.precio);
  }
  for (let plu of listaPerfumeria) {
    totalPerfumeria += parseFloat(plu.precio);
  }

  let tablaRubros = document.getElementById("trRubros");
  tablaRubros.innerHTML = "";
  tablaRubros.innerHTML = `<tr>
                            <td>$${totalAlimentos}</td>
                            <td>$${totalPerfumeria}</td>
                            </tr>`;
}
//recorro el array para generar el total del ticket//
function suma(arreglo) {
  for (let plu of arreglo) {
    total += parseFloat(plu.precio);
  }
}

// Calculo el descuento asignado sobre el total//
function calcDescuento() {
  let descuento = (total * document.getElementById("valDescuento").value) / 100;
  let precioFinal = total - descuento;
  let tablaTotal = document.getElementById("trTotal");
  tablaTotal.innerHTML = "";
  tablaTotal.innerHTML = `<tr>
                            <td></td>
                            <td></td>
                            <td class="table-light">Descuento $ ${descuento}</td>
                            <td class="table-light">Total  $ ${precioFinal}</td>`;
}

//validacion form//
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "click",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
