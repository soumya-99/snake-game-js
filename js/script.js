let direction = { x: 0, y: 0 }

const foodSound = new Audio("../assets/food.mp3")
const gameOverSound = new Audio("../assets/gameover.mp3")
const moveSound = new Audio("../assets/move.mp3")
const musicSound = new Audio("../assets/music.mp3")
const SPEED = 2
let lastPaintTime = 0
let snakeArray = [{ x: 13, y: 16 }]
let food = { x: 10, y: 14 }

// Game Functions
const main = (currentTime) => {
	window.requestAnimationFrame(main) // Gameloop
	// console.log(currentTime)
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
		if (index === 0) {
			snakeElement.classList.add("head")
		} else {
			snakeElement.classList.add("snake__body")
		}
		board.appendChild(snakeElement)
	})

	// Display the food
	let foodElement = document.createElement("div")
	foodElement.style.gridRowStart = food.y
	foodElement.style.gridColumnStart = food.x
	foodElement.classList.add("food")
	board.appendChild(foodElement)
}

window.requestAnimationFrame(main) // Gameloop
window.addEventListener("keydown", (e) => {
	let inputDirection = { x: 0, y: 1 } // Start the game
	moveSound.play()
	switch (e.key) {
		case "ArrowUp":
			console.log("ArrowUp")
			inputDirection.x = 0
			inputDirection.y = -1
			break

		case "ArrowDown":
			console.log("ArrowDown")
			inputDirection.x = 0
			inputDirection.y = 1
			break

		case "ArrowLeft":
			console.log("ArrowLeft")
			inputDirection.x = -1
			inputDirection.y = 0
			break

		case "ArrowRight":
			console.log("ArrowRight")
			inputDirection.x = 1
			inputDirection.y = 0
			break

		default:
			console.log("Wrong Choice")
			break
	}
})
