import { Board } from "models/Board";
import create from "zustand";
import { persist } from "zustand/middleware";

type BoardStoreProps = {
	activeBoardId: string | null;
	boards: Board[];
	setActiveBoardId: (id: string | null) => void;
	getBoardData: (id: string) => Board | null;
	createNewBoard: (id: string, name: string, themeColor: string) => void;
	removeBoard: (id: string) => void;
	getCurrentTheme: () => string;
	toggleFavoriteBoard: (id: string) => void;
};

export const useBoardStore = create<BoardStoreProps>(
	persist(
		(set, get) => ({
			activeBoardId: null,
			boards: [],
			setActiveBoardId: (id) => set({ activeBoardId: id }),
			getBoardData: (id) => {
				const boards = get().boards;
				const targetBoard = boards.find((x) => x.id === id) ?? null;
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
				const getBoardData = get().getBoardData;
				if (!activeBoardId) return "blue";
				const data = getBoardData(activeBoardId);
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
		}),
		{ name: "board-storage" }
	)
);
