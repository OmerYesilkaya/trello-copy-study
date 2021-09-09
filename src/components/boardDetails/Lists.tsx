import { Flex } from "@chakra-ui/layout";
import CreateListElement from "components/list/CreateListElement";
import { Board } from "models/Board";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ListElementDroppableContainer from "components/list/ListElementDroppableContainer";
import ListElement from "components/list/ListElement";
import { useBoardStore } from "store/useBoardStore";

type ListsProps = {
	board: Board;
};

export default function Lists({ board }: ListsProps) {
	const [isEditActive, setIsEditActive] = useState<string | null>(null);
	const targetRef = useRef<HTMLDivElement | null>(null);
	const { getActiveBoardData, reorderList, reorderBoard, removeCardFromList, addExistingCardToList } = useBoardStore((state) => ({
		getActiveBoardData: state.getActiveBoardData,
		reorderList: state.reorderList,
		reorderBoard: state.reorderBoard,
		removeCardFromList: state.removeCardFromList,
		addExistingCardToList: state.addExistingCardToList,
	}));

	function handleDragEnd(result: DropResult) {
		const currentBoard = getActiveBoardData();
		if (!currentBoard) return;
		if (!result.destination) return;

		// if list position changes
		if (result.type === "list") {
			reorderBoard(currentBoard.listOrder, result.source.index, result.destination.index);
		}

		// if reorder within list
		if (result.source.droppableId === result.destination.droppableId && result.type !== "list") {
			const targetList = currentBoard.lists[result.source.droppableId];
			reorderList(targetList.cards, result.destination.droppableId, result.source.index, result.destination.index);
		}

		// moving cards between lists
		if (result.type !== "list" && result.source.droppableId !== result.destination.droppableId) {
			const sourceList = currentBoard.lists[result.source.droppableId];
			const destinationList = currentBoard.lists[result.destination.droppableId];
			const card = sourceList.cards[result.source.index];

			removeCardFromList(sourceList, result.source.index);
			addExistingCardToList(destinationList, card, result.destination.index);
		}
	}

	useEffect(() => {
		// check wheter mouse click is on create list element, if it is not close edit segment
		if (!targetRef.current) return;
		function handleMouseDown(e: MouseEvent) {
			if (targetRef.current && targetRef.current.contains(e.target as any)) return;
			setIsEditActive(null);
		}

		window.addEventListener("mousedown", handleMouseDown);
		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
		};
	}, []);

	return (
		<Flex p="1em" maxW="100vw" overflow="auto" h="100%">
			<DragDropContext onDragEnd={handleDragEnd}>
				<ListElementDroppableContainer>
					{board.listOrder.map((listKey, index) => (
						<ListElement key={listKey} list={board.lists[listKey]} index={index} />
					))}
				</ListElementDroppableContainer>
			</DragDropContext>
			<CreateListElement targetRef={targetRef} isEditActive={isEditActive} setIsEditActive={setIsEditActive} />
		</Flex>
	);
}
