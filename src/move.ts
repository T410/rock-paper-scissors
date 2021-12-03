import { calculateBorder } from "./helper";
import { Border, Item, Point2D, RPS } from "./models";

const viewRange = 100;

//function that returns either MAX or -MAX
function getRandomMovement(speed: number) {
	return Math.random() > 0.5 ? speed : -speed;
}

function constraint({ x, y, border, hitbox }: { x?: number; y?: number; border: Border; hitbox: number }) {
	if (x) {
		if (x - hitbox < border.left) {
			x = border.left + hitbox;
		}
		if (x + hitbox > border.right) {
			x = border.right - hitbox;
		}
	} else if (y) {
		if (y - hitbox < border.top) {
			y = border.top + hitbox;
		}
		if (y + hitbox > border.bottom) {
			y = border.bottom - hitbox;
		}
	}
	return { x: Math.floor(x), y: Math.floor(y) };
}

function getNeighbours(item: Item, items: Item[], range: number) {
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

function moveTowards(source: Item, target: Item, v: number, hitbox: number): Item {
	const { x: sourceX, y: sourceY } = source;
	const { x: targetX, y: targetY } = target;
	const angle = Math.atan2(targetY - sourceY, targetX - sourceX);
	//move sourceX sourceY to targetX targetY by v amount in 2D coordinates system#
	const x = sourceX + v * Math.cos(angle);
	const y = sourceY + v * Math.sin(angle);
	const newItem = { ...source, x, y };
	const newItemBorder = calculateBorder({ ...newItem, hitbox });

	// const newX = sourceX + v * Math.cos(angle);
	// const newY = sourceY + v * Math.sin(angle);
	return {
		...source,
		x,
		y,
		border: newItemBorder,
	};
}

function move(positions: Item[], speed: number, range: number, hitbox: number) {
	return positions.map((item) => {
		const neighbours = getNeighbours(item, positions, range);

		if (item.item === RPS.Rock && neighbours.some((n) => n.item === RPS.Scissors)) {
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Scissors),
				speed,
				hitbox
			);
		} else if (item.item === RPS.Paper && neighbours.some((n) => n.item === RPS.Rock)) {
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Rock),
				speed,
				hitbox
			);
		} else if (item.item === RPS.Scissors && neighbours.some((n) => n.item === RPS.Paper)) {
			return moveTowards(
				item,
				neighbours.find((n) => n.item === RPS.Paper),
				speed,
				hitbox
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

function checkCollision(origin: Border, target: Border) {
	if (
		origin.right > target.left &&
		origin.left < target.right &&
		origin.bottom > target.top &&
		origin.top < target.bottom
	) {
		return true;
	}
	return false;
}

function checkConverts(item: Item, _index: number, array: Item[], hitbox: number) {
	let r: Item = { ...item };
	array.forEach((n) => {
		if (item.id !== n.id && checkCollision(item.border, n.border)) {
			switch (item.item) {
				case RPS.Rock: {
					if (n.item === RPS.Paper) {
						r = { ...item, item: RPS.Paper };
					}
					break;
				}
				case RPS.Paper: {
					if (n.item === RPS.Scissors) {
						r = { ...item, item: RPS.Scissors };
					}
					break;
				}
				case RPS.Scissors: {
					if (n.item === RPS.Rock) {
						r = { ...item, item: RPS.Rock };
					}
					break;
				}
			}
		}
	});
	return r;
}

export default function init({
	border,
	speed,
	range,
	hitbox,
}: {
	border: Border;
	speed: number;
	range: number;
	hitbox: number;
}) {
	return function moveInit(positions: Item[]) {
		positions = move(positions, speed, range, hitbox).map((x) => {
			return { ...x, border: calculateBorder({ ...x, hitbox }) };
		});
		positions = positions.map((item, i, a) => {
			const c = checkConverts(item, i, a, hitbox);
			const { x, y } = item;
			return {
				...c,
				x: constraint({ x, border, hitbox }).x,
				y: constraint({ y, border, hitbox }).y,
			};
		});
		return positions;
		// return newPositions.map((item) => {
		// 	const { x, y } = item;
		// 	return {
		// 		...item,
		// 		x: constraint({ x, border, hitbox }).x,
		// 		y: constraint({ y, border, hitbox }).y,
		// 	};
		// });
	};
}
