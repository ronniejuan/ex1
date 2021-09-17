import './style.css';
import 'regenerator-runtime';
import {addListenerToCards, elemCreator,  generateAllCards, points} from './gameTemplate.js';



let rootElement = document.querySelector('#root')


//create the Game container html element (div)
let gameCont    = elemCreator('div', { id: 'gameCont', class: 'gameCont' })
let infoBar     = elemCreator('div', { class: 'infoBar' })
let timer       = elemCreator('div', { class: 'timer' });
timer.innerText = 0;

let startBtn    = elemCreator('button', { class: 'startBtn' })
startBtn.innerText = "Start"

let score      = elemCreator('div', { class: 'score' });
score.innerText= points


let startFlag  = false;
let counter    = 0;

//add listener to start button
startBtn.addEventListener('click', () => {
    
    addListenerToCards();
    
    startFlag          = !startFlag;
    startBtn.innerText = 'Stop'
    let timerInterval;
    //start and stop the timer and update score value
    timerInterval = setInterval(() => {
        counter++;
        timer.innerText = counter;
        score.innerText = points;
        if (!startFlag) {
            clearInterval(timerInterval);
            startBtn.innerText = 'Start'
        }
    }, 1000)
        
})

infoBar.append(timer);
infoBar.append(startBtn);
infoBar.append(score);

gameCont.append(...generateAllCards());
gameCont.append(infoBar)
    

    
    
    
    
    //add div into html root element
    rootElement.appendChild(gameCont);
    
    


    