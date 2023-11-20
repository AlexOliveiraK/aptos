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
                <button class="abrir-apto">Abrir</button>
            </div>
        </div>
        `
    });

    let listaHtmlCompleta = document.querySelector('.apartamentos')
    listaHtmlCompleta.innerHTML = htmlApartamentos
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

botaoCriaApto.addEventListener('click', criaApto)

carregaLocaStorage()
exibeApartamentos()
