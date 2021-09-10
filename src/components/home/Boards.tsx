import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Flex, Grid, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { FaPlus } from "react-icons/fa";
import { useBoardStore } from "store/useBoardStore";
import BoardCard from "./BoardCard";
import CreateBoardModal from "./CreateBoardModal";

export default function Boards() {
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
					<Text>Aktif panonuz bulunmamaktadır. Aşağıdaki butona basıp oluşturabilirsiniz.</Text>
				) : (
					<Grid w="100%" templateColumns={`repeat(${isLargerThan1280 ? 4 : 3},1fr)`} gap="10px" placeItems="center">
						{boards.map((board) => (
							<BoardCard key={board.id} board={board} />
						))}
					</Grid>
				)}
			</Flex>
			<Button w="max-content" mx="auto" colorScheme="twitter" mt="auto" fontSize="14px" onClick={onOpen}>
				<Text mr="4px">Pano Oluştur</Text> <FaPlus size="0.8em" />
			</Button>
			<CreateBoardModal isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
}
