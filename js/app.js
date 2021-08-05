
//General
const grid = document.getElementById('grid'); //grid 
const emojis = ['🎃', '⚰', '👻', '🕸', '🧛🏻‍♀️', '🦇', '\uD83E\uDDDF\u200D\u2642\uFE0F'];
const infoButton = document.getElementById('info-btn'); //Button info
const resetButton = document.getElementById('reset-btn'); //Button reset
const gridContainer = document.getElementById('grid-container'); //Grid container
const scoreCombo = document.getElementById('score-combo');
const scoreNumber = document.getElementById('score-number')

//Timer
const timer = document.getElementById("timer");
let time;
let startTimer;
let dataRestart = [];


//Info
let optionWelcome = true;

// size
let size;
let divWidth = 0;
let adjust = 0;

// Generate item random
const getRandom = () =>
  emojis[(Math.random() * (emojis.length - 1)).toFixed(0)];

// points
let points = 0;
let combo = 1;

// Buttons Events 
infoButton.addEventListener('click', swallModalWelcom);
resetButton.addEventListener('click', swalResetGame);



// grid size
const adjustGrid = () => {
  if (window.matchMedia("(max-width: 575.98px)").matches) {
    adjust = 280;
  } else if (window.matchMedia("(max-width: 767.98px)").matches) {
    adjust = 290;
  } else {
    adjust = 440;
  }
  return adjust;
};

let gridWidth = adjustGrid();

const setGridWidh = () => (grid.style.width = `${gridWidth}px`);

const resizeGrid = () => (divWidth = gridWidth / level);


// generate grid
const generateGridArr = (level, array) => {
  for (let i = 0; i < level; i++) {
    gridArr[i] = [];
    for (let j = 0; j < level; j++) {
      gridArr[i][j] = getRandom(array);
    }
  }
};

const generateGridHTML = () => {
  grid.innerHTML = "";
  for (let i = 0; i < gridArr.length; i++) {
    for (let j = 0; j < gridArr[i].length; j++) {
      let box = getBox(j, i);
      grid.appendChild(box);
    }
  }
};


const getBox = (x, y) => {
  const box = document.createElement("div");
  box.classList.add("item");
  box.dataset.x = y;
  box.dataset.y = x;

  box.innerHTML = gridArr[y][x];
  box.addEventListener("click", selectBox);

  box.style.top = `${y * divWidth}px`;
  box.style.left = `${x * divWidth}px`;
  box.style.width = `${divWidth}px`;
  box.style.height = `${divWidth}px`;

  return box;
};


const generateGrid = (emojis) => {
  dataRestart = [];
  secondsToMinutes(time);
  setGridWidh();
  resizeGrid();
  generateGridArr(level, emojis);
  generateGridHTML();
  twemoji.parse(document.body);
  dataRestart.push(level, time);
  return dataRestart;
};


// swapping and matching

const swapBoxes = (elem1, elem2) => {
  const datax1 = Number(elem1.dataset.x);
  const datax2 = Number(elem2.dataset.x);
  const datay1 = Number(elem1.dataset.y);
  const datay2 = Number(elem2.dataset.y);

  // swap grid JS
  let variableTemporal = gridArr[datax1][datay1];
  gridArr[datax1][datay1] = gridArr[datax2][datay2];
  gridArr[datax2][datay2] = variableTemporal;

  // swap grid HTML
  if (datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 - 1)) {
    elem1.style.left = `${datay2 * divWidth}px`;
    elem2.style.left = `${datay1 * divWidth}px`;
    elem1.dataset.y = datay2;
    elem2.dataset.y = datay1;
  } else if (
    datay1 === datay2 &&
    (datax1 === datax2 + 1 || datax1 === datax2 - 1)
  ) {
    elem1.style.top = `${datax2 * divWidth}px`;
    elem2.style.top = `${datax1 * divWidth}px`;
    elem1.dataset.x = datax2;
    elem2.dataset.x = datax1;
  }
};


const isAdjacent = (elem1, elem2) => {
  const datax1 = Number(elem1.dataset.x);
  const datax2 = Number(elem2.dataset.x);
  const datay1 = Number(elem1.dataset.y);
  const datay2 = Number(elem2.dataset.y);

  if (
    (datax1 === datax2 && datay1 === datay2 + 1) ||
    (datax1 === datax2 && datay1 === datay2 - 1) ||
    (datay1 === datay2 && datax1 === datax2 + 1) ||
    (datay1 === datay2 && datax1 === datax2 - 1)
  ) {
    return true;
  } else {
    return false;
  }
};


const selectBox = (e) => {
  let clickedItem = document.querySelector(".select");

  if (clickedItem != null) {
    if (isAdjacent(clickedItem, e.path[1])) {
      swapBoxes(clickedItem, e.path[1]);

      if (theyMatch()) {
        searchMatches();
        clickedItem.classList.remove("select")
      } else {
        setTimeout(() => {
          swapBoxes(clickedItem, e.path[1]);
          clickedItem.classList.remove("select")
        }, 500);
      }
    } else {
      clickedItem.classList.remove("select");
      e.path[1].classList.remove("select");
    }
  } else {
    e.path[1].classList.add("select")

  };
};


