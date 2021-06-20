let direction = { x: 0, y: 0 }

const foodSound = new Audio("food.mp3")
const gameOverSound = new Audio("gameover.mp3")
const moveSound = new Audio("move.mp3")
const musicSound = new Audio("music.mp3")
const SPEED = 2
let lastPaintTime = 0
let snakeArray = [{ x: 13, y: 16 }]

// Game Functions
const main = (currentTime) => {
	window.requestAnimationFrame(main) // Gameloop
	console.log(currentTime)
	if ((currentTime - lastPaintTime) / 1000 < 1 / SPEED) {
		return
	}
	lastPaintTime = currentTime
	gameEngine()
}

const gameEngine = () => {
	// Part 1: Updating the snake array & food

	// Part 2: Render/Display the snake and food
	board.innerHTML = ""
	snakeArray.forEach((e, index) => {
		let snakeElement = document.createElement("div")
		snakeElement.style.gridRowStart = e.y
		snakeElement.style.gridColumnStart = e.x
		snakeElement.classList.add("food")
		board.appendChild(snakeElement)
	})
}

window.requestAnimationFrame(main) // Gameloop
