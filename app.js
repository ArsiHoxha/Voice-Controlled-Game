//todo:LOJTARI LEVIZJE LARTE POSHTE✔
//todo:ARMIKU QE TE VIJ✔
//todo:TE SHKATERROHET NESE E PREK✔s
//todo:TE BEJME QE TE QENDRROJE LARTE ME ZE

const canvas = document.querySelector("canvas");
const h = document.querySelector("h1")
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

class LOJTARI {
    constructor(x, y, vx, vy) {
      this.vx = vx;
      this.vy = vy;
      this.x = x;
      this.y = y;
      this.width = 40;
      this.height = 40;
    }
    vizato() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
    }
    update() {
      this.vizato();
      this.x += this.vx;
      this.y += this.vy;
    }
  }
  
  class Pengese {
    constructor(x, y, vx, vy) {
      this.vx = vx;
      this.vy = vy;
      this.x = x;
      this.y = y;
      this.width = 20;
      this.height = 80;
    }
    vizatoP() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
    }
    updateP() {
      this.vizatoP();
      this.x += this.vx;
      this.y += this.vy;
    }
  }
  
  const lojtari = new LOJTARI(20, canvas.height-40, 0, 0);
  let score = 0
  
  let pengesat = [];
  function update() {

    requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lojtari.update();
    if (lojtari.y <= canvas.height - 200) {
      lojtari.vy = 6;
    } else if (lojtari.y == canvas.height - lojtari.height) {
      lojtari.vy = 0;
    }
  
    pengesat.forEach((element) => {
      element.updateP();
      
      console.log(pengesat.length)
      if (lojtari.x < element.x + element.width &&lojtari.x + lojtari.width > element.x &&lojtari.y < element.y + element.height &&lojtari.y + lojtari.height > element.y) {
        // collision detected!
        console.log("kapi");
        lojtari.x = 99999999999;
      }
    });

    
  }
  update();

  
  
    
  
  
// waiting for speech results
recognition.addEventListener('result', event => {
  const transcript = event.results[0][0].transcript;
  // check if the voice input has ended
  if(event.results[0].isFinal) {
    console.log(transcript);

   
    if(transcript.indexOf('up') == 0) {
      lojtari.vy = -6
      pengesat.push(new Pengese(canvas.width - lojtari.width + 10,canvas.height-lojtari.height,-4,0))
    }
  }
});




recognition.addEventListener('end', recognition.start);
recognition.start();








