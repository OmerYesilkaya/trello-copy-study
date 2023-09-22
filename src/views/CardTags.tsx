import { Box, HStack, Badge } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

import { Card } from "models";
import { MotionBox } from "components";
import { CardTagPopover } from "views";

type Props = {
    card: Card;
};
export function CardTags({ card }: Props) {
    return (
        <>
            {card.tags.length !== 0 && (
                <Box mt="0.5em">
                    <Text color="gray.500" fontSize="xs" ml="3px">
                        Badges
                    </Text>
                    <HStack spacing="4px">
                        {card.tags.map((tag, idx) => (
                            <MotionBox key={idx} whileHover={{ y: -2 }} cursor="pointer">
                                <Badge ml="4px" colorScheme={tag.toLowerCase()} variant="subtle">
                                    {tag}
                                </Badge>
                            </MotionBox>
                        ))}
                    </HStack>
                </Box>
            )}
            <CardTagPopover card={card} />
        </>
    );
}
