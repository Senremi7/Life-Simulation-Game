// Update status bar
function updateStatusBar(id, value) {
    const bar = document.getElementById(`${id}-bar`);
    const valueText = document.getElementById(`${id}-value`);
    bar.style.width = `${value}%`;
    valueText.textContent = `${value}%`;
}

// Initialize game time and day
let gameHour = 8; // Game Mulai jam 8 pagi
let gameMinute = 0;
let gameDay = 1; // Start at Day 1
let gameActive = true;
let gameTimeInterval;

// Update game time and day, 1 second = 1 minute in game
function updateGameTime() {
    gameMinute++;
    if (gameMinute === 60) { // if minute reaches 60, reset to 0 and increment hour
        gameMinute = 0;
        gameHour++;
    }
    if (gameHour === 24) {
        gameHour = 0; // Reset to 12:00 AM
        gameDay++; // Increment the day
        document.getElementById('game-day').textContent = gameDay;
    }

    // Format time as HH:MM AM/PM
    const period = gameHour >= 12 ? 'PM' : 'AM';
    const formattedHour = gameHour % 12 === 0 ? 12 : gameHour % 12;
    const formattedMinute = gameMinute.toString().padStart(2, '0');
    const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;

    // Update the game time in the DOM
    document.getElementById('game-time').textContent = formattedTime;

    // Update the greeting text based on the time
    updateGreeting();
}

// Update greeting based on the time
function updateGreeting(){
    const greetingElement = document.getElementById('greeting');
    const playerName = gameState.playerName || 'Player';
    if (gameHour >= 5 && gameHour < 12) {
        greetingElement.textContent = `Good Morning, ${playerName}!`;
    } else if (gameHour >= 12 && gameHour < 17) {
        greetingElement.textContent = `Good Afternoon, ${playerName}!`;
    } else if (gameHour >= 17 && gameHour < 21) {
        greetingElement.textContent = `Good Evening, ${playerName}!`;
    } else {
        greetingElement.textContent = `Good Night, ${playerName}!`;
    }
}

// Game state
const gameState = {
    avatarX: 250,
    avatarY: 550,
    avatarSize: 60,
    avatarSpeed: 8,
    currentAvatar: 1,
    playerName: "Player",
    energy: 50,
    hunger: 50,
    happiness: 50,
    hygiene: 50,
    money: 100
};

// Define areas as percentages of canvas width and height
const areaTemplates = {
    homeArea: {
        xPercent: 0.25, 
        yPercent: 0.70,    
        widthPercent: 0.12, 
        heightPercent: 0.14 
    },
    danauArea: {
        xPercent: 0.75,
        yPercent: 0.50,
        widthPercent: 0.15, 
        heightPercent: 0.18 
    },
    pantaiArea: {
        xPercent: 0.05,  
        yPercent: 0.20,     
        widthPercent: 0.15,  
        heightPercent: 0.25 
    },
    gunungArea: {
        xPercent: 0.75,     
        yPercent: 0.10, 
        widthPercent: 0.15,  
        heightPercent: 0.18 
    },
    candiArea: {
        xPercent: 0.55,  
        yPercent: 0.25,  
        widthPercent: 0.10, 
        heightPercent: 0.12 
    }
};

// Object to store dynamically calculated coordinates
const dynamicAreas = {
    homeArea: {},
    danauArea: {},
    pantaiArea: {},
    gunungArea: {},
    candiArea: {}
};

// Function to update dynamic coordinates based on canvas size
function updateDynamicCoordinates(canvas) {
    for (const areaKey in areaTemplates) {
        const template = areaTemplates[areaKey];
        dynamicAreas[areaKey] = {
            x: template.xPercent * canvas.width,
            y: template.yPercent * canvas.height,
            width: template.widthPercent * canvas.width,
            height: template.heightPercent * canvas.height
        };
    }
}

