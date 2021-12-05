import { RenderOptions } from "./models";
import render from "./render";
function init() {
	const scale = 0.5;
	const WIDTH = 1920 * scale;
	const HEIGHT = 1080 * scale;

	const canvas = document.querySelector("canvas");

	function prepareCanvas(canvas: HTMLCanvasElement) {
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		canvas.style.width = "100%";
		canvas.style.height = "100%";
	}

	prepareCanvas(canvas);

	const renderOptions: RenderOptions = {
		canvas,
		count: 10,
		range: 500,
		speed: 2,
		FPS: 60,
		hitbox: 50,
	};
	render(renderOptions);
}

init();