const deleteMatches = () => {
  const matches = document.querySelectorAll(".is-match");

  for (let div of matches) {
    // JS
    const datax = Number(div.dataset.x);
    const datay = Number(div.dataset.y);
    gridArr[datax][datay] = null;

    // HTML
    div.innerHTML = "";
    div.classList.add("delete-item");
  }

  // reset class
  for (let div of matches) {
    div.classList.remove("is-match");
    div.classList.remove("select");
  }
};


const theyMatch = () => {
  for (let i = 0; i < gridArr.length; i++) {
    for (let j = 0; j < gridArr[i].length; j++) {
      if (
        gridArr[i][j] === gridArr[i][j + 1] &&
        gridArr[i][j + 1] === gridArr[i][j + 2]
      ) {
        return true;
      }
      if (
        gridArr[i + 1] &&
        gridArr[i + 2] &&
        gridArr[i][j] === gridArr[i + 1][j] &&
        gridArr[i + 1][j] === gridArr[i + 2][j]
      ) {
        return true;
      }
    }
  }
  return false;
};


const emptyBoxes = () => {
  const boxesHTMLGrid = document.querySelectorAll(".grid > div");

  for (let box of boxesHTMLGrid) {
    if (box.innerHTML === "") {
      return true;
    }
  }
};


const replaceEmojis = () => {
  const boxesHTMLGrid = document.querySelectorAll(".grid > div");

  if (emptyBoxes()) {
    for (let box of boxesHTMLGrid) {
      let dataX = Number(box.dataset.x);
      let dataY = Number(box.dataset.y);

      if (box.innerHTML === "") {
        gridArr[dataX][dataY] = getRandom(emojis);
        box.innerHTML = gridArr[dataX][dataY];
        box.classList.toggle("delete-item");
        twemoji.parse(document.body);
      }
    }
  }

  if (theyMatch()) {
    combo++;
    showCombo();
    searchMatches();
  } else {
    combo = 1;
    showCombo();
  }
};



const searchAndDeleteMatches = () => {
  const allDivs = document.querySelectorAll(".grid > div");

  // horizontal
  for (let i = 0; i < gridArr.length; i++) {
    for (let j = 0; j < gridArr[i].length; j++) {
      if (
        gridArr[i][j] === gridArr[i][j + 1] &&
        gridArr[i][j] === gridArr[i][j + 2]
      ) {
        for (let div of allDivs) {
          if (div.dataset.x === `${i}` && div.dataset.y === `${j}`) {
            div.classList.add("is-match");
          }
          if (div.dataset.x === `${i}` && div.dataset.y === `${j + 1}`) {
            div.classList.add("is-match");
          }
          if (div.dataset.x === `${i}` && div.dataset.y === `${j + 2}`) {
            div.classList.add("is-match");
          }
        }
      }
    }
  }

  // vertical
  for (let i = 0; i < gridArr.length; i++) {
    for (let j = 0; j < gridArr[i].length; j++) {
      if (
        gridArr[i + 1] &&
        gridArr[i + 2] &&
        gridArr[i][j] === gridArr[i + 1][j] &&
        gridArr[i + 2][j] === gridArr[i][j]
      ) {
        for (let div of allDivs) {
          if (div.dataset.x === `${i}` && div.dataset.y === `${j}`) {
            div.classList.add("is-match");
          }
          if (div.dataset.x === `${i + 1}` && div.dataset.y === `${j}`) {
            div.classList.add("is-match");
          }
          if (div.dataset.x === `${i + 2}` && div.dataset.y === `${j}`) {
            div.classList.add("is-match");
          }
        }
      }
    }
  }

  setTimeout(() => deleteMatches(), 300);
};


const searchMatches = () => {
  searchAndDeleteMatches();
  setTimeout(() => replaceEmojis(), 500);
  scorePoints();
  showScore();
};

const gridMatchesFree = (emojis) => {
  do {
    grid.innerHTML = "";
    gridArr = [];
    generateGrid(emojis);
  } while (theyMatch() === true);

  myTimer();
  points = 0;
  showScore();
};


// Score
const scorePoints = () => {
  const matches = document.querySelectorAll(".is-match");
  let score = 100 * matches.length;
  score = score * combo;
  return (points += score);
};

const showScore = () => (scoreNumber.innerHTML = points);

const showCombo = () => (scoreCombo.innerHTML = `${combo}`);





// Timer Function Minutes
const secondsToMinutes = (time) => {
  let seconds = time % 60;
  let minutes = ((time - seconds) / 60) % 60;
  let txtSeconds = seconds < 10 ? "0" + seconds : seconds;
  let txtMinutes = minutes < 10 ? "0" + minutes : minutes;
  return (timer.innerHTML = `${txtMinutes}:${txtSeconds}`);
};



//Timer Function
const myTimer = () => {
  startTimer = setInterval(() => {
    if (time > 0) {
      time--;
      secondsToMinutes(time);
    } else {
      swalGameOver();
    }
  }, 1000);
  return time;
};

function stopTimer() {
  clearInterval(startTimer);
}


const start = () => {
  adjustGrid();
  swallModalWelcom();
};

window.onload = start();
