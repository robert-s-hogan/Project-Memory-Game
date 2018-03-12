// Main Objects to work with
const body = document.querySelector('body');
const container = document.querySelector('.container');
const deck = document.querySelector('.deck');
const header = document.querySelector('.header');
const desc = document.querySelector('.description');

/*
    Clock Objects & Score Panel Output
*/
const timerOutput = document.querySelector('#timer');
const clock = document.createElement('div');
const timeInMin = document.createElement('span');
const timeInSec = document.createElement('span');
const scorePanel = document.querySelector('.score-panel');
const movesOutput = document.querySelector('.moves');
const restartBtn = document.querySelector('.restart');

const winPanel = document.querySelector('#winPanel');
const winPanelStars = document.createElement('h1');
const winPanelMoves = document.createElement('h2');
const winPanelTime = document.createElement('h3');
const playAgain = document.createElement('button');
const closeGame = document.createElement('button');

/*
    Variables & Arrays
*/
let cards = [];
const openCards = [];
let matchCount = 0;
let resetDuration = null;
let timeout = null;
let moveCounter = 0;
let starElement = scorePanel.querySelectorAll('i');
let starCount = 3;

/*
    Clock Variables
*/
let start = 0;
let currentTime = 0;
let min = 0;
let sec = 0;

/*
    Main Event Listener
*/
deck.addEventListener('click', function(e){
let cardClicked;

    // Check to see if the card area was clicked
    if(e.target.nodeName == 'LI') {
        cardClicked = e.target;
    } else if (e.target.nodeName == 'I') {
        cardClicked = e.target.parentElement;
    } else {
        return; // If there is a click outside of the card area
    }

    // Start Clock
    if(start < 1) {
        startTimer();
    }

    // Ignore click if Card has been matched
    if(cardClicked.classList.contains('match')) { return;}

    // Ignore double-clicks and self matches
    if(openCards.length > 0 && cardClicked === openCards[0]){ return;}

    // Start new pair and reset previous clicks
    if(timeout != null){

        // Ignore cards that are already opened
        if(cardClicked == openCards[0] || cardClicked == openCards[1]) {
            return;
        }
        if(openCards.length > 0){
            clearTimeout(timeout);
            badMatch();
        }
    }

    // Toggle Cards on click
    toggleShowCard(cardClicked);

    // Add card to cardsOpen array
    addToOpenArray(cardClicked);

    // Check openCards for a match
    if(openCards.length > 1) {
        checkForMatch();
        numOfMoves();
    }

    // Check for win condition
    checkForWin();
});

/*
    Resets Deck and Score Panel if restartBtn was clicked
*/
restartBtn.addEventListener('click', function(event){
    
    if(matchCount == 8){
        resetGameElementsAfterWin();
    }
    
    stopTimer();

    clearOpenArray();
    gameInit();
});

winPanel.addEventListener('click', function(event){

    resetGameElementsAfterWin();
    gameInit();
});

// Card toggle Function
function toggleShowCard(card){

    card.classList.toggle('show');
    card.classList.toggle('open');
}

/*
    Check For Match Function - checks 2nd class for font awesome icon
*/
function checkForMatch(){

    let cardOneClass = openCards[0].firstChild.classList[1];
    let cardTwoClass = openCards[1].firstChild.classList[1];

    if(cardOneClass == cardTwoClass){
        setMatchingCards();

        matchCount++;
    } else {
        timeout = setTimeout(badMatch, 300);
    }
}

function checkForWin(){

    if(matchCount === 8){
        stopTimer();
        updateWinPanel();
        showWinPanel();
    }
}

/*
    Sets Matching Cards - Adds Classes & Animations
    Clears Array After Match & Animation
*/
function setMatchingCards(){

    // Loop to find match and add Animate.css classes
    for(let i = 0; i < openCards.length; i++){
        openCards[i].classList.add('match', 'animated', 'flipInY');
    }
    clearOpenArray();
}

/*
    Rejects Cards with Animation then Hides Cards
*/
function badMatch(){

    for(let i = 0; i < openCards.length; i++){
        openCards[i].classList.add('animated', 'jello');
        toggleShowCard(openCards[i]);
}

// Reset Time After Bad Match
clearOpenArray();
    timeout = null;
}

// Removes Cards from cardsOpen Array
function clearOpenArray(){
    openCards.splice(0, 2);
}

// Add Card Clicked to cardsOpen Array
function addToOpenArray(card){
    openCards.push(card);
}

