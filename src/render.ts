import { ItemPosition, RenderOptions } from "./models";

export default function init(options: RenderOptions) {
	const { canvas, count } = options;
	const context = canvas.getContext("2d");
	const fontSize = 50;
	console.log(`${count}`);

	const _items = ["🪨", "📄", "✂️"];

	//make background of the context a bit darker
	context.fillStyle = "rgba(0, 0, 0, 0.5)";
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	function getRandomNumber(val: number) {
		return Math.floor(Math.random() * val * 0.95 + fontSize);
	}

	function generateRandomPosition() {
		return {
			x: getRandomNumber(canvas.width),
			y: getRandomNumber(canvas.height),
		};
	}

	function createPositionObjects(): ItemPosition[] {
		return _items
			.map((item) => {
				return new Array(count).fill(undefined).map(() => {
					return { item, ...generateRandomPosition() };
				});
			})
			.flat();
	}

	const items = createPositionObjects();
	console.log(items);

	items.forEach(({ item, x, y }) => {
		for (let i = 0; i < count; i++) {
			context.font = `${fontSize}px Arial`;
			context.fillStyle = "white";
			context.fillText(item, x, y);
		}
	});
}
