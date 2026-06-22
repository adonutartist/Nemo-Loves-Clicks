const screens = document.querySelectorAll(".intro-text");
const intro = document.getElementById("intro");
const game = document.getElementById("game");
let current = 0;

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
                game.style.display = "block";
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
    document.body.appendChild(p);
    setTimeout(() => {
        p.remove();
    }, 3000);
}, 150);