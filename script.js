const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const buttons = document.querySelector(".buttons");
const finalMessage = document.getElementById("finalMessage");
const attemptCounter = document.getElementById("attemptCounter");
const countDisplay = document.getElementById("count");
const container = document.querySelector(".container");
const photoContainer = document.getElementById("photoContainer");
const timer = document.getElementById("timer");

let tries = 0;
const maxTries = 5;
let canClick = false;
let startTime = Date.now();
let timerInterval;

// Démarrer le chronomètre
timerInterval = setInterval(() => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timer.textContent = `⏱️ ${elapsed}s`;
}, 1000);

// Create floating hearts continuously
setInterval(() => {
  const heart = document.createElement('div');
  heart.className = 'heart-bg';
  heart.textContent = ['💖', '💕', '💘', '💝', '💗'][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 800);

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = '✨';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.position = 'fixed';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1000);
}

function createReactionEmoji(emoji, x, y) {
  const reaction = document.createElement('div');
  reaction.className = 'reaction-emoji';
  reaction.textContent = emoji;
  reaction.style.left = x + 'px';
  reaction.style.top = y + 'px';
  document.body.appendChild(reaction);
  setTimeout(() => reaction.remove(), 2000);
}

function vibrate() {
  // Vibration sur mobile
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
}

function moveYesButton() {
  if (tries >= maxTries) {
    // Remettre le bouton en position normale IMMÉDIATEMENT
    yesBtn.style.position = 'static';
    yesBtn.style.left = '';
    yesBtn.style.top = '';
    yesBtn.style.transform = '';
    yesBtn.textContent = "Clique ici ! 💕";
    canClick = true;
    return;
  }

  // Vibration
  vibrate();

  canClick = false;
  tries++;
  countDisplay.textContent = tries;
  attemptCounter.style.display = 'block';

  // Le bouton grossit à chaque tentative
  yesBtn.style.fontSize = (1.2 + tries * 0.1) + 'em';
  yesBtn.style.padding = (18 + tries * 2) + 'px ' + (35 + tries * 3) + 'px';

  // Add moving class to disable transitions
  yesBtn.classList.add('moving');

  const buttonRect = buttons.getBoundingClientRect();
  
  // Recalculer la taille du bouton APRÈS l'agrandissement
  setTimeout(() => {
    const yesBtnRect = yesBtn.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe boundaries (en tenant compte de la moitié de la largeur/hauteur du bouton)
    const halfWidth = yesBtnRect.width / 2;
    const halfHeight = yesBtnRect.height / 2;
    const maxX = buttonRect.width - halfWidth - 20;
    const maxY = buttonRect.height - halfHeight - 20;
    
    let x, y;
    let attempts = 0;
    const maxAttempts = 50;
    
    // Trouver une position qui ne chevauche PAS le bouton Non
    do {
      x = Math.random() * maxX + halfWidth;
      y = Math.random() * maxY + halfHeight;
      
      // Position absolue du nouveau placement (centré)
      const newLeft = buttonRect.left + x - halfWidth;
      const newTop = buttonRect.top + y - halfHeight;
      const newRight = newLeft + yesBtnRect.width;
      const newBottom = newTop + yesBtnRect.height;
      
      // Vérifier si ça chevauche le bouton Non (avec marge de sécurité de 30px)
      const overlapX = !(newRight + 30 < noBtnRect.left || newLeft - 30 > noBtnRect.right);
      const overlapY = !(newBottom + 30 < noBtnRect.top || newTop - 30 > noBtnRect.bottom);
      
      if (!overlapX || !overlapY) {
        // Pas de chevauchement, on peut utiliser cette position
        break;
      }
      
      attempts++;
    } while (attempts < maxAttempts);
    
    yesBtn.style.position = 'absolute';
    yesBtn.style.left = x + 'px';
    yesBtn.style.top = y + 'px';
    // Centrer le bouton sur les coordonnées x,y
    yesBtn.style.transform = 'translate(-50%, -50%)';

    // Create sparkle effect
    createSparkle(yesBtnRect.left + yesBtnRect.width/2, yesBtnRect.top + yesBtnRect.height/2);

    // Remove moving class after positioning
    setTimeout(() => {
      yesBtn.classList.remove('moving');
    }, 50);
  }, 10);

  // Messages taquins plus drôles
  const messages = [
    "Raté ! 😏",
    "Presque... NON 😂",
    "T'es pas douée hein ? 🙈",
    "Encore un effort ! 😜",
    "Dernière chance... 💕"
  ];

  if (tries <= maxTries) {
    const tempMsg = document.createElement('div');
    tempMsg.textContent = messages[tries - 1] || messages[4];
    tempMsg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 107, 157, 0.95);
      color: white;
      padding: 15px 30px;
      border-radius: 20px;
      font-size: 1.3em;
      font-weight: bold;
      z-index: 1000;
      animation: bounce 0.5s;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(tempMsg);
    setTimeout(() => tempMsg.remove(), 1000);
  }
}

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.background = ['#ff6b9d', '#c44569', '#ffc3a0', '#4facfe', '#00f2fe'][Math.floor(Math.random() * 5)];
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, i * 20);
  }
}

