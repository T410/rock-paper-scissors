function calculateBorder({ x, y, hitbox }: { x: number; y: number; hitbox: number }) {
	return {
		top: y - hitbox / 2,
		right: x + hitbox / 2,
		bottom: y + hitbox / 2,
		left: x - hitbox / 2,
	};
}

export { calculateBorder };
