import { RenderOptions } from "./models";
import render from "./render";
import "./style.css";
import playSVG from "./assets/play.svg";
import pauseSVG from "./assets/pause.svg";

const MAX_COUNT = 50;

function showValue(target: HTMLElement, val: number) {
	let valString = val.toString();
	if (valString.length < 2) {
		valString = "0" + valString;
	}

	target.textContent = valString;
}

function init() {
	const canvas = document.querySelector("canvas");

	let renderOptions: RenderOptions = {
		canvas,
		count: 15,
		range: 1000,
		speed: 3,
		FPS: 60,
		hitbox: 50,
		drawHitbox: false,
		zombie: true,
		onGameOver,
	};

	let isGameOver = false;

	const countInput = document.querySelector("#count") as HTMLInputElement;
	const countValue = document.querySelector("#countValue") as HTMLElement;

	countInput.addEventListener("change", (e) => {
		const target = e.target as HTMLInputElement;
		let count = target.valueAsNumber;
		if (count > MAX_COUNT) {
			count = MAX_COUNT;
			target.value = MAX_COUNT.toString();
		}
		updateCount(count);
		showValue(countValue, count);
	});

	const fpsInput = document.querySelector("#fps") as HTMLInputElement;
	const fpsValue = document.querySelector("#fpsValue") as HTMLSpanElement;

	fpsInput.addEventListener("change", (e) => {
		const fps = (e.target as HTMLInputElement).valueAsNumber;
		updateFPS(fps);
		showValue(fpsValue, fps);
	});

	const zombieCheck = document.querySelector("#zombie") as HTMLInputElement;

	zombieCheck.addEventListener("change", (e) => {
		const isChecked = (e.target as HTMLInputElement).checked;
		updateZombie(isChecked);
		buttonPlay();
	});

	const playPauseButton = document.querySelector("#playPause") as HTMLDivElement;
	const playPauseImage = playPauseButton.querySelector("img") as HTMLImageElement;
	function buttonPlay() {
		if (isGameOver) {
			resetItems();
			isGameOver = false;
		}
		play();
		playPauseButton.setAttribute("playing", "true");
		playPauseImage.src = pauseSVG;
	}

	function buttonPause() {
		playPauseButton.setAttribute("playing", "false");
		playPauseImage.src = playSVG;
		pause();
	}

	playPauseButton.addEventListener("click", () => {
		if (playPauseButton.getAttribute("playing") === "true") {
			buttonPause();
		} else {
			buttonPlay();
		}
	});

	const replayButton = document.querySelector("#replay") as HTMLDivElement;
	replayButton.addEventListener("click", () => {
		resetItems();
		buttonPlay();
	});

	function onGameOver() {
		buttonPause();
		isGameOver = true;
	}

	const WIDTH = window.innerWidth;
	const HEIGHT = window.innerHeight * 0.75;

	function prepareCanvas(canvas: HTMLCanvasElement) {
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
	}

	prepareCanvas(canvas);

	showValue(fpsValue, renderOptions.FPS);
	showValue(countValue, renderOptions.count);

	const { updateFPS, updateCount, updateZombie, pause, play, resetItems } = render(renderOptions);
}

init();
