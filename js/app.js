function Seguro(destino, tipo, dias, adultos, menores){
    this.destino = destino;
    this.tipo = tipo;
    this.dias = dias;
    this.adultos = adultos;
    this.menores = menores;
}

//Realiza la cotizacion con los datos de la
Seguro.prototype.cotizarSeguro = function(){
    /*
        1-America = 1.05
        2-Asia = 1.15
        3-Europa = 1.35
        4-Exotico = 1.45
    */

    let cantidad;
    let cantidadMenor = 1200;
    let base = 2000;

    switch(this.destino){
        case 'America':
            cantidad = base * 1.05;
            break;
        case 'Asia':
            cantidad = base * 1.15;  
            break;
        case 'Europa':
            cantidad = base * 1.35;
            break;
        case 'Exotico':
            cantidad = base * 1.45;
            break;
        default:
            break;
    }

    if(this.tipo === 'Basica'){
        cantidad *= 1;
    }else{
        cantidad *= 1.15;
    }

    switch(this.dias){
        case '3':
            cantidad *= 1.10;
            break;
        case '7':
            cantidad *= 1.20;  
            break;
        case '15':
            cantidad *= 1.30;
            break;
        case '25':
            cantidad *= 1.40;
            break;
        default:
            break;
    }

    if(this.adultos == '1'){
        cantidad *= 1;
    }else if(this.adultos == '2'){
        cantidad *= 2;
    }

    if(this.menores == '1'){
        cantidad += cantidadMenor;
    }else if(this.menores == '2'){
        cantidad += (cantidadMenor * 2);

    }

    return cantidad.toFixed(2);
}

function UI(){}

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipoError) => {
    const div =  document.createElement('div');

    if(tipoError === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje');
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector('#formulario');
    formulario.insertBefore(div, document.querySelector('#acaMuestroElMensaje'));

    setTimeout(() => {
        div.remove();
    }, 3000);

}

UI.prototype.mostrarResultado = (total, seguro) => {

    const {destino, tipo, dias, adultos, menores} = seguro;

    //Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <h3 class="header">Tu Resumen</h3>
        <p class="font-bold">Destino: <span class="normal">${destino}</span></p>
        <p class="font-bold">Tipo: <span class="normal">${tipo}</span></p>
        <p class="font-bold">Dias: <span class="normal">${dias}</span></p>
        <p class="font-bold">Adultos: <span class="normal">${adultos}</span></p>
        <p class="font-bold">Menores: <span class="normal">${menores}</span></p>
        <p class="font-bold">Total: $<span class="normal">${total}</span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado')
    setTimeout(() => {
        resultadoDiv.style.display = 'flex';
        resultadoDiv.appendChild(div);
    }, 3000);
}

//Instanciar UI
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {

})

eventListeners()
function eventListeners(){
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarSeguro);
}

//Validacion de formulario
function validarSeguro(e){
    e.preventDefault();

    //Leer el destino
    const destino = document.querySelector('#destino').value;

    //Leer tipo de seguro que
    const tipo = document.querySelector('#tipo').value;
    
    //Leer los dias
    const dias = document.querySelector('#dias').value;

    //Leer cantidad de adultos
    const adultos = document.querySelector('#adultos').value;

    //Leer cantidad de menores
    const menores = document.querySelector('#menores').value;
    
    if(destino === '' || tipo === '' || dias === '' || adultos <= 0 || adultos >= 3 || menores < 0 || menores >= 3 ){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'correcto');

    //Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.style.display = 'none';
    }

    //Instanciar el seguro.
    const seguro = new Seguro(destino, tipo, dias, adultos, menores);
    const total = seguro.cotizarSeguro();

    //Utilizar el prototype que va a cotizar.
    ui.mostrarResultado(total, seguro);
}
