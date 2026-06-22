const screens = document.querySelectorAll(".introText");
const intro = document.getElementById("intro");
const game = document.getElementById("game");
let current = 0;
screens[0].classList.add("glow");
function nextScreen(){
    screens[current].classList.remove("active");
    current++;
    if(current >= screens.length){
        intro.style.opacity = "0";
        setTimeout(()=>{
            intro.remove();
            game.style.display = "block";
        }, 1000);
        return;
    }
    screens[current].classList.add("active");
    screens[current].classList.add("glow");
}
setInterval(nextScreen, 2500);