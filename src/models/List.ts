import { Card } from "./Card";

export type ListMap = {
	[key: string]: List;
};

export type List = {
	id: string;
	name: string;
	cards: Card[];
};
