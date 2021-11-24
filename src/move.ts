import { Border, ItemPosition } from "./models";

const fontSize = 25;

//function that returns either MAX or -MAX
function getRandomMovement(v: number) {
	return Math.random() < 0.5 ? -v : v;
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
	return { x, y };
}

export default function init({ border, v }: { border: Border; v: number }) {
	return function move(positions: ItemPosition[]) {
		return positions.map(({ item, x, y }) => {
			return {
				item,
				x: constraint({ x: x + getRandomMovement(v), border }).x,
				y: constraint({ y: y + getRandomMovement(v), border }).y,
			};
		});
	};
}
