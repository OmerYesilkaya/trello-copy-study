import { Draggable } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/layout";

import { List } from "models";
import { CardElement } from "views";

type Props = {
    list: List;
};

export function CardContainer({ list }: Props) {
    return (
        <Box>
            {list.cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                        <CardElement key={card.id} card={card} provided={provided} isDragging={snapshot.isDragging} />
                    )}
                </Draggable>
            ))}
        </Box>
    );
}
