import { RenderOptions } from "./models";
import render from "./render";
function init() {
	const WIDTH = 800;
	const HEIGHT = 600;

	const canvas = document.querySelector("canvas");

	function prepareCanvas(canvas: HTMLCanvasElement) {
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		canvas.style.width = `${800}px`;
		canvas.style.height = `${600}px`;
	}

	prepareCanvas(canvas);

	const renderOptions: RenderOptions = {
		canvas,
		count: 10,
		range: 300,
		speed: 2,
		FPS: 60,
		hitbox: 50,
	};
	render(renderOptions);
}

init();
