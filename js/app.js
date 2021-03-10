
//General
const grid = document.getElementById('grid'); //grid container
const emojis = ['🎃', '⚰', '👻', '🕸', '🧛🏻‍♀️', '🦇', '\uD83E\uDDDF\u200D\u2642\uFE0F'];
const infoButton = document.getElementById('info'); //Button info
const resetButton = document.getElementById('reset'); //Button reset
let gridArr = [];



//Timer
const timer = document.getElementById("timer");
let time;
let restTime;


//Info
let optionWelcome = true;



// Generate item random
const getRandom = () =>
  emojis[(Math.random() * (emojis.length - 1)).toFixed(0)];



// Generate DIV-EMOJI-BOX
const getBox = (x,y) => {
  const box = document.createElement("div");
  box.dataset.x = x;
  box.dataset.y = y;
  box.innerHTML = gridArr[i][j];
  box.style.width = `${500 / level}px`;
  box.style.height = `${500 / level}px`;
  grid.appendChild(box);
  box.addEventListener("click", selectBox);
};


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
  restTime = setInterval(() => {
    if (time <= 30 && time > 0) {
      time = time - 1
      secondsToMinutes(time);
    } else {
      swalGameOver();
    }
  }
    , 1000);
};

function stopTimer() {
  clearInterval(restTime);
}



//Create Grid
let level = 0;

const createGrid = () => {
  time = 30;
  gridArr = [];
  timer.innerHTML = `00:${time}`
  grid.innerHTML = '';
  for (i = 0; i < level; i++) {
    gridArr[i] = [];
    for (j = 0; j < level; j++) {
      gridArr[i][j] = getRandom();
      getBox(i,j);
    };
    twemoji.parse(document.body);
  };

  myTimer();
  return level
};



// Show welcome modal
window.onload = swallModalWelcom();


// Buttons Events 
infoButton.addEventListener('click', swallModalWelcom);
resetButton.addEventListener('click', swalResetGame);


//Items Select

const selectBox = e => {
  let clickedItem = document.querySelector('.select')
  // console.log(e.path[1])
  if (clickedItem) {
    console.log(isAdjancent(clickedItem, e.path[1]))

  } else {
    e.path[1].classList.add('select')
  }
}

const isAdjancent = (box1, box2) => {
  const datax1 = Number(box1.dataset.x);
  const datax2 = Number(box2.dataset.x);
  const datay1 = Number(box1.dataset.y);
  const datay2 = Number(box2.dataset.y);
  console.log(box1.dataset.x)
  console.log(box1.dataset.y)


  if (
    (datax1 === datax2 && datay1 === datay2 + 1) || //abajo
      (datax1 === datax2 && datay1 === datay2 - 1) || //arriba
      (datax1 === datax2 + 1 && datay1 === datay2) || //derecha
      (datax1 === datax2 - 1 && datay1 === datay2) //izquierda
  ) {
    return true
  }
  return false
};






