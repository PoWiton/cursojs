function calcDescuento(precio, porcentaje) {
  let descuento = (precio * porcentaje) / 100;
  let precioFinal = precio - descuento;
  return precioFinal;
}

let i = 1;
let suma = 0;
let precioPLU;
let seguir;

while (seguir != "0") {
  nombrePLU = prompt("Ingrese el nombre del PLU");
  precioPLU = parseFloat(prompt("Ingrese el precio del PLU"));
  suma = suma + precioPLU;
  seguir = prompt("Desea cerrar el comprobante ?\nIngrese 0 para finalizar comprobante\nPresione cualquier tecla para seguir");
  if (seguir != "0") {
    i++;
  }
}

let generarDescuento = prompt(`El total es $${suma} desea aplicar un descuento?\n Presione 1 para si \n Cualquier tecla para terminar`);
if (generarDescuento == 1) {
  let porcentaje = prompt("Ingrese el porcentaje del descuento\n(el porcentaje no puede ser mayor a 100");
  precioFinal = calcDescuento(suma, porcentaje);
} else {
  alert(`Cantidad de articulos ${i} \nSu Total es $${suma} `);
}
alert(`Cantidad de articulos ${i} \nSu Total es $${precioFinal} `);
