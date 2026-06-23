const screens = document.querySelectorAll(".intro-text");
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const multiplierDisplay = document.getElementById("multiplierDisplay");
let current = 0;
let clicks = 0;
let clickStreak = 0;
let currentTitle = "";
let lastComboText = "";

function nextScreen(){
    if(current >= screens.length){
        return;
    }
    screens[current].classList.remove("active");
    current++;
    if(current >= screens.length){
        clearInterval(introInterval);
        intro.style.opacity = "0";
        setTimeout(()=>{
            intro.style.display = "none";
            if(game){
                game.style.display = "flex";
            }
        }, 1000);
        return;
    }
    screens[current].classList.add("active");
    if(current === screens.length - 1){
        const flash = document.getElementById("flash");
        flash.style.opacity = "1";
        setTimeout(() => {
            flash.style.opacity = "0";
        }, 150);
    }
}
const introInterval = setInterval(nextScreen, 2500);

setInterval(() => {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    document.getElementById("particles").appendChild(p);
    setTimeout(() => {
        p.remove();
    }, 3000);
}, 150);

const nemo = document.getElementById("nemo");
const clickCounter = document.getElementById("clickCounter");
const streakCounter = document.getElementById("streakCounter");
const comboTitle = document.getElementById("comboTitle");
const comboNumber = document.getElementById("comboNumber");
function updateNemoSprite(){
    if(clicks >= 40){
        nemo.src = "assets/attachments (2)/sprite (15).png";
    }
    else if(clicks >= 30){
        nemo.src = "assets/attachments (2)/sprite (24).png";
    }
    else if(clicks >= 20){
        nemo.src = "assets/attachments (2)/sprite (25).png";
    }
    else if(clicks >= 10){
        nemo.src = "assets/attachments (2)/sprite (16).png";
    }
    else if(clicks >= 5){
        nemo.src = "assets/attachments (2)/sprite (11).png";
    }
}
function updateCounter(){
    clickCounter.textContent = clicks + " Clicks";
}
function setWavyText(text){
    comboTitle.innerHTML = "";
    [...text].forEach((char, index)=>{
        const span = document.createElement("span");
        span.className = "waveLetter";
        span.textContent = char;
        span.style.animationDelay = (index * 0.08) + "s";
        comboTitle.appendChild(span);
    });
}
nemo.addEventListener("click", () => {
    let multiplier = 1;
    if(clickStreak >= 100){
        multiplier = 10;
    }
    else if(clickStreak >= 75){
        multiplier = 5;
    }
    else if(clickStreak >= 50){
        multiplier = 3;
    }
    else if(clickStreak >= 25){
        multiplier = 2;
    }
    let clickValue = multiplier;
    if(Math.random() < 0.05){
        clickValue *= 10;
    }
    clicks += clickValue;
    multiplierDisplay.textContent = "x" + multiplier + "Multiplier";
    clickStreak++;
    let title = "Combo";
    if(clickStreak >= 30){
        title = "MONSTER";
    }
    else if(clickStreak >= 20){
        title = "INSANE";
    }
    else if(clickStreak >= 10){
        title = "FAST";
    }
    const comboText = `🔥 ${title} x${clickStreak}`;
    comboNumber.textContent = "x" + clickStreak;
    if(title !== currentTitle){
        currentTitle = title;
        if(clickStreak >= 20){
            setWavyText("🔥 " + title);
        }
        else{
            comboTitle.textContent = "🔥 " + title;
        }
    }
    if(clickStreak >= 30){
        streakCounter.style.color = "#ff00ff";
    }
    else if(clickStreak >= 20){
        streakCounter.style.color = "#ff3333";
    }
    else if(clickStreak >= 10){
        streakCounter.style.color = "#ff9900";
    }
    else if(clickStreak >= 5){
        streakCounter.style.color = "#ffff00";
    }
    else{
        streakCounter.style.color = "white";
    }
    if(clickStreak > 50){
        streakCounter.style.transform = "scale(1.2)";
        setTimeout(() => {
            streakCounter.style.transform = "scale(1)";
        }, 100);
    }
    clearTimeout(window.streakTimer);
    window.streakTimer = setTimeout(() => {
        clickStreak = 0;
        comboTitle.textContent = "🔥 Combo";
        comboNumber.textContent = "x0";
        currentTitle = "";
        streakCounter.style.color = "white";
    }, 1000);
    if(clickStreak >= 60){
        for(let i=0; i<4; i++){
            createOra();
        }
    }
    else if(clickStreak >= 40){
        for(let i=0; i<2; i++){
            createOra();
        }
    }
    else if(clickStreak >= 30){
        createOra();
    }
    updateCounter();
    updateNemoSprite();
    createPopup(clickValue);
    juiceClick();
    screenShake();
    createSparkBurst();
});
function createOra(){
    const ora = document.createElement("img");
    ora.src = "assets/attachments (4)/ora.png";
    ora.className = "ora";
    const rect = nemo.getBoundingClientRect();
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 120;
    ora.style.left = rect.left + rect.width/2 + Math.cos(angle)*distance + "px"; 
    ora.style.top = rect.top + rect.height/2 + Math.sin(angle)*distance + "px";
    document.body.appendChild(ora);
    nemo.style.transform = "scale(1.15) rotate(-8deg)";
    setTimeout(()=>{
        nemo.style.transform = "scale(1) rotate(0deg)";
    }, 50);
    setTimeout(()=>{
        ora.remove();
    }, 600);
}
function createSparkBurst(){
    const rect = nemo.getBoundingClientRect();
    for(let i=0; i<10; i++){
        const spark = document.createElement("div");
        spark.className = "spark";
        const angle = Math.random() * Math.PI * 2;
        const radius = 80 + Math.random() * 40;
        const startX = rect.left + rect.width / 2 + Math.cos(angle) * radius;
        const startY = rect.top + rect.height / 2 + Math.sin(angle) * radius;
        spark.style.left = startX + "px";
        spark.style.top = startY + "px";
        spark.style.setProperty("--x", (Math.random()-0.5)*80 + "px");
        spark.style.setProperty("--y",(Math.random()-0.5)*80 + "px");
        document.body.appendChild(spark);
        setTimeout(()=>{spark.remove();}, 500);
    }
}
function screenShake(){
    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 120);
}
function juiceClick(){
    const rotation = (Math.random() - 0.5) * 10;
    nemo.style.transform = `scale(0.9) rotate(${rotation}deg)`;
    setTimeout(() => {
        nemo.style.transform = "scale(1) rotate(0deg)";
    }, 80);
}
function createPopup(value){
    const popup = document.createElement("div");
    if(value > 1){
        popup.textContent = "CRIT! +" + value;
        popup.style.fontSize = "3rem";
        popup.style.color = "red";
    }
    else{
        popup.textContent = "+" + value;
    }
    popup.style.scale = 0.8 + Math.random()*0.6;
    popup.className = "popup";
    const rect = nemo.getBoundingClientRect();
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 60;
    const randomRotation = (Math.random() - 0.5) * 30;
    popup.style.left = (rect.left + rect.width * (0.3 + Math.random()*0.4)) + "px";
    popup.style.top = (rect.top + rect.height * (0.2 + Math.random()*0.3)) + "px";
    popup.style.rotate = randomRotation + "deg";
    popup.style.fontSize = (1.6 + Math.random()*0.8) + "rem";
    document.body.appendChild(popup);

    setTimeout(()=>{
        popup.remove();
    }, 1800);
}