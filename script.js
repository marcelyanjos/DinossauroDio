const dino = document.querySelector(".dino");
const background = document.querySelector('.background');
const gameOver = document.querySelector('#gameover');

let isJumping= false;
let position = 0;
let isGameOver = false;
let playerScore = 0;
gameOver.style.display ='none';
let scoreCounter = () =>{
  playerScore++;
  score.innerHTML = `Score <b>${playerScore}</br>`;
}
interval = setInterval(scoreCounter, 200);

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus(){
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

 if (isGameOver) return;

  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(()=>{
       if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
      
      
    } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // game-over
      clearInterval(interval, leftInterval)
     
      isGameOver = true;
      document.removeEventListener('keyup',handleKeyUp)
       background.style.animation = 'none';
       gameOver.style.display = "block"
    }else{
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  },20);

setTimeout(createCactus, randomTime);
}



createCactus();
document.addEventListener("keyup", handleKeyUp);
