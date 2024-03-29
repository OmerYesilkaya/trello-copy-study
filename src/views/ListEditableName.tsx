import { useRef, useState } from "react";
import { IconButton } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Flex, Spacer } from "@chakra-ui/layout";
import { BiTrash } from "react-icons/bi";
import { FaTrello } from "react-icons/fa";

import { List } from "models";
import { useBoardStore } from "store";

type Props = {
    list: List;
    isDragging: boolean;
};

export function ListEditableName({ list, isDragging, ...restProps }: Props) {
    const editableRef = useRef<HTMLDivElement>(null);
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
                <Editable
                    ref={editableRef}
                    ml="5px"
                    onBlur={() => updateListName(list.id, name)}
                    value={name}
                    onChange={setName}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (!editableRef.current) return;
                            editableRef.current.blur();
                        }
                    }}
                >
                    <EditableInput px="5px" />
                    <EditablePreview px="5px" />
                </Editable>
            </Flex>
            <Spacer w="100%" rounded="md" m="4px" backgroundSize={"cover"} {...restProps} />
            <IconButton
                boxShadow="sm"
                color="red.500"
                size="xs"
                aria-label="More Actions"
                icon={<BiTrash size="1.5em" />}
                onClick={handleListDelete}
            />
        </Flex>
    );
}
