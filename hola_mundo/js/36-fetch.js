'use strict'

/* FETCH (AJAX)  Y PETICIONES A SERVICIOS / APIS REST */
/* FETCH (es un sustito del AJAX, es decir es un metodo que hace peticiones AJAX, peticiones asincronas a un servidor) */

var div_usuarios = document.querySelector("#usuarios");
var div_janet = document.querySelector("#janet"); /*este es el selector que hemos creado de JANET y lo utilizaremos en la funcion*/

/* var usuarios = []; */ /* la variariable la inicializamos para que sea un array */

getUsuarios()/* y como es una promesa podemos utilizar el metodo them*/
  .then(data => data.json()) /*entoneces aqui vamos a utilizar getUsuarios y como eso nos devuelve *//* en la promesa tenemos el metodo .then que recoge datos con un primer elemento que tiene funcion de callback que va a recibir un parametro data y lo va a convertir en json */
  .then(users => { /* volvemos a ejecutar .then llamamos a data con una funcion de callback */
    /*     usuarios = users.data; *//*recogemos data que estan todos los usuarios, va a ser el array de todos los usuarios*/
    listadoUsuarios(users.data); /*queremos que despues de este listado nos haga la siguiente promesa y para eso haremos un return*/

/*     return getJanet();  *//*encadenaremos otro them en lugar de hacer un callback*/
    return getInfo();
  })
  .then(data => {
    console.log(data);

    return getJanet();
  })
  .then(data => data.json())
  .then(user => {
    mostrarJanet(user.data);
  });


function getUsuarios() { /* lo encapsulamos y metemos el fetch*/
  return fetch('https://reqres.in/api/users')/*  haremos return para devolver el resultado que nos de el fectch *//* fetch('https://reqres.in/api/users') */ /* recibe una url que escupa un json y esto es una promesa */

}

function getJanet() {
  return fetch('https://reqres.in/api/users/2')
}


function getInfo() {
  var profesor = {
    nombre: 'Victor',
    apellidos: 'Robles',
    url: 'htpps://victorroblesweb.es'
  };

  return new Promise((resolve, reject) => {
    var profesor_string = "";
    setTimeout(function(){
      var profesor_string = JSON.stringify(profesor);
      if (typeof profesor_string != 'string' || profesor_string == '') return reject('error 1');

      return resolve(profesor_string);
    }, 3000);
  });



function listadoUsuarios(usuarios) {/*hemos encapsulado este código para tener los datos de un usuario en concreto*/
  usuarios.map((user, i) => { /* para mostrar la info de los usuarios con la funcion .map y una funcion de callback le pasamos usuarios y indice  */
    let nombre = document.createElement('h3'); /*mostraremos toda la info de los uruarios*/

    nombre.innerHTML = i + " . " + user.first_name + " " + user.last_name;

    div_usuarios.appendChild(nombre); /* ya nos aparece en la web nuestros usuarios, esta info sale desde un servicio rest*/

    document.querySelector(".loading").style.display = 'none'; /*para ocultar la clase loading creada en nuestro HTML una vez de hayan cargado los datos*/

  });
}


function mostrarJanet(user) { /*este es el metodo que hemos creado para JANET crearemos arriba el selecctor de JANET*/
  let nombre = document.createElement('h4');
  let avatar = document.createElement('img');

  nombre.innerHTML = user.first_name + " " + user.last_name;
  avatar.src = user.avatar; /*aqui le indicamos la url de nuestra imagen*/
  avatar.width = '100'; /*podemos modificar las propiedades de la foto le hemos puesto 100px*/

  div_janet.appendChild(nombre);
  div_janet.appendChild(avatar);

  document.querySelector("#janet .loading").style.display = 'none';

}

/* LA FUNCION FLECHA TAMBIEN SE PUEDE HACER DE ESTA MANERA 

  var usuarios = [];

  fetch('https://reqres.in/api/users') 
  .then (function(data){
return data.json()
  });
  .then(users => { 
    usuarios = users.data;
    console.log(usuarios);
  }); */