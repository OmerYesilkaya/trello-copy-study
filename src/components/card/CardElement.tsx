import { useDisclosure } from "@chakra-ui/hooks";
import { Card } from "models/Card";
import { MotionFlex } from "motion/chakra";
import CardDetailModal from "./CardDetailModal";

type Props = {
	card: Card;
};

export default function CardElement({ card }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<MotionFlex
				maxW="300px"
				whileHover={{ filter: "brightness(0.95)" }}
				cursor="pointer"
				bg="gray.100"
				boxShadow="md"
				p="5px 10px"
				mb="5px"
				borderRadius="sm"
				onClick={onOpen}
			>
				{card.name}
			</MotionFlex>
			<CardDetailModal card={card} isOpen={isOpen} onClose={onClose} />
		</>
	);
}
