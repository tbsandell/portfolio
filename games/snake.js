"use strict";
const UP = [0, -1],
	RIGHT = [1, 0],
	DOWN = [0, 1],
	LEFT = [-1, 0];

function makeMap(width, height) {
	let field = [];
	let htmlField = '<div id="field">';
	for (let j = 0; j < width; j++) {
		field.push([]);
		htmlField += '<div class="row">';
		for (let i = 0; i < height; i++) {
			field[j].push(0);
			htmlField += `<div class="cell empty" id="${i}-${j}"></div>`;
		}
		htmlField += "</div>";
	}
	htmlField += "</div>";
	return field, htmlField;
}
let width = 30,
	height = 30;
let binMap,
	strMap = makeMap(width, height);
$("#game").innerHTML = strMap;
$("#game").innerHTML =
	`<style>
	.cell {
		width: ${99 / width}%;
		height: 100%;
	}
	.row {
		height: ${99 / height}%;
	}
</style>
` + $("#game").innerHTML;
let snakeBody = [[Math.floor(width / 2), Math.floor(height / 2)]];

function add2(l1, l2) {
	let l3 = [];
	for (let i = 0; i < l1.length; i++) {
		l3.push(l1[i] + l2[i]);
	}
	return l3;
}

function move(dir) {
	let newHead = add2(snakeBody[snakeBody.length - 1], dir);
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
}

let lastDirection = [0, 0];

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

let apple = [0, 0];

function makeApple() {
	apple = [
		Math.floor(Math.random() * width),
		Math.floor(Math.random() * width)
	];
	if (snakeBody.includes(apple)) {
		return makeApple();
	}
	$(`#${apple[0]}-${apple[1]}`).classList.remove("empty");
	$(`#${apple[0]}-${apple[1]}`).classList.add("apple");
}
makeApple();

document.addEventListener("keydown", handleKeyPress);
let food = 0;

let m = setInterval(() => {
	try {
		move(lastDirection);
	} catch (e) {
		console.log(e);
		lose();
	}
}, 100);

function lose() {
	clearInterval(m);
	$("#game").classList.add("lose");
}
