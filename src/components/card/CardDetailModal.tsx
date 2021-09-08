import { Button } from "@chakra-ui/button";
import { Badge, Flex, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { BiCreditCardFront } from "react-icons/bi";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdList } from "react-icons/md";
import useCustomToast from "hooks/useCustomToast";
import { Card } from "models/Card";
import { useBoardStore } from "store/useBoardStore";
import { Textarea } from "@chakra-ui/textarea";
import CommentInput from "./CommentInput";
import CommentElement from "./CommentElement";
import CardDescription from "./CardDescription";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	card: Card;
};

export default function CardDetailModal({ isOpen, onClose, card }: Props) {
	const { warningToast } = useCustomToast();
	const { getListFromId } = useBoardStore((state) => ({
		createNewBoard: state.createNewBoard,
		getListFromId: state.getListFromId,
	}));

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="2xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Flex align="center">
						<BiCreditCardFront />
						<Text ml="5px">{card.name}</Text>
					</Flex>
					<Flex align="center">
						<Badge>{getListFromId(card.parentListId)?.name}</Badge>{" "}
						<Text fontSize="14px" fontWeight="normal" color="gray.500" ml="5px">
							listesinde
						</Text>
					</Flex>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody mb="1.5em">
					<Flex direction="column">
						<CardDescription card={card} />
						<Flex align="center" mt="10px">
							<MdList size="1.5em" />{" "}
							<Text fontWeight="semibold" ml="5px">
								Etkinlik
							</Text>
						</Flex>
						<CommentInput card={card} />
						<Flex direction="column">
							{card.comments.map((comment) => (
								<CommentElement key={comment.id} comment={comment} />
							))}
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