// Check location
function checkLocationInteraction() {
    if (
        gameState.avatarX < dynamicAreas.homeArea.x + dynamicAreas.homeArea.width &&
        gameState.avatarX + gameState.avatarSize > dynamicAreas.homeArea.x &&
        gameState.avatarY < dynamicAreas.homeArea.y + dynamicAreas.homeArea.height &&
        gameState.avatarY + gameState.avatarSize > dynamicAreas.homeArea.y
    ) {
        populateActions('home');
    } else if (
        gameState.avatarX < dynamicAreas.danauArea.x + dynamicAreas.danauArea.width &&
        gameState.avatarX + gameState.avatarSize > dynamicAreas.danauArea.x &&
        gameState.avatarY < dynamicAreas.danauArea.y + dynamicAreas.danauArea.height &&
        gameState.avatarY + gameState.avatarSize > dynamicAreas.danauArea.y
    ) {
        populateActions('danau');
    } else if (
        gameState.avatarX < dynamicAreas.pantaiArea.x + dynamicAreas.pantaiArea.width &&
        gameState.avatarX + gameState.avatarSize > dynamicAreas.pantaiArea.x &&
        gameState.avatarY < dynamicAreas.pantaiArea.y + dynamicAreas.pantaiArea.height &&
        gameState.avatarY + gameState.avatarSize > dynamicAreas.pantaiArea.y
    ) {
        populateActions('pantai');
    } else if (
        gameState.avatarX < dynamicAreas.gunungArea.x + dynamicAreas.gunungArea.width &&
        gameState.avatarX + gameState.avatarSize > dynamicAreas.gunungArea.x &&
        gameState.avatarY < dynamicAreas.gunungArea.y + dynamicAreas.gunungArea.height &&
        gameState.avatarY + gameState.avatarSize > dynamicAreas.gunungArea.y
    ) {
        populateActions('gunung');
    } else if (
        gameState.avatarX < dynamicAreas.candiArea.x + dynamicAreas.candiArea.width &&
        gameState.avatarX + gameState.avatarSize > dynamicAreas.candiArea.x &&
        gameState.avatarY < dynamicAreas.candiArea.y + dynamicAreas.candiArea.height &&
        gameState.avatarY + gameState.avatarSize > dynamicAreas.candiArea.y
    ) {
        populateActions('candi');
    } else {
        populateActions(''); // Clear actions when outside any area
    }
}

// HOME
function sleep() { // Energy + 30, Time + 4 hours
    if (!gameActive) return;
    gameState.energy = Math.min(100, gameState.energy + 30);
    gameHour += 4; // Sleep adds 4 hours

    while (gameHour >= 24) { // Handle multiple day increments
        gameHour -= 24;
        gameDay++;
        document.getElementById('game-day').textContent = gameDay;
    }

    updateStatusBar("energy", gameState.energy);
    updateGameTime();
    checkGameOver();
}

function eat() { // Hunger + 20
    if (!gameActive) return;
    gameState.hunger = Math.min(100, gameState.hunger + 20);
    updateStatusBar("hunger", gameState.hunger);
    checkGameOver();
}

function play() { // Happiness + 20, Energy - 10
    if (!gameActive) return;
    gameState.happiness = Math.min(100, gameState.happiness + 20);
    updateStatusBar("happiness", gameState.happiness);
    checkGameOver();
}

function shower() { // Hygiene + 20
    if (!gameActive) return;
    gameState.hygiene = Math.min(100, gameState.hygiene + 20);
    updateStatusBar("hygiene", gameState.hygiene);
    checkGameOver();
}

function remoteWork() { // Money + $25, Energy - 20, Happiness - 5
    if (!gameActive) return;
    if (gameState.energy >= 20) { // Check if enough energy to work
        gameState.money += 25;
        gameState.energy = Math.max(0, gameState.energy - 20);
        gameState.happiness = Math.max(0, gameState.happiness - 5);
        updateStatusBar("energy", gameState.energy);
        updateStatusBar("happiness", gameState.happiness);
        updateMoneyDisplay();
        alert("You earned $25 from remote work!");
    } else {
        alert("Too tired to work! Get some rest first.");
    }
    checkGameOver();
}

function readBook() { // Happiness + 15, Energy - 5
    if (!gameActive) return;
    gameState.happiness = Math.min(100, gameState.happiness + 15);
    gameState.energy = Math.max(0, gameState.energy - 5);
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("energy", gameState.energy);
    checkGameOver();
}

// Danau
function fish() { // Happiness + 10, Energy - 10, Hunger + 15
    if (!gameActive) return;
    gameState.hunger = Math.min(100, gameState.hunger + 15);
    gameState.happiness = Math.min(100, gameState.happiness + 10);
    gameState.energy = Math.max(0, gameState.energy - 10);
    updateStatusBar("hunger", gameState.hunger);
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("energy", gameState.energy);
    checkGameOver();
}

