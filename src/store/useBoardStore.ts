import { Board } from "models/Board";
import create from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "utils/generateId";
import { List } from "models/List";
import { Card } from "models/Card";
import { Comment } from "models/Comment";
import { users } from "constants/users";

type BoardStoreProps = {
	activeBoardId: string | null;
	boards: Board[];
	setActiveBoardId: (id: string | null) => void;
	getActiveBoardData: () => Board | null;
	createNewBoard: (id: string, name: string, themeColor: string) => void;
	removeBoard: (id: string) => void;
	getCurrentTheme: () => string;
	toggleFavoriteBoard: (id: string) => void;
	addListToBoard: (name: string) => void;
	updateListName: (listId: string, name: string) => void;
	addCardToList: (listId: string, text: string) => void;
	getListFromId: (listId: string) => List | null;
	addCommentToCard: (cardId: string, listId: string, text: string) => void;
	addDescToCard: (cardId: string, listId: string, text: string) => void;
};

export const useBoardStore = create<BoardStoreProps>(
	persist(
		(set, get) => ({
			activeBoardId: null,
			boards: [],
			setActiveBoardId: (id) => set({ activeBoardId: id }),
			getActiveBoardData: () => {
				const boards = get().boards;
				const activeBoardId = get().activeBoardId;
				const targetBoard = boards.find((x) => x.id === activeBoardId) ?? null;
				return targetBoard;
			},
			createNewBoard: (id, name, themeColor) => {
				const newBoard = {} as Board;
				newBoard.id = id;
				newBoard.name = name;
				newBoard.themeColor = themeColor;

				newBoard.assignees = [];
				newBoard.isFavorited = false;
				newBoard.lists = [];
				set((prev) => ({ boards: [...prev.boards, newBoard] }));
			},
			removeBoard: (id) => {
				set((prev) => {
					let copy = [...prev.boards];
					copy = copy.filter((x) => x.id !== id);
					return { boards: copy };
				});
			},
			getCurrentTheme: () => {
				const activeBoardId = get().activeBoardId;
				const getActiveBoardData = get().getActiveBoardData;
				if (!activeBoardId) return "blue";
				const data = getActiveBoardData();
				if (data) {
					return data.themeColor;
				}
				return "blue";
			},
			toggleFavoriteBoard: (id) => {
				const boards = get().boards;
				let copy = [...boards];
				const newBoards = copy.map((x) => {
					if (x.id === id) {
						x.isFavorited = !x.isFavorited;
					}
					return x;
				});
				set({ boards: newBoards });
			},
			addListToBoard: (name) => {
				let list = {} as List;
				const boardData = get().getActiveBoardData();
				const boards = get().boards;
				if (!boardData) return;
				list.id = generateId();
				list.cards = [];
				list.name = name;
				list.position = boardData.lists.length;
				boardData.lists.push(list);

				set({ boards: boards });
			},
			updateListName: (listId, name) => {
				const currentBoard = get().getActiveBoardData();
				const boards = get().boards;
				const targetList = currentBoard?.lists.find((x) => x.id === listId) ?? null;
				if (!targetList) return;
				targetList.name = name;
				set({ boards: boards });
			},
			addCardToList: (listId, text) => {
				const boardData = get().getActiveBoardData();
				const boards = get().boards;
				const card = {} as Card;
				card.id = generateId();
				card.parentListId = listId;
				card.name = text;
				// default values for empty card
				card.assignees = [];
				card.comments = [];
				card.description = "";
				card.isFollowed = false;
				card.thumbnail = "";

				const targetList = boardData?.lists.find((x) => x.id === listId) ?? ({} as List);
				targetList.cards.push(card);

				set({ boards: boards });
			},
			getListFromId: (listId) => {
				const boardData = get().getActiveBoardData();

				const list = boardData?.lists.find((x) => x.id === listId) ?? null;
				return list;
			},
			addCommentToCard: (cardId, listId, text) => {
				const currentList = get().getListFromId(listId);
				const boards = get().boards;

				const targetCard = currentList?.cards.find((x) => x.id === cardId);
				if (!targetCard) return;
				const comment = {} as Comment;
				comment.createDate = new Date();
				comment.replies = [];

				comment.text = text;
				comment.user = users[0];
				comment.id = generateId();
				targetCard.comments.push(comment);

				set({ boards: boards });
			},
			addDescToCard: (cardId, listId, text) => {
				const currentList = get().getListFromId(listId);
				const boards = get().boards;

				const targetCard = currentList?.cards.find((x) => x.id === cardId);
				if (!targetCard) return;
				console.log("TargetCard", targetCard);
				console.log("tyext", text);
				targetCard.description = text;

				set({ boards: boards });
			},
		}),
		{ name: "board-storage" }
	)
);
