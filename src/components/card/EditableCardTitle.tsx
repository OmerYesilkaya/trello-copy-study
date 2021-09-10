import { Editable, EditableInput, EditablePreview, useEditableControls } from "@chakra-ui/editable";
import { Center, Flex } from "@chakra-ui/layout";
import { Card } from "models/Card";
import { useState } from "react";
import { BiCreditCardFront } from "react-icons/bi";
import { FaPenAlt } from "react-icons/fa";
import { useBoardStore } from "store/useBoardStore";

type Props = {
	card: Card;
};

function EditableControl() {
	const { getEditButtonProps } = useEditableControls();
	return (
		<Center cursor="pointer" {...getEditButtonProps()}>
			<FaPenAlt size="0.7em" />
		</Center>
	);
}

export default function EditableCardTitle({ card }: Props) {
	const [name, setName] = useState(card.name);
	const { updateCardName } = useBoardStore((state) => ({
		updateCardName: state.updateCardName,
	}));

	return (
		<Flex align="center" justify="space-between">
			<Center minW="25px" alignSelf="start" mt="8px">
				<BiCreditCardFront />
			</Center>
			<Editable
				onBlur={() => updateCardName(card.id, card.parentListId, name)}
				value={name}
				onChange={setName}
				title={card.name}
				wordBreak="break-word"
				mr="8px"
				display="flex"
			>
				<EditableInput px="5px" w="100%" mr="8px" />
				<EditablePreview px="5px" mr="4px" />
				<EditableControl />
			</Editable>
		</Flex>
	);
}
