const lista = [];
let total = 0;

class Item {
  nombre;
  precio;
  cantidad;
  rubro;
}

//tabla ultimo comprobante y filtro por rubros.
function ultimoComprobante() {
  lista2 = JSON.parse(localStorage.getItem("lista")); // creo el array desde el json guardado en el local
  totallabel = lista2.reduce((suma, plu) => suma + plu.precio, 0); // hago la suma de todos los elementos precio
  totalPerfumeria = 0;
  totalAlimentos = 0;
  const listaAlimentos = lista2.filter((plu) => plu.rubro == "Alimentos"); //genero un nueva lista con los elementos del rubro alimentos
  const listaPerfumeria = lista2.filter((plu) => plu.rubro == "Perfumeria"); //genero un nueva lista con los elementos del rubro perfumeria
  //recorro la lista nueva sumando los elementos precios de ese rubro
  for (let plu of listaAlimentos) {
    totalAlimentos += parseFloat(plu.precio);
  }
  //recorro la lista nueva sumando los elementos precios de ese rubro
  for (let plu of listaPerfumeria) {
    totalPerfumeria += parseFloat(plu.precio);
  }
  //genero la tabla con los totales.
  let tablaRubros = document.getElementById("trRubros");
  tablaRubros.innerHTML = "";
  tablaRubros.innerHTML = `<tr>
                            <td>$${totalAlimentos}</td>
                            <td>$${totalPerfumeria}</td>
                            <td>$${totallabel}</td>
                            </tr>`;
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
    document.getElementById("guardaTicket").removeAttribute("disabled");
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
//guarda el array en el localstorage y vacia el array, invoco la funcion de totales del ultimo comprobante y deshabilito el boton de guardar ticket.
function guardaTicket() {
  localStorage.setItem("lista", JSON.stringify(lista));
  lista.length = 0;
  total = 0;
  cargarTabla(lista);
  ultimoComprobante();
  document.getElementById("formuMail").style.display = "inline";
  document.getElementById("guardaTicket").setAttribute("disabled", "true");
}

//recorro el array para generar el total del ticket//
function suma(arreglo) {
  for (let plu of arreglo) {
    total += parseFloat(plu.precio);
  }
}
//api para enviar un email con los totales.
function enviarMail() {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "d6cea0cc83msha6b6b810a3d0539p1a0e2djsn4680cbcd7ae8",
      "X-RapidAPI-Host": "mail-sender4.p.rapidapi.com",
    },
    body: `{"username":"cursojsprueba@gmail.com","password":"kzrpkrrcvykpupux","reciever":"${mail}","title":"Resumen ult. comprobante","subject":"Resumen","htmlContent":"<table><thead><tr><th>Alimentos</th><th>Perfumeria</th><th>Total ult. comprobante</th></tr></thead><tbody><tr><td>$${totalAlimentos}</td><td>$${totalPerfumeria}</td><td>$${totallabel}</td></tr></tbody></table>"}`,
  };

  fetch("https://mail-sender4.p.rapidapi.com/mail/html-content", options)
    .then((response) => response.json())
    .then((response) => (document.getElementById("spinner").style.display = "none"))
    .then((response) =>
      swal.fire({
        title: "Envio exitoso",
        icon: "success",
      })
    )
    .catch((err) => console.error(err));
}

//validacion form//

document.getElementById("formu").addEventListener("submit", (e) => {
  e.preventDefault();
});
document.getElementById("formuMail").addEventListener("submit", (e) => {
  e.preventDefault();

  validarCampos();
});
const validarCampos = () => {
  //capturar mail ingresado

  const emailDatos = email.value.trim();

  //validando campo email y invoco la API de envio de mail. hago visible el spinner
  if (!emailDatos) {
    document.getElementById("pMail").innerText = "Campo vacio o incorrecto";
  } else if (!validaEmail(emailDatos)) {
    document.getElementById("pMail").innerText = "Ingresa un e-mail valido";
  } else {
    document.getElementById("pMail").innerText = "";
    mail = document.getElementById("email").value;
    enviarMail();
    document.getElementById("formuMail").style.display = "none";
    document.getElementById("spinner").style.display = "inline-flex";
  }
};

const validaEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};
