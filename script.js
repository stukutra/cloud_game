const gameContainer = document.getElementById("game-container");
const santa = document.getElementById("santa");
const scoreDisplay = document.getElementById("score");

let playerX = window.innerWidth * 0.2; // Posizione orizzontale del player
let playerY = window.innerHeight * 0.5; // Posizione verticale del player
let score = 0;

const enemies = [];
const snowballs = [];
const playerSpeed = 12;
const keysPressed = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

let useMouse = true; // Flag per passare tra mouse e tastiera

let lastMouseX = playerX;
let lastMouseY = playerY;


// Seleziona il contenitore delle decorazioni
const groundDecorations = document.getElementById('ground-decorations');


// Array di messaggi casuali
const programmerMessages = [
  "Compilatore in pausa caffè... Torna tra poco!",
  "Stai programmando mentre giochi? Impressionante.",
  "La RAM sta piangendo, ma almeno ti diverti!",
  "Bug rilevato: stai vincendo troppo!",
  "Stai usando troppo CPU. Meno entusiasmo, per favore!",
  "Sto salvando il tuo punteggio direttamente sul desktop… scherzo!",
  "Chi è il vero Babbo Natale? Forse un programmatore!",
  "Errore 500: Troppo divertimento in corso.",
  "Clicca qui per continuare... ah no, non c’è nulla da cliccare.",
  "Stai battendo il record mondiale? Lo sto segnalando ora!",
  "C’è un Easter Egg qui. O forse no.",
  "La tua tastiera sembra felice. Sta cantando!",
  "Sto comprimendo il divertimento in un file ZIP.",
  "Stai cercando di rompere il gioco? Bravo!",
  "Non preoccuparti, non ho venduto i tuoi dati… ancora.",
  "Hai appena sbloccato la modalità programmatore invisibile!",
  "Le tue palle di neve sono open-source?",
  "La gravità è stata sospesa… Perché no?",
  "Questo messaggio si autodistruggerà in 3… 2… 1…",
  "Hai trovato il bug segreto? Ops, l’ho appena corretto.",
  "Attenzione: Babbo Natale sta debuggando il gioco.",
  "Sei troppo bravo per essere vero. Vuoi rallentare?",
  "Aggiornamento: il tuo punteggio sta per diventare NFT!",
  "La neve è in realtà codice binario.",
  "Sto implementando la funzione 'Distrazione massima'...",
  "Attenzione: La modalità cheat è stata attivata. No, sto scherzando.",
  "Ogni volta che colpisci un nemico, un bug si corregge.",
  "Non sei stanco? Nemmeno il compilatore lo è.",
  "Sta girando tutto? Probabilmente un loop infinito.",
  "Hai provato a spegnere e riaccendere Babbo Natale?",
  "Errore 404: Successo non trovato. Riprovare!",
  "So che stai giocando. Non ti fatturo questo tempo, sappilo!!!!!"
];

// Seleziona il contenitore dei messaggi
const messageContainer = document.getElementById("message-container");


document.addEventListener("mousemove", (e) => {
  if (useMouse) {
    const currentMouseX = e.clientX;
    const currentMouseY = e.clientY;

    // Calcola la direzione del movimento
    const deltaX = currentMouseX - lastMouseX;
    const deltaY = currentMouseY - lastMouseY;

    // Aggiorna la posizione di Babbo Natale
    playerX = currentMouseX - santa.offsetWidth / 2; // Centra il personaggio
    playerY = currentMouseY - santa.offsetHeight / 2;

    santa.style.left = `${playerX}px`;
    santa.style.top = `${playerY}px`;

    // Effetto movimento
    if (deltaY < 0) {
      santa.classList.add("up");
      santa.classList.remove("down");
    } else if (deltaY > 0) {
      santa.classList.add("down");
      santa.classList.remove("up");
    } else {
      santa.classList.remove("up", "down");
    }

    // Aggiorna l'ultima posizione del mouse
    lastMouseX = currentMouseX;
    lastMouseY = currentMouseY;
  }
});


document.addEventListener("touchmove", (e) => {
  useMouse = false; // Evita conflitti con il mouse
  const touch = e.touches[0]; // Ottieni il primo punto di contatto

  // Aggiorna la posizione del giocatore
  playerX = touch.clientX - santa.offsetWidth / 2; // Centra il personaggio
  playerY = touch.clientY - santa.offsetHeight / 2;

  santa.style.left = `${playerX}px`;
  santa.style.top = `${playerY}px`;

  // Effetto inclinazione per il movimento
  if (e.movementY < 0) {
    santa.classList.add("up");
    santa.classList.remove("down");
  } else if (e.movementY > 0) {
    santa.classList.add("down");
    santa.classList.remove("up");
  } else {
    santa.classList.remove("up", "down");
  }
});


