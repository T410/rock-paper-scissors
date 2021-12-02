import { Border, ItemPosition, RenderOptions, RPS } from "./models";
import moveInit from "./move";

export default function init(options: RenderOptions) {
	const { canvas, count } = options;
	const context = canvas.getContext("2d");

	const fontSize = 50;
	const FPS = 60;
	const v = 10;

	let frame: ReturnType<typeof requestAnimationFrame>;

	context.textBaseline = "middle";
	context.textAlign = "center";

	const _items = [RPS.Rock, RPS.Paper, RPS.Scissors];

	function resetCanvas() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgba(0, 0, 0, 0.5)";
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	}

	resetCanvas();

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
			.map((item, id) => {
				return new Array(count).fill(undefined).map(() => {
					return { id, item, ...generateRandomPosition() };
				});
			})
			.flat();
	}

	const items = createPositionObjects();

	items.forEach(({ item, x, y }) => {
		for (let i = 0; i < count; i++) {
			context.font = `${fontSize}px Arial`;
			context.fillStyle = "white";
			context.fillText(item, x, y);
		}
	});

	const canvasBorder: Border = {
		top: 0,
		right: canvas.width,
		bottom: canvas.height,
		left: 0,
	};

	const move = moveInit({ border: canvasBorder, v });

	let prevDate = Date.now();
	const throttleAmount = 1000 / FPS;

	function animate(positions: ItemPosition[]) {
		let newPositions: ItemPosition[];
		if (Date.now() - prevDate > throttleAmount) {
			prevDate = Date.now();
			resetCanvas();
			//draw the rect again
			newPositions = move(positions);
			newPositions.forEach(({ item, x, y }) => {
				for (let i = 0; i < count; i++) {
					context.font = `${fontSize}px Arial`;
					context.fillStyle = "white";
					context.fillText(item, x, y);
				}
			});
		}
		frame = requestAnimationFrame(() => {
			animate(newPositions ?? positions);
		});
	}

	frame = requestAnimationFrame(() => {
		animate(items);
	});
}
