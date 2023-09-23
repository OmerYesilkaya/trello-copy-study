import { forwardRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { FaPlus } from "react-icons/fa";

import { useBoardStore } from "store";

type Props = {
    isEditActive: string | null;
    setIsEditActive: (value: string | null) => void;
};

export const ListCreateElement = forwardRef<HTMLDivElement, Props>(({ isEditActive, setIsEditActive }, targetRef) => {
    const [listName, setListName] = useState("");
    const { getCurrentTheme, addListToBoard } = useBoardStore((state) => ({
        getCurrentTheme: state.getCurrentTheme,
        addListToBoard: state.addListToBoard,
    }));
    function handleAddList(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (!listName) return;
        e.stopPropagation();
        addListToBoard(listName);
        setListName("");
    }

    return (
        <Flex
            cursor="pointer"
            ref={targetRef}
            fontSize="sm"
            color={isEditActive ? "gray.800" : "white"}
            bg={isEditActive ? "gray.200" : "whiteAlpha.500"}
            borderRadius="md"
            px="0.5em"
            py="2px"
            minW="300px"
            h="max-content"
            minH="35px"
            onClick={() => setIsEditActive("new")}
        >
            {isEditActive ? (
                <Flex direction="column" w="100%">
                    <Input
                        autoFocus
                        mt="2px"
                        w="100%"
                        size="sm"
                        placeholder="Enter the name of the list..."
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                    <Flex align="center" py="5px">
                        <Button size="sm" colorScheme={getCurrentTheme()} onClick={(e) => handleAddList(e)} mr="0.5em">
                            Add to List
                        </Button>
                        <CloseButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditActive(null);
                            }}
                        />
                    </Flex>
                </Flex>
            ) : (
                <Flex align="center" h="30px" px="0.5em">
                    <FaPlus />
                    <Text ml="5px">Add another list</Text>
                </Flex>
            )}
        </Flex>
    );
});