function swimDanau() { // Hygiene + 15, Energy - 15, Happiness + 10
    if (!gameActive) return;
    gameState.hygiene = Math.min(100, gameState.hygiene + 15);
    gameState.energy = Math.max(0, gameState.energy - 15);
    gameState.happiness = Math.min(100, gameState.happiness + 10);
    updateStatusBar("hygiene", gameState.hygiene);
    updateStatusBar("energy", gameState.energy);
    updateStatusBar("happiness", gameState.happiness);
    checkGameOver();
}

function restAtLake() { // Energy + 15, Time + 1 hour
    if (!gameActive) return;
    gameState.energy = Math.min(100, gameState.energy + 15);
    gameHour = (gameHour + 1) % 24; // Takes 1 hour
    updateStatusBar("energy", gameState.energy);
    updateGameTime();
    checkGameOver();
}

function takeNaturePhotos() { // Money + $10, Energy - 5, Happiness + 5
    if (!gameActive) return;
    gameState.happiness = Math.min(100, gameState.happiness + 10);
    gameState.energy = Math.max(0, gameState.energy - 5);
    gameState.money += 10;
    updateMoneyDisplay();
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("energy", gameState.energy);
    checkGameOver();
}

// Beach / Pantai
function swimPantai() { // Hygiene + 20, Energy - 10, Happiness + 15
    if (!gameActive) return;
    gameState.hygiene = Math.min(100, gameState.hygiene + 20);
    gameState.energy = Math.max(0, gameState.energy - 10);
    gameState.happiness = Math.min(100, gameState.happiness + 15);
    updateStatusBar("hygiene", gameState.hygiene);
    updateStatusBar("energy", gameState.energy);
    updateStatusBar("happiness", gameState.happiness);
    checkGameOver();
}

function sunbathe() { // Happiness + 20, Energy - 5, Hunger - 5
    if (!gameActive) return;
    gameState.happiness = Math.min(100, gameState.happiness + 20);
    gameState.energy = Math.min(100, gameState.energy + 10);
    gameState.hunger = Math.max(0, gameState.hunger - 5);
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("energy", gameState.energy);
    updateStatusBar("hunger", gameState.hunger);
    checkGameOver();
}

function buildSandcastle() { // Happiness + 25, Energy - 10
    if (!gameActive) return;
    gameState.happiness = Math.min(100, gameState.happiness + 25);
    gameState.energy = Math.max(0, gameState.energy - 10);
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("energy", gameState.energy);
    checkGameOver();
}

function buySouvenir() { // Money - $15, Happiness + 20
    if (!gameActive) return;
    if (gameState.money >= 15) { // Check if enough money
        gameState.money -= 15;
        gameState.happiness = Math.min(100, gameState.happiness + 20);
        updateMoneyDisplay();
        updateStatusBar("happiness", gameState.happiness);
        alert("You bought a cute souvenir! Happiness +20");
    } else {
        alert("Not enough money for souvenir!");
    }
    checkGameOver();
}

// Mountain / Gunung
function hike() { // Energy - 20, Happiness + 30, Hunger - 10
    if (!gameActive) return;
    gameState.energy = Math.max(0, gameState.energy - 20);
    gameState.happiness = Math.min(100, gameState.happiness + 20);
    gameState.hunger = Math.max(0, gameState.hunger - 10);
    updateStatusBar("energy", gameState.energy);
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("hunger", gameState.hunger);
    checkGameOver();
}

function camp() { // Energy + 20, Happiness + 15, Time + 2 hours
    if (!gameActive) return;
    gameState.energy = Math.min(100, gameState.energy + 20);
    gameState.happiness = Math.min(100, gameState.happiness + 15);
    gameHour = (gameHour + 2) % 24; // Camping takes 2 hours
    updateStatusBar("energy", gameState.energy);
    updateStatusBar("happiness", gameState.happiness);
    updateGameTime();
    checkGameOver();
}

function findTreasure() { // Money + $10-$60, Energy - 15
    if (!gameActive) return;
    const treasureValue = Math.floor(Math.random() * 50) + 10; // $10-$60 RNG
    gameState.money += treasureValue;
    gameState.energy = Math.max(0, gameState.energy - 15);
    updateMoneyDisplay();
    updateStatusBar("energy", gameState.energy);
    alert(`You found treasure worth $${treasureValue}!`);
    checkGameOver();
}

