// selecionar input com o numero digitado
let valorDigitado = document.querySelector('#valorEmReal')

//selecionar os elementos radios (criar um array deles)
let moedaSelecionada = document.getElementsByName('moedaEstrangeira')
let aviso = document.querySelector('#aviso')

//selecionar os botões
let btnConverter = document.querySelector('#btnConverter')
let btnLimpar = document.querySelector('#btnLimpar')

// COTAÇÕES DO DIA 16/11/2022
let valorDoDolar = 5.30
let valorDoEuro  = 5.49
let valorDaLibra = 6.43
let valorDoBitcoin = 89029.60
let valorEmReal = 0

let moedaEstrangeira = ''
let moedaConvertida = ''

//mensagem formatada para exibir valores monetários
function mensagemFormatada(moedaConvertida) {
    isNaN(valorEmReal) ? valorEmReal = 0 : ''
    console.log("Moeda convertida" +moedaConvertida)
    aviso.textContent = "O valor " + (valorEmReal).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) + " convertido em " +moedaEstrangeira + " é " + moedaConvertida
}

/* VERIFICAR SE FOI DIGITADO ALGUM VALOR PARA PODER CONVERTER */
function bloquearBotao() {
    if(valorDigitado.value == 0 || valorDigitado == '' || valorDigitado == null) {
        btnConverter.setAttribute('disabled', 'disabled')
        btnConverter.style.background = '#ccc'
        btnConverter.style.cursor = 'not-allowed'
    }    
}

// Reativar botão
function ativarBotao() {
    if(valorDigitado.value >0) {
        btnConverter.removeAttribute('disabled')
        btnConverter.style.background = '#ffc107'
        btnConverter.style.cursor = 'pointer'
    } else{
        console.log('Não foi ativado')
    
    }
}

// Verificar qual botão radio está marcado, checked ou checked == true
// vincular a verificação a um evento, click no botão Converter 
btnConverter.addEventListener('click', function() {
// Fazer o parseFloat dos valores monetários (converter String para)
    valorEmReal = parseFloat(valorDigitado.value) 

    console.log('Escolhe a moeda estrangeira')
    for(let i = 0; i < moedaSelecionada.length; i++) {
        if(moedaSelecionada[i].checked) {
            moedaEstrangeira = moedaSelecionada[i].value
            console.log(moedaEstrangeira)
        }
    }

    /*
    Use uma estrutura escolha caso para escolher qual é a moeda estrangeira que foi selecionada */

    //Conversão das moedas
    // Opearação para pegar moedaEstrangeira e dividir pelo valorEmReal
    switch(moedaEstrangeira) {
        case 'Dólar':
            moedaConvertida = valorEmReal / valorDoDolar
            simboloMonetario = 'US$'
            mensagemFormatada(moedaConvertida.toLocaleString('en-US', {style: 'currency', currency: 'USD'}))
        break

        case 'Euro':
            moedaConvertida = valorEmReal / valorDoEuro
            mensagemFormatada(moedaConvertida.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'}))
        break
        
        case 'Libra':
            moedaConvertida = valorEmReal / valorDaLibra
            mensagemFormatada(moedaConvertida.toLocaleString('en-GB', {style: 'currency', currency: 'GBP'}))
        break

        case 'Bitcoins':
            moedaConvertida = valorEmReal / valorDoBitcoin
            mensagemFormatada(parseFloat(moedaConvertida).toFixed(5))
        break

        default:
            aviso.textContent = 'Escolha uma moeda estrangeira'
    }
    isNaN(moedaConvertida) ? moedaConvertida = 0 : ''
})

btnLimpar.addEventListener('click', function() {
    valorDigitado.focus()
    valorDigitado.value = ''
    aviso.textContent = 'Digite o valor, escolha a moeda e converta'
    moedaSelecionada[0].checked = false
    moedaSelecionada[1].checked = false
    moedaSelecionada[2].checked = false
    moedaSelecionada[3].checked = false
})