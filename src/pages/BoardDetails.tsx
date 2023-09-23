import { useEffect } from "react";
import { useParams } from "react-router";
import shallow from "zustand/shallow";
import { Box, Flex } from "@chakra-ui/layout";

import { BoardNavbar, ListContainer } from "views";
import { useBoardStore } from "store";
import { filterBoardData } from "utils";

export function BoardDetails() {
    const { id } = useParams<{ id: string }>();
    const { getBoardData, setActiveBoardId, getCurrentTheme, currentSearchFilter } = useBoardStore(
        (state) => ({
            getBoardData: state.getActiveBoardData,
            setActiveBoardId: state.setActiveBoardId,
            getCurrentTheme: state.getCurrentTheme,
            currentSearchFilter: state.currentSearchFilter,
        }),
        shallow
    );
    const boardData = getBoardData();

    useEffect(() => {
        setActiveBoardId(id);
    }, [setActiveBoardId, id]);

    if (!boardData) return null;

    const filteredBoardData = filterBoardData(currentSearchFilter, boardData);

    return (
        <Box bg={`${getCurrentTheme()}.900`} w="100%" h="100%">
            <Flex className="pattern" direction={"column"} w="100%" h="100%">
                <BoardNavbar data={boardData} />
                <ListContainer board={filteredBoardData} />
            </Flex>
        </Box>
    );
}