document.addEventListener("touchstart", (e) => {
  shootSnowball(); // Spara una palla di neve
});

// Movimento con la tastiera
document.addEventListener("keydown", (e) => {
  if (e.key in keysPressed) keysPressed[e.key] = true;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    useMouse = false; // Passa al controllo da tastiera
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key in keysPressed) keysPressed[e.key] = false;
});


// Sparo con il click del mouse
document.addEventListener("mousedown", () => {
  shootSnowball();
});

// Sparo con la barra spaziatrice
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    shootSnowball();
  }
});


// Aggiornare la posizione del giocatore con la tastiera
function updatePlayerPosition() {
  if (!useMouse) {
    if (keysPressed.ArrowUp) playerY = Math.max(0, playerY - playerSpeed);
    if (keysPressed.ArrowDown) playerY = Math.min(window.innerHeight - santa.offsetHeight, playerY + playerSpeed);
    if (keysPressed.ArrowLeft) playerX = Math.max(0, playerX - playerSpeed);
    if (keysPressed.ArrowRight) playerX = Math.min(window.innerWidth - santa.offsetWidth, playerX + playerSpeed);

    santa.style.left = `${playerX}px`;
    santa.style.top = `${playerY}px`;
  }
}

// Funzione per mostrare un messaggio casuale
function showRandomMessage() {
  messageContainer.innerHTML = ""; // Rimuovi eventuali messaggi precedenti

  // Crea il messaggio
  const message = document.createElement("div");
  message.className = "random-message";
  message.textContent = programmerMessages[Math.floor(Math.random() * programmerMessages.length)];

  // Aggiungi il messaggio al contenitore
  messageContainer.appendChild(message);

  // Rimuovi il messaggio dopo 3 secondi
  setTimeout(() => {
    messageContainer.innerHTML = ""; // Pulisce il contenitore
  }, 3000);
}

// Mostra un messaggio ogni 5-10 secondi
setInterval(showRandomMessage, Math.random() * 5000 + 5000);


// Funzione per aggiungere alberi e rocce
function addGroundDecoration() {
  const decoration = document.createElement('div');
  decoration.className = Math.random() > 0.5 ? 'tree decoration' : 'rock decoration'; // Albero o roccia
  decoration.style.left = `${Math.random() * 200}vw`; // Posizione casuale sul terreno
  groundDecorations.appendChild(decoration);

  // Rimuovi la decorazione dopo un ciclo
  setTimeout(() => {
    decoration.remove();
  }, 15000);
}

// Genera decorazioni a intervalli regolari
setInterval(addGroundDecoration, 2000);

// Seleziona il contenitore della neve
const snowContainer = document.getElementById('snow-container');

// Funzione per generare un fiocco di neve
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.textContent = '❄'; // Simbolo del fiocco di neve
  snowflake.style.left = `${Math.random() * 100}vw`; // Posizione casuale orizzontale
  snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Durata della caduta
  snowflake.style.fontSize = `${Math.random() * 10 + 10}px`; // Dimensione casuale
  snowflake.style.setProperty('--direction', Math.random() - 0.5); // Movimento laterale casuale

  // Aggiungi il fiocco di neve al contenitore
  snowContainer.appendChild(snowflake);

  // Rimuovi il fiocco di neve dopo l'animazione
  setTimeout(() => {
    snowflake.remove();
  }, 5000);
}

// Genera nuovi fiocchi di neve a intervalli regolari
setInterval(createSnowflake, 200);



// Eventi per il movimento del player e sparo
document.addEventListener("keydown", (e) => {
  if (e.key in keysPressed) keysPressed[e.key] = true;
  if (e.key === "ArrowUp") santa.classList.add("up"); // Inclinazione verso l'alto
  if (e.key === "ArrowDown") santa.classList.add("down"); // Inclinazione verso il basso
  if (e.key === " ") shootSnowball(); // Spara palla di neve
});

document.addEventListener("keyup", (e) => {
  if (e.key in keysPressed) keysPressed[e.key] = false;
  if (e.key === "ArrowUp") santa.classList.remove("up"); // Rimuove inclinazione verso l'alto
  if (e.key === "ArrowDown") santa.classList.remove("down"); // Rimuove inclinazione verso il basso
});

// Movimento del player
function updatePlayerPosition() {
  if (keysPressed.ArrowUp) playerY = Math.max(0, playerY - playerSpeed);
  if (keysPressed.ArrowDown) playerY = Math.min(window.innerHeight - santa.offsetHeight, playerY + playerSpeed);
  if (keysPressed.ArrowLeft) playerX = Math.max(0, playerX - playerSpeed);
  if (keysPressed.ArrowRight) playerX = Math.min(window.innerWidth - santa.offsetWidth, playerX + playerSpeed);

  santa.style.left = `${playerX}px`;
  santa.style.top = `${playerY}px`;
}

