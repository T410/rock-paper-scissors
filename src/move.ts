import { Border, ItemPosition, RPS } from "./models";

const fontSize = 25;
const viewRange = 500;

//function that returns either MAX or -MAX
function getRandomMovement(v: number) {
	return Math.random() > 0.5 ? v : -v;
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

function getNeighbours(item: ItemPosition, items: ItemPosition[]) {
	const r = viewRange;
	const x = item.x;
	const y = item.y;
	const neighbours = items.filter((i) => {
		if (i.id === item.id) {
			return false;
		}
		const dx = x - i.x;
		const dy = y - i.y;
		const d = Math.sqrt(dx * dx + dy * dy);
		return d < r;
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

function behaviour(positions: ItemPosition[], v: number) {
	return positions.map((item) => {
		const neighbours = getNeighbours(item, positions);

		if (item.item === RPS.Rock && neighbours.some((n) => n.item === RPS.Scissors)) {
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Scissors),
				v
			);
		} else if (item.item === RPS.Paper && neighbours.some((n) => n.item === RPS.Rock)) {
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Rock),
				v
			);
		} else if (item.item === RPS.Scissors && neighbours.some((n) => n.item === RPS.Paper)) {
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Paper),
				v
			);
		} else {
			return {
				...item,
				x: item.x + getRandomMovement(v),
				y: item.y + getRandomMovement(v),
			};
		}
	});
}

export default function init({ border, v }: { border: Border; v: number }) {
	return function move(positions: ItemPosition[]) {
		const newPositions = behaviour(positions, v);
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
