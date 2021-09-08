import { IconButton } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Flex } from "@chakra-ui/layout";
import { List } from "models/List";
import { useState } from "react";
import { FaTrello } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useBoardStore } from "store/useBoardStore";

type EditableListNameProps = {
	list: List;
};

export function EditableListName({ list }: EditableListNameProps) {
	const [name, setName] = useState(list.name);
	const { updateListName } = useBoardStore((state) => ({ updateListName: state.updateListName }));

	return (
		<Flex align="center" justify="space-between">
			<Flex align="center" my="3px">
				<FaTrello />
				<Editable ml="5px" onBlur={() => updateListName(list.id, name)} value={name} onChange={setName}>
					<EditableInput px="5px" />
					<EditablePreview px="5px" />
				</Editable>
			</Flex>
			<IconButton size="xs" aria-label="More Actions" icon={<FiMoreHorizontal />} />
			{/* TODO(omer): add delete list button here somewhere */}
		</Flex>
	);
}
