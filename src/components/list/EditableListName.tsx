import { IconButton } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Flex, Spacer } from "@chakra-ui/layout";
import { List } from "models/List";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FaTrello } from "react-icons/fa";
import { useBoardStore } from "store/useBoardStore";

type EditableListNameProps = {
	list: List;
	isDragging: boolean;
};

export function EditableListName({ list, isDragging, ...restProps }: EditableListNameProps) {
	const [name, setName] = useState(list.name);
	const { updateListName, removeListFromBoard } = useBoardStore((state) => ({
		updateListName: state.updateListName,
		removeListFromBoard: state.removeListFromBoard,
	}));

	function handleListDelete() {
		removeListFromBoard(list.id);
	}

	return (
		<Flex align="center" justify="space-between" filter={`brightness(${isDragging ? 1.1 : 1.0})`}>
			<Flex align="center" my="3px">
				<FaTrello />
				<Editable ml="5px" onBlur={() => updateListName(list.id, name)} value={name} onChange={setName}>
					<EditableInput px="5px" />
					<EditablePreview px="5px" />
				</Editable>
			</Flex>
			<Spacer {...restProps} />
			<IconButton color="red.300" size="xs" aria-label="More Actions" icon={<BiTrash size="1.5em" />} onClick={handleListDelete} />
		</Flex>
	);
}
