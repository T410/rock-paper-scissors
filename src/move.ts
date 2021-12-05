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

function getPreyKind(kind: RPS) {
	return RPS[Preys[kind]];
}

function getPreys(item: Item, targets: Item[]) {
	return targets.filter((n) => n.item === getPreyKind(item.item as RPS));
}

function move(positions: Item[], speed: number, range: number, hitbox: number) {
	return positions.map((item) => {
		const neighbours = getNeighbours(item, positions, range);
		const preys = getPreys(item, neighbours);

		if (preys.length > 0) {
			const prey = preys[0];
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

function checkConverts(item: Item, _index: number, array: Item[], hitbox: number) {
	let r: Item = { ...item };
	array.forEach((n) => {
		if (item.id !== n.id && checkCollision(item.border, n.border)) {
			if (getPreyKind(n.item as RPS) === item.item) {
				r = { ...item, item: n.item };
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
	};
}
