"use strict";
const UP = [0, -1],
	RIGHT = [1, 0],
	DOWN = [0, 1],
	LEFT = [-1, 0],
	WIDTH = 30,
	HEIGHT = 30;

let snakeBody = [[Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2)]],
	lastDirection = [0, 0],
	apple = [0, 0],
	food = 0;

function makeMap(width, height) {
	let field = '<div id="field">';
	for (let j = 0; j < width; j++) {
		field += '<div class="row">';
		for (let i = 0; i < height; i++) {
			field += `<div class="cell empty" id="${i}-${j}"></div>`;
		}
		field += "</div>";
	}
	return field + "</div>";
}

function add2(l1, l2) {
	let l3 = [];
	for (let i = 0; i < l1.length; i++) {
		l3.push(l1[i] + l2[i]);
	}
	return l3;
}

function handleKeyPress(e) {
	switch (e.key) {
		case "ArrowUp":
			lastDirection = UP;
			break;
		case "ArrowDown":
			lastDirection = DOWN;
			break;
		case "ArrowRight":
			lastDirection = RIGHT;
			break;
		case "ArrowLeft":
			lastDirection = LEFT;
			break;
		case "l":
			lose();
	}
}

function makeApple() {
	apple = [
		Math.floor(Math.random() * WIDTH),
		Math.floor(Math.random() * HEIGHT)
	];
	if (snakeBody.includes(apple)) {
		return makeApple();
	}
	$(`#${apple[0]}-${apple[1]}`).classList.remove("empty");
	$(`#${apple[0]}-${apple[1]}`).classList.add("apple");
}

function lose() {
	clearInterval(m);
	$("#game").classList.add("lose");
}

$("#game").innerHTML =
	`<style>
	.cell {
		width: ${99 / WIDTH}%;
		height: 100%;
	}
	.row {
		height: ${99 / HEIGHT}%;
	}
</style>
` + makeMap(WIDTH, HEIGHT);

makeApple();

document.addEventListener("keydown", handleKeyPress);

let m = setInterval(() => {
	try {
		let newHead = add2(snakeBody[snakeBody.length - 1], lastDirection);
		snakeBody.push(newHead);
		if (food < 1) {
			let oldTail = snakeBody.shift();
			$(`#${oldTail[0]}-${oldTail[1]}`).classList.remove("full");
			$(`#${oldTail[0]}-${oldTail[1]}`).classList.add("empty");
		} else {
			food--;
		}
		$(`#${newHead[0]}-${newHead[1]}`).classList.remove("empty");
		$(`#${newHead[0]}-${newHead[1]}`).classList.add("full");
		if (newHead[0] == apple[0] && newHead[1] == apple[1]) {
			$(`#${newHead[0]}-${newHead[1]}`).classList.remove("apple");
			food += 5;
			makeApple();
		}
		if (
			snakeBody.findIndex(a => a[0] == newHead[0] && a[1] == newHead[1]) <
			snakeBody.length - 1
		) {
			console.log("s");
			lose();
		}
	} catch (e) {
		console.log(e);
		lose();
	}
}, 100);
