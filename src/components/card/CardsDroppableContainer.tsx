import { Box } from "@chakra-ui/layout";
import { List } from "models/List";
import { Droppable } from "react-beautiful-dnd";
import Cards from "./Cards";

type Props = {
	list: List;
	index: number;
};

export default function CardsDroppableContainer({ list, index }: Props) {
	return (
		<Droppable droppableId={list.id}>
			{(provided) => {
				return (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						<Cards list={list} />
						<Box my="5px">{provided.placeholder}</Box>
						{/* Note(omer): Some margin so that we can drop items to empty lists */}
					</div>
				);
			}}
		</Droppable>
	);
}
