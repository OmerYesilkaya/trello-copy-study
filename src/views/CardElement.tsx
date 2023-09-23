import { DraggableProvided } from "react-beautiful-dnd";
import { useDisclosure } from "@chakra-ui/hooks";
import { Badge, Center, Flex, Grid, Text, VStack } from "@chakra-ui/layout";
import { MdComment } from "react-icons/md";

import { MotionFlex } from "components";
import { Card } from "models";
import { getStyle } from "utils";
import { CardDetailModal } from "views";

type Props = {
    card: Card;
    provided: DraggableProvided;
    isDragging: boolean;
};

export function CardElement({ card, provided, isDragging }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const restOfStyles = getStyle({ draggableStyle: provided.draggableProps.style, isDragging });

    return (
        <>
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{ filter: isDragging ? "brightness(1.1)" : "brightness(1.0)", ...restOfStyles }}
            >
                <MotionFlex
                    userSelect="none"
                    maxW="300px"
                    whileHover={{ filter: "brightness(0.95)" }}
                    cursor="pointer"
                    bg="gray.100"
                    boxShadow="md"
                    p="5px 10px"
                    borderRadius="sm"
                    borderRight="5px solid"
                    borderColor={`${card.color ? card.color : "gray"}.500`}
                    onClick={onOpen}
                >
                    <VStack w="100%">
                        <Flex w="100%">
                            <Text mr="5px">{card.name}</Text>
                            {card.comments.length > 0 && (
                                <Center alignSelf="start" mt="5px" ml="auto" color="gray">
                                    <MdComment size="0.8em" />
                                </Center>
                            )}
                        </Flex>
                        {card.tags.length > 0 && (
                            <Grid alignSelf="start" templateColumns="repeat(4, 1fr)" gap="4px" m={0}>
                                {card.tags.map((tag, idx) => (
                                    <Badge m={0} key={idx} colorScheme={tag.toLowerCase()}>
                                        {tag}
                                    </Badge>
                                ))}
                            </Grid>
                        )}
                    </VStack>
                </MotionFlex>
            </div>

            <CardDetailModal card={card} isOpen={isOpen} onClose={onClose} />
        </>
    );
}
