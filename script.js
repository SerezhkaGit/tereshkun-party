
const birthdayDate = new Date("2025-11-26T00:00:00").getTime(); 

const countdownEl = document.getElementById('countdown-timer');
const congratsButton = document.getElementById('congrats-button');
const greetingContentEl = document.getElementById('greeting-content');


const audioStart = document.getElementById('song-start'); 
const audioParty = document.getElementById('song-party'); 

let musicStarted = false; 


function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

   
    if (distance <= 240000 && distance > 0 && !musicStarted) {
        musicStarted = true;
        
        audioStart.volume = 1.0; 
        audioStart.play().catch(error => {
            console.log("Винник заблокований браузером. Потрібен клік по сторінці.");
        });
    }

   
    if (distance <= 0) {
        clearInterval(timerInterval);
        countdownEl.style.display = 'none';
        congratsButton.style.display = 'block'; 
        return;
    }

    
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const h = hours < 10 ? "0" + hours : hours;
    const m = minutes < 10 ? "0" + minutes : minutes;
    const s = seconds < 10 ? "0" + seconds : seconds;

    countdownEl.innerHTML = `${h}:${m}:${s}`;
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();


function createConfettiPiece() {
    const confettiContainer = document.body;
    const colors = ['#FFC700', '#FF00A4', '#00A3FF', '#4BFF00', '#FFFFFF', '#FF4757']; 
    
   
    for (let i = 0; i < 5; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti');
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = `${Math.random() * 100}vw`; 
        piece.style.top = `-10px`; 
        
        const size = `${Math.random() * 12 + 6}px`;
        piece.style.width = size; piece.style.height = size;
        
        const duration = Math.random() * 3 + 2; 
        piece.style.animationDuration = `${duration}s`;
        
        confettiContainer.appendChild(piece);
        setTimeout(() => piece.remove(), duration * 1000); 
    }
}


congratsButton.addEventListener('click', () => {
  
    congratsButton.style.display = 'none';
    greetingContentEl.style.display = 'block'; 

   
    audioStart.pause();         
    audioStart.currentTime = 0; 
    
    audioParty.volume = 1.0;
    audioParty.loop = true;     
    audioParty.play();          

    setInterval(createConfettiPiece, 100);

});



