import { Text } from "@chakra-ui/layout";
import { Board } from "models/Board";
import { MotionCenter, MotionFlex } from "motion/chakra";
import { RiCloseLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { useBoardStore } from "store/useBoardStore";

type BoardCardProps = {
	board: Board;
};
type DeleteButtonProps = {
	id: string;
};

function DeleteButton({ id }: DeleteButtonProps) {
	const { removeBoard } = useBoardStore((state) => ({ removeBoard: state.removeBoard }));
	return (
		<MotionCenter
			whileHover={{ backgroundColor: "#ffffffa9" }}
			onClick={(e: React.MouseEvent<HTMLElement>) => {
				e.stopPropagation();
				removeBoard(id);
			}}
			w="16px"
			h="16px"
			borderRadius="50%"
			bg="#ffffff39"
			color="gray.700"
			top="5px"
			right="5px"
			position="absolute"
		>
			<RiCloseLine size="1em" />
		</MotionCenter>
	);
}

export default function BoardCard({ board }: BoardCardProps) {
	const history = useHistory();

	return (
		<MotionFlex
			whileHover={{ filter: "brightness(1.1)" }}
			cursor="pointer"
			w="100%"
			h="100px"
			borderRadius="md"
			boxShadow="lg"
			bg={`${board.themeColor}.400`}
			p="0.5em"
			color="white"
			fontWeight="bold"
			onClick={() => {
				history.push(`/board/${board.id}`);
			}}
			position="relative"
		>
			<Text fontSize="md">{board.name}</Text>
			<MotionCenter>{board.isFavorited}</MotionCenter>
			<DeleteButton id={board.id} />
		</MotionFlex>
	);
}