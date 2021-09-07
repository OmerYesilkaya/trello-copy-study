import { Card } from "./Card";

export type List = {
	id: string;
	name: string;
	cards: Card[];
	position: number;
};
