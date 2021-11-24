import { RenderOptions } from "./models";
import render from "./render";
function init() {
	const WIDTH = 1600;
	const HEIGHT = 1200;

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
	};
	render(renderOptions);
}

init();