function takeMountainPhotos() { // Money + $5-$25, Energy - 10
    if (!gameActive) return;
    const photoValue = Math.floor(Math.random() * 20) + 5; // $5-$25
    gameState.money += photoValue;
    gameState.energy = Math.max(0, gameState.energy - 10);
    updateMoneyDisplay();
    updateStatusBar("energy", gameState.energy);
    alert(`You sold mountain photos for $${photoValue}!`);
    checkGameOver();
}

// Temple
function exploreTemple() { // Happiness + 15, Energy - 10, Hunger - 5
    if (!gameActive) return;
    gameState.happiness = Math.min(100, gameState.happiness + 15);
    gameState.energy = Math.max(0, gameState.energy - 10);
    gameState.hunger = Math.max(0, gameState.hunger - 5);
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("energy", gameState.energy);
    updateStatusBar("hunger", gameState.hunger);
    checkGameOver();
}

function meditate() { // Happiness + 20, Energy + 15, Time + 1 hour
    if (!gameActive) return;
    gameState.happiness = Math.min(100, gameState.happiness + 20);
    gameState.energy = Math.min(100, gameState.energy + 15);
    gameHour = (gameHour + 1) % 24; // Meditation takes 1 hour
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("energy", gameState.energy);
    updateGameTime();
    checkGameOver();
}

function prayAtTemple() { // Happiness + 10, Energy - 5, Money - $10
    if (!gameActive) return;
    if (gameState.money < 10) {
        alert("Not enough money for offering!");
        return;
    }
    const statToBoost = ['energy', 'happiness', 'hygiene'][Math.floor(Math.random() * 3)];
    const boostAmount = Math.floor(Math.random() * 15) + 5;

    gameState[statToBoost] = Math.min(100, gameState[statToBoost] + boostAmount);
    gameState.money = Math.max(0, gameState.money - 10);

    updateStatusBar(statToBoost, gameState[statToBoost]);
    updateMoneyDisplay();
    alert(`You made an offering. ${statToBoost} +${boostAmount}`);
    checkGameOver();
}

function studyHistory() { // Happiness + 10, Energy - 5
    if (!gameActive) return;
    gameState.happiness = Math.min(100, gameState.happiness + 10);
    gameState.energy = Math.max(0, gameState.energy - 5);
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("energy", gameState.energy);
    checkGameOver();
}

// Update money display
function updateMoneyDisplay() {
    document.getElementById('money-value').textContent = `$${gameState.money}`;
    const moneyElement = document.getElementById('money-value');
    moneyElement.classList.add('scale-110');
    setTimeout(() => {
        moneyElement.classList.remove('scale-110');
    }, 300);
}

