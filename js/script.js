"use strict";

//HTML ELEMENTS
const randomNumbersHTML = document.getElementById('randomnumbers');
const btnPlay = document.getElementById('playButton');
const btnGuess = document.getElementById('guessBtn');
const inputsHTML = document.getElementById('numberInputs');
const outcomeHTML = document.getElementById('outcome');
const resultHTML = document.getElementById('result');
const recapHTML = document.querySelector('.recap');

//GENERAL VARIABLES INITIALIZATION : they need to be seen by both 'generateNumbers' and 'guess' functions
let randomNumbers = [];
let guessedRight = 0;

//Random Numbers Generator: generates 5 random numbers between 1 and 50, appends them to the HTML. After a 5 seconds countdown toggles display of guess btn and inputs.
const generateNumbers = function(){
    //reset randomnumbers and HTML
    randomNumbers = [];
    randomNumbersHTML.innerHTML = '';
    resultHTML.innerHTML = '';

    //remove playBtn event for 5 seconds (during countdown - change style so it's visible)
    btnPlay.removeEventListener('click', generateNumbers);
    btnPlay.style.backgroundColor = 'lightgoldenrodyellow';
    btnPlay.style.color = 'black';
    
    //reset guessBtn display for every click on 'play'
    btnGuess.classList.add('d-none');

    //reset inputs HTML
    inputsHTML.classList.add('d-none');
    inputsHTML.innerHTML = `
        <input class="guessNum" type="text">
        <input class="guessNum" type="text">
        <input class="guessNum" type="text">
        <input class="guessNum" type="text">
        <input class="guessNum" type="text">
    `;

    //reset outcome display
    outcomeHTML.classList.add('d-none');

    //reset click event on guessBtn
    btnGuess.addEventListener('click', guess);
    //reset guessedRight
    guessedRight = 0;


    //local use variables and constants
    const countdownHTML = document.getElementById('countdown');
    const TOT_NUM = 5;
    const countdown = 5000;
    let count = 4;
    let i = 0;

    //countdown Interval
    const countToZero = setInterval(() => {
        if(count == 0){
            clearInterval(countToZero);
            countdownHTML.innerHTML = 'INSERISCI I NUMERI CHE TI RICORDI'
        }
        else{
            countdownHTML.innerHTML = `${(count)}`;
            count--;
        }
    }, 1000)

    //random numbers generator
    while(i < TOT_NUM){
        let rndmNum = randomBetween(1, 50);
        if(!(randomNumbers.includes(rndmNum))){
            randomNumbers.push(rndmNum);
            randomNumbersHTML.innerHTML += `<span>${randomNumbers[i]}</span>`;
            i++;
        }
    }

    //timout function: 1) erase randomNumbers HTML; 2) gives back the click event to playBtn and its original style; 3) display inputs and guessBtn
    setTimeout(clearNumbers, countdown);
    function clearNumbers(){
        randomNumbersHTML.innerHTML = '';
        btnPlay.addEventListener('click', generateNumbers);
        btnPlay.style.backgroundColor = 'lightseagreen';
        btnPlay.style.color = 'white';

        inputsHTML.classList.toggle('d-none');
        btnGuess.classList.toggle('d-none');
    }

    console.log(randomNumbers);
}

btnPlay.addEventListener('click', generateNumbers);


//Number Guesser: receives 5 numbers by user input and if some of them match those generated randomly, returns the right guessed ones.
const guess = function(){
    btnGuess.removeEventListener('click', guess)

    let numInputs = document.querySelectorAll('.guessNum');
    console.log(numInputs);
    let guessArray = [];

    for(let i = 0; i < numInputs.length; i++){
        if(!(isNaN(parseInt(numInputs[i].value))) && numInputs[i].value != ''){
            guessArray.push(parseInt(numInputs[i].value));
        }
    }

    console.log(guessArray);

    for(let i = 0; i < guessArray.length; i++){
        if(randomNumbers.includes(guessArray[i])){
            resultHTML.innerHTML += `<span class="correct">${guessArray[i]}</span>`
            rightGuess++;
        }
        else if(!(randomNumbers.includes(guessArray[i]))){
            resultHTML.innerHTML += `<span class="wrong">${guessArray[i]}</span>`
        }
    }

    inputsHTML.classList.toggle('d-none');
    outcomeHTML.classList.toggle('d-none');
    btnGuess.classList.toggle('d-none');


    recapHTML.innerHTML = `NUMERI INDOVINATI :`+' '+`<span style="color: gold">${guessedRight}</span>`;

    for(let i = 0; i < randomNumbers.length; i++){
        randomNumbersHTML.innerHTML += `<span>${randomNumbers[i]}</span>`
    };
    
};

btnGuess.addEventListener('click', guess);