import { Board, Card } from "models";

export function filterBoardData(key: string, board: Board): Board {
    if (!key || !board) return board;

    const lowerKey = key.toLowerCase();
    const copy = { ...board };

    // Use Set to store unique filtered cards.
    const filteredCardsSet: Set<Card> = new Set();

    // Loop over all cards once and add to the set if they match the key.
    for (const list of Object.values(board.lists)) {
        for (const card of list.cards) {
            if (card.name.toLowerCase().includes(lowerKey)) {
                filteredCardsSet.add(card);
                continue; // Skip to next card if name matches.
            }

            if (card.tags.some((tag) => tag.toLowerCase().includes(lowerKey))) {
                filteredCardsSet.add(card);
                continue; // Skip to next card if any tag matches.
            }

            if (card.comments.some((comment) => comment.text.toLowerCase().includes(lowerKey))) {
                filteredCardsSet.add(card);
            }
        }
    }

    // Create new lists object with filtered cards.
    copy.lists = {};
    for (const card of filteredCardsSet) {
        const parentListId = card.parentListId;
        if (!copy.lists[parentListId]) {
            copy.lists[parentListId] = { ...board.lists[parentListId], cards: [] };
        }
        copy.lists[parentListId].cards.push(card);
    }

    return copy;
}
