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

function moveTowards(source: ItemPosition, target: ItemPosition, v: number): ItemPosition {
	const { x: sourceX, y: sourceY } = source;
	const { x: targetX, y: targetY } = target;
	const angle = Math.atan2(targetY - sourceY, targetX - sourceX);
	//move sourceX sourceY to targetX targetY by v amount in 2D coordinates system
	return {
		...source,
		x: sourceX + v * Math.cos(angle),
		y: sourceY + v * Math.sin(angle),
	};
}

function behaviour(positions: ItemPosition[], speed: number, range: number) {
	return positions.map((item) => {
		const neighbours = getNeighbours(item, positions, range);

		if (item.item === RPS.Rock && neighbours.some((n) => n.item === RPS.Scissors)) {
			// console.log("Rock to Scissors");
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Scissors),
				speed
			);
		} else if (item.item === RPS.Paper && neighbours.some((n) => n.item === RPS.Rock)) {
			// console.log("Paper to Rock");
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Rock),
				speed
			);
		} else if (item.item === RPS.Scissors && neighbours.some((n) => n.item === RPS.Paper)) {
			// console.log("Scissors to Paper");
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
