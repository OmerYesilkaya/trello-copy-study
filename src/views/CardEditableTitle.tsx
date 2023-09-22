import { useRef, useState } from "react";
import { Editable, EditableInput, EditablePreview, useEditableControls } from "@chakra-ui/editable";
import { Center, Flex } from "@chakra-ui/layout";
import { BiCreditCardFront } from "react-icons/bi";
import { FaPenAlt } from "react-icons/fa";

import { Card } from "models";
import { useBoardStore } from "store";

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

export function CardEditableTitle({ card }: Props) {
    const editableRef = useRef<HTMLDivElement>(null);
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
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (!editableRef.current) return;
                        editableRef.current.blur();
                    }
                }}
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
