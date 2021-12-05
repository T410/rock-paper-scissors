import { RenderOptions } from "./models";
import render from "./render";
import "./style.css";

function init() {
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
	render(renderOptions);
}

init();
