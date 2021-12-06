import { Border, Item, RenderOptions, RPS } from "./models";
import moveInit from "./move";
import { calculateBorder } from "./helper";

export default function init(options: RenderOptions) {
	const { canvas, count, speed, range, FPS, hitbox, drawHitbox, zombie, onGameOver: _onGameOver } = options;
	let currentFPS = FPS;
	let currentCount = count;
	let isZombie = zombie;

	const canvasBorder: Border = {
		top: 0,
		right: canvas.width,
		bottom: canvas.height,
		left: 0,
	};

	const moveParams = {
		border: canvasBorder,
		speed,
		range,
		hitbox,
		isZombie,
		onGameOver: (winner: RPS) => {
			_onGameOver();
			stop();
			setTimeout(() => {
				resetCanvas();
				announceWinner(winner);
			}, 100);
		},
	};

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

	function announceWinner(winner: RPS) {
		context.fillStyle = "white";
		context.font = "bold 200px sans-serif";
		context.fillText(winner, canvas.width / 2, canvas.height / 2 - 50);

		context.font = "bold 100px sans-serif";
		context.fillText("Winner", canvas.width / 2, canvas.height / 2 + 100);
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

	function createItems(): Item[] {
		let id = 0;
		return kinds
			.map((kind) => {
				return new Array(currentCount).fill(undefined).map(() => {
					const pos = generateRandomPosition();
					return { id: id++, kind, ...pos, border: calculateBorder({ ...pos, hitbox }) };
				});
			})
			.flat();
	}

	let items = createItems();

	function drawItems(items: Item[]) {
		items.forEach(({ kind: item, x, y }) => {
			for (let i = 0; i < currentCount; i++) {
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

	let move = moveInit(moveParams);

	let prevDate = Date.now();
	let throttleAmount = 1000 / currentFPS;

	function animate() {
		frame = requestAnimationFrame(() => {
			animate();
		});

		if (Date.now() - prevDate > throttleAmount) {
			prevDate = Date.now();
			resetCanvas();
			items = move(items);
			drawItems(items);
		}
	}

	function start() {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(animate);
	}

	start();

	function stop() {
		cancelAnimationFrame(frame);
	}

	function updateFPS(val: number) {
		currentFPS = val;
		throttleAmount = 1000 / currentFPS;
	}

	function updateCount(val: number) {
		stop();
		currentCount = val;
		items = createItems();
		start();
	}

	function updateZombie(val: boolean) {
		stop();
		moveParams.isZombie = val;
		move = moveInit(moveParams);
		items = createItems();
		start();
	}
	return {
		updateFPS,
		updateCount,
		updateZombie,
		pause: stop,
		play: start,
		resetItems: () => {
			items = createItems();
		},
	};
}
