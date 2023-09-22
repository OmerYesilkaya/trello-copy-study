import { Badge, Flex, Spacer, Text } from "@chakra-ui/layout";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";

import { Card } from "models";
import { useBoardStore } from "store";

import { CardDescription, CardTags, CardComments, CardColor, CardEditableTitle } from "views";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    card: Card;
};

export function CardDetailModal({ isOpen, onClose, card }: Props) {
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
                        <CardEditableTitle card={card} />
                    </Flex>
                    <Flex align="center">
                        <Text fontSize="14px" fontWeight="normal" color="gray.500" mr="5px">
                            In
                        </Text>
                        <Badge>{getListFromId(card.parentListId)?.name}</Badge>
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
                        Delete Card
                    </Button>
                    <Spacer />
                    <CardColor card={card} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
