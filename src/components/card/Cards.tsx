import { Box } from "@chakra-ui/layout";
import { List } from "models/List";
import { Draggable } from "react-beautiful-dnd";
import CardElement from "./CardElement";

type Props = {
	list: List;
};

export default function Cards({ list }: Props) {
	return (
		<Box maxH="60vh" overflow="auto">
			{list.cards.map((card, index) => (
				<Draggable key={card.id} draggableId={card.id} index={index}>
					{(provided, snapshot) => <CardElement key={card.id} card={card} provided={provided} isDragging={snapshot.isDragging} />}
				</Draggable>
			))}
		</Box>
	);
}
