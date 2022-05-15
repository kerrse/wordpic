for (let i = 1; i < 101; i++) {
  const div = document.createElement("DIV");
  const div2 = document.createElement("DIV");
  div.setAttribute("class", "grid-items");
  div2.setAttribute("class", "items");
  const text = i;
  div2.innerText = text;
  div.appendChild(div2);
  document.getElementById("grid").appendChild(div);
}

const tiles = document.getElementsByClassName("grid-items");
for (let i = 0; i < tiles.length; i++) {
  if (parseInt(tiles[i].innerText) <= 10) {
    tiles[i].style.backgroundImage = "linear-gradient(-220deg, purple, purple, purple, black)";
  } else if (parseInt(tiles[i].innerText) <= 20) {
      tiles[i].style.backgroundImage = "linear-gradient(-220deg, green, green, green, black)";
  } else if (parseInt(tiles[i].innerText) <= 30) {
      tiles[i].style.backgroundImage = "linear-gradient(-220deg, goldenrod, goldenrod, goldenrod, black)";
  } else if (parseInt(tiles[i].innerText) <= 40) {
      tiles[i].style.backgroundImage = "linear-gradient(-220deg, darkred, darkred, darkred, black)";
  } else if (parseInt(tiles[i].innerText) <= 50) {
      tiles[i].style.backgroundImage = "linear-gradient(-220deg, blue, blue, blue, black)";
  } else if (parseInt(tiles[i].innerText) <= 60) {
      tiles[i].style.backgroundImage = "linear-gradient(-220deg, orange, orange, orange, black)";
  } else if (parseInt(tiles[i].innerText) <= 70) {
      tiles[i].style.backgroundImage = "linear-gradient(-220deg, hotpink, hotpink, hotpink, black)";
  } else if (parseInt(tiles[i].innerText) <= 80) {
      tiles[i].style.backgroundImage = "linear-gradient(-220deg, brown, brown, brown, black)";
  } else if (parseInt(tiles[i].innerText) <= 90) {
    tiles[i].style.backgroundImage = "linear-gradient(-220deg, white, white, white, black)";
  } else if (parseInt(tiles[i].innerText) <= 100) {
    tiles[i].style.backgroundImage = "linear-gradient(-220deg, grey, black)";
  }
}

function enterLevel(e) {
  location.href = "wordpic.php?level=" + e.target.innerText;
}

for (let i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener("click", enterLevel);
}