// Sparare una palla di neve
function shootSnowball() {
  const snowball = document.createElement("div");
  snowball.className = "snowball";
  snowball.style.left = `${playerX + 100}px`;
  snowball.style.top = `${playerY + 20}px`;
  gameContainer.appendChild(snowball);
  snowballs.push({ element: snowball, x: playerX + 100, y: playerY + 20 });
}

// Generare nemici (palle di Natale con dimensioni diverse)
function spawnEnemy() {
  const enemyType = Math.ceil(Math.random() * 3); // Determina il tipo: 1 (piccola), 2 (media), 3 (grande)
  const enemy = document.createElement("div");
  enemy.className = `enemy-cloud ${enemyType === 1 ? 'small' : enemyType === 2 ? 'medium' : 'large'}`;
  enemy.dataset.hp = enemyType; // Imposta i punti vita in base al tipo
  enemy.style.left = `${window.innerWidth}px`;
  enemy.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
  gameContainer.appendChild(enemy);
  enemies.push({ element: enemy, x: window.innerWidth, y: parseFloat(enemy.style.top), hp: enemyType });
}

// Aggiornare nemici
function updateEnemies() {
  enemies.forEach((enemy, index) => {
    enemy.x -= 3; // Movimento verso sinistra
    enemy.element.style.left = `${enemy.x}px`;

    if (enemy.x < -100) {
      gameContainer.removeChild(enemy.element);
      enemies.splice(index, 1);
    }
  });
}

// Gestione del colpo al nemico
function hitEnemy(enemy) {
  const currentHp = parseInt(enemy.dataset.hp); // Legge la vita attuale
  if (currentHp > 1) {
    enemy.dataset.hp = currentHp - 1; // Riduce i punti vita
    enemy.classList.add("damaged"); // Indica il danno
    setTimeout(() => enemy.classList.remove("damaged"), 200);
  } else {
    destroyEnemy(enemy);
  }
}

// Distruzione del nemico con animazione
function destroyEnemy(enemy) {
  const points = parseInt(enemy.dataset.hp); // Punti in base al tipo
  score += points; // Aggiunge punti (1x, 2x, 3x)
  scoreDisplay.textContent = `Score: ${score}`;
  enemy.classList.add("exploding"); // Animazione di esplosione
  setTimeout(() => {
    gameContainer.removeChild(enemy);
    enemies.splice(enemies.findIndex((e) => e.element === enemy), 1);
  }, 500);
}

// Controllare collisioni
function checkCollisions() {
  snowballs.forEach((snowball, snowIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        snowball.x > enemy.x &&
        snowball.x < enemy.x + enemy.element.offsetWidth &&
        snowball.y > enemy.y &&
        snowball.y < enemy.y + enemy.element.offsetHeight
      ) {
        hitEnemy(enemy.element);
        gameContainer.removeChild(snowball.element);
        snowballs.splice(snowIndex, 1);
      }
    });
  });
}

// Aggiornare le palle di neve
function updateSnowballs() {
  snowballs.forEach((snowball, index) => {
    snowball.x += 10; // Movimento verso destra
    snowball.element.style.left = `${snowball.x}px`;

    if (snowball.x > window.innerWidth) {
      gameContainer.removeChild(snowball.element);
      snowballs.splice(index, 1);
    }
  });
}

function endGame() {
  // Rimuovi tutti gli elementi del gioco
  gameContainer.innerHTML = "";

  // Crea il messaggio di Natale
  const festiveMessage = document.createElement("div");
  festiveMessage.className = "festive-message";
  festiveMessage.innerHTML = `
      <h1>🎄 Buon Natale 2024 dalla oneBlade! 🎁</h1>
      <p>Grazie per aver giocato e buon divertimento!</p>
  `;

  // Aggiungi il messaggio al contenitore del gioco
  gameContainer.appendChild(festiveMessage);

  // Mantieni il messaggio per almeno 4 secondi, poi mostra i credits
  setTimeout(() => {
      festiveMessage.remove(); // Rimuove il messaggio di Natale
      showCredits(); // Mostra i credits
  }, 4000);
}

