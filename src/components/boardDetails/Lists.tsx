import { Flex } from "@chakra-ui/layout";
import CreateListElement from "components/list/CreateListElement";
import { Board } from "models/Board";
import { useEffect, useRef, useState } from "react";
import ListElement from "../list/ListElement";

type ListsProps = {
	board: Board;
};

export default function Lists({ board }: ListsProps) {
	const [isEditActive, setIsEditActive] = useState<string | null>(null);
	const targetRef = useRef<HTMLDivElement | null>(null);

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
		<Flex p="1em" maxW="100vw" overflow="auto" h="100%">
			{board.lists.map((list) => (
				<ListElement key={list.id} list={list} />
			))}
			<CreateListElement targetRef={targetRef} isEditActive={isEditActive} setIsEditActive={setIsEditActive} />
		</Flex>
	);
}
