import { Text } from "@chakra-ui/layout";
import { Board } from "models/Board";

type ListsProps = {
	data: Board;
};

export default function Lists({ data }: ListsProps) {
	return (
		<>
			{data.lists.forEach((list) => (
				<Text key={list.id}>{list.name}</Text>
			))}
		</>
	);
}
