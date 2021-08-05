
//Function level-Game
const levelGame = () => {
    optionWelcome = false;

    swal({
        title: "Nuevo Juego",
        text: `Selecciona una dificultad`,
        buttons: {
            facil: {
                text: "Facil",
                value: "facil"
            },
            medio: {
                text: "Medio",
                value: "medio"
            },
            dificil: {
                text: "dificil",
                value: "dificil"
            },
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
    })
        .then((value) => {
            switch (value) {
                case "facil":
                    level = 9;
                    time=90
                    break;
                case "medio":
                    level = 8;
                    time=60
                    break;

                case "dificil":
                    level = 7;
                    time=30
                    break;
                default:
            }
            gridMatchesFree(emojis);
        });
};



//Modal Welcome
const swallModalWelcom = () => {
    stopTimer();
    swal({
        title: "¡Bienvenida!",
        text: `En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo,
          ya sea en fila o columna. Para eso, selecciona un ítem y a
          continuación un ítem adyacente para intercambiarlos de lugar.
  
          Si se forma un grupo, esos ítems se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo!
  
          CONTROLES
          Click izquierdo: selección
          Enter o Espacio: selección
          Flechas o WASD: movimiento e intercambio`,
        button: "A Jugar",
        closeOnClickOutside: false,
        closeOnEsc: false,

    })
    .then(()=>{
        if(optionWelcome){
          levelGame();
        }else if(!optionWelcome){
            myTimer();
        };
      });
};


//Modal Reset Game and choose new level
const swalResetGame = () => {
    stopTimer();
    swal({
        title: "Reiniciar juego?",
        text: `Perderás todo tu puntaje acumulado`,
        buttons: {
            cancel: "Cancelar",
            confirm: "Nuevo Juego",
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
    })
        .then((value) => {
            switch (value) {
                case null:
                    myTimer()
                    break;
                case true:
                    levelGame();
                    break;
            }
        });
};


// Modal Game Over y points

const swalGameOver = () => {
    swal({
        title: "¡Juego Terminado!",
        text: `Puntaje Final: ${points}`,
        buttons: {
            newGame: {
                text: "Nuevo Juego",
                value: "nuevoJuego"
            },
            reset: {
                text: "Reiniciar",
                value: "reiniciar"
            },
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
    })
        .then((value) => {
            switch (value) {
                case "nuevoJuego":
                    levelGame();
                    break;
                case "reiniciar":
                    time = dataRestart[1];
                    gridMatchesFree(emojis);
                    break;
                default:
            };
        });
    stopTimer();
};




