import { useEffect, useRef, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Flex } from "@chakra-ui/layout";

import { Board } from "models";
import { useBoardStore } from "store";
import { isEmptyObj } from "utils";

import { CardNotFound, ListCreateElement, ListElement, ListElementDroppableContainer } from "views";

type Props = {
    board: Board;
};

export function ListContainer({ board }: Props) {
    const [isEditActive, setIsEditActive] = useState<string | null>(null);
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {
        getActiveBoardData,
        reorderList,
        reorderBoard,
        removeCardFromList,
        addExistingCardToList,
        currentSearchFilter,
    } = useBoardStore((state) => ({
        getActiveBoardData: state.getActiveBoardData,
        reorderList: state.reorderList,
        reorderBoard: state.reorderBoard,
        removeCardFromList: state.removeCardFromList,
        addExistingCardToList: state.addExistingCardToList,
        currentSearchFilter: state.currentSearchFilter,
    }));

    const innerBoardHeight = window.innerHeight - 90;
    //  Note(omer): 90 here is to disable vertical scrolling on outer container, both of the navbards are 45px because they look good that way. h=100% doesnt seem to work

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
            reorderList(
                targetList.cards,
                result.destination.droppableId,
                result.source.index,
                result.destination.index
            );
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
        <Flex p="1em" maxW="100vw" overflow="auto" h={innerBoardHeight}>
            {isEmptyObj(board.lists) && currentSearchFilter ? (
                <CardNotFound />
            ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <ListElementDroppableContainer>
                        {board.listOrder.map((listKey, index) => (
                            <ListElement key={listKey} list={board.lists[listKey]} index={index} />
                        ))}
                    </ListElementDroppableContainer>
                </DragDropContext>
            )}

            <ListCreateElement targetRef={targetRef} isEditActive={isEditActive} setIsEditActive={setIsEditActive} />
        </Flex>
    );
}
