import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useBoardStore } from "store/useBoardStore";

type Props = {
	targetRef: React.LegacyRef<HTMLDivElement> | undefined;
	isEditActive: string | null;
	setIsEditActive: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function CreateListElement({ targetRef, isEditActive, setIsEditActive }: Props) {
	const [listName, setListName] = useState("");
	const { getCurrentTheme, addListToBoard } = useBoardStore((state) => ({
		getCurrentTheme: state.getCurrentTheme,
		addListToBoard: state.addListToBoard,
	}));
	function handleAddList(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (!listName) return;
		e.stopPropagation();
		addListToBoard(listName);
		setListName("");
	}

	return (
		<Flex
			cursor="pointer"
			ref={targetRef}
			fontSize="sm"
			color={isEditActive ? "gray.800" : "white"}
			bg={isEditActive ? "gray.200" : "whiteAlpha.500"}
			borderRadius="md"
			px="0.5em"
			py="2px"
			minW="300px"
			h="max-content"
			minH="35px"
			onClick={() => setIsEditActive("new")}
		>
			{isEditActive ? (
				<Flex direction="column" w="100%">
					<Input
						autoFocus
						mt="2px"
						w="100%"
						size="sm"
						placeholder="Liste başlığını girin..."
						value={listName}
						onChange={(e) => setListName(e.target.value)}
					/>
					<Flex align="center" py="5px">
						<Button size="sm" colorScheme={getCurrentTheme()} onClick={(e) => handleAddList(e)} mr="0.5em">
							Listeye Ekle
						</Button>
						<CloseButton
							onClick={(e) => {
								e.stopPropagation();
								setIsEditActive(null);
							}}
						/>
					</Flex>
				</Flex>
			) : (
				<Flex align="center" h="30px" px="0.5em">
					<FaPlus />
					<Text ml="5px">Başka liste ekleyin</Text>
				</Flex>
			)}
		</Flex>
	);
}
