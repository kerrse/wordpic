document.getElementById("level_number").innerText = "Level " + level;

{ // all variables here are constants
  if (picAnswers[level-1][2]) {
    answer = picAnswers[level-1][2];
  } else {
    answer = picAnswers[level-1][0] + picAnswers[level-1][1];
  }

  if (pics[2] == picAnswers[level-1][0]) {
    pic1 = pics[2];
    pic2 = pics[3];
    pic1Ending = "." + endings[2];
    pic2Ending = "." + endings[3];
  } else {
    pic1 = pics[3];
    pic2 = pics[2];
    pic1Ending = "." + endings[3];
    pic2Ending = "." + endings[2];
  }
} // end of variable constants

document.getElementsByClassName("pics_word")[0].innerText = pic1;
document.getElementsByClassName("pics_word")[1].innerText = pic2;
document.getElementsByClassName("pics")[0].setAttribute("src", ("pic-info/pics/" + level + "/" + pic1 + pic1Ending));
document.getElementsByClassName("pics")[1].setAttribute("src", ("pic-info/pics/" + level + "/" + pic2 + pic2Ending));

if (answer.length%2 == 0) {
  letterAmt = answer.length + 4; // the randomly added amt of extra letters to make the options of letters sizeable enough
} else {letterAmt = answer.length + 3;}

const tileSpots = document.getElementById("spots");
const letterSpots = document.getElementById("letters");

for (let i = 0; i < letterAmt; i++) {
  const letters = document.createElement("DIV");
  letters.setAttribute("class", "letters");
  letterSpots.appendChild(letters);
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function newLetters() {
  autos = [];
  for (let i = 0; i < (letterAmt/2); i++) { // divided by two to allow for two rows of tiles
    autos.push("auto")
  }
  letterSpots.style.gridTemplateColumns = autos.toString().replaceAll(",", " "); // format for auto styling in CSS is without commas

  for (let i = 0; i < (letterAmt); i++) { // regular answer length amount so it's all on one line
    autos.push("auto")
  }
  tileSpots.style.gridTemplateColumns = autos.toString().replaceAll(",", " auto ");

  randLetters = [];
  let betaAlpha = alphabet.split("").sort(function(a, b) {return 0.5 - Math.random();}); // randomized alphabet
  for (let n = 0; n < (letterAmt - answer.length); n++) {
    randLetters.push(betaAlpha[n]);
  }

  for (let k = 0; k < answer.length; k++) {
    randLetters.push(answer[k]);
    let tempDiv = document.createElement("DIV");
    let tempP = document.createElement("P");
    tempDiv.appendChild(tempP);
    tileSpots.appendChild(tempDiv);
  }

  randLetters = randLetters.sort(function(a, b) {return 0.5 - Math.random();});

  for (let j = 0; j < letterAmt; j++) {
    const tempLetter = document.createTextNode(randLetters[j].toUpperCase());
    document.getElementsByClassName("letters")[j].appendChild(tempLetter);
    // console.log(j);
  }
} newLetters();

function gameStyling(color, opacity, typedLtr, flag) {
  for (let i = 0; i < letterSpots.children.length; i++) { // loop through each letter in letter board
    // checks for the letter typed and if there are more than one of the same letter used, highlight the letter not already used
    if ((letterSpots.children[i].innerText == typedLtr && letterSpots.children[i].style.opacity !== "0.5" && flag == 0.5)
    || (letterSpots.children[i].innerText == typedLtr && letterSpots.children[i].style.opacity !== "1" && flag == 1)) {
      // first half of if statement is used to change color of letter box if letter was entered
      // second half is used to change color of letter box if letter is removed
      letterSpots.children[i].style.backgroundColor = color;
      letterSpots.children[i].style.opacity = opacity;
      break;
    }
  }
}

theTypedOnes = [];
function keyboardEnterLtr(e) {
  if (e.type == "keydown") {
    let typed = e.key.toUpperCase();
    if (theTypedOnes.length < answer.length) { // limits theTypedOnes length to equal or less than answer's length
      if (randLetters.join().toUpperCase().includes(typed)) { // ensures that the typed letter is in letters on board
        theTypedOnes.push(typed);

        for (let lettersIn = 0; lettersIn < theTypedOnes.length; lettersIn++) {
          tileSpots.children[lettersIn].children[0].innerText = theTypedOnes[lettersIn];
        }
        gameStyling("darkgrey", "0.5", typed, 0.5);
      }
    }

    if (typed == "BACKSPACE" && theTypedOnes.length > 0) {
      ltrRemoved = theTypedOnes.pop(); // ltrRemoved is used to uncolor its spot on the board
      gameStyling("goldenrod", "1", ltrRemoved, 1);
      for (let lettersOut = 0; lettersOut < answer.length; lettersOut++) {
        if (theTypedOnes[lettersOut] == undefined) {
          tileSpots.children[lettersOut].children[0].innerText = "";
        } else {
          tileSpots.children[lettersOut].children[0].innerText = theTypedOnes[lettersOut];
        }
      }
    }
  }

  enteredAnswer = "";
  for (let y = 0; y < answer.length; y++) {
    enteredAnswer += tileSpots.children[y].children[0].innerText;
  }

  const scoreboard = document.getElementById("scoreboard");
  const result = document.getElementById("result");

  if (enteredAnswer == answer.toUpperCase()) {
    result.innerText = "Congratulations, you got it right!";
    scoreboard.style.backgroundColor = "mediumseagreen";
    scoreboard.style.display = "block";
    localStorage.setItem(("level" + level), "y"); // TODO: allow players know what levels they've done by styling tiles on home page
  } else if (enteredAnswer.length == answer.length && enteredAnswer != answer.toUpperCase()) {
    result.innerText = "Sorry, that's not right...";
    scoreboard.style.backgroundColor = "#ff3333";
    scoreboard.style.display = "block";
  }
}

window.addEventListener("keydown", keyboardEnterLtr); // keypress event doesn't detect backspace key code

document.getElementById("close").addEventListener("click", function() {
  scoreboard.style.display = "none";
})

document.getElementsByClassName("opts")[0].addEventListener("click", function() { // the "previous level" button
  if ((parseInt(level)-1) <= 0 ) {
    location.href = "wordpic.php?level=1";
  } else {
    location.href = "wordpic.php?level=" + (parseInt(level)-1);
  }
})

document.getElementsByClassName("opts")[1].addEventListener("click", function() { // "next level"
  if ((parseInt(level)+1) >= 100 ) {
    location.href = "wordpic.php?level=100";
  } else {
    location.href = "wordpic.php?level=" + (parseInt(level)+1);
  }
})
