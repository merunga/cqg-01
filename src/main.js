//********* IMPORT *********//
import { filterData, orderData, statsData, suggestedChampions } from './data.js'
import data from './data/lol/lol.js'

//********* DECLARACION DE VARIABLES *********/
const championsData = Object.values(data.data);
const buttonWelcome = document.querySelector('.welcome__container__button');
const orderlist = document.querySelector('#orderlist');
const filterlist = document.querySelector('#filterlist');
const buttonModal = document.querySelector('.button__modal')
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const modalContent2 = document.querySelector('.modal__content__suggested');


//********* FUNCIONES *********//

// cambiar pantalla de bienvenida a principal
function changeDisplay() {
    document.querySelector(".welcome").style.display = "none";
    document.querySelector(".welcome__container").style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.querySelector("main").style.display = "flex";
    document.querySelector("footer").style.display = "flex";
}

// visualizar data
function visualData(championsData) {
    championsData.forEach(champions => {
        // Almacenar valores de los campeones en variables
        let nameChampion = champions.name.toUpperCase();
        let titleChampion = champions.title;
        let linkImgChampion = champions.splash;
        let rolName = champions.tags[0];
        let rolChampion = champions.tags;
        let statsChampion = champions.stats;
        let infoChampion = champions.info;

        // Crear elementos HTML
        let newDiv = document.createElement('div');
        let div = document.createElement('div');
        let main = document.querySelector('main');
        newDiv.className = 'containercards';
        div.className = 'box card';
        main.appendChild(newDiv);
        newDiv.appendChild(div);
        div.style.backgroundImage = `url(${linkImgChampion})`;

        //frontcard

        div.innerHTML =
            `<img src='assets/img/${rolName}.webp' class='card__imgrol'>
        <div class='card__content'>
        <p class='card__content__name'>${nameChampion}</p> 
        <p class='card__content__title'>${titleChampion}</p>
        </div>`;

        //backcard
        let backDiv = document.createElement('div');
        backDiv.className = 'box cardback';
        newDiv.appendChild(backDiv);
        backDiv.innerHTML =
            `<div class='cardback__box' >
                <p class ='cardback__box__name'>${nameChampion}</p>
                <p class='cardback__box__rol'>${rolChampion}</p>
            </div>
            <div class='cardback__box2'>
                <div class='cardback__box2__box'>
                <img class='cardback__box2--icon' src='assets/icon/sword.webp'>
                <p class=cardback__box2__info>${infoChampion.attack}</p>
                </div>
                <div class='cardback__box2__box'>
                <img class='cardback__box2--icon' src='assets/icon/shield.webp'>
                <p class=cardback__box2__info>${infoChampion.defense}</p>
                </div>
                <div class='cardback__box2__box'>
                <img class='cardback__box2--icon' src='assets/icon/magic.webp'>
                <p class=cardback__box2__info>${infoChampion.magic}</p>
                </div>
                <div class='cardback__box2__box'>
                <img class='cardback__box2--icon' src='assets/icon/level.webp'>
                <p class=cardback__box2__info>${infoChampion.difficulty}</p>
                </div>
                </div>
                <div class='cardback__box3'>
                <table class='cardback__box3__table'>
                <tr class='cardback__box3__table--title'>
                <th scope="row">STATS</th>
                    <th>INITIAL</th>
                    <th>X LEVEL</th>
                </tr>
                <tr class='cardback__box3__table--data'>
                    <th>hp</th>
                    <td>${statsChampion.hp}</td>
                    <td>${statsChampion.hpperlevel}</td>
                </tr>
                <tr class='cardback__box3__table--data'>
                    <th>mp</th>
                    <td>${statsChampion.mp}</td>
                    <td>${statsChampion.mpperlevel}</td>
                </tr>
                <tr class='cardback__box3__table--data'>
                    <th>damage</th>
                    <td>${statsChampion.attackdamage}</td>
                    <td>${statsChampion.attackdamageperlevel}</td>
                </tr>
                <tr class='cardback__box3__table--data'>
                    <th>armor</th>
                    <td>${statsChampion.armor}</td>
                    <td>${statsChampion.armorperlevel}</td>
                </tr>
                </table>
            </div>`;

    }
    );
    cardflip(); //invocar funcion para girar tarjeta, se invoca aqui por la creacion del HTML
}