/*
    Creates New Array on Reset or Page Refresh
*/
function createArrayOfCards(){

    cards = [];
    // All Font Awesome Icons For Card Creation
    const cardTypes = ['fa-bomb', 'fa-paper-plane-o', 'fa-diamond', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle'];

    // Add 2 of Each Type of Card to Deck
    for(let i = 0; i < cardTypes.length; i++){
        cards.push(createCard(cardTypes[i]));
        cards.push(createCard(cardTypes[i]));
    }
}

/*
    Creates Individual Card with New Elements and 'fa' class in the I Class
*/
function createCard(faIcon){

    let cardElement = document.createElement('li');
    cardElement.classList.add('card');

    let faDefault = document.createElement('i');
    faDefault.classList.add('fa');

    faDefault.classList.add(faIcon);
    cardElement.appendChild(faDefault);

    return cardElement;
}

/*
    Win Page with output
*/
function createWinPanel(){
    const modalContent = document.createElement('div');
    const spanClose = document.createElement('span');

    modalContent.classList.add('modal-content');
    winPanel.appendChild(modalContent);

    spanClose.classList.add('close');
    modalContent.appendChild(spanClose);

    winPanelStars.id = 'winStars';
    modalContent.appendChild(winPanelStars);

    winPanelMoves.id = 'winMoves';
    modalContent.appendChild(winPanelMoves);

    winPanelTime.id = 'winTime';
    modalContent.appendChild(winPanelTime);

    playAgain.id = "playBtn";
    modalContent.appendChild(playAgain);

    winPanel.id = 'winPanel';
    winPanel.classList.add('animated', 'flash');
    winPanel.classList.add('container');
}

function updateWinPanel(){

    winPanelStars.textContent = `You received ${starCount} Stars!`;
    winPanelMoves.textContent = `It took you ${moveCounter} Moves`;
    winPanelTime.textContent = `Your time was ${min} minute and ${sec} seconds!`;
    playAgain.textContent = `Play Again?`;
    closeGame.textContent = 'Close'
}

function showWinPanel(){

    const parent = header.parentElement;
    header.remove();
    deck.remove();
    scorePanel.remove();
    winPanel.style.display = 'block';
    parent.appendChild(winPanel);
}

function resetGameElementsAfterWin(){

    container.appendChild(header);
    container.appendChild(scorePanel);
    container.appendChild(deck);
    winPanel.remove();
}

/*
    Clock Functions
*/
function createClock(){

    timeInMin.textContent = min;
    timeInSec.textContent = sec + '0';

    let timerSpacer = document.createElement('span');
    timerSpacer.textContent = ':';
    clock.appendChild(timeInMin);
    clock.appendChild(timerSpacer);
    clock.appendChild(timeInSec);
    timerOutput.appendChild(clock);
}

function startTimer(){

    start = Date.now();
    // Refresh the time in just under a
    resetDuration = setInterval(updateTimer, 500);
}

function stopTimer(){

    clearInterval(resetDuration);
    updateTimer();
}

function updateTimer(){

    currentTime = Date.now();

    let timeElapsed = currentTime - start;
    let totalSeconds = Math.floor(timeElapsed/1000);

    sec = totalSeconds % 60;
    min = (totalSeconds > 60) ? Math.floor(totalSeconds/60) : 0;

    // Update Time to Clock
    timerOutput.classList.add('animated', 'pulse');
    timerOutput.style.color = '#d13e36';
    timeInSec.textContent = (sec < 10) ? '0' + sec : sec;
    timeInMin.textContent = min;
}

function clearTimer(){
    timeInMin.textContent = '0';
    timeInSec.textContent = '00';
}

/*
    Game Functions
*/
function gameInit(){

    // Create new array of cards
    createArrayOfCards();

    // Shuffle Cards with Instructor Given Function
    shuffle(cards);
    deck.innerHTML = '';

    // Fill Deck with Newly Populated Cards
    for(let i = 0; i < cards.length; i++){
        deck.appendChild(cards[i]);
    }

    // Reset Move Counter
    resetMoves();

    // Reset Pair Matches
    matchCount = 0;

    // Reset Stars
    starCount = 3;
    resetStars();

    // Reset Timer Variables
    start = min = sec = currentTime = 0;
    resetDuration = null;
    clearTimer();
}

// Simple variable and DOM element reset
function resetMoves(){
    moveCounter = 0;
    movesOutput.textContent = moveCounter;
}

// Reset the classList on all 3 stars
function resetStars(){
    for(let i = 0; i < starElement.length; i++){
        starElement[i].classList.add('fa-star');
        starElement[i].classList.remove('fa-star-o');
    }
}

/*
    Move Counter
    Stars Updater
*/
function numOfMoves(){

    moveCounter++;
    movesOutput.textContent = moveCounter;

    if(moveCounter === 15){
        starCount = 2;
        toggleStarsOff(2);
    }

    if(moveCounter === 20){
        starCount = 1;
        toggleStarsOff(1);
    }

    if(moveCounter === 25){
        starCount = 0;
        toggleStarsOff(0);
    }
}

function toggleStarsOff(index){
    starElement[index].classList.remove('fa-star');
    starElement[index].classList.add('fa-star-o');
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Call Game Functions on Page Load
createWinPanel();
createClock();
gameInit();