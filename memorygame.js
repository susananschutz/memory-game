const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let flippedCards = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
    }
  };
  //newDiv.addEventListener("click", handleCardClick);
// TODO: Implement this function!
function handleCardClick(event) {
  let currentCard = event.target; 
  if (noClicking) return; //what is happening here?? if not clicked a card stays true
  if (event.target.classList.contains("flipped")) return; //take it back to true

  currentCard.style.backgroundColor = currentCard.classList[0]; //setting the color for the currentCard
  
  if(firstCard || secondCard) {
    currentCard.classList.add("flipped");
    firstCard = firstCard || currentCard;
    secondCard = currentCard === firstCard ? null : currentCard;
  }
  if (firstCard && secondCard) {
    noClicking = true;
     let myCard1 = firstCard.classname;
     let myCard2 = secondCard.classname;

     if(myCard1 === myCard2) {
      flippedCards += 2;
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = null;
      secondCard = null;
      noClicking = false;
     } else {
      setTimeout(function(){
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = null;
        secondCard = null;
        noClicking = false;
      }, 1000);
    }
  }

  setTimeout(function(){
    if(flippedCards === COLORS.length) alert('Game Over!');
  }, 1000);
}
  createDivsForColors(shuffledColors);


