// DECK AND CARDS
let card = document.querySelectorAll(".card");
let cards = Array.prototype.slice.call(card);

const deck = document.querySelector(".deck");

let allCardsIdent = document.getElementsByClassName("identical");

let openCards = [];

//MOVES AND START TIMER
let moves = 0;
let yourMoves = document.querySelector(".moves");
let stars = document.querySelectorAll(".fa-star");

//GAME END WINDIW
let closeIcon = document.querySelector(".close");
let modalWindow = document.querySelector("#game_end");


//SHUFFLE CARDS
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
};

//START GAME
document.body.onload = startGame();
function startGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "identical", "nonidentical");
    }
    // restart moves
    moves = 0;
    yourMoves.innerHTML = moves;
    // reset rating
    for (let i= 0; i < stars.length; i++){
        stars[i].style.visibility = "visible";
    }
    //restart timer
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 min 0 sec";
    clearInterval(interval);
}

//SHOW OR OPEN CARD
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", clickCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",gameEnd);
};


// CLICK CARD
function clickCard (){
    this.classList.toggle("open");
    this.classList.toggle("show");
};

// WHEN 2 CARD ARE IDENTICAL OR NOT IDENTICAL
function cardOpen() {
    openCards.push(this);
    let openCardsLength = openCards.length;
    if(openCardsLength === 2){
        addMoves();
        if(openCards[0].type === openCards[1].type){
            identical();
        } else {
            nonidentical();
        }
    }
};

function identical(){
    openCards[0].classList.add("identical");
    openCards[1].classList.add("identical");
    openCards[0].classList.remove("show", "open");
    openCards[1].classList.remove("show", "open");
    openCards = [];
}

function nonidentical(){
    openCards[0].classList.add("nonidentical");
    openCards[1].classList.add("nonidentical");
    setTimeout(function(){
        openCards[0].classList.remove("show", "open", "nonidentical");
        openCards[1].classList.remove("show", "open", "nonidentical");
        openCards = [];
    },1100);
}

//ADD MOVES
function addMoves(){
    moves++;
    yourMoves.innerHTML = moves;
    //START TIMER
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // STARS RATING
    if (moves > 10 && moves < 14){
        for(let i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 14){
        for(let i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

//TIMER
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute +" min "+ second +" sec";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
//GAME END
function gameEnd(){
    if (allCardsIdent.length == 16){
        clearInterval(interval);
        yourTime = timer.innerHTML;

        // MODAL WINDOW DISPLAY
        modalWindow.classList.add("show");

        // YOUR STARS
        var yourRating = document.querySelector(".stars").innerHTML;

        document.querySelector("#finalMove").innerHTML = moves;
        document.querySelector("#yourRating").innerHTML = yourRating;
        document.querySelector("#yourTime").innerHTML = yourTime;

        //CLOSE MODAL WINDOW
        closeModal();
    };
}

function closeModal(){
    closeIcon.addEventListener("click", function(e){
        modalWindow.classList.remove("show");
        startGame();
    });
}

function playAgain(){
    modalWindow.classList.remove("show");
    startGame();
}
