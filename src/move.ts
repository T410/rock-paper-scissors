import { calculateBorder } from "./helper";
import { Border, Item, Preys, RPS } from "./models";

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
let i = 3;
let now = Date.now() - 1000;
function moveTowards(source: Item, target: Item, v: number, hitbox: number): Item {
	const { x: sourceX, y: sourceY } = source;
	const { x: targetX, y: targetY } = target;

	const dx = targetX - sourceX;
	const dy = targetY - sourceY;

	const vx = (dx / (Math.abs(dx) + Math.abs(dy))) * v;
	const vy = (dy / (Math.abs(dx) + Math.abs(dy))) * v;

	const x = sourceX + vx;
	const y = sourceY + vy;

	const newItem = { ...source, x, y };
	const newItemBorder = calculateBorder({ ...newItem, hitbox });

	return {
		...source,
		x,
		y,
		border: newItemBorder,
	};
}

//function that returns the closest item from targets array to the item using 2D coordinates
function getClosest(item: Item, targets: Item[]) {
	let closest: Item | undefined;
	let closestDistance = Infinity;
	targets.forEach((target) => {
		const dx = item.x - target.x;
		const dy = item.y - target.y;
		const d = Math.sqrt(dx * dx + dy * dy);
		if (d < closestDistance) {
			closest = target;
			closestDistance = d;
		}
	});
	return closest;
}

function getPreyKind(kind: RPS) {
	return RPS[Preys[kind]];
}

function getPreys(item: Item, targets: Item[]) {
	return targets.filter((n) => n.kind === getPreyKind(item.kind));
}

function move(positions: Item[], speed: number, range: number, hitbox: number) {
	return positions.map((item) => {
		const preys = getPreys(item, getNeighbours(item, positions, range));

		if (preys.length > 0) {
			const prey = getClosest(item, preys);
			return moveTowards(item, prey, speed, hitbox);
		}
		return {
			...item,
			x: item.x + getRandomMovement(speed),
			y: item.y + getRandomMovement(speed),
		};
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

function checkConverts(items: Item[]) {
	for (let i = 0; i < items.length; i++) {
		const source = items[i];
		for (let j = 0; j < items.length; j++) {
			const target = items[j];
			if (i !== j) {
				if (getPreyKind(target.kind) === source.kind && checkCollision(source.border, target.border)) {
					items[i] = {
						...source,
						kind: target.kind,
					};
				}
				continue;
			}
		}
	}
	return items;
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
		positions = checkConverts(positions);
		return positions.map((item) => {
			const { x, y } = item;
			return {
				...item,
				x: constraint({ x, border, hitbox }).x,
				y: constraint({ y, border, hitbox }).y,
				border: calculateBorder({ ...item, hitbox }),
			};
		});
	};
}
