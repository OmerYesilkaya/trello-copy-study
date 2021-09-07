import { Button, IconButton } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Flex, Text } from "@chakra-ui/layout";
import { List } from "models/List";
import { FaCamera, FaPlus, FaTrello } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

type Props = {
	list: List;
};

export default function ListElement({ list }: Props) {
	return (
		<Flex
			justify="center"
			fontSize="sm"
			borderRadius="md"
			px="0.5em"
			py="2px"
			minW="300px"
			h="max-content"
			bg="gray.200"
			mr="10px"
			minH="35px"
			direction="column"
		>
			<Flex align="center" justify="space-between">
				<Flex align="center" my="3px">
					<FaTrello />
					<Editable ml="5px" defaultValue={list.name}>
						<EditableInput px="5px" />
						<EditablePreview px="5px" />
					</Editable>
				</Flex>
				<IconButton size="xs" aria-label="More Actions" icon={<FiMoreHorizontal />} />
			</Flex>
			<Flex align="center" my="5px" color="gray.500">
				<Button size="xs" fontWeight="normal" w="100%" mr="5px">
					<FaPlus size="0.8em" />{" "}
					<Text mr="auto" ml="5px">
						Kart ekle
					</Text>
				</Button>
				<IconButton size="xs" aria-label="Add Video" icon={<FaCamera />} mr="5px" />
				<IconButton size="xs" aria-label="Create from Theme" icon={<FaTrello />} />
			</Flex>
		</Flex>
	);
}
