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
		count: 1,
		range: 200,
		speed: 5,
		FPS: 2,
	};
	render(renderOptions);
}

init();
