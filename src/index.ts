import { RenderOptions } from "./models";
import render from "./render";
import "./style.css";
import playSVG from "./assets/play.svg";
import pauseSVG from "./assets/pause.svg";

function showValue(target: HTMLElement, FPS: number) {
	let fpsString = FPS.toString();
	if (fpsString.length < 2) {
		fpsString = "0" + fpsString;
	}

	target.textContent = FPS.toString();
}

function init() {
	const canvas = document.querySelector("canvas");

	let renderOptions: RenderOptions = {
		canvas,
		count: 10,
		range: 500,
		speed: 2,
		FPS: 60,
		hitbox: 25,
		drawHitbox: false,
		zombie: true,
	};

	const countInput = document.querySelector("#count") as HTMLInputElement;
	const countValue = document.querySelector("#countValue") as HTMLElement;

	countInput.addEventListener("change", (e) => {
		const target = e.target as HTMLInputElement;
		let count = target.valueAsNumber;
		if (count > 25) {
			count = 25;
			target.value = "25";
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
		//detect if input type checkbox is checked or not
		const isChecked = (e.target as HTMLInputElement).checked;
		updateZombie(isChecked);
	});

	const playPauseButton = document.querySelector("#playPause") as HTMLDivElement;
	const playPauseImage = playPauseButton.querySelector("img") as HTMLImageElement;
	function buttonPlay() {
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
		replay();
		buttonPlay();
	});

	const scale = 0.5;
	const WIDTH = 1920 * scale;
	const HEIGHT = window.visualViewport.height * scale * 0.9;

	function prepareCanvas(canvas: HTMLCanvasElement) {
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
	}

	prepareCanvas(canvas);

	showValue(fpsValue, renderOptions.FPS);
	showValue(countValue, renderOptions.count);

	const { updateFPS, updateCount, updateZombie, pause, play, replay } = render(renderOptions);
}

init();
