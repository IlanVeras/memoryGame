let cardDivs = document.querySelectorAll('.card')
let cardF = document.querySelectorAll('.card_front')
let cardB = document.querySelectorAll('.card_back')



let lastClickedCard = null
let matches = 0
cardB.forEach(card => {
    card.addEventListener('click', function(e){
        console.log('Working')
        const target = e.currentTarget
        if(target == lastClickedCard || target.className.includes('done')){
            return;
        }
        console.log(target)
        this.style.position = 'static'
        let father = target.parentElement
        father.classList.add("flip")
        if(!lastClickedCard){
            lastClickedCard = father
        }else if(lastClickedCard){
            if(showData(lastClickedCard) === showData(father)){
                    console.log('EQUAL')
                    matches++ //a cada match feito uma vitória é alcançada
                    console.log(matches)
                    lastClickedCard = null
                    //depois de 10 matches (pois são 20 pares) o jogador ganha
                    if(matches == 10){
                        setTimeout(() => {
                            alert('Você ganhou')
                            console.clear()
                            //console.log(cardDivs)
                            
                        }, 100)
                    }
            }else{
                console.log('NOT EQUAL')
                setTimeout(() => {
                    father.classList.remove('flip')
                    console.log(lastClickedCard.children[1])
                    console.log(lastClickedCard)
                    lastClickedCard.classList.remove('flip')
                    lastClickedCard.children[1].style.position = 'absolute'
                    this.style.position = 'absolute'
                    lastClickedCard = null
                }, 500);
            }
        }
    })   
});



function showData(element){
    d = element.getAttribute('data-icon') //pega o elemento selecionado e mostra seu data-icon
    return d
}


let imgDataIcon = [
    {data_icon: 'bootstrap', imag:"assets/bootstrap.png"},
    {data_icon: 'css', imag:"assets/css.png"},
    {data_icon: "electron", imag: "assets/electron.png"},
    {data_icon: "firebase", imag: "assets/firebase.png"},
    {data_icon: "html", imag: "assets/html.png"},
    {data_icon: 'javascript', imag:"assets/javascript.png"},
    {data_icon: 'jquery', imag:"assets/jquery.png"},
    {data_icon: "mongo", imag: "assets/mongo.png"},
    {data_icon: "node", imag: "assets/node.png"},
    {data_icon: "react", imag: "assets/react.png"}
]


//sorteia um número a cada vez e não o repete
function getRandomData(data, num) {
    let arr = [];
    while (arr.length < num) {
      let randomNum = Math.floor(Math.random() * data.length);
      let r = data[randomNum]; // esse numero será aplicado no data como indice
      if (!arr.includes(r)) {
        arr.push(r); //se esse valor de data não for encontrado em arr ele será incluido em arr
      }
    }
    return arr;
}



//Construir uma função que reset o game
function resetGame(){
    allSort()
    console.log('Reset')
    lastClickedCard = null // impede que exista uma carta anterior clicada no cachê
    cardDivs.forEach(card => {
        card.classList.remove('flip')
    })
    cardB.forEach(backCard => {
        backCard.style.position = 'absolute'
    })
    cardF.forEach(frontCard => {
        frontCard.style.position = 'absolute'
    })//os dois devem ser absolute pois essa é sua posição original
    matches = 0 //faz com que a contagem de matches recomece
}



//Contruir uma função que pegue o array da sortCard1 e o array da sorCard2 una os dois, embaralhe e assim será capaz de fazer um for que mude o img src e o data-icon de todos os 19 itens de uma vez só

//função que mistura a ordem dos elementos de um array
function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
}


//função que junta os dois arrays e dá novas imagens e data-icons para cada um
function allSort(){
    let arrayData1 = getRandomData(imgDataIcon, 10)
    let arrayData2 = getRandomData(imgDataIcon, 10)
    let allData = shuffle([...arrayData1, ...arrayData2])
    //console.log(arrayData1)
    //console.log(allData)
    for(var i=0; i < 20; i++){
        let imageElement = document.querySelector(`#c${i} .card_front img`)
        let cardElement = document.querySelector(`#c${i}`)
        //console.log(allData[i].data_icon)
        cardElement.setAttribute('data-icon', `${allData[i].data_icon}`)
        imageElement.src = allData[i].imag
    }
}
allSort()