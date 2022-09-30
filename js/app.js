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

    //Leer año
    const diferencia = new Date().getFullYear() - this.year

    //Por cada año de antiguedad reducimos un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100
    console.log(cantidad);

    //SI el seguro es BASICO lo multiplico * 30% mas
    //SI el seguro es COMPLETO lo multiplico * 50% mas
    if (this.tipo === 'basico') {
        cantidad *= 1.30
    }else{
        cantidad *= 1.50
    }

    return cantidad

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

UI.prototype.mostrarResultado = (total, seguro) => {

    const {marca, year, tipo} = seguro

    let textoMarca

    switch (marca) {
        case '1':
            textoMarca = 'Americano'
            break
        case '2':
            textoMarca = 'Asiatico'
            break
        case '3':
            textoMarca = 'Europeo'
            break
        default:
            break;
    }

    const div = document.createElement('div')
    div.classList.add('mt-10')

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
    `

    const resultadoDiv = document.querySelector('#resultado')

    //Mostrar Spinner
    const spinner = document.querySelector('#cargando')
    spinner.style.display = 'block'

    setTimeout(() => {
        spinner.style.display = 'none'  // se borra spinner
        resultadoDiv.appendChild(div) //se muestra resultado
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

    //OCULTAR COTIZACIONES PREVIAS
    const resultados = document.querySelector('#resultado div')
    if (resultados !== null){
        resultados.remove()
    }

    //INSTANCIAR EL SEGURO
    const seguro = new Seguro(marca, year, tipo)
    const total = seguro.cotizarSeguro()

    // //UTILIZAR PROTYPE PARA COTIZAR
    ui.mostrarResultado(total, seguro)
}