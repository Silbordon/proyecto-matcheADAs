
//General
const grid = document.getElementById('grid'); //grid container
const emojis = ['🎃', '⚰', '👻', '🕸', '🧛🏻‍♀️', '🦇', '\uD83E\uDDDF\u200D\u2642\uFE0F'];
const infoButton = document.getElementById('info'); //Button info
const resetButton = document.getElementById('reset'); //Button reset

//Timer
const timer = document.getElementById("timer");
let time;
let restTime;


//Info
let optionWelcome = true;


//Create Grid
let level = 0;

const createGrid = () => {
  time = 30;
  timer.innerHTML = `00:${time}`
  grid.innerHTML = '';
  for (i = 0; i < level; i++) {
    for (j = 0; j < level; j++) {
      const caja = document.createElement('div');
      caja.innerHTML = emojis[(Math.random() * (emojis.length - 1)).toFixed(0)];
      caja.style.width = `${500 / level}px`;
      caja.style.height = `${500 / level}px`;
      caja.dataset.x = i;
      caja.dataset.y = j;
      console.log(i,j)
      grid.appendChild(caja);
      caja.addEventListener('click', () =>{
        caja.classList.add('select');
      })
    };
    twemoji.parse(document.body);
  };

  restTime = setInterval(myTimer, 1000);
  return level
};



// Show welcome modal
window.onload = swallModalWelcom();


// Buttons Events 
infoButton.addEventListener('click', swallModalWelcom);
resetButton.addEventListener('click', swalResetGame);


//Timer
const myTimer = () => {
  if (time <= 30 && time > 0) {
    time = time - 1
    let seconds = time % 60;
    let minutes = ((time - seconds) / 60) % 60;
    let txtSeconds = seconds < 10 ? '0' + seconds : seconds
    let txtMinutes = minutes < 10 ? '0' + minutes : minutes
    timer.innerHTML = `${txtMinutes}:${txtSeconds}`

  } else {
    swalGameOver();
  }
};


function stopTimer() {
  clearInterval(restTime);
}


//Items Select