// Populate actions for locations (restored to original style)
function populateActions(location) {
    const actionsContainer = document.getElementById('actions-container');
    actionsContainer.innerHTML = ''; // Clear existing actions, biar ga ngebug

    // Define actions tiap lokasi
    const actions = {
        home: [
            { label: 'Sleep', class: 'bg-blue-500 hover:bg-blue-600', action: sleep, moneyEffect: null },
            { label: 'Eat', class: 'bg-yellow-500 hover:bg-yellow-600', action: eat, moneyEffect: null },
            { label: 'Play Games', class: 'bg-pink-500 hover:bg-pink-600', action: play, moneyEffect: null },
            { label: 'Take a bath', class: 'bg-green-500 hover:bg-green-600', action: shower, moneyEffect: null },
            { label: 'Work', class: 'bg-indigo-500 hover:bg-indigo-600', action: remoteWork, moneyEffect: "+$25 (Earns money but costs 20 Energy and 5 Happiness)" },
            { label: 'Read a Book', class: 'bg-purple-500 hover:bg-purple-600', action: readBook, moneyEffect: null }
        ],
        danau: [
            { label: 'Fishing', class: 'bg-blue-500 hover:bg-blue-600', action: fish, moneyEffect: null },
            { label: 'Swimming', class: 'bg-cyan-500 hover:bg-cyan-600', action: swimDanau, moneyEffect: null },
            { label: 'Take a Rest', class: 'bg-gray-500 hover:bg-gray-600', action: restAtLake, moneyEffect: null },
            { label: 'Take Nature Picture', class: 'bg-amber-500 hover:bg-amber-600', action: takeNaturePhotos, moneyEffect: "+$10 (Earns money but costs 5 Energy)" }
        ],
        pantai: [
            { label: 'Swimming', class: 'bg-blue-500 hover:bg-blue-600', action: swimPantai, moneyEffect: null },
            { label: 'Sunbathe', class: 'bg-yellow-500 hover:bg-yellow-600', action: sunbathe, moneyEffect: null },
            { label: 'Make a Sandcastle', class: 'bg-amber-500 hover:bg-amber-600', action: buildSandcastle, moneyEffect: null },
            { label: 'Buy Souvenir', class: 'bg-pink-500 hover:bg-pink-600', action: buySouvenir, moneyEffect: "-$15 (Costs money but increases happiness)" }
        ],
        gunung: [
            { label: 'Hike', class: 'bg-green-500 hover:bg-green-600', action: hike, moneyEffect: null },
            { label: 'Camping', class: 'bg-amber-700 hover:bg-amber-800', action: camp, moneyEffect: null },
            { label: 'Find a Treasure', class: 'bg-yellow-500 hover:bg-yellow-600', action: findTreasure, moneyEffect: "+$10-$60 (Earns money but costs 15 Energy)" },
            { label: 'Take Mountain Photos', class: 'bg-blue-500 hover:bg-blue-600', action: takeMountainPhotos, moneyEffect: "+$5-$25 (Earns money but costs 10 Energy)" }
        ],
        candi: [
            { label: 'Meditate', class: 'bg-purple-500 hover:bg-purple-600', action: meditate, moneyEffect: null },
            { label: 'Pray/Make an Offering', class: 'bg-gray-500 hover:bg-gray-600', action: prayAtTemple, moneyEffect: "-$10 (Costs money but increases random stat)" },
            { label: 'Explore', class: 'bg-red-500 hover:bg-red-600', action: exploreTemple, moneyEffect: null },
            { label: 'Learn History', class: 'bg-indigo-500 hover:bg-indigo-600', action: studyHistory, moneyEffect: null }
        ]
    };

    const locationActions = actions[location] || [];

    locationActions.forEach(({ label, class: btnClass, action, moneyEffect }) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex items-center mb-2 w-full'; // Added w-full
        
        const button = document.createElement('button');
        button.textContent = label;
        button.className = `text-white py-2 px-4 rounded-lg ${btnClass} flex-grow`; // Added px-4 and flex-grow
        button.addEventListener('click', action);
        
        if (moneyEffect) {
            const infoIcon = document.createElement('div');
            infoIcon.innerHTML = 'ℹ️';
            infoIcon.className = 'ml-2 cursor-help relative flex-shrink-0'; // Added flex-shrink-0
            
            const tooltip = document.createElement('div');
            tooltip.className = 'hidden absolute z-50 w-48 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg';
            tooltip.style.bottom = '100%'; // Position above icon
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.textContent = moneyEffect;
            
            // Better tooltip handling
            infoIcon.addEventListener('mouseenter', () => {
                tooltip.classList.remove('hidden');
            });
            
            infoIcon.addEventListener('mouseleave', () => {
                tooltip.classList.add('hidden');
            });
            
            // Touch support for mobile
            infoIcon.addEventListener('touchstart', (e) => {
                e.preventDefault();
                tooltip.classList.toggle('hidden');
            });
            
            infoIcon.appendChild(tooltip);
            buttonContainer.appendChild(button);
            buttonContainer.appendChild(infoIcon);
        } else {
            buttonContainer.appendChild(button);
        }
        
        actionsContainer.appendChild(buttonContainer);
    });
}

