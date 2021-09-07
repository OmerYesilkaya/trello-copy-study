import { Flex } from "@chakra-ui/layout";
import BoardNavbar from "components/boardDetails/BoardNavbar";
import Lists from "components/boardDetails/Lists";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useBoardStore } from "store/useBoardStore";

type BoardParams = {
	id: string;
};

export default function BoardDetails() {
	const { id } = useParams<BoardParams>();
	const { getBoardData, setActiveBoardId, getCurrentTheme } = useBoardStore((state) => ({
		getBoardData: state.getActiveBoardData,
		setActiveBoardId: state.setActiveBoardId,
		getCurrentTheme: state.getCurrentTheme,
	}));

	const boardData = getBoardData();

	useEffect(() => {
		setActiveBoardId(id);
	}, [setActiveBoardId, id]);

	if (!boardData) return null;

	return (
		<Flex direction="column" bg={`${getCurrentTheme()}.400`} w="100%" h="100%">
			<BoardNavbar data={boardData} />
			<Lists board={boardData} />
		</Flex>
	);
}
