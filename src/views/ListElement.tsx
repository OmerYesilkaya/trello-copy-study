import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Flex } from "@chakra-ui/layout";
import { Input, Button, CloseButton } from "@chakra-ui/react";

import { List } from "models";
import { useBoardStore } from "store";
import { ListActionButtons, ListEditableName, CardsDroppableContainer } from "views";

type Props = {
    list: List;
    index: number;
};

export function ListElement({ list, index }: Props) {
    const { getCurrentTheme, addNewCardToList } = useBoardStore((state) => ({
        getCurrentTheme: state.getCurrentTheme,
        addNewCardToList: state.addNewCardToList,
    }));
    const targetRef = useRef<HTMLDivElement | null>(null);
    const [isEditActive, setIsEditActive] = useState<string | null>(null);
    const [cardText, setCardText] = useState<string>("");

    function handleAddCard(listId: string) {
        if (!cardText) return;
        addNewCardToList(listId, cardText);
        setCardText("");
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

    if (!list) return null;
    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided, snapshot) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <Flex
                        justify="center"
                        fontSize="sm"
                        borderRadius="md"
                        px="0.5em"
                        py="2px"
                        w="300px"
                        h="max-content"
                        bg="gray.200"
                        mr="10px"
                        wordBreak="break-word"
                        direction="column"
                        ref={targetRef}
                    >
                        <ListEditableName list={list} isDragging={snapshot.isDragging} {...provided.dragHandleProps} />
                        <CardsDroppableContainer list={list} />
                        {isEditActive ? (
                            <Flex direction="column" mb="5px" mt="5px">
                                <Input
                                    autoFocus
                                    size="sm"
                                    placeholder="Enter a name for the card..."
                                    value={cardText}
                                    onChange={(e) => setCardText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleAddCard(list.id);
                                        }
                                    }}
                                />
                                <Flex mt="5px">
                                    <Button
                                        colorScheme={getCurrentTheme()}
                                        size="xs"
                                        onClick={() => handleAddCard(list.id)}
                                    >
                                        Add card
                                    </Button>
                                    <CloseButton size="sm" ml="5px" onClick={() => setIsEditActive(null)} />
                                </Flex>
                            </Flex>
                        ) : (
                            <ListActionButtons setIsEditActive={(e) => setIsEditActive(e)} list={list} />
                        )}
                    </Flex>
                </div>
            )}
        </Draggable>
    );
}
