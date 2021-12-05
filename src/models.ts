//rock paper scissors enum
export enum RPS {
	Rock = "🧱",
	Paper = "📄",
	Scissors = "✂️",
}

export enum Preys {
	"🧱" = "Scissors",
	"📄" = "Rock",
	"✂️" = "Paper",
}

export interface RenderOptions {
	canvas: HTMLCanvasElement;
	count: number;
	speed: number;
	range: number;
	FPS: number;
	hitbox: number;
}

export interface Item extends Point2D {
	id: number;
	item: string;
	border: Border;
}

export interface Border {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

export interface Point2D {
	x: number;
	y: number;
}
