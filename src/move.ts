import { Border, ItemPosition, RPS } from "./models";

const fontSize = 25;
const viewRange = 100;

//function that returns either MAX or -MAX
function getRandomMovement(speed: number) {
	return Math.random() > 0.5 ? speed : -speed;
}

function constraint({ x, y, border }: { x?: number; y?: number; border: Border }) {
	if (x) {
		if (x < border.left) {
			x = border.left + fontSize;
		}
		if (x > border.right) {
			x = border.right - fontSize;
		}
	} else if (y) {
		if (y < border.top) {
			y = border.top + fontSize;
		}
		if (y > border.bottom) {
			y = border.bottom - fontSize;
		}
	}
	return { x: Math.floor(x), y: Math.floor(y) };
}

function getNeighbours(item: ItemPosition, items: ItemPosition[], range: number) {
	const x = item.x;
	const y = item.y;
	const neighbours = items.filter((i) => {
		if (i.id === item.id) {
			return false;
		}
		const dx = x - i.x;
		const dy = y - i.y;
		const d = Math.sqrt(dx * dx + dy * dy);
		return d < range;
	});

	return neighbours;
}

function moveTowards(source: ItemPosition, target: ItemPosition, v: number) {
	//given a source and target
	//calculate the angle between them
	const angle = Math.atan2(target.y - source.y, target.x - source.x);
	//calculate the distance between them
	const distance = Math.sqrt(Math.pow(target.y - source.y, 2) + Math.pow(target.x - source.x, 2));
	const x = Math.cos(angle) * v;
	const y = Math.sin(angle) * v;
	return {
		...source,
		x: Math.floor(x),
		y: Math.floor(y),
	};
}

function behaviour(positions: ItemPosition[], speed: number, range: number) {
	return positions.map((item) => {
		const neighbours = getNeighbours(item, positions, range);

		if (item.item === RPS.Rock && neighbours.some((n) => n.item === RPS.Scissors)) {
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Scissors),
				speed
			);
		} else if (item.item === RPS.Paper && neighbours.some((n) => n.item === RPS.Rock)) {
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Rock),
				speed
			);
		} else if (item.item === RPS.Scissors && neighbours.some((n) => n.item === RPS.Paper)) {
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Paper),
				speed
			);
		} else {
			return {
				...item,
				x: item.x + getRandomMovement(speed),
				y: item.y + getRandomMovement(speed),
			};
		}
	});
}

export default function init({ border, speed, range }: { border: Border; speed: number; range: number }) {
	return function move(positions: ItemPosition[]) {
		const newPositions = behaviour(positions, speed, range);
		return newPositions.map((item) => {
			const { x, y } = item;
			return {
				...item,
				x: constraint({ x, border }).x,
				y: constraint({ y, border }).y,
			};
		});
	};
}
