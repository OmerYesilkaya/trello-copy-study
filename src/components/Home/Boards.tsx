import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { FaPlus } from "react-icons/fa";

export default function Boards() {
	function handleCreateBoard() {
		// TODO(omer): open up a modal asking board name and other minor stuff (theme color, people to add, etc..)
	}

	return (
		<Flex
			fontSize="14px"
			border="3px dashed"
			borderColor="#E4F0F6"
			p="1em"
			mx="1em"
			borderRadius="2px"
			w="100%"
			direction="column"
			align="center"
		>
			<Text>You currently dont have any active boards, click below to create one</Text>
			<Button colorScheme="twitter" mt="auto" fontSize="14px" onClick={handleCreateBoard}>
				<Text mr="4px">Create Board</Text> <FaPlus size="0.8em" />
			</Button>
		</Flex>
	);
}
