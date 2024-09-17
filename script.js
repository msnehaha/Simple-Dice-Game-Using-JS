'use strict';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
let scoreEl = document.querySelector('.score');

score0El.textContent = 0;
score1El.textContent = 0;

let currentScore, activePlayer, scores, playing;


const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

function init() {
    currentScore = 0;
    scores = [0, 0];
    playing = true;
    activePlayer = 0;

    diceEl.classList.add('hidden');
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner');

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}


function switchPlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    document.querySelector('.current')

    activePlayer = activePlayer === 0 ? 1 : 0;
    console.log(activePlayer);
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

    //try 
    // document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    // document.querySelector(`.player--${!activePlayer}`).classList.remove('player--active');
}


init();



btnRoll.addEventListener('click', function () {
    if (playing) {
        const diceNum = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceNum}.png`;
        if (diceNum !== 1) {
            currentScore += diceNum;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
        else {

            switchPlayer();
        }
    }

})

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            diceEl.classList.add('hidden');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');

            playing = false;
        }
        else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);