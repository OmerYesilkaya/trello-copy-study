import { Board } from "models/Board";
import create from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "utils/generateId";
import { List } from "models/List";

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
				// TODO(omer): handle error if board not found with given id
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
				// TODO(omer): maybe show toast informing the user that this board is now favorited
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
				// Note: Hack!
			},
			updateListName: (listId, name) => {},
		}),
		{ name: "board-storage" }
	)
);
