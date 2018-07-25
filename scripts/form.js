var form = document.getElementsByName("contacto")[0];

/* Inputs del formulario */
var nombreInput = document.getElementById("nombre");
var apellidosInput = document.getElementById("apellidos");
var emailInput = document.getElementById("email");
var numeroInput = document.getElementById("telefono");

var conocidoInput = {
  conocido1: document.getElementById("tipo_conocido_1"),
  conocido2: document.getElementById("tipo_conocido_2"),
  conocido3: document.getElementById("tipo_conocido_3")
}

var conocidoOtroMensajeInput = document.getElementById("tipo_conocido_otro_mensaje");
var mensajeInput = document.getElementById("contacto_mensaje");
var submitButton = document.getElementById("enviar");

/* Función de inicio */
function start() {
  conocidoInput.conocido1.addEventListener("change", desactivateOthers, false);
  conocidoInput.conocido2.addEventListener("change", desactivateOthers, false);
  conocidoInput.conocido3.addEventListener("change", activateOthers, false);
}

/* Se activa el mensaje de otros */
function activateOthers() {
  conocidoOtroMensajeInput.hidden = false;
}

/* Se desactiva el mensaje de otros */
function desactivateOthers() {
  conocidoOtroMensajeInput.hidden = true;
}

/* Se carga la función de inicio */
window.addEventListener("load", start, false);

/* Funciones de validación del formulario */

form.addEventListener("submit", function(event) {
  if (nombreInput.checkValidity() === false) {
    alert("Tienes que escribir tu nombre");
    nombreInput.focus();
    event.preventDefault();
    return false;
  }

  if (apellidosInput.checkValidity() === false) {
    alert("Tienes que escribir tus apellidos");
    apellidosInput.focus();
    event.preventDefault();
    return false;
  }

  var regexEmail = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
  var resultEmailValidation = regexEmail.test(emailInput.value);

  if (resultEmailValidation === false) {
    alert("Tienes que escribir un email correcto");
    emailInput.focus();
    event.preventDefault();
    return false;
  }

  var regexNumber = /^\+[0-9\{2}]+ [0-9\{9}]/;
  var resultNumberValidation = regexNumber.test(numeroInput.value);

  if (resultNumberValidation === false) {
    alert("Tienes que escribir un número de teléfono correcto");
    numeroInput.focus();
    event.preventDefault();
    return false;
  }

  if (conocidoInput.conocido1.checkValidity() === false) {
    alert("Tienes que seleccionar una opción por la cual me has conocido");
    event.preventDefault();
    return false;
  }

  if (mensajeInput.value.length === 0) {
    alert("Tienes que rellenar el mensaje que se va a escribir");
    mensajeInput.focus();
    event.preventDefault();
    return false;
  }

  if (mensajeInput.value.split(" ").length > 150) {
    alert("El mensaje no puede contener más de 150 palabras");
    mensajeInput.focus();
    event.preventDefault();
    return false;
  }

  submitButton.setAttribute("disabled", "");
  event.preventDefault();

  setTimeout(function() {
    form.reset();
    sendNotification("Formulario recibido", "Gracias por participar");
    submitButton.removeAttribute("disabled");
  }, 1000);
});
