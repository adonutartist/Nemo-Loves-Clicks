const screens = document.querySelectorAll(".intro-text");
const intro = document.getElementById("intro");
const game = document.getElementById("game");
let current = 0;
let clicks = 0;

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
function updateCounter(){
    clickCounter.textContent = clicks + " Clicks";
}
nemo.addEventListener("click", () => {
    clicks++;
    updateCounter();
    createPopup();
});
function createPopup(){
    const popup = document.createElement("div");
    popup.textContent = "+" + 1;
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