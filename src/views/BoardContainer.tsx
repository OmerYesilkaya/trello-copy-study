import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Flex, Grid, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { FaPlus } from "react-icons/fa";

import { useBoardStore } from "store";
import { BoardCard, BoardCreateModal } from "views";

export function BoardContainer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { boards } = useBoardStore((state) => ({ boards: state.boards }));
    const [isLargerThan1280] = useMediaQuery("(min-width: 1400px)");

    return (
        <Flex w="100%" direction="column" mx="1em">
            <Flex
                fontSize="14px"
                border="3px dashed"
                borderColor="#E4F0F6"
                p="1em"
                mb="1em"
                borderRadius="2px"
                w="100%"
                direction="column"
                align="center"
            >
                {boards.length === 0 ? (
                    <Text>You do not have any boards. Click the button below to create one.</Text>
                ) : (
                    <Grid
                        w="100%"
                        templateColumns={`repeat(${isLargerThan1280 ? 4 : 3},1fr)`}
                        gap="10px"
                        placeItems="center"
                    >
                        {boards.map((board) => (
                            <BoardCard key={board.id} board={board} />
                        ))}
                    </Grid>
                )}
            </Flex>
            <Button w="max-content" mx="auto" colorScheme="twitter" mt="auto" fontSize="14px" onClick={onOpen}>
                <Text mr="4px">Create a board</Text> <FaPlus size="0.8em" />
            </Button>
            <BoardCreateModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}
