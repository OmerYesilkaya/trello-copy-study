import { useEffect } from "react";
import { Flex } from "@chakra-ui/layout";

import { useBoardStore } from "store";
import { BoardContainer, SideBar } from "views";

export function Home() {
    const { setActiveBoardId } = useBoardStore((state) => ({ setActiveBoardId: state.setActiveBoardId }));

    useEffect(() => {
        setActiveBoardId(null);
    }, [setActiveBoardId]);

    return (
        <Flex w="55%" mt="2em">
            <SideBar />
            <BoardContainer />
        </Flex>
    );
}
