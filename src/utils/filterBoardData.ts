import { Board } from "models/Board";
import { Card } from "models/Card";
import { ListMap } from "models/List";

export default function filterBoardData(key: string, board: Board): Board {
	if (!key) return board;
	const copy = { ...board };

	const filteredCards = Object.values(copy.lists).reduce((acc, cur) => {
		const filteredInTitles = cur.cards.filter((x) => x.name.toLowerCase().includes(key.toLowerCase()));
		const filteredInTags = cur.cards.filter((x) => x.tags.filter((x) => x.toLowerCase().includes(key.toLowerCase())).length > 0);
		const filteredInComments = cur.cards.filter((x) => x.comments.filter((x) => x.text.toLowerCase().includes(key.toLowerCase())).length > 0);

		return [...acc, ...filteredInTitles, ...filteredInTags, ...filteredInComments];
	}, [] as Card[]);

	copy.lists = filteredCards.reduce((acc, cur: Card) => {
		const newCards = board.lists[cur.parentListId].cards.filter((x) => x.id === cur.id);
		return { ...acc, [cur.parentListId]: { ...board.lists[cur.parentListId], cards: newCards } } as ListMap;
	}, {} as ListMap);

	return copy;
}

// Note(omer): I dont know how costly this is, maybe do something better for search in the future..
