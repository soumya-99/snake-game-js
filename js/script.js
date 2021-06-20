let inputDirection = { x: 0, y: 0 }

const foodSound = new Audio("../assets/food.mp3")
const gameOverSound = new Audio("../assets/gameover.mp3")
const moveSound = new Audio("../assets/move.mp3")
const musicSound = new Audio("../assets/music.mp3")
const SPEED = 9
let lastPaintTime = 0
let snakeArray = [{ x: 13, y: 16 }]
let food = { x: 10, y: 14 }
let score = 0

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

const isCollide = (sArr) => {
	// if you bump into yourself
	for (let i = 1; i < snakeArray.length; i++) {
		if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {
			return true
		}
	}
	// if you bump into the wall
	if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0) {
		return true
	}
}

const gameEngine = () => {
	// Part 1: Updating the snake array & food
	if (isCollide(snakeArray)) {
		gameOverSound.play()
		musicSound.pause()
		inputDirection = { x: 0, y: 0 }
		alert("Game Over! Press OK to play again.")
		snakeArray = [{ x: 13, y: 16 }]
		musicSound.play()
		score = 0
	}

	// If you have eaten the food, increment the score and regenarate the food
	if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
		foodSound.play()
		score++
		scoreBox.innerHTML = `Score: ${score}`
		snakeArray.unshift({
			x: snakeArray[0].x + inputDirection.x,
			y: snakeArray[0].y + inputDirection.y,
		}) // added new segment body
		let a = 2
		let b = 16
		food = {
			x: Math.round(a + (b - a) * Math.random()),
			y: Math.round(a + (b - a) * Math.random()),
		}
	}

	// Moving the snake
	for (let i = snakeArray.length - 2; i >= 0; i--) {
		snakeArray[i + 1] = { ...snakeArray[i] }
	}

	snakeArray[0].x += inputDirection.x
	snakeArray[0].y += inputDirection.y

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

// Main animation logic

window.requestAnimationFrame(main) // Gameloop
window.addEventListener("keydown", (e) => {
	inputDirection = { x: 0, y: 1 } // Start the game
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
