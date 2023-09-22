import { Droppable } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/layout";

import { List } from "models";
import { CardContainer } from "views";

type Props = {
    list: List;
};

export function CardsDroppableContainer({ list }: Props) {
    return (
        <Droppable droppableId={list.id}>
            {(provided, snapshot) => {
                return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <CardContainer list={list} />
                        <Box my="5px" filter={`brightness(${snapshot.isDraggingOver ? 1.1 : 1.0})`}>
                            {provided.placeholder}
                        </Box>
                        {/* Note(omer): Some margin so that we can drop items to empty lists */}
                    </div>
                );
            }}
        </Droppable>
    );
}
