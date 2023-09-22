import { useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal";
import { Radio, RadioGroup } from "@chakra-ui/radio";

import { useBoardStore } from "store";
import { useCustomToast } from "hooks";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

type ColorTagProps = {
    label: string;
};

function RadioColorTag({ label }: ColorTagProps) {
    const color = label.toLowerCase();
    return (
        <Radio colorScheme={color} value={color}>
            <Flex align="center" fontSize="14px">
                {label} <Box ml="5px" w="16px" h="16px" borderRadius="md" bg={`${color}.500`} />
            </Flex>
        </Radio>
    );
}

type FormParams = {
    boardName: string;
};

export function BoardCreateModal({ isOpen, onClose }: Props) {
    const history = useHistory();
    const { warningToast } = useCustomToast();
    const [themeColor, setThemeColor] = useState<string>("");
    const { register, handleSubmit } = useForm<FormParams>();
    const { createNewBoard } = useBoardStore((state) => ({ createNewBoard: state.createNewBoard }));

    function onSubmit(data: FormParams) {
        if (!data.boardName) {
            warningToast("Please enter a name.");
            return;
        }
        if (!themeColor) {
            warningToast("Please select a color theme.");
            return;
        }
        const uid = uuidv4();
        history.push(`/board/${uid}`);
        createNewBoard(uid, data.boardName, themeColor);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Create a board</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction="column">
                            <Text fontSize="sm" mb="0.5em" fontWeight="bold">
                                Board Name:
                            </Text>
                            <Input placeholder="Name your board..." {...register("boardName")} />
                            <Text fontSize="sm" mt="1em" mb="0.5em" fontWeight="bold">
                                Color Theme:
                            </Text>
                            <RadioGroup onChange={(e) => setThemeColor(e)}>
                                <Grid templateColumns="1fr 1fr 1fr" gap="5px">
                                    <RadioColorTag label="Blue" />
                                    <RadioColorTag label="Green" />
                                    <RadioColorTag label="Pink" />
                                    <RadioColorTag label="Purple" />
                                    <RadioColorTag label="Red" />
                                    <RadioColorTag label="Yellow" />
                                </Grid>
                            </RadioGroup>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit" size="sm">
                            Create a board
                        </Button>
                        <Button variant="ghost" onClick={onClose} size="sm">
                            Close
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}
