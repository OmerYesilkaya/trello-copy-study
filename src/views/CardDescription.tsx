import { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { HiMenuAlt2 } from "react-icons/hi";

import { Card } from "models";
import { useBoardStore } from "store";

type Props = {
    card: Card;
};

export function CardDescription({ card }: Props) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { getCurrentTheme, addDescToCard } = useBoardStore((state) => ({
        getCurrentTheme: state.getCurrentTheme,
        addDescToCard: state.addDescToCard,
    }));
    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [desc, setDesc] = useState<string>("");

    function handleClick() {
        if (!desc) return;
        addDescToCard(card.id, card.parentListId, desc);
        setDesc("");
        setIsEditActive(false);
    }
    function handleClose() {
        setDesc("");
        setIsEditActive(false);
    }
    function handleChangeDesc() {
        setDesc(card.description);
        setIsEditActive(true);
    }

    useEffect(() => {
        // check wheter mouse click is on create list element, if it is not close edit segment
        if (!targetRef.current) return;
        function handleMouseDown(e: MouseEvent) {
            if (targetRef.current && targetRef.current.contains(e.target as any)) return;
            setIsEditActive(false);
        }

        window.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    return (
        <Box ref={targetRef}>
            <Flex align="center">
                <HiMenuAlt2 size="1.2em" />{" "}
                <Flex align="center" ml="5px">
                    <Text fontWeight="semibold">Description</Text>
                    {card.description && !isEditActive && (
                        <Button ml="1em" fontSize="sm" p="10px 20px" h="max-content" onClick={handleChangeDesc}>
                            Edit
                        </Button>
                    )}
                </Flex>
            </Flex>
            {card.description && !isEditActive ? (
                <Text fontSize="sm" bg="gray.100" borderRadius="md" p="0.5em 1em" mt="10px">
                    {card.description}
                </Text>
            ) : (
                <>
                    <Textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        onFocus={() => setIsEditActive(true)}
                        fontSize="sm"
                        colorScheme="gray"
                        resize="none"
                        mt="5px"
                        placeholder="Add even more details..."
                    />
                    {isEditActive && (
                        <Flex mt="0.5em" align="center">
                            <Button size="sm" colorScheme={getCurrentTheme()} onClick={handleClick}>
                                Save
                            </Button>
                            <CloseButton ml="0.5em" onClick={handleClose} />
                        </Flex>
                    )}
                </>
            )}
        </Box>
    );
}
