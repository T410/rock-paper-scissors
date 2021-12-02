//rock paper scissors enum
export enum RPS {
	Rock = "🧱",
	Paper = "📄",
	Scissors = "✂️",
}

export interface RenderOptions {
	canvas: HTMLCanvasElement;
	count: number;
	speed:number;
	range:number;
}

export interface ItemPosition {
	id: number;
	item: string;
	x: number;
	y: number;
}

export interface Border {
	top: number;
	right: number;
	bottom: number;
	left: number;
}