function showVictory() {
  clearInterval(timerInterval);
  
  const finalTime = Math.floor((Date.now() - startTime) / 1000);
  
  buttons.style.display = "none";
  attemptCounter.style.display = "none";
  
  // Message de victoire
  finalMessage.innerHTML = "💖 Ouii!!! A l'infini et au dela … Je t'aime fort 💖";
  finalMessage.style.display = "block";
  
  // Afficher la photo après 1 seconde
  setTimeout(() => {
    photoContainer.style.display = 'block';
  }, 1000);
  
  createConfetti();
  
  // Vibration de victoire
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100, 50, 200]);
  }
  
  // Multiple reaction emojis
  const emojis = ['😍', '🥰', '💕', '✨', '🎉', '💖', '🔥'];
  emojis.forEach((emoji, index) => {
    setTimeout(() => {
      createReactionEmoji(emoji, 
        window.innerWidth/2 + (Math.random() - 0.5) * 200,
        window.innerHeight/2 + (Math.random() - 0.5) * 200
      );
    }, index * 200);
  });
}

// Mobile touch handling - le bouton esquive dès qu'on le touche
yesBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (tries < maxTries) {
    moveYesButton();
  }
});

// Desktop hover handling
yesBtn.addEventListener("mouseover", (e) => {
  if (tries < maxTries) {
    moveYesButton();
  }
});

// Click handling - seulement après 5 tentatives
yesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (tries >= maxTries || canClick) {
    showVictory();
  }
});

noBtn.addEventListener("click", (e) => {
  clearInterval(timerInterval);
  
  const rect = e.target.getBoundingClientRect();
  createReactionEmoji('😱', rect.left + rect.width/2, rect.top);
  createReactionEmoji('💔', rect.left + rect.width/2 + 50, rect.top + 20);
  
  vibrate();
  
  buttons.style.display = "none";
  attemptCounter.style.display = "none";
  
  finalMessage.innerHTML = "💖 Je suis sur que c'était déjà oui dans ton cœur 💖";
  finalMessage.style.display = "block";
  
  // Afficher la photo quand même
  setTimeout(() => {
    photoContainer.style.display = 'block';
  }, 1000);
  
  createConfetti();
});

// Add tap sparkle effect on container
container.addEventListener('click', (e) => {
  if (e.target === container || e.target.className === 'bunny' || e.target.tagName === 'H1') {
    createSparkle(e.clientX, e.clientY);
  }
});

// Easter egg: triple tap sur le lapin
let bunnyTaps = 0;
let bunnyTapTimeout;
document.querySelector('.bunny').addEventListener('click', () => {
  bunnyTaps++;
  clearTimeout(bunnyTapTimeout);
  
  if (bunnyTaps >= 3) {
    createReactionEmoji('🐰', window.innerWidth/2, window.innerHeight/2);
    createReactionEmoji('💕', window.innerWidth/2 - 50, window.innerHeight/2 - 30);
    createReactionEmoji('💕', window.innerWidth/2 + 50, window.innerHeight/2 - 30);
    vibrate();
    bunnyTaps = 0;
  }
  
  bunnyTapTimeout = setTimeout(() => {
    bunnyTaps = 0;
  }, 1000);
});