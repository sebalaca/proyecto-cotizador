// CONSTRUCTORES

function Seguro(marca, year, tipo) {
    this.marca = marca
    this.year = year
    this.tipo = tipo
}

//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function() {

    // 1=Americano 1.15 / 2=Asiatico 1.05 / 3=Europeo 1.35

    let cantidad
    const base = 2000

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15
            break
        case '2':
            cantidad = base * 1.05
            break
        case '3':
            cantidad = base * 1.35
            break
        default:
            break;
    }
}

//Function que crea prototypes
function UI() {}

//Llena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max -22

    const selectYear = document.querySelector('#year')

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i
        option.textContent = i
        selectYear.appendChild(option)
        
    }
}

//MUESTRA ALERTAS EN PANTALLA
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div')

    if(tipo === 'error'){
        div.classList.add('error')
    }else{
        div.classList.add('correcto')
    }

    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje

    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 3000);
}

//INSTANCIAR UI
const ui = new UI()

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones() //llena el select con los años
})


eventListeners()
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault()

    //Leer la marca selecionada
    const marca = document.querySelector('#marca').value
    // console.log(marca);

    //Leer año
    const year = document.querySelector('#year').value

    //tipo de cobertura - leer tipo input radio
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if (marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
        return
    }

    ui.mostrarMensaje('Cotizando...', 'correcto')

    //INSTANCIAR EL SEGURO
    const seguro = new Seguro(marca, year, tipo)
    seguro.cotizarSeguro()

    //UTILIZAR PROTYPE PARA COTIZAR
}