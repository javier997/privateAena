//'use strict';

const functions = require('firebase-functions');

const {
    Card,
    Suggestion,
  	SimpleResponse
} = require('dialogflow-fulfillment');

const {
    dialogflow,
    Carousel,
    Image
} = require('actions-on-google');
const fs = require('fs');
const app = dialogflow();

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

const axios = require('axios');
/*
async function pruebaWSDL(){ 
	var srt = " ";
  	var prueba_ws = "";
	await axios.get('http://b7ae4b1b.ngrok.io/wsdl/bp_ws.php').then(function(res){
    	if(res.status == 200){
          	console.log("3 " + res.data);
        	prueba_ws = res.data;
        }
    })
  	console.log("1 " + prueba_ws);
	return JSON.stringify(prueba_ws);
    
}
*/
var prueba;

async function obtenerResultado(){
  //var datos = "?&saludo=Hola&texto=Adios";
 
	//prueba = await axios.post('http://02b21cb2.ngrok.io/wsdl/bp_ws.php', datos);
  	prueba = await axios.get('http://6e56f424.ngrok.io/wsdl/prueba.php');
  
  	console.log(prueba);

}

obtenerResultado();

app.intent('pruebawsdl', (conv => {
  
  	//console.log(prueba_ws.data);
  	//var respuesta = pruebaWSDL();
  	//console.log("2 " + respuesta);
  	console.log(prueba.data);
	//conv.ask("el resultado es : " + respuesta );
  	conv.ask("el resultado es : " + prueba.data);

}));

app.intent('recoger.nombre', (conv, {
    nombre
}) => {
    conv.ask(`De acuerdo ${nombre.name}. ¿Y cómo se llama tu empresa?`);
});

app.intent('recoger.empresa', (conv, {
    empresa
}) => {
    conv.ask(`Y tu cargo en ${empresa} es el de...?`);
});

app.intent('recoger.email', conv => {
  
    let valores = conv.contexts.get('bienvenida-followup');

    if (valores !== null) {

        let id_evento = `${valores.parameters.id}`;
        let nombre_evento = `${valores.parameters.eventos}`;
        let fecha_evento = `${valores.parameters.fecha_evento}`;
        let nombre = `${valores.parameters.nombre.name}`;
        let empresa = `${valores.parameters.empresa}`;
        let cargo = `${valores.parameters.cargo}`;
        let email = `${valores.parameters.email}`;
      
      	fecha_evento=fecha_evento.split('T');

        conv.ask(`Tu nombre es ${nombre}, trabajas en ${empresa} como ${cargo}, tu correo es ${email} y te vas a inscribir en el evento ${nombre_evento} el día ${(fecha_evento[0].split('-').reverse()).toString().split(',').join('-')}. ¿Es correcto?`);

    }

});
////////////////////////////////////////////

app.intent('prueba_fichero', conv => {

   fs.readFile('https://storage.cloud.google.com/staging.aena-chatbot-des.appspot.com/COMANDOS_MONGO.txt?authuser=2&hl=es', 'utf-8', (err, data) => {
  		if(err) {
    		console.log('error: ', err);
  		} else {
    		console.log(data);
  		}
	});
        /*axios.get('https://storage.cloud.google.com/staging.aena-chatbot-des.appspot.com/COMANDOS_MONGO.txt?authuser=2&hl=es')
        	.then(res => {
                console.log("res", res);
                return conv.close(`Ya está`);
            }).catch(err => {
                console.log("err", err);
                return conv.close("Oh...Creo que ha habido un problema. Comencemos de nuevo.");
            });*/
  	conv.ask("pruebafichero");
         
});

