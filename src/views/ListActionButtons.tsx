import { Button, IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { FaCamera, FaPlus, FaTrello } from "react-icons/fa";

import { List } from "models";

type Props = {
    setIsEditActive: (value: string | null) => void;
    list: List;
};

export function ListActionButtons({ setIsEditActive, list }: Props) {
    return (
        <Flex align="center" my="5px" color="gray.500">
            <Button size="xs" fontWeight="normal" w="100%" mr="5px" onClick={() => setIsEditActive(list.id)}>
                <FaPlus size="0.8em" />{" "}
                <Text mr="auto" ml="5px">
                    Add a card
                </Text>
            </Button>
            <IconButton size="xs" aria-label="Add Video" icon={<FaCamera />} mr="5px" isDisabled />
            <IconButton size="xs" aria-label="Create from Theme" icon={<FaTrello />} isDisabled />
        </Flex>
    );
}
