import create from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { users } from "constants/users";
import { Board, List, Card, Comment } from "models";

type BoardStoreProps = {
    // values
    activeBoardId: string | null;
    boards: Board[];
    currentSearchFilter: string;
    // functions
    addCommentToCard: (cardId: string, listId: string, text: string) => void;
    addDescToCard: (cardId: string, listId: string, text: string) => void;
    addExistingCardToList: (list: List, card: Card, index: number) => void;
    addListToBoard: (name: string) => void;
    addNewCardToList: (listId: string, text: string) => void;
    createNewBoard: (id: string, name: string, themeColor: string) => void;
    deleteCard: (card: Card) => void;
    getActiveBoardData: () => Board | null;
    getCardFromId: (listId: string, cardId: string) => Card | null;
    getCurrentTheme: () => string;
    getListFromId: (listId: string) => List | null;
    removeBoard: (id: string) => void;
    removeCardFromList: (list: List, index: number) => void;
    removeComment: (cardId: string, listId: string, commentId: string) => void;
    removeListFromBoard: (listId: string) => void;
    reorderBoard: (list: string[], startIndex: number, endIndex: number) => void;
    reorderList: (cards: Card[], listId: string, startIndex: number, endIndex: number) => void;
    setActiveBoardId: (id: string | null) => void;
    setCurrentSearchFilter: (value: string) => void;
    toggleFavoriteBoard: (id: string) => void;
    updateCardColor: (cardId: string, listId: string, color: string) => void;
    updateCardName: (cardId: string, listId: string, name: string) => void;
    updateCardTags: (cardId: string, listId: string, tags: string[]) => void;
    updateComment: (cardId: string, listId: string, commentId: string, text: string) => void;
    updateListName: (listId: string, name: string) => void;
};

