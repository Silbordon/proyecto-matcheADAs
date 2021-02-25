
//General
const grid = document.getElementById('grid'); //grid container
const emojis = ['🎃','⚰','👻','🕸','🧛🏻‍♀️','🦇','\uD83E\uDDDF\u200D\u2642\uFE0F']; 
const infoButton = document.getElementById('info'); //Button info
const resetButton = document.getElementById('reset'); //Button reset


//Create Grid
let nuevoArr = [''];
let level = 0;

const createGrid = ()=>{
  nuevoArr = [''];
  grid.innerHTML = '';
  for(i=0; i < level; i++ ){
    for(j=0; j < level; j++){
      nuevoArr.push(emojis[(Math.random() * (emojis.length -1)).toFixed(0)]);
    }; 
  };
  
  for(i=1; i < nuevoArr.length; i++){
    const caja = document.createElement('div');
    caja.style.width = `${500/level}px`;
    caja.style.height = `${500/level}px`;
    caja.innerHTML = nuevoArr[i];
    grid.appendChild(caja)
    twemoji.parse(document.body);
  };
  
};  


  
//   Show welcome modal
  window.onload = swallModalWelcom();


  // Buttons Events 
  infoButton.addEventListener('click', swallModalWelcom);
  resetButton.addEventListener('click', swalResetGame);

 

