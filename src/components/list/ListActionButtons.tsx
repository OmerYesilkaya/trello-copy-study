import { Button, IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { List } from "models/List";
import { FaCamera, FaPlus, FaTrello } from "react-icons/fa";

type ListActionButtonProps = {
	setIsEditActive: React.Dispatch<React.SetStateAction<string | null>>;
	list: List;
};

export function ListActionButtons({ setIsEditActive, list }: ListActionButtonProps) {
	return (
		<Flex align="center" my="5px" color="gray.500">
			<Button size="xs" fontWeight="normal" w="100%" mr="5px" onClick={() => setIsEditActive(list.id)}>
				<FaPlus size="0.8em" />{" "}
				<Text mr="auto" ml="5px">
					{list.cards.length === 0 ? "Kart ekle" : "Başka bir kart ekle"}
				</Text>
			</Button>
			<IconButton size="xs" aria-label="Add Video" icon={<FaCamera />} mr="5px" />
			<IconButton size="xs" aria-label="Create from Theme" icon={<FaTrello />} />
		</Flex>
	);
}
