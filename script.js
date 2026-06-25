const screens = document.querySelectorAll(".intro-text");
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const multiplierDisplay = document.getElementById("multiplierDisplay");
const playerTitle = document.getElementById("playerTitle");
const achievementToast = document.getElementById("achievementToast");
const saveText = document.getElementById("saveText");
const shopButton = document.getElementById("shopButton");
const shop = document.getElementById("shop");
const buyCursor = document.getElementById("buyCursor");
const buyClanker = document.getElementById("buyClanker");
const buyClankerJuice = document.getElementById("buyClankerJuice");
const foodButton = document.getElementById("foodButton");
const foodShop = document.getElementById("foodShop");
const energyDrinkUI = document.getElementById("energyDrinkUI");
const energyDrinkFill = document.getElementById("energyDrinkFill");
const buyEnergyDrink = document.getElementById("buyEnergyDrink");
const shopOverlay = document.getElementById("shopOverlay");
const max_clankers = 4;
let mouseX = 0;
let mouseY = 0;
let current = 0;
let clicks = 0;
let clickStreak = 0;
let currentTitle = "";
let lastComboText = "";
let achievements = [];
let cursorLevel = 0;
let maxCursorLevel = 10;
let bonusClicks = 0;
let cursorPrice = 50;
let critBonus = 0;
let clankers = 0;
let clankerPrice = 1000;
let clankerJuiceLevel = 0;
let clankerJuicePrice = 500;
let clankerActive = false;
let energyDrinkActive = false;
let energyDrinkTime = 0;
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
            positionClankers();
            document.querySelectorAll(".clanker").forEach(clanker=>{
                clanker.style.opacity = "1";
            });
            startClankerLoop();
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
}, 300);
const nemo = document.getElementById("nemo");
const clickCounter = document.getElementById("clickCounter");
const streakCounter = document.getElementById("streakCounter");
const comboTitle = document.getElementById("comboTitle");
const comboNumber = document.getElementById("comboNumber");
function spawnClanker(){
    const clanker = document.createElement("img");
    clanker.src = "assets/attachments (2)/sprite (27).png"
    clanker.className = "clanker";
    const index = document.querySelectorAll(".clanker").length;
    if(index >= 4){
        return;
    }
    document.body.appendChild(clanker);
    positionClankers();
}
function positionClankers(){
    const nemoRect = nemo.getBoundingClientRect();
    const centerX = nemoRect.left + nemoRect.width / 2;
    const centerY = nemoRect.top + nemoRect.height / 2;
    const positions = [{x:-200, y:-80, rotation:"-25", flip:true}, {x:200, y:-80, rotation:"-25", flip:false}, {x:-205, y:80, rotation:"25", flip:true}, {x:215, y:80, rotation:"25", flip:false}];
    document.querySelectorAll(".clanker").forEach((clanker,index)=>{
        const pos = positions[index];
        clanker.style.left = (centerX+pos.x) + "px";
        clanker.style.top = (centerY+pos.y) + "px";
        clanker.style.transform = 
            pos.flip
            ? `translate(-50%, -50%) scaleX(-1) rotate(${pos.rotation}deg)`
            : `translate(-50%, -50%) rotate(${pos.rotation}deg)`;
    });
}
function unlockAchievement(name){
    if(achievements.includes(name)){
        return;
    }
    achievements.push(name);
    showAchievement(name);
}
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
function updateTitle(){
    if(clicks >= 40){
        playerTitle.textContent = "Nemo's Favourite Earthian";
        unlockAchievement("Nemo's Favourite Earthian");
    }
    else if(clicks >= 30){
        playerTitle.textContent = "Addicted to Clicking";
        unlockAchievement("Addicted to Clicking");
    }
    else if(clicks >= 20){
        playerTitle.textContent = "Loves Clicking";
        unlockAchievement("Loves Clicking");
    }
    else if(clicks >= 10){
        playerTitle.textContent =  "Click Click Click!";
        unlockAchievement("Click Click Click!");
    }
    else if(clicks >= 5){
        playerTitle.textContent =  "Clicking Gud for Health"
        unlockAchievement("Clicking Gud for Health");
    }
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
function showAchievement(text){
    achievementToast.textContent = "🏆 " + text;
    achievementToast.style.right = "20px";
    setTimeout(()=>{
        achievementToast.style.right = "-500px";
    }, 3000);
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
    let clickValue = multiplier + bonusClicks;
    let isCrit = false;
    let critChance = 0.05;
    let critMultiplier = 10;
    if(energyDrinkActive){
        critChance += 0.10;
        critMultiplier += 15;
    }
    if(Math.random()<critChance){
        clickValue *= critMultiplier;
        isCrit = true;
    }
    clicks += clickValue;
    multiplierDisplay.textContent = "x" + multiplier + " Multiplier";
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
        multiplierDisplay.textContent = "x1 Multiplier";
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
    saveGame();
    updateTitle();
    updateNemoSprite();
    createPopup(clickValue, isCrit);
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
    for(let i=0; i<5; i++){
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
function clankerAttack(){
    const nemoRect = nemo.getBoundingClientRect();
    const nemoX = nemoRect.left + nemoRect.width / 2;
    const nemoY = nemoRect.top + nemoRect.height / 2;
    document.querySelectorAll(".clanker").forEach((clanker)=>{
        const clankerRect = clanker.getBoundingClientRect();
        const clankerX = clankerRect.left + clankerRect.width / 2;
        const clankerY = clankerRect.top + clankerRect.height / 2;
        let dx = nemoX - clankerX;
        let dy = nemoY - clankerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        dx = (dx / distance) * 40;
        dy = (dy / distance) * 40;
        if(clanker.style.transform.includes("scaleX(-1)")){
            dx *= -1;
        }
        clanker.animate(
            [
                {
                    transform: clanker.style.transform
                },
                {
                    transform: clanker.style.transform + ` translate(${dx}px, ${dy}px)`
                },
                {
                    transform: clanker.style.transform
                }
            ],
            {
                duration: Math.max(30, 150 - (clankerJuiceLevel * 10)),
                easing: "ease-out"
            }
        );
    });
}
function getClankerSpeed(){
    return Math.max(200, 4000 - (clankerJuiceLevel * 300));
}
function startClankerLoop(){
    clearTimeout(window.clankerTimer);
    function attack(){
        if(clankerActive && clankers > 0){
            clicks += clankers;
            for(let i=0;i<clankers;i++){
                createRobotPopup(1);
            }
            createSparkBurst();
            updateCounter();
            clankerAttack();
            saveGame();
        }
        window.clankerTimer = setTimeout(attack, getClankerSpeed());
    }
    attack();
}
function createPopup(value, isCrit){
    const popup = document.createElement("div");
    if(isCrit){
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
    }, 800);
}
function createRobotPopup(value){
    const popup = document.createElement("div");
    popup.textContent = "+" + value;
    popup.className = "popup";
    popup.style.color = "#66ccff"
    popup.style.textShadow = "2px 2px 0px #004466";
    const rect = nemo.getBoundingClientRect();
    popup.style.left = (rect.left + rect.width/2 + (Math.random()-0.5)*80) + "px";
    popup.style.top = (rect.top + rect.height/2 + (Math.random()-0.5)*40) + "px";
    document.body.appendChild(popup);
    setTimeout(()=>{
        popup.remove();
    }, 800);
}
function createSpendPopup(amount){
    const popup = document.createElement("div");
    popup.textContent = "-" + amount;
    popup.className = "spendPopup";
    const counter = clickCounter.getBoundingClientRect();
    popup.style.left = counter.left + "px";
    popup.style.top = counter.top + "px";
    document.body.appendChild(popup);
    setTimeout(()=>{
        popup.remove();
    }, 1000);
}
function updateShop(){
    if(cursorLevel >= maxCursorLevel){
        buyCursor.textContent = `Tiny Cursor (${cursorLevel}/${maxCursorLevel}) - MAX`;
    }
    else{
        buyCursor.textContent = `Tiny Cursor (${cursorLevel}/${maxCursorLevel}) - ${cursorPrice}`;
    }
    if(clankers >= max_clankers){
        buyClanker.textContent = `Clanker (${clankers}/4) - MAX`;
    }
    else{
        buyClanker.textContent = `Clanker (${clankers}/4) - ${clankerPrice}`;
    }
    buyClankerJuice.textContent = `Clanker Juice Lv.${clankerJuiceLevel} - ${clankerJuicePrice}`;
    if(clankers <= 0){
        buyClankerJuice.disabled = true;
        buyClankerJuice.style.opacity = "0.4";
    }
    else{
        buyClankerJuice.disabled = false;
        buyClankerJuice.style.opacity = "1";
    }
}
function updateCursorFollowers(){
    document.querySelectorAll(".cursorFollower").forEach(f => f.remove());
    for(let i=0;i<cursorLevel;i++){
        const follower = document.createElement("img");
        follower.src = "assets/attachments (1)/Telegram.png";
        follower.className = "cursorFollower";
        document.body.appendChild(follower);
    }
}
function animateFollowers(){
    const followers = document.querySelectorAll(".cursorFollower");
    followers.forEach((follower,index)=>{
        const angle = Date.now()/500 + (index * Math.PI*2 / followers.length);
        const radius = 50;
        follower.style.left = (mouseX + Math.cos(angle)*radius) + "px";
        follower.style.top = (mouseY + Math.sin(angle)*radius) + "px";
    });
    requestAnimationFrame(animateFollowers);
}
function saveGame(){
    const saveData = {
        clicks: clicks,
        achievements: achievements,
        cursorLevel: cursorLevel,
        bonusClicks: bonusClicks,
        cursorPrice: cursorPrice,
        clankers: clankers,
        clankerPrice: clankerPrice,
        clankerJuiceLevel: clankerJuiceLevel,
        clankerJuicePrice: clankerJuicePrice
    };
    localStorage.setItem(
        "nemoSave",
        JSON.stringify(saveData)
    );
    saveText.style.opacity = "1";
    setTimeout(()=>{
        saveText.style.opacity = "0";
    }, 500);
}
function loadGame(){
    const saveData = JSON.parse(
        localStorage.getItem("nemoSave")
    );
    if(!saveData){
        return;
    }
    clicks = saveData.clicks || 0;
    achievements = saveData.achievements || [];
    cursorLevel = saveData.cursorLevel || 0;
    bonusClicks = saveData.bonusClicks || 0;
    cursorPrice = saveData.cursorPrice || 50;
    clankers = saveData.clankers || 0;
    document.querySelectorAll(".clanker").forEach(c => c.remove());
    for(let i = 0; i < clankers; i++){
        spawnClanker();
    }
    positionClankers();
    clankerPrice = saveData.clankerPrice || 1000;
    clankerJuiceLevel = saveData.clankerJuiceLevel || 0;
    if(clankerJuiceLevel > 0){
        clankerActive = true;
    }
    clankerJuicePrice = saveData.clankerJuicePrice || 500;
    updateCounter();
    updateTitle();
    updateNemoSprite();
    updateShop();
}
shopButton.addEventListener("click", ()=>{
    shop.style.display = "block";
    shopOverlay.style.display = "block";
});
shopOverlay.addEventListener("click", ()=>{
    shop.style.display = "none";
    foodShop.style.display = "none";
    shopOverlay.style.display = "none";
});
foodButton.addEventListener("click", ()=>{
    foodShop.style.display = "block";
    shopOverlay.style.display = "block";
});
buyCursor.addEventListener("click", ()=>{
    if(clicks < cursorPrice){
        return;
    }
    if(cursorLevel >= maxCursorLevel){
        return;
    }
    clicks -= cursorPrice;
    createSpendPopup(cursorPrice);
    cursorLevel++;
    bonusClicks++;
    updateCursorFollowers();    
    cursorPrice = Math.floor(cursorPrice * 1.5);
    updateCounter();
    updateShop();
    saveGame();
});
document.addEventListener("mousemove",(e)=>{
    mouseX = e.clientX
    mouseY = e.clientY;
})
buyClanker.addEventListener("click", ()=>{
    if(clicks <clankerPrice){
        return;
    }
    if(clankers >= max_clankers){
        return;
    }
    clicks -= clankerPrice;
    createSpendPopup(clankerPrice);
    clankers++;
    spawnClanker();
    positionClankers();
    clankerPrice = Math.floor(clankerPrice * 1.8);
    updateCounter();
    updateShop();
    saveGame();
});
buyClankerJuice.addEventListener("click", ()=>{
    if(clicks < clankerJuicePrice){
        return;
    }
    clicks -= clankerJuicePrice;
    createSpendPopup(clankerJuicePrice);
    clankerJuiceLevel++;
    clankerActive = true;
    startClankerLoop();
    clankerJuicePrice = Math.floor(clankerJuicePrice * 2);
    updateCounter();
    updateShop();
    saveGame();
});
buyEnergyDrink.addEventListener("click", ()=>{
    if(energyDrinkActive){
        return;
    }
    if(clicks < 250){
        return;
    }
    clicks -= 250;
    createSpendPopup(250);
    energyDrinkActive = true;
    energyDrinkTime = 60;
    energyDrinkUI.style.display = "block";
    updateCounter();
    saveGame();
});
setInterval(()=>{
    if(!energyDrinkActive){
        return;
    }
    energyDrinkTime--;
    energyDrinkFill.style.transform = `scaleY(${energyDrinkTime / 60})`;
    if(energyDrinkTime <= 0){
        energyDrinkActive = false;
        energyDrinkUI.style.display = "none";
    }
}, 1000);
loadGame();
updateCursorFollowers();

animateFollowers();

window.addEventListener("resize", positionClankers);

window.resetSave = function(){
    localStorage.removeItem("nemoSave");
    location.reload();
}