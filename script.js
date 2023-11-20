const botaoCriaApto = document.querySelector('.cadastrar')

let apartamentos = []

function criaApto(){
    let nameApto = document.querySelector('.input-nome-apto')

    let aptoNovo = {
        idApto: apartamentos.length + 1,
        nomeApto: nameApto.value
    }

    apartamentos.push(aptoNovo)

    salvaLocalStorage()
    exibeApartamentos()
}

function exibeApartamentos(){

    let htmlApartamentos = "";

    apartamentos.forEach((element, index) => {
        htmlApartamentos = htmlApartamentos +
        `
        <div class="apto">
            <p class="apto-numero">Numero: ${element.idApto}</p>
            <p class="apto-nome">Nome:${element.nomeApto}</p>
            <div class="controles">
                <button class="apagar" onclick="deleteApto(${index})">Deletar</button>
                <button class="abrir-apto" onclick="abreApto(${index})">Abrir</button>
            </div>
        </div>
        `
    });

    let listaHtmlCompleta = document.querySelector('.apartamentos')
    listaHtmlCompleta.innerHTML = htmlApartamentos

    document.querySelector('.aptoDetalhado').style.display = 'none'
}

function salvaLocalStorage(){
    const listaApartamentos = JSON.stringify(apartamentos)
    localStorage.setItem("apartamentosSalvos", listaApartamentos)
}

function carregaLocaStorage(){

    let apartamentosSalvos = localStorage.getItem("apartamentosSalvos")
    apartamentosSalvos = JSON.parse(apartamentosSalvos)

    if(apartamentosSalvos.length > 0){
        apartamentos = apartamentosSalvos
    }
}

function deleteApto(id){
    apartamentos.splice(id, 1)

    salvaLocalStorage()
    exibeApartamentos()
}

function abreApto(index){
    document.querySelector('.apartamentos').style.display = 'none'
    document.querySelector('.aptoDetalhado').style.display = 'block'

    let htmlaptoDetalhado = document.querySelector('.aptoDetalhado')

    console.log(htmlaptoDetalhado)

    apto = apartamentos

    htmlaptoDetalhado.innerHTML = 
    `
        <p>Numero do apartamento: ${apto[index].idApto}</p>
        <p>Nome inquilino principal: ${apto[index].nomeApto}</p>
        <p>Número de moradores: 2</p>
        <p>Valor do aluguel: R$1000,00</p>
        <p>Dia de vencimento: 7</p>
        <p>Pagamento vencido: Não</p>
        <p>Dias em atraso: 0</p>
        <p>Tem pet: Sim</p>
        <button class="voltar-tela-principal" onclick="voltarTelaPrincipal()">Voltar</button>
    `
}

function voltarTelaPrincipal(){
    document.querySelector('.aptoDetalhado').style.display = 'none'
    document.querySelector('.apartamentos').style.display = 'grid'
    exibeApartamentos()
}

botaoCriaApto.addEventListener('click', criaApto)

carregaLocaStorage()
exibeApartamentos()