function showCredits() {
  // Contenitore per i credits
  const creditsContainer = document.createElement("div");
  creditsContainer.id = "credits-container";
  creditsContainer.innerHTML = `
      <div class="credits">
          <h2>Credits 🎮</h2>
          <p>Un gioco fatto male da:</p>
          <p>Guido, il programmatore di Babbo Natale</p>
          <p>Tester:</p>
          <ul>
              <li>Mario, il ninja della tastiera</li>
              <li>Anna, distruttrice di bug (e cuori)</li>
              <li>Luca, il procrastinatore professionista</li>
              <li>Giulia, maestra dei commenti inutili</li>
              <li>Federico, il cliccatore di mouse seriale</li>
              <li>Sara, il debugger umano</li>
              <li>Andrea, che ha premuto F5 una volta di troppo</li>
              <li>Elena, che ha scoperto un bug anche nel menu del ristorante</li>
              <li>Tommaso, che ha scritto \`TODO\` in 100 righe di codice</li>
              <li>Claudia, esperta in “Non so come ho fatto ma funziona”</li>
              <li>E molti altri… ma non c'era spazio nei credits.</li>
          </ul>
      </div>
      <button id="replay-button">Vuoi rigiocare?</button>
  `;

  // Aggiungi il contenitore dei credits al gioco
  gameContainer.appendChild(creditsContainer);

  // Aggiungi lo scroll verticale ai credits
  const credits = document.querySelector(".credits");
  credits.style.animation = "scrollCredits 20s linear infinite";

  // Aggiungi evento al pulsante "Vuoi rigiocare?"
  const replayButton = document.getElementById("replay-button");
  replayButton.addEventListener("click", () => {
      location.reload(); // Ricarica la pagina per rigiocare
  });
}


function destroyEnemy(enemy) {
  const points = parseInt(enemy.dataset.hp); // Punti in base al tipo
  score += points; // Aggiunge punti (1x, 2x, 3x)
  scoreDisplay.textContent = `Score: ${score}`;
  enemy.classList.add("exploding"); // Animazione di esplosione
  setTimeout(() => {
      gameContainer.removeChild(enemy);
      enemies.splice(enemies.findIndex((e) => e.element === enemy), 1);
  }, 500);

  // Controlla se il punteggio è 50 e mostra i credits
  if (score >= 50) {
      endGame();
  }
}

function showCredits() {
  // Rimuovi il messaggio di Natale
  const festiveMessage = document.querySelector(".festive-message");
  if (festiveMessage) festiveMessage.remove();

  // Contenitore per i credits
  const creditsContainer = document.createElement("div");
  creditsContainer.id = "credits-container";
  creditsContainer.innerHTML = `
      <div class="credits">
          <h2>Credits 🎮</h2>
          <p>Un gioco fatto male da:</p>
          <p>Guido, il programmatore di Babbo Natale</p>
          <p>Tester:</p>
          <ul>
              <li>Mario, il ninja della tastiera</li>
              <li>Anna, distruttrice di bug (e cuori)</li>
              <li>Luca, il procrastinatore professionista</li>
              <li>Giulia, maestra dei commenti inutili</li>
              <li>Federico, il cliccatore di mouse seriale</li>
              <li>Sara, il debugger umano</li>
              <li>Andrea, che ha premuto F5 una volta di troppo</li>
              <li>Elena, che ha scoperto un bug anche nel menu del ristorante</li>
              <li>Tommaso, che ha scritto TODO in 100 righe di codice</li>
              <li>Claudia, esperta in “Non so come ho fatto ma funziona”</li>
              <li>E molti altri… ma non c'era spazio nei credits.</li>
          </ul>
      </div>
      <button id="replay-button">Vuoi rigiocare?</button>
  `;

  // Aggiungi il contenitore dei credits
  gameContainer.appendChild(creditsContainer);

  // Abilita lo scroll verticale dei credits
  const credits = document.querySelector(".credits");
  credits.style.animation = "scrollCredits 20s linear infinite";

  // Aggiungi evento al pulsante "Vuoi rigiocare?"
  const replayButton = document.getElementById("replay-button");
  replayButton.addEventListener("click", () => {
      location.reload(); // Ricarica la pagina per rigiocare
  });
}


// Aggiorna il contenuto di #score per mostrare il punteggio e l'obiettivo
function updateScoreDisplay() {
  scoreDisplay.textContent = `Score: ${score} / 50`; // Mostra il punteggio attuale e l'obiettivo
}

function destroyEnemy(enemy) {
  const points = parseInt(enemy.dataset.hp); // Punti in base al tipo
  score += points; // Aggiunge punti (1x, 2x, 3x)
  updateScoreDisplay(); // Aggiorna la visualizzazione del punteggio
  enemy.classList.add("exploding"); // Animazione di esplosione
  setTimeout(() => {
      gameContainer.removeChild(enemy);
      enemies.splice(enemies.findIndex((e) => e.element === enemy), 1);
  }, 500);

  // Controlla se il punteggio è 50 e mostra i credits
  if (score >= 50) {
      endGame();
  }
}

// Chiamata iniziale per impostare il punteggio iniziale
updateScoreDisplay();



// Aggiornare il gioco
function updateGame() {
  updatePlayerPosition();
  updateEnemies();
  updateSnowballs();
  checkCollisions();
  requestAnimationFrame(updateGame);
}

// Avviare il gioco
setInterval(spawnEnemy, 2000);
updateGame();
