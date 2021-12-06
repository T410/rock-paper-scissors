import { Border, Item, RenderOptions, RPS } from "./models";
import moveInit from "./move";
import { calculateBorder } from "./helper";

export default function init(options: RenderOptions) {
	const { canvas, count, speed, range, FPS, hitbox, drawHitbox } = options;
	let currentFPS = FPS;
	const context = canvas.getContext("2d");

	let frame: ReturnType<typeof requestAnimationFrame>;

	context.textBaseline = "middle";
	context.textAlign = "center";

	const kinds = [RPS.Rock, RPS.Paper, RPS.Scissors];

	function resetCanvas() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgba(0, 0, 0, 0.5)";
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	}

	resetCanvas();

	function getRandomNumber(val: number) {
		return Math.floor(Math.random() * val * 0.95 + hitbox);
	}

	function generateRandomPosition() {
		return {
			x: getRandomNumber(canvas.width),
			y: getRandomNumber(canvas.height),
		};
	}

	function createPositionObjects(): Item[] {
		let id = 0;
		return kinds
			.map((kind) => {
				return new Array(count).fill(undefined).map(() => {
					const pos = generateRandomPosition();
					return { id: id++, kind, ...pos, border: calculateBorder({ ...pos, hitbox }) };
				});
			})
			.flat();
	}

	const items = createPositionObjects();

	items.forEach(({ kind: item, x, y }) => {
		for (let i = 0; i < count; i++) {
			context.font = `${hitbox}px Arial`;
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

	const move = moveInit({ border: canvasBorder, speed, range, hitbox });

	let prevDate = Date.now();
	let throttleAmount = 1000 / currentFPS;

	function animate(positions: Item[]) {
		let newPositions: Item[];
		if (Date.now() - prevDate > throttleAmount) {
			prevDate = Date.now();
			resetCanvas();
			//draw the rect again
			newPositions = move(positions);
			newPositions.forEach(({ kind: item, x, y }) => {
				for (let i = 0; i < count; i++) {
					context.font = `${hitbox}px Arial`;
					context.fillStyle = "white";
					context.fillText(item, x, y);

					if (drawHitbox) {
						//draw a cube around the text side as hitbox amount
						context.strokeStyle = "red";
						context.strokeRect(x - hitbox / 2, y - hitbox / 2, hitbox, hitbox);
					}
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

	function updateFPS(val: number) {
		currentFPS = val;
		throttleAmount = 1000 / currentFPS;
	}
	return { updateFPS };
}
