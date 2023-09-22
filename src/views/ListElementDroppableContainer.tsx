import { Droppable } from "react-beautiful-dnd";
import { Flex } from "@chakra-ui/layout";

type Props = {
    children: React.ReactNode;
};

export function ListElementDroppableContainer({ children }: Props) {
    return (
        <Droppable droppableId="all-droppables" direction="horizontal" type="list">
            {(provided) => {
                return (
                    <Flex {...provided.droppableProps} ref={provided.innerRef}>
                        {children}
                        {provided.placeholder}
                    </Flex>
                );
            }}
        </Droppable>
    );
}
