import { Flex } from "@chakra-ui/layout";
import { Input, Button, CloseButton } from "@chakra-ui/react";
import CardsDroppableContainer from "components/card/CardsDroppableContainer";
import { List } from "models/List";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useBoardStore } from "store/useBoardStore";
import { EditableListName } from "./EditableListName";
import { ListActionButtons } from "./ListActionButtons";

type Props = {
	list: List;
	index: number;
};

export default function ListElement({ list, index }: Props) {
	const { getCurrentTheme, addNewCardToList } = useBoardStore((state) => ({
		getCurrentTheme: state.getCurrentTheme,
		addNewCardToList: state.addNewCardToList,
	}));
	const targetRef = useRef<HTMLDivElement | null>(null);
	const [isEditActive, setIsEditActive] = useState<string | null>(null);
	const [cardText, setCardText] = useState<string>("");

	function handleAddCard(listId: string) {
		if (!cardText) return;
		addNewCardToList(listId, cardText);
		setCardText("");
	}

	useEffect(() => {
		// check wheter mouse click is on create list element, if it is not close edit segment
		if (!targetRef.current) return;
		function handleMouseDown(e: MouseEvent) {
			if (targetRef.current && targetRef.current.contains(e.target as any)) return;
			setIsEditActive(null);
		}

		window.addEventListener("mousedown", handleMouseDown);
		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
		};
	}, []);

	return (
		<Draggable draggableId={list.id} index={index}>
			{(provided, snapshot) => (
				<div {...provided.draggableProps} ref={provided.innerRef}>
					<Flex
						justify="center"
						fontSize="sm"
						borderRadius="md"
						px="0.5em"
						py="2px"
						w="300px"
						h="max-content"
						bg="gray.200"
						mr="10px"
						wordBreak="break-all"
						direction="column"
						ref={targetRef}
					>
						<EditableListName list={list} isDragging={snapshot.isDragging} {...provided.dragHandleProps} />
						<CardsDroppableContainer list={list} index={index} />
						{isEditActive ? (
							<Flex direction="column" mb="5px" mt="5px">
								<Input
									autoFocus
									size="sm"
									placeholder="Bu kart için başlık girin..."
									value={cardText}
									onChange={(e) => setCardText(e.target.value)}
								/>
								<Flex mt="5px">
									<Button colorScheme={getCurrentTheme()} size="xs" onClick={() => handleAddCard(list.id)}>
										Kart ekle
									</Button>
									<CloseButton size="sm" ml="5px" onClick={() => setIsEditActive(null)} />
								</Flex>
							</Flex>
						) : (
							<ListActionButtons setIsEditActive={setIsEditActive} list={list} />
						)}
					</Flex>
				</div>
			)}
		</Draggable>
	);
}