// Initialize game map with avatar
function initGameMap() {
    const container = document.querySelector('.map-container');
    const canvas = document.getElementById('game-map');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Update dynamic coordinates initially
    updateDynamicCoordinates(canvas);

    
    gameState.avatarX = canvas.width * 0.25; 
    gameState.avatarY = canvas.height * 0.70;
    gameState.avatarSize = Math.min(60, canvas.width * 0.1);

    const mapImage = new Image();
    mapImage.src = 'images/map.png';
    const avatarImage = new Image();
    avatarImage.src = `images/avatar-${gameState.currentAvatar}.png`;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (mapImage.complete && avatarImage.complete) {
            ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(avatarImage, gameState.avatarX, gameState.avatarY, gameState.avatarSize, gameState.avatarSize);
        }
    }

    mapImage.onload = draw;
    avatarImage.onload = draw;

    function moveAvatar(dx, dy) {
        gameState.avatarX += dx * gameState.avatarSpeed;
        gameState.avatarY += dy * gameState.avatarSpeed;
        gameState.avatarX = Math.max(0, Math.min(canvas.width - gameState.avatarSize, gameState.avatarX));
        gameState.avatarY = Math.max(0, Math.min(canvas.height - gameState.avatarSize, gameState.avatarY));
        draw();
        checkLocationInteraction();
    }

    const keysPressed = {};

    document.addEventListener('keydown', function (e) {
        keysPressed[e.key.toLowerCase()] = true;
        handleMovement();
    });

    document.addEventListener('keyup', function (e) {
        keysPressed[e.key.toLowerCase()] = false;
    });

    function handleMovement() {
        if (keysPressed['w'] || keysPressed['arrowup']) moveAvatar(0, -1);
        if (keysPressed['s'] || keysPressed['arrowdown']) moveAvatar(0, 1);
        if (keysPressed['a'] || keysPressed['arrowleft']) moveAvatar(-1, 0);
        if (keysPressed['d'] || keysPressed['arrowright']) moveAvatar(1, 0);
    }

    document.getElementById('move-up').addEventListener('click', () => moveAvatar(0, -1));
    document.getElementById('move-down').addEventListener('click', () => moveAvatar(0, 1));
    document.getElementById('move-left').addEventListener('click', () => moveAvatar(-1, 0));
    document.getElementById('move-right').addEventListener('click', () => moveAvatar(1, 0));

    window.addEventListener('resize', function() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        updateDynamicCoordinates(canvas); // Recalculate coordinates on resize
        // Adjust avatar position proportionally on resize
        gameState.avatarX = Math.min(canvas.width - gameState.avatarSize, Math.max(0, gameState.avatarX));
        gameState.avatarY = Math.min(canvas.height - gameState.avatarSize, Math.max(0, gameState.avatarY));
        draw();
    });
}

let statDecreaseInterval;

// Decrease stats every 30 seconds
function decreaseStatsOverTime() {
    if (statDecreaseInterval) clearInterval(statDecreaseInterval);

    statDecreaseInterval = setInterval(() => {
        gameState.hunger = Math.max(0, gameState.hunger - 5);
        updateStatusBar("hunger", gameState.hunger);

        gameState.energy = Math.max(0, gameState.energy - 3);
        updateStatusBar("energy", gameState.energy);

        gameState.happiness = Math.max(0, gameState.happiness - 2);
        updateStatusBar("happiness", gameState.happiness);

        gameState.hygiene = Math.max(0, gameState.hygiene - 4);
        updateStatusBar("hygiene", gameState.hygiene);

        checkCriticalLevels();
        checkGameOver()
    }, 30000); // 30 seconds
}

// Add warning when stats get too low
function checkCriticalLevels() {
    if (gameState.hunger < 20) {
        alert("Warning: You're getting very hungry!");
    }
    if (gameState.energy < 15) {
        alert("Warning: You're exhausted and need rest!");
    }
    if (gameState.hygiene < 15) {
        console.log("Warning: You need to shower!");
    }
    if (gameState.happiness < 15) {
        console.log("Warning: You're feeling depressed!");
    }
}

function checkGameOver() {
    if (!gameActive) return;

    let gameOver = false;
    let message = "";

    if (gameState.hunger <= 0) {
        gameOver = true;
        message = "You starved to death!";
    } else if (gameState.energy <= 0) {
        gameOver = true;
        message = "You collapsed from exhaustion!";
    } else if (gameState.happiness <= 0) {
        gameOver = true;
        message = "You became too depressed to continue!";
    } else if (gameState.hygiene <= 0) {
        gameOver = true;
        message = "Your poor hygiene made you sick!";
    } else if (gameState.money < 0) {
        gameOver = true;
        message = "You went bankrupt!";
    }
    if (gameOver) {
        endGame(message);
    }
}

// Game Over function
function endGame(message) {
    gameActive = false;
    clearInterval(gameTimeInterval);
    clearInterval(statDecreaseInterval);

    document.getElementById('game-over-message').textContent = message;
    document.getElementById('game-over-screen').classList.remove('hidden');

    const actionButtons = document.querySelectorAll('#actions-container button');
    actionButtons.forEach(button => {
        button.disabled = true;
    });
}

