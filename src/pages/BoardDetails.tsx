import { Flex } from "@chakra-ui/layout";
import BoardNavbar from "components/boardDetails/BoardNavbar";
import Lists from "components/boardDetails/Lists";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useBoardStore } from "store/useBoardStore";
import filterBoardData from "utils/filterBoardData";

type BoardParams = {
	id: string;
};

export default function BoardDetails() {
	const { id } = useParams<BoardParams>();
	const { getBoardData, setActiveBoardId, getCurrentTheme, currentSearchFilter } = useBoardStore((state) => ({
		getBoardData: state.getActiveBoardData,
		setActiveBoardId: state.setActiveBoardId,
		getCurrentTheme: state.getCurrentTheme,
		currentSearchFilter: state.currentSearchFilter,
	}));

	const boardData = getBoardData();

	useEffect(() => {
		setActiveBoardId(id);
	}, [setActiveBoardId, id]);

	if (!boardData) return null;

	const filteredBoardData = filterBoardData(currentSearchFilter, boardData);

	return (
		<Flex direction="column" bg={`${getCurrentTheme()}.400`} w="100%" h="100%">
			<BoardNavbar data={boardData} />
			<Lists board={filteredBoardData} />
		</Flex>
	);
}
