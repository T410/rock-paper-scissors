import { RenderOptions } from "./models";
import render from "./render";
import "./style.css";

function showFPS(target: HTMLElement, FPS: number) {
	let fpsString = FPS.toString();
	if (fpsString.length < 2) {
		fpsString = "0" + fpsString;
	}

	target.textContent = FPS.toString();
}

function init() {
	const fpsInput = document.getElementById("fps") as HTMLInputElement;
	const fpsValue = document.getElementById("fpsValue") as HTMLSpanElement;

	fpsInput.addEventListener("change", (e: InputEvent) => {
		const fps = parseInt((e.target as HTMLInputElement).value);
		updateFPS(fps);
		showFPS(fpsValue, fps);
	});

	const scale = 0.5;
	const WIDTH = 1920 * scale;
	const HEIGHT = window.visualViewport.height * scale * 0.9;

	const canvas = document.querySelector("canvas");

	function prepareCanvas(canvas: HTMLCanvasElement) {
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
	}

	prepareCanvas(canvas);

	const renderOptions: RenderOptions = {
		canvas,
		count: 10,
		range: 500,
		speed: 2,
		FPS: 60,
		hitbox: 25,
		drawHitbox: false,
	};
	showFPS(fpsValue, renderOptions.FPS);

	const { updateFPS } = render(renderOptions);
}

init();