////////////////////////////////////////////
app.intent('inscribir.en.evento', conv => {

    let valores = conv.contexts.get('bienvenida-followup');

    if (valores !== null) {

        let id_evento = `${valores.parameters.id}`;
        let nombre_evento = `${valores.parameters.eventos}`;
        let fecha_evento = `${valores.parameters.fecha_evento}`;
        let nombre = `${valores.parameters.nombre.name}`;
        let empresa = `${valores.parameters.empresa}`;
        let cargo = `${valores.parameters.cargo}`;
        let email = `${valores.parameters.email}`;
      	
      fecha_evento=fecha_evento.split('T');

        return axios.post('http://d1c60a09.ngrok.io/wsdl/bp_ws.php', {
                    nombre_evento: nombre_evento,
                    fecha_evento: fecha_evento[0],
                    nombre: nombre,
                    empresa: empresa,
                    cargo: cargo,
                    email: email
                }

            ).then(res => {
                console.log("res", res);
                return conv.close(`Ya está ${nombre}, estás registrado en el evento ${nombre_evento}! Nos vemos allí el día ${(fecha_evento[0].split('-').reverse()).toString().split(',').join('-')}.`);
            }).catch(err => {
                console.log("err", err);
                return conv.close("Oh...Creo que ha habido un problema. Comencemos de nuevo.");
            });
    }
});
app.intent('mostrar_tabla', conv =>  {
var datosEstaciones = {
  "estaciones": [
    {
      "name_id": {
        "nombre": "Alzuza",
        "id": "tuprima"
      },
      "datos": [
        {
          "nombre": "GASOLEO_A",
          "cantidad": "10000"
        },
        {
          "nombre": "GASOLEO_B",
          "cantidad": "50000"
        },
        {
          "nombre": "GASOLEO_Gforce",
          "cantidad": "X"
        },
        {
          "nombre": "GAS_S_PB_95_EX",
          "cantidad": "30000"
        },
        {
          "nombre": "Hi_Energy_98",
          "cantidad": "X"
        }
      ]
    },
    {
      "name_id": {
          "nombre": "Alcalá Henares - Via Complutense",
          "id": "E0574"
        },
        "datos": [
          {
            "nombre": "GASOLEO_A2",
            "cantidad": "x"
          },
          {
            "nombre": "GASOLEO_B2",
            "cantidad": "90000"
          },
          {
            "nombre": "GASOLEO_Gforce2",
            "cantidad": "X"
          },
          {
            "nombre": "GAS_S_PB_95_EX2",
            "cantidad": "80000"
          },
          {
            "nombre": "Hi_Energy_982",
            "cantidad": "40000"
          }
        ]
      }
  ]
};
console.log('Se viene el primer console.log que muestra la longitud de estaciones');
console.log(datosEstaciones.estaciones.length);
console.log('Se viene el segundo console.log que muestra la posicion 0 de estaciones');
console.log(datosEstaciones.estaciones[0]);
console.log(datosEstaciones.estaciones[0].datos.length);
console.log('Se viene el último console.log que muestra los datos de la posicion 0 de estaciones');
console.log(datosEstaciones.estaciones[0].datos);
console.log('importante');
console.log(datosEstaciones.estaciones[0].datos[0].nombre);
var contenido = '';
  //Ahora mismo, entra una vez al for, luego la segunda ya parte
console.log(datosEstaciones.estaciones[1].datos);
  //******
var cabecera = '<table style="width:100%">';
var footer ='</tr></table>';
var titulo ='';
  titulo += `<tr>`;
var estacion = 0;
for (var i = 0; i<datosEstaciones.estaciones.length;i++){
	titulo += `<th>${datosEstaciones.estaciones[i].name_id.nombre}</th>`;
  		contenido+=`<tr>`;
  		for(var j = 0; j< datosEstaciones.estaciones[estacion].datos.length;j++){
    		//console.log(datosEstaciones.estaciones[i].datos[j].nombre);
          console.log(`vez ${j} que entra a ultimo bucle`);
          if(datosEstaciones.estaciones.length > j ){
  				contenido += `<td>${datosEstaciones.estaciones[j].datos[i].cantidad}</td>`;
			}
  		}
  		contenido+=`</tr>`;
}
  	titulo += `</tr>`;
  	console.log(`Voy a mostrar el titulo : ${titulo}`);
   	conv.ask(cabecera + titulo + contenido + footer);
	console.log(contenido);
});