export const useBoardStore = create<BoardStoreProps>(
    persist(
        (set, get) => ({
            activeBoardId: null,
            boards: [],
            currentSearchFilter: "",
            setActiveBoardId: (id) => {
                // NOTE(omer): Reset filtering upon board change
                set({ activeBoardId: id, currentSearchFilter: "" });
            },
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
                newBoard.lists = {};
                newBoard.listOrder = [];
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
                const uniqId = uuidv4();

                let list = {} as List;
                const boardData = get().getActiveBoardData();
                const boards = get().boards;
                if (!boardData) return;
                list.id = uniqId;
                list.cards = [];
                list.name = name;

                boardData.listOrder = [...boardData.listOrder, uniqId];
                boardData.lists = { ...boardData.lists, [uniqId]: list };

                set({ boards: boards });
            },
            updateListName: (listId, name) => {
                const boardData = get().getActiveBoardData();
                const boards = get().boards;
                if (!boardData) return;
                const targetListKey = Object.keys(boardData.lists).find((x) => x === listId) ?? null;
                if (!targetListKey) return;
                boardData.lists[targetListKey].name = name;
                set({ boards: boards });
            },
            addNewCardToList: (listId, text) => {
                const boardData = get().getActiveBoardData();
                if (!boardData) return;

                const boards = get().boards;
                const card = {} as Card;
                card.id = uuidv4();
                card.parentListId = listId;
                card.name = text;
                // default values for empty card
                card.assignees = [];
                card.comments = [];
                card.description = "";
                card.isFollowed = false;
                card.color = "";
                card.tags = [];

                const targetListKey = Object.keys(boardData.lists).find((x) => x === listId) ?? null;
                if (!targetListKey) return;
                boardData.lists[targetListKey].cards.push(card);

                set({ boards: boards });
            },
            getListFromId: (listId) => {
                const boardData = get().getActiveBoardData();
                if (!boardData) return null;
                const targetListKey = Object.keys(boardData.lists).find((x) => x === listId) ?? null;
                if (!targetListKey) return null;

                const targetList = boardData.lists[targetListKey];
                return targetList;
            },
            getCardFromId: (listId, cardId) => {
                const targetList = get().getListFromId(listId);
                if (!targetList) return null;
                const card = targetList.cards.find((x) => x.id === cardId) ?? null;
                return card;
            },
            addCommentToCard: (cardId, listId, text) => {
                const currentList = get().getListFromId(listId);
                const boards = get().boards;

                const targetCard = currentList?.cards.find((x) => x.id === cardId);
                if (!targetCard) return;
                const comment = {} as Comment;
                comment.createDate = new Date();
                comment.lastEditDate = null;

                comment.text = text;
                comment.user = users[0];
                comment.id = uuidv4();
                targetCard.comments.push(comment);

                set({ boards: boards });
            },
            addDescToCard: (cardId, listId, text) => {
                const currentList = get().getListFromId(listId);
                const boards = get().boards;

                const targetCard = currentList?.cards.find((x) => x.id === cardId);
                if (!targetCard) return;
                targetCard.description = text;

                set({ boards: boards });
            },
            reorderList(cards, listId, startIndex, endIndex) {
                const targetList = get().getListFromId(listId);
                if (!targetList) return null;
                const boards = get().boards;

                const result = Array.from(cards);
                const [removed] = result.splice(startIndex, 1);
                result.splice(endIndex, 0, removed);

                targetList.cards = result;

                set({ boards: boards });
            },
            reorderBoard(list, startIndex, endIndex) {
                const boardData = get().getActiveBoardData();
                if (!boardData) return null;
                const boards = get().boards;

                const result = Array.from(list);
                const [removed] = result.splice(startIndex, 1);
                result.splice(endIndex, 0, removed);

                boardData.listOrder = result;
                set({ boards: boards });
            },
            removeCardFromList: (list, index) => {
                const newList = { ...list, cards: list.cards };
                newList.cards.splice(index, 1);
                const boards = get().boards;
                set({ boards: boards });
            },
            addExistingCardToList: (list, card, index) => {
                const newList = { ...list, cards: list.cards };
                card.parentListId = list.id;
                newList.cards.splice(index, 0, card);
                const boards = get().boards;
                set({ boards: boards });
            },
            removeListFromBoard: (listId) => {
                const currentBoard = get().getActiveBoardData();
                if (!currentBoard) return;
                const boards = get().boards;
                delete currentBoard.lists[listId];
                set({ boards: boards });
            },
            updateCardTags: (cardId, listId, tags) => {
                const card = get().getCardFromId(listId, cardId);
                if (!card) return;
                const boards = get().boards;
                card.tags = tags;

                set({ boards: boards });
            },
            updateCardColor: (cardId, listId, color) => {
                const card = get().getCardFromId(listId, cardId);
                if (!card) return;
                const boards = get().boards;
                card.color = color;

                set({ boards: boards });
            },
            deleteCard: (card) => {
                const parentList = get().getListFromId(card.parentListId);
                if (!parentList) return;
                const boards = get().boards;
                const idx = parentList.cards.findIndex((x) => x.id === card.id);
                parentList.cards.splice(idx, 1);

                set({ boards: boards });
            },
            updateCardName: (cardId, listId, name) => {
                const card = get().getCardFromId(listId, cardId);
                if (!card) return;
                const boards = get().boards;
                card.name = name;
                set({ boards: boards });
            },
            updateComment: (cardId, listId, commentId, text) => {
                const card = get().getCardFromId(listId, cardId);
                if (!card) return;
                const boards = get().boards;
                const targetComment = card.comments.find((x) => x.id === commentId);
                if (!targetComment) return;
                targetComment.text = text;
                targetComment.lastEditDate = new Date();
                set({ boards: boards });
            },
            removeComment: (cardId, listId, commentId) => {
                const card = get().getCardFromId(listId, cardId);
                if (!card) return;
                const boards = get().boards;
                const commentIdx = card.comments.findIndex((x) => x.id === commentId);
                card.comments.splice(commentIdx, 1);
                set({ boards: boards });
            },
            setCurrentSearchFilter: (value) => {
                set({ currentSearchFilter: value });
            },
        }),
        { name: "board-storage" }
    )
);
