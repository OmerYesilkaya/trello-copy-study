import { useDisclosure } from "@chakra-ui/hooks";
import { Card } from "models/Card";
import { MotionFlex } from "motion/chakra";
import { DraggableProvided } from "react-beautiful-dnd";
import { getStyle } from "utils/getStyle";
import CardDetailModal from "./CardDetailModal";

type Props = {
	card: Card;
	provided: DraggableProvided;
	isDragging: boolean;
};

export default function CardElement({ card, provided, isDragging }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const restOfStyles = getStyle({ draggableStyle: provided.draggableProps.style, isDragging });
	return (
		<>
			<div
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				style={{ filter: isDragging ? "brightness(1.1)" : "brightness(1.0)", ...restOfStyles }}
			>
				<MotionFlex
					userSelect="none"
					maxW="300px"
					whileHover={{ filter: "brightness(0.95)" }}
					cursor="pointer"
					bg="gray.100"
					boxShadow="md"
					p="5px 10px"
					borderRadius="sm"
					borderRight="5px solid"
					borderColor={`${card.color}.500`}
					onClick={onOpen}
				>
					{card.name}
				</MotionFlex>
			</div>

			<CardDetailModal card={card} isOpen={isOpen} onClose={onClose} />
		</>
	);
}
