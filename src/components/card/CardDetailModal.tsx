import { Badge, Center, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { BiCreditCardFront } from "react-icons/bi";
import { Card } from "models/Card";
import { useBoardStore } from "store/useBoardStore";
import CardDescription from "./CardDescription";
import CardTags from "./CardTags";
import CardComments from "./CardComments";
import CardColor from "./CardColor";
import { Button } from "@chakra-ui/button";
import EditableCardTitle from "./EditableCardTitle";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	card: Card;
};

export default function CardDetailModal({ isOpen, onClose, card }: Props) {
	const { getListFromId, deleteCard } = useBoardStore((state) => ({
		deleteCard: state.deleteCard,
		getListFromId: state.getListFromId,
	}));

	function handleDeleteCard() {
		onClose();
		deleteCard(card);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="2xl" autoFocus={false}>
			<ModalOverlay />
			<ModalContent borderTop="5px solid" borderColor={`${card.color ? card.color : "gray"}.500`}>
				<ModalHeader>
					<Flex align="center">
						<EditableCardTitle card={card} />
					</Flex>
					<Flex align="center">
						<Badge>{getListFromId(card.parentListId)?.name}</Badge>{" "}
						<Text fontSize="14px" fontWeight="normal" color="gray.500" ml="5px">
							listesinde
						</Text>
					</Flex>
					<CardTags card={card} />
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody mb="1.5em">
					<Flex direction="column">
						<CardDescription card={card} />
						<CardComments card={card} />
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Button size="sm" colorScheme="red" variant="ghost" onClick={handleDeleteCard}>
						Kartı sil
					</Button>
					<Spacer />
					<CardColor card={card} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