// girar tarjeta
function cardflip() {
    let cards = document.querySelectorAll('.containercards');
    cards.forEach((card) => {
        card.addEventListener('click', function () {
            card.classList.toggle('is-flipped'); //Agrega la clase o la elimina
        });
    });
}


//********* ESCUCHAR EVENTOS Y FUNCIONES PURAS *********//

//Cambiar display de bienvenida a principal
buttonWelcome.addEventListener('click', () => {
    changeDisplay()
})

//Visualizar la data antes de la carga de la pagina
window.addEventListener('DOMContentLoaded', visualData(championsData))


//Filtrar y ordenar datos en conjunto
filterlist.addEventListener('change', () => {
    let valueList = filterlist.value;
    const container = document.querySelectorAll('.containercards')
    container.forEach(element => {
        element.innerHTML = '';
    });
    let filter = filterData(championsData, valueList)
    visualData(filter)

    if (filterlist.value == 'FILTER BY') {
        orderlist.value = 'SORT BY'
    }
    orderlist.addEventListener('change', () => {
        let valueList = orderlist.value;
        const container = document.querySelectorAll('.containercards')
        container.forEach(element => {
            element.innerHTML = '';
        });
        let order = orderData(filter, valueList)
        visualData(order)
    })

})


//Ordenar datos independiente del filtro
orderlist.addEventListener('change', () => {
    let valueList = orderlist.value;
    const container = document.querySelectorAll('.containercards')
    container.forEach(element => {
        element.innerHTML = '';
    });
    let order = orderData(championsData, valueList)
    visualData(order)
})
//Funcion para cerrar modal con x

//Modal para visualizar calculo agregado
buttonModal.addEventListener('click', () => {
    modal.style.display = 'block';
    modalContent2.style.display='none'
    modalContent.style.display='flex'
    let stats = statsData(championsData);
    modalContent.innerHTML =
        ` <span class="modal__content__close">&times;</span>
        <p class='modal__content--title'>SEASON 12</p>
        <img class='modal__content-img' src="assets/img/prueba.png">
        <p class='modal__content--resume'>Los campeones traen nuevos niveles de habilidad.<br> 
        ¡Elije con sabiduria y podrás ganar!</p>
     <P class='modal__content--text'>Champions HP: 
     <span class='modal__content--text--stats'>${stats.hp}</span></P>
     <p class='modal__content--text'>Champions MP: 
     <span class='modal__content--text--stats'>${stats.mp}</span></p>
     <p class='modal__content--text'>Champions armor: 
     <span class='modal__content--text--stats'>${stats.armor}</span></p>
     <p class='modal__content--text'>Champions attack damage: 
     <span class='modal__content--text--stats'>${stats.attackdamage}</span></p>
    <button class='modal__content__button'>CAMPEONES SUGERIDOS</button>
    `
    closeModal()//invocamos closeModal aqui por la creacion del HTML
    viewSuggestedChampions()
})

function viewSuggestedChampions() {
    const buttonSuggested = document.querySelector('.modal__content__button');
    buttonSuggested.addEventListener('click', () => {
        modalContent.style.display='none';
        modalContent2.style.display='flex';
        const nameChampions = suggestedChampions(championsData);
        modalContent2.innerHTML = `
            <span class="modal__content__closes">&times;</span>
            <p class='modal__content--title'>Campeones sugeridos</p>
            <img class='modal__image__series' src="assets/img/proff.png" alt='campeones de la termporada'>
            <p class='modal__content--resume'>Estos son los campeones más equilibrados de esta temporada. ¡Juega con ellos y compartenos tu opinión en nuestras redes sociales!</p>
            <p class='modal__content__champions'></p>
            `   
            const contentChampions = document.querySelector('.modal__content__champions')
            
            contentChampions.innerHTML = `
            ${nameChampions.join(", ")}
            `
            closeModals()
        })
}

function closeModal() {
    const modalClose = document.querySelector('.modal__content__close');
    modalClose.addEventListener('click', () => {
        modal.style.display = "none";
    })
}


function closeModals() {
    const modalCloses = document.querySelector('.modal__content__closes');
    modalCloses.addEventListener('click', () => {
        modal.style.display = "none";
    })
}
//Funcion para cerrar modal dando click fuera del mismo
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
