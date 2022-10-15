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
  lista.length = 0;
}

class Item {
  nombre;
  precio;
  cantidad;
  rubro;
}

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

function cargoPlu(lista) {
  if (
    document.getElementById("precio").value &&
    document.getElementById("rubro").value &&
    document.getElementById("cantidad").value &&
    document.getElementById("descripcion").value != ""
  ) {
    let plu;
    plu = ingresoPlu();
    lista.push(plu);
    suma(lista);
    cargarTabla(lista);
  }
}

function cargarTabla(lista) {
  let tabla = document.getElementById("trRow");
  tabla.innerHTML = "";
  lista.forEach((element) => {
    tabla.innerHTML += `
                    <tr>
                       <td> ${element.cantidad}</td>  
                       <td> ${element.nombre}</td> 
                       <td> ${element.rubro}</td> 
                       <td id="precioCol"> ${element.precio}</td> 
                       </tr>`;
  });
  let tablaTotal = document.getElementById("trTotal");
  tablaTotal.innerHTML = "";
  tablaTotal.innerHTML = `<tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="table-light">Total  $ ${total}</td>
                            </tr>`;
}

function filtradoRubros() {
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
function suma(arreglo) {
  for (let plu of arreglo) {
    total += parseFloat(plu.precio);
  }
}

const lista = [];

let total = 0;
let totalPerfumeria = 0;
let totalAlimentos = 0;
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