// Restart Game function
function restartGame() {
    gameState.energy = 50;
    gameState.hunger = 50;
    gameState.happiness = 50;
    gameState.hygiene = 50;
    gameState.money = 100;
    gameHour = 8;
    gameMinute = 0;
    gameDay = 1;

    updateStatusBar("energy", gameState.energy);
    updateStatusBar("hunger", gameState.hunger);
    updateStatusBar("happiness", gameState.happiness);
    updateStatusBar("hygiene", gameState.hygiene);
    updateMoneyDisplay();
    document.getElementById('game-day').textContent = gameDay;
    document.getElementById('game-time').textContent = "8:00 AM";
    updateGreeting();
    clearInterval(statDecreaseInterval); // Before setting new interval

    document.getElementById('game-over-screen').classList.add('hidden');

    const actionButtons = document.querySelectorAll('#actions-container button');
    actionButtons.forEach(button => {
        button.disabled = false;
    });

    gameActive = true;
    gameTimeInterval = setInterval(updateGameTime, 1000);
    decreaseStatsOverTime();

    const container = document.querySelector('.map-container');
    const canvas = document.getElementById('game-map');
    if (container && canvas) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        updateDynamicCoordinates(canvas);
        gameState.avatarX = canvas.width * 0.25;
        gameState.avatarY = canvas.height * 0.70;
        const ctx = canvas.getContext('2d');
        const mapImage = new Image();
        const avatarImage = new Image();
        mapImage.src = 'images/map.png';
        avatarImage.src = `images/avatar-${gameState.currentAvatar}.png`;

        mapImage.onload = function() {
            ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(avatarImage, gameState.avatarX, gameState.avatarY, gameState.avatarSize, gameState.avatarSize);
        };
        avatarImage.onload = function() {
            ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(avatarImage, gameState.avatarX, gameState.avatarY, gameState.avatarSize, gameState.avatarSize);
        };
    }
}

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    const avatarSelection = document.getElementById('avatar-selection');
    const gameScreen = document.getElementById('game-screen');
    const avatarImg = document.getElementById('selected-avatar');
    const avatarNumber = document.getElementById('avatar-number');
    const prevBtn = document.getElementById('prev-avatar');
    const nextBtn = document.getElementById('next-avatar');
    const nameInput = document.getElementById('player-name');
    const startBtn = document.getElementById('start-game');

    let currentAvatar = 1;
    const totalAvatars = 9;

    function updateAvatar() {
        avatarImg.src = `images/avatar-${currentAvatar}.png`;
        avatarNumber.textContent = currentAvatar;
        prevBtn.disabled = currentAvatar === 1;
        nextBtn.disabled = currentAvatar === totalAvatars;
    }

    prevBtn.addEventListener('click', function () {
        if (currentAvatar > 1) {
            currentAvatar--;
            updateAvatar();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentAvatar < totalAvatars) {
            currentAvatar++;
            updateAvatar();
        }
    });

    nameInput.addEventListener('input', function () {
        startBtn.disabled = this.value.trim() === '';
    });

    startBtn.addEventListener('click', function() {
        avatarSelection.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        gameState.currentAvatar = currentAvatar;
        gameState.playerName = nameInput.value.trim() || 'Player';
        gameActive = true;

        updateGreeting();
        gameTimeInterval = setInterval(updateGameTime, 1000);
        initGameMap();
        decreaseStatsOverTime();
        checkLocationInteraction();
    });

    document.getElementById('restart-button').addEventListener('click', restartGame);
    document.getElementById('quit-button').addEventListener('click', function () {
        gameState.energy = 50;
        gameState.hunger = 50;
        gameState.happiness = 50;
        gameState.hygiene = 50;
        gameState.money = 100;
        gameHour = 8;
        gameMinute = 0;
        gameDay = 1;

        updateStatusBar("energy", gameState.energy);
        updateStatusBar("hunger", gameState.hunger);
        updateStatusBar("happiness", gameState.happiness);
        updateStatusBar("hygiene", gameState.hygiene);
        updateMoneyDisplay();
        document.getElementById('game-day').textContent = gameDay;
        document.getElementById('game-time').textContent = "8:00 AM";
        updateGreeting();

        document.getElementById('game-over-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('avatar-selection').classList.remove('hidden');

        clearInterval(gameTimeInterval);
        clearInterval(statDecreaseInterval);

        gameActive = false;
    });

    updateAvatar();
});