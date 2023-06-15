const gameContainer = document.getElementById("game"); // div element
const startButton = document.querySelector('#startButton');
const restartButton = document.querySelector('#restartButton')


const COLORS = ["red", "blue", "green", "orange", "purple", "red", "blue", "green", "orange", "purple"];

function shuffle(array) {

    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let shuffledArray = shuffle(COLORS);



let card1 = null;
let card2 = null;
let count = 0;
let numOfGuesses = 0;
let bestScore = 0;
let matchedCards = 0;
let secondGameOrGreater = false;

// Starts the game
startButton.addEventListener('click', function (e) {

    createDivsForColors(shuffledArray);
    startButton.style.pointerEvents = 'none';
    return;
})

restartButton.addEventListener('submit', function (e) {

    e.preventDefault();
    return;
})


function createDivsForColors(colorArray) {

    const counterDiv = document.createElement('div')
    counterDiv.innerHTML = 'Number of Guesses: ' + numOfGuesses;
    document.body.append(counterDiv);


    const bestScoreDiv = document.createElement('div')
    document.body.append(bestScoreDiv)

    bestScore = JSON.parse(localStorage.getItem('totalGuesses'))

    if (bestScore !== null) {
        bestScoreDiv.innerHTML = 'High Score: ' + bestScore;
    }

    secondGameOrGreater = JSON.parse(localStorage.getItem('playedGame'))

    localStorage.setItem('totalGuesses', JSON.stringify(bestScore))
    localStorage.setItem('playedGame', JSON.stringify(secondGameOrGreater)) //{totalGuesses: null, playedGame: null}



    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('gray');
        gameContainer.append(newDiv);


        newDiv.addEventListener("click", handleCardClick)

        function handleCardClick(e) {
            console.log("you just clicked", e.target);
            numOfGuesses += 1;
            counterDiv.innerHTML = 'Number of Guesses: ' + numOfGuesses;
            count += 1;

            if (count === 1) {
                card1 = e.target;
                card1.classList.add(color);
            }

            if (count === 2) {
                card2 = e.target;

                if (card1 === card2) {
                    card1.classList.add(color);
                    count = 1;
                    return;
                } else {
                    card2.classList.add(color)
                }

                if (card1.classList[1] === card2.classList[1]) {
                    card1.style.pointerEvents = 'none'
                    card2.style.pointerEvents = 'none'
                    count = 0
                    matchedCards += 2;
                } else {
                    setTimeout(function () {
                        card1.setAttribute('class', 'gray')
                        card2.setAttribute('class', 'gray')
                        count = 0
                    }, 1000)
                }
            }

            if (matchedCards === shuffledArray.length) {
                if (numOfGuesses > bestScore && secondGameOrGreater === null) {
                    localStorage.setItem('totalGuesses', JSON.stringify(numOfGuesses))
                    localStorage.setItem('playedGame', JSON.stringify(true))
                }

                if (numOfGuesses > bestScore && secondGameOrGreater === true) {
                    localStorage.setItem('totalGuesses', JSON.stringify(bestScore))
                } else {
                    localStorage.setItem('totalGuesses', JSON.stringify(numOfGuesses))
                }

                alert("You've completed the game!")
            }
        }
    }
}