import { Flex } from "@chakra-ui/layout";
import { Droppable } from "react-beautiful-dnd";

type Props = {
	children: React.ReactNode;
};

export default function ListElementDroppableContainer({ children }: Props) {
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
