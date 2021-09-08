import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import CardElement from "components/card/CardElement";
import { List } from "models/List";
import { useEffect, useRef, useState } from "react";
import { useBoardStore } from "store/useBoardStore";
import { EditableListName } from "./EditableListName";
import { ListActionButtons } from "./ListActionButtons";

type Props = {
	list: List;
};

export default function ListElement({ list }: Props) {
	const { getCurrentTheme, addCardToList } = useBoardStore((state) => ({
		getCurrentTheme: state.getCurrentTheme,
		addCardToList: state.addCardToList,
	}));
	const targetRef = useRef<HTMLDivElement | null>(null);
	const [isEditActive, setIsEditActive] = useState<string | null>(null);
	const [cardText, setCardText] = useState<string>("");
	function handleAddCard(listId: string) {
		if (!cardText) return;
		addCardToList(listId, cardText);
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
		<Flex
			justify="center"
			fontSize="sm"
			borderRadius="md"
			px="0.5em"
			py="2px"
			minW="300px"
			h="max-content"
			bg="gray.200"
			mr="10px"
			minH="35px"
			direction="column"
			ref={targetRef}
		>
			<EditableListName list={list} />
			<Flex w="100%" direction="column">
				{list.cards.map((card) => (
					<CardElement key={card.id} card={card} />
				))}
			</Flex>
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
	);
}
