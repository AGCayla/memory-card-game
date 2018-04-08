/*
 * Create a list that holds all of your cards
 */
const list = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];

/*
 * Declare all other global variables
 */
const deck = document.querySelector('.deck');
const cards = document.getElementsByClassName('card');
const restartButton = document.querySelector('.restart');
const starsRating = document.querySelector('.stars');
let clicks = document.querySelector('.moves');
const starsIcons = starsRating.getElementsByTagName('i');
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let newList = shuffle(list);
let firstStar;
let openCards = [];
let matchedCards = [];
let clickedCards = [];
let totalSeconds = 0;
setInterval(setTime, 1000);
deck.innerHTML = "";
clicks.innerHTML = 0;
allocateNewClasses();


restartButton.addEventListener('click', function(event) {
    deck.innerHTML = "";
    clicks.innerHTML = 0;
    clickedCards = [];
    shuffle(list);
    allocateNewClasses();
    starsCount();
    return newList;
})


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function allocateNewClasses() {
	for (let i = 0; i < newList.length; i++) {
		const liElement = `<li class = "card"><i class = "fa fa-${newList[i]}"></i></li>`;
		deck.insertAdjacentHTML('beforeend', liElement);
	}
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener ('click', function(event) {
    if (event.target.className === "card" && openCards.length < 2) {
        displayCard(event);
        addToOpenCards(event);
        starsCount();
        playerWins(matchedCards);
        killTimer();
    }
    else {
        event.stopPropagation();
    }
});

function displayCard(event){
    event.target.classList.toggle('open');
    event.target.classList.toggle('show');
}

function addToOpenCards (event) {
    openCards.push(event.target);
    clickedCards.push(event.target);
    if (openCards.length === 2) {
        clicks.innerHTML = clickedCards.length / 2;
        checkIfMatch(openCards);
    }
}

function checkIfMatch(openCards) {
    if (openCards[0].childNodes[0].className === openCards[1].childNodes[0].className) {
        openCards[0].className = "card match";
        openCards[1].className = "card match";
        matchedCards.push(openCards);
        openCards.length = 0;
    } else 
        {
        setTimeout(function removeFromOpenCards() {
            openCards[0].className = "card";
            openCards[1].className = "card";
            openCards.length = 0;
            }, 500);
        }
};

/* 
 * This 'modal' will be replaced later on 
 */
function playerWins(matchedCards) {
    if (matchedCards.length === 8) {
        alert('You win!! You have completed the game in ' + minutesLabel.innerHMTL + ' minutes and ' + secondsLabel.innerHTML + ' seconds. For this, you have been awarded ' + starsIcons.length + ' stars!!!');
    }
};

/* 
 * Star Rating - remove one star after 10 moves, another star after 12 moves,and another after 14 moves
 */
function starsCount() {
    for (i = 0; i < starsIcons.length ; i++) {
    if (clickedCards.length > 21 && clickedCards.length <= 25) {
        starsIcons[2].className = "fa";
    } else if (clickedCards.length > 25 && clickedCards.length <= 29) {
        starsIcons[2].className = "fa";
        starsIcons[1].className = "fa";
    } else if (clickedCards.length > 29) {
        starsIcons[2].className = "fa";
        starsIcons[1].className = "fa";
        starsIcons[0].className = "fa";
    } else {
        starsIcons[2].className = "fa fa-star";
        starsIcons[1].className = "fa fa-star";
        starsIcons[0].className = "fa fa-star";
    }
}
};

/* 
 * Timer function from https://stackoverflow.com/a/5517836
 */
function setTime() {
    if (clickedCards.length > 0 ) {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    } else {
        secondsLabel.innerHTML = "00";
        minutesLabel.innerHTML = "00";
    }
  }
  
  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  function killTimer() {
      let seconds = secondsLabel.innerHTML;
      return seconds;
      let minutes = minutesLabel.innerHTML;
      return minutes;
  }