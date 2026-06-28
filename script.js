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
const qteTitle = document.getElementById("qteTitle");
const buyClankerJuice = document.getElementById("buyClankerJuice");
const foodButton = document.getElementById("foodButton");
const collectionButton = document.getElementById("collectionButton");
const collectionWindow = document.getElementById("collectionWindow");
const nemojiPage = document.getElementById("nemojiPage");
const achievementPage = document.getElementById("achievementPage");
const nemojiTab = document.getElementById("nemojiTab");
const achievementTab = document.getElementById("achievementTab");
const foodShop = document.getElementById("foodShop");
const energyDrinkUI = document.getElementById("energyDrinkUI");
const energyDrinkFill = document.getElementById("energyDrinkFill");
const buyEnergyDrink = document.getElementById("buyEnergyDrink");
const shopOverlay = document.getElementById("shopOverlay");
const audioButton = document.getElementById("audioButton");
const audioWindow = document.getElementById("audioWindow");
const toggleCrit = document.getElementById("toggleCrit");
const toggleOra = document.getElementById("toggleOra");
const toggleClanker = document.getElementById("toggleClanker");
const toggleAchievement = document.getElementById("toggleAchievement");
const toggleCard = document.getElementById("toggleCard");
const musicSlider = document.getElementById("musicSlider");
const hpFill = document.getElementById("hpFill");
const hpText = document.getElementById("hpText");
const bossOverlay = document.getElementById("bossOverlay");
const bossBody = document.getElementById("bossBody");
const bossMidBody = document.getElementById("bossMidBody");
const bossFace = document.getElementById("bossFace");
const bossDamagedBody = document.getElementById("bossDamagedBody");
const bossHPFill = document.getElementById("bossHPFill");
const bossHPText = document.getElementById("bossHPText");
const sansDialogue = document.getElementById("sansDialogue");
const bossHPContainer = document.getElementById("bossHPContainer");
const qteWindow = document.getElementById("qteWindow");
const qteKeys = document.getElementById("qteKeys");
const sansFacesPhase1 = [
    "assets/phase 1 faces/tile000.png",
    "assets/phase 1 faces/tile001.png",
    "assets/phase 1 faces/tile003.png",
    "assets/phase 1 faces/tile004.png",
    "assets/phase 1 faces/tile005.png",
    "assets/phase 1 faces/tile006.png",
    "assets/phase 1 faces/tile007.png"
];
const sansFacesPhase2 = [
    "assets/phase 2 faces/tile000.png",
    "assets/phase 2 faces/tile001.png",
    "assets/phase 2 faces/tile002.png",
    "assets/phase 2 faces/tile003.png",
    "assets/phase 2 faces/tile004.png",
    "assets/phase 2 faces/tile005.png",
    "assets/phase 2 faces/tile006.png",
    "assets/phase 2 faces/tile007.png"
];
const swingFrames = [
    "assets/attachments (3)/down.png",
    "assets/attachments (3)/left.png",
    "assets/attachments (3)/up.png",
    "assets/attachments (3)/right.png",
];
const bgMusic = new Audio("assets/attachments (5)/Bgmusic.wav");
bgMusic.loop = true;
bgMusic.volume = 0.05;
const shopMusic = new Audio("assets/attachments (5)/shopbg.wav");
shopMusic.loop = true;
shopMusic.volume = 0.5;
const achievementSFX = new Audio("assets/attachments (5)/Achievement.wav");
achievementSFX.volume = 0.9;
const critSFX = new Audio("assets/attachments (5)/Crit.mp3");
critSFX.volume = 1;
const clankerSFX = new Audio("assets/attachments (5)/Clankerpoke.mp3");
clankerSFX.volume = 0.8;
const unlockSFX = new Audio("assets/attachments (5)/Newnemoji.wav");
unlockSFX.volume = 0.9;
const oraSFX = new Audio("assets/attachments (5)/oraora.mp3");
oraSFX.volume = 0.8;
const bossMusic = new Audio("assets/attachments (5)/Boss.mp3");
bossMusic.loop = true;
bossMusic.volume = .45;
const max_clankers = 4;
const breakables = [
    multiplierDisplay,
    playerTitle,
    shopButton,
    foodButton,
    collectionButton,
    audioButton,
    bossHPContainer
];
const nemojis = [
    {
        name: "Happy Nemo",
        sprite: "assets/attachments (2)/sprite.png",
        src: "assets/attachments (2)/sprite.png",
        unlock: 0,
        rarity: "Common",
        requirement: 0
    },
    {
        name: "Awkward Nemo",
        sprite: "assets/attachments (2)/sprite (11).png",
        src: "assets/attachments (2)/sprite (11).png",
        unlock: 5,
        rarity: "Common",
        requirement: 5
    },
    {
        name: "Nervous Nemo",
        sprite: "assets/attachments (2)/sprite (16).png",
        src: "assets/attachments (2)/sprite (16).png",
        unlock: 10,
        rarity: "Rare",
        requirement: 10
    },
    {
        name: "Too Happy Nemo",
        sprite: "assets/attachments (2)/sprite (25).png",
        src: "assets/attachments (2)/sprite (25).png",
        unlock: 20,
        rarity: "Epic",
        requirement: 20
    },
    {
        name: "Krazy Happy Nemo",
        sprite: "assets/attachments (2)/sprite (24).png",
        src: "assets/attachments (2)/sprite (24).png",
        unlock: 30,
        rarity: "Legendary",
        requirement: 30
    },
    {
        name: "You are wasting your time on Nemo",
        sprite: "assets/attachments (2)/sprite (15).png",
        src: "assets/attachments (2)/sprite (15).png",
        unlock: 40,
        rarity: "Mythic",
        requirement: "40"
    }
];
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
let unlockedNemojis = [0];
let selectedNemoji = 0;
let newCollectionUnlock = false;
let equippedNemoji = null;
let lastUnlockedNemoji = equippedNemoji;
let critSFXEnabled = true;
let oraSFXEnabled = true;
let clankerSFXEnabled = true;
let achievementSFXEnabled = true;
let cardSFXEnabled = true;
let currentNemoji = 0;
let maxHP = 100;
let hp = maxHP;
let bossFight = false;
let bossPhase = 1;
let bossHP = 500;
let bossMaxHP = 500;
let bossClicks = 0;
let sansUnlocked = false;
let breakTimer;
let qteActive = false;
let qteSequence = [];
let qteIndex = 0;
let qteTimer;
let qteTime = 5;
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
    if(game.style.display !== "none"){
        clanker.style.opacity = "1";
    }
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
function updateMusic(){
    const shopOpen = shop.style.display === "block" ||
                     foodShop.style.display === "block" ||
                     collectionWindow.style.display === "block";
    if (shopOpen){
        if(!shopMusic.paused) return;
        bgMusic.pause();
        shopMusic.currentTime = 0;
        shopMusic.play();
    }
    else{
        if(!bgMusic.paused) return;
        shopMusic.pause();
        shopMusic.currentTime = 0;
        bgMusic.play();
    }
}
function unlockAchievement(name){
    if(achievements.includes(name)){
        return;
    }
    achievements.push(name);
    showAchievement(name);
    updateAchievementPage();
}
function updateHP(){
    hpFill.style.width = (hp/maxHP*100)+"%";
    hpText.textContent = hp+" / "+maxHP;
    if(hp>60){
        hpFill.style.background = "#55ff55"
    }
    else if(hp>30){
        hpFill.style.background = "#ffd83d"
    }
    else{
        hpFill.style.background = "#ff4545";
    }
}
function updateBossHP(){
    bossHPFill.style.width = (bossHP/bossMaxHP*100)+"%";
    bossHPText.textContent = bossHP+" / "+bossMaxHP;
}
function startSansBattle(){
    document.querySelector("#game h1").style.display="none";
    document.getElementById("hpContainer").style.display="none";
    nemo.style.visibility="hidden";
    bossFight =true;
    bossPhase = 1;
    bossHP = 500;
    bossMaxHP = 500;
    bossClicks = 0;
    updateBossHP();
    bossOverlay.style.display = "flex";
    bossBody.src="assets/attachments (3)/phase1.png"
    bossFace.src=sansFacesPhase1[0];
    bgMusic.pause();
    shopMusic.pause();
    bossMusic.currentTime = 0;
    bossMusic.play();
    createUnlockCard({
        name: "SPECIAL ENCOUNTER",
        rarity: "BOSS",
        src: "assets/attachments (3)/phase1.png"
    });
}
function updateSansFace(){
    const percent = bossHP / bossMaxHP;
    let index = 0;
    if(percent<0.9) index=1;
    if(percent<0.8) index=2;
    if(percent<0.7) index=3;
    if(percent<0.6) index=4;
    if(percent<0.45) index=5;
    if(percent<0.25) index=6;
    if(bossPhase==1){
        bossFace.src=sansFacesPhase1[index];
    }else{
        bossFace.src=sansFacesPhase2[index];
    }
}
function bossPhase2(){
    bossPhase=2;
    bossHP=250;
    bossMaxHP=250;
    updateBossHP();
    bossHPContainer.style.display="none";
    bossMusic.play();
    sansDialogue.style.display = "block";
    bossMidBody.src = "assets/attachments (3)/up.png";
    bossFace.src = "assets/phase 2 faces/tile007.png";
    setTimeout(() => {
        sansDialogue.style.display="none";
        bossMidBody.style.display="none";
        startPhase2();
    }, 5000);
}
function startPhase2(){
    bossFight=true;
    bossHP=250;
    bossMaxHP=250;
    bossClicks=0;
}
function finishBoss(){
    bossFight=false;
    restoreUI();
    bossMusic.pause();
    bossMusic.currentTime=0;
    bossOverlay.style.display="none";
    nemo.style.display="block";
    nemo.src = equippedNemoji;
    updateHP();
    updateCounter();
    updateNemojiPage();
    saveGame();
    bgMusic.currentTime = 0;
    bgMusic.play();
}
function startQTE(){
    if(qteActive) return;
    clearInterval(qteTimer);
    let remaining = qteTime;
    qteTitle.textContent = "FINISH HIM ("+remaining+")";
    qteTimer = setInterval(()=>{
        remaining--;
        qteTitle.textContent = "FINISH HIM ("+remaining+")";
        if(remaining<=0){
            clearInterval(qteTimer);
            failQTE();
        }
    },1000);
    qteActive=true;
    qteWindow.style.display = "block";
    const keys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "A",
        "S",
        "D",
        "F"
    ];
    qteSequence=[];
    qteIndex=0;
    for(let i=0;i<6;i++){
        qteSequence.push(
            keys[Math.floor(Math.random()*keys.length)]
        );
    }
    
    drawQTE();
}
function failQTE(){
    qteActive = false;
    qteWindow.style.display="none";
    bossHP=100;
    bossMaxHP=100;
    updateBossHP();
    bossHPContainer.style.display="block";
    bossFight="true";
    qteSequence=[];
    qteIndex=0;
}
function drawQTE(){
    qteKeys.innerHTML = "";
    qteSequence.forEach((key,index)=>{
        const div = document.createElement("div");
        const icons = {
            ArrowUp: "⬆️",
            ArrowDown: "⬇️",
            ArrowLeft: "⬅️",
            ArrowRight: "➡️"
        };
        div.textContent = icons[key] || key;
        if(index < qteIndex){
            div.style.opacity = ".25"
        }
        qteKeys.appendChild(div);
    });
}
function breakRandomUI(){
    const alive = breakables.filter(x=>!x.classList.contains("broken"));
    if(alive.length==0)return;
    const ui=alive[Math.floor(Math.random()*alive.length)];
    ui.classList.add("broken");
}
function restoreUI(){
    breakables.forEach(x=>{
        x.classList.remove("broken");
    });
}
function sansSwing(){
    let i=0;
    const anim=setInterval(()=>{
        bossBody.src=swingFrames[i];
        i++;
        if(i>=swingFrames.length){
            clearInterval(anim);
        }
    },70);
}
function finishQTE(){
    qteActive = false;
    qteWindow.style.display = "none";
    bossDamagedBody.style.display="block";
    bossDamagedBody.src = "assets/attachments (3)/damaged.png";
    bossFace.src = sansFacesPhase2[4];
    setTimeout(() => {
        finishBoss();
    }, 5000);
}
function evolveNemoji(){
    if(currentNemoji>=nemojis.length-1){
        startSansBattle();
        return;
    }
    currentNemoji++;
    unlockedNemojis.push(currentNemoji);
    equippedNemoji = nemojis[currentNemoji].sprite;
    nemo.src = equippedNemoji;
    createUnlockCard(nemojis[currentNemoji]);
    newCollectionUnlock = true;
    updateChestGlow();
    updateNemojiPage();
    hp=maxHP;
    saveGame();
    updateHP();
}
function updateNemoSprite(){
    nemo.src=equippedNemoji||nemojis[0].sprite;
}
function checkNemojis(){
    
} 
function updateCounter(){
    clickCounter.textContent = clicks + " Clicks";
}
function updateTitle(){
    if(clicks >= 650){
        playerTitle.textContent = "Nemo's Favourite Earthian";
        unlockAchievement("Nemo's Favourite Earthian");
    }
    else if(clicks >= 500){
        playerTitle.textContent = "Addicted to Clicking";
        unlockAchievement("Addicted to Clicking");
    }
    else if(clicks >= 350){
        playerTitle.textContent = "Loves Clicking";
        unlockAchievement("Loves Clicking");
    }
    else if(clicks >= 200){
        playerTitle.textContent =  "Click Click Click!";
        unlockAchievement("Click Click Click!");
    }
    else if(clicks >= 50){
        playerTitle.textContent =  "Clicking Gud for Health"
        unlockAchievement("Clicking Gud for Health");
    }
}
function setWavyText(text){
    comboTitle.innerHTML = `<img class="comboIcon" src="assets/attachments (1)/Tinder.png">`;
    [...text].forEach((char, index)=>{
        const span = document.createElement("span");
        span.className = "waveLetter";
        span.textContent = char;
        span.style.animationDelay = (index * 0.08) + "s";
        comboTitle.appendChild(span);
    });
} 
function showAchievement(text){
    if(achievementSFXEnabled){
        achievementSFX.currentTime = 0;
        achievementSFX.play();
    }
    achievementToast.textContent = "🏆 " + text;
    achievementToast.style.right = "20px";
    setTimeout(()=>{
        achievementToast.style.right = "-500px";
    }, 3000);
}
bossBody.addEventListener("click",()=>{
    nemo.click();
    updateBossHP();
    updateSansFace();
    if(bossHP<=0 && !qteActive){
        bossHP = 0;
        updateBossHP();
        startQTE();
        return;
    }
});
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
    
    if(!bossFight){
        hp--;
        updateHP();
        if(hp<=0){
            evolveNemoji();
        }
    }
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
    const comboText = `${title} x${clickStreak}`;
    comboNumber.textContent = "x" + clickStreak;
    if(title !== currentTitle){
        currentTitle = title;
        if(clickStreak >= 20){
            setWavyText(title);
        }
        else{
            comboTitle.innerHTML = `<img class="comboIcon" src="assets/attachments (1)/Tinder.png"> ${title}`;
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
        if(bossPhase==2){
            breakRandomUI();
        }
        comboTitle.innerHTML = `<img class="comboIcon" src="assets/attachments (1)/Tinder.png"> Combo`;
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
    
    updateNemojiPage();
    createPopup(clickValue, isCrit);
    if(bossFight){
        bossHP-=clickValue;
        bossClicks+=clickValue;
        if(bossHP<0){
            bossHP=0;
        }
        updateBossHP();
        createPopup(clickValue,isCrit);
        juiceClick();
        screenShake();
        createSparkBurst();
        updateSansFace();
        if(bossHP==0){
            if(bossPhase==1){
                bossPhase2();
            }else if(bossPhase==2){
                startQTE();
            }
            return;
        }
    }
    if(qteActive){
        return;
    }
    juiceClick();
    screenShake();
    createSparkBurst();
});
function updateChestGlow(){
    if(newCollectionUnlock){
        collectionButton.classList.add("newUnlock");
    }
    else{
        collectionButton.classList.remove("newUnlock");
    }
}
function createUnlockCard(emoji){
    if(cardSFXEnabled){
        unlockSFX.currentTime = 0;
        unlockSFX.play();
    }
    const card = document.createElement("div");
    card.className = "unlockCard";
    card.innerHTML = `
        <div class="unlockTitle">NEW NEMOJI!</div>
        <img  class="unlockImage" src="${emoji.src}">
        <div class="unlockName">${emoji.name}</div>
        <div class="unlockRarity rarity-${emoji.rarity.toLowerCase()}">
            ${emoji.rarity}
        </div>`;
    document.body.appendChild(card);
    requestAnimationFrame(()=>{
        card.classList.add("show");
    });
    setTimeout(()=>{
        card.classList.remove("show");
        setTimeout(()=>{
            card.remove();
        }, 600);
    }, 3000);
}
function createOra(){
    const ora = document.createElement("img");
    ora.src = "assets/attachments (4)/ora.png";
    if(oraSFXEnabled){
        oraSFX.currentTime = 0;
        oraSFX.play();
    }
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
    const targetRect = bossFight
        ? bossBody.getBoundingClientRect()
        : nemo.getBoundingClientRect();
    const nemoX = targetRect.left + targetRect.width / 2;
    const nemoY = targetRect.top + targetRect.height / 2;
    if(clankerSFXEnabled){
        clankerSFX.currentTime = 0;
        clankerSFX.play();
    }
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
            if(bossFight){
                bossHP-=clankers;
                if(bossHP<0)
                    bossHP=0;
                updateBossHP();
                updateSansFace();
                if(bossHP===0){
                    bossPhase2();
                }
            }else{
                clicks+=clankers;
                updateCounter();
            }
            hp -= clankers;
            for(let i=0;i<clankers;i++){
                createRobotPopup(1);
            }
            updateHP();
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
        if(critSFXEnabled){
            critSFX.currentTime = 0;
            critSFX.play();
        }
        popup.textContent = "CRIT! +" + value;
        popup.style.fontSize = "3rem";
        popup.style.color = "red";
    }
    else{
        popup.textContent = "+" + value;
    }
    popup.style.scale = 0.8 + Math.random()*0.6;
    popup.className = "popup";
    let rect;
    if(bossFight){
        rect=bossBody.getBoundingClientRect();
    }else{
        rect=nemo.getBoundingClientRect();
    }
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
function updateNemojiPage(){
    nemojiPage.innerHTML = "";
    nemojis.forEach((nemoji,index)=>{
        if(!unlockedNemojis.includes(index)){
            return;
        }
        const card = document.createElement("div");
        card.className = "nemojiCard";
        card.innerHTML = `<img src="${nemoji.sprite}">
                          <div>
                            <b>${nemoji.name}</b><br>
                            Unlock: ${nemoji.unlock} Clicks
                          </div>`;
        if(equippedNemoji === nemoji.sprite){
            card.classList.add("equipped");
        }
        card.onclick = ()=>{
            equippedNemoji = nemoji.sprite;
            nemo.src = equippedNemoji;
            updateNemojiPage();
            saveGame();
        };
        nemojiPage.appendChild(card);
    });
}
function updateAchievementPage(){
    achievementPage.innerHTML = "";
    achievements.forEach(name=>{
        const card = document.createElement("div");
        card.className = "nemojiCard";
        card.innerHTML = `
            <div style="font-size:2rem;">🏆</div>
            <div>
                <b>${name}</b>
            </div>`;
        achievementPage.appendChild(card);
    });
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
        clankerJuicePrice: clankerJuicePrice,
        equippedNemoji: equippedNemoji,
        lastUnlockedNemoji: lastUnlockedNemoji,
        unlockedNemojis: unlockedNemojis,
        currentNemoji: currentNemoji,
        hp: hp,
        unlockedNemojis: unlockedNemojis
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
    unlockedNemojis = saveData.unlockedNemojis || [0];
    equippedNemoji = saveData.equippedNemoji || null;
    lastUnlockedNemoji = saveData.lastUnlockedNemoji || equippedNemoji;
    currentNemoji = saveData.currentNemoji||0;
    hp = saveData.hp??100;
    unlockedNemojis = saveData.unlockedNemojis||[0];
    if(equippedNemoji){
        nemo.src = equippedNemoji;
    }
    updateCounter();
    updateTitle();
    
    updateShop();
    updateNemojiPage();
    updateHP();
    updateAchievementPage();
}
toggleCrit.onchange=()=>{critSFXEnabled=toggleCrit.checked};
toggleOra.onchange=()=>{oraSFXEnabled=toggleOra.checked};
toggleClanker.onchange=()=>{clankerSFXEnabled=toggleClanker.checked};
toggleAchievement.onchange=()=>{achievementSFXEnabled=toggleAchievement.checked};
toggleCard.onchange=()=>{cardSFXEnabled=toggleCard.checked};
shopButton.addEventListener("click", ()=>{
    shop.style.display = "block";
    shopOverlay.style.display = "block";
    updateMusic();
});
shopOverlay.addEventListener("click", ()=>{
    shop.style.display = "none";
    foodShop.style.display = "none";
    shopOverlay.style.display = "none";
    collectionWindow.style.display = "none";
    audioWindow.style.display = "none";
    updateMusic();
});
foodButton.addEventListener("click", ()=>{
    foodShop.style.display = "block";
    shopOverlay.style.display = "block";
    updateMusic();
});
collectionButton.addEventListener("click", ()=>{
    collectionWindow.style.display = "block";
    shopOverlay.style.display = "block";
    updateMusic();
    newCollectionUnlock = false;
    updateChestGlow();
});
audioButton.addEventListener("click",()=>{
    audioWindow.style.display = "block";
    shopOverlay.style.display = "block";
    updateMusic();
});
musicSlider.addEventListener("input",()=>{
    bgMusic.volume = musicSlider.value;
    shopMusic.volume = musicSlider.value;
    bossMusic.volume = musicSlider.value;
});
nemojiTab.addEventListener("click", ()=>{
    nemojiPage.style.display = "block";
    achievementPage.style.display = "none";
});
achievementTab.addEventListener("click", ()=>{
    achievementPage.style.display = "block";
    nemojiPage.style.display = "none";
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
});
document.addEventListener("keydown",(e)=>{
    if(!qteActive) return;
    let key = e.key;
    if(key.length==1){
        key = key.toUpperCase();
    }
    if(key == qteSequence[qteIndex]){
        qteIndex++;
        drawQTE();
        if(qteIndex >= qteSequence.length){
            finishQTE();
        }
    }
});
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

document.addEventListener("click", ()=>{
    bgMusic.play();
},{
    once: true
});

window.addEventListener("resize", positionClankers);

window.resetSave = function(){
    localStorage.removeItem("nemoSave");
    location.reload();
}