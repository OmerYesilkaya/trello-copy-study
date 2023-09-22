import { MdList } from "react-icons/md";
import { Flex, Text } from "@chakra-ui/layout";

import { Card } from "models";

import { CommentElement, CommentInput } from "views";

type Props = {
    card: Card;
};
export function CardComments({ card }: Props) {
    return (
        <>
            <Flex align="center" mt="10px">
                <MdList size="1.5em" />{" "}
                <Text fontWeight="semibold" ml="5px">
                    Activity
                </Text>
            </Flex>
            <CommentInput card={card} />
            <Flex direction="column">
                {card.comments.map((comment) => (
                    <CommentElement key={comment.id} card={card} comment={comment} />
                ))}
            </Flex>
        </>
    );
}
