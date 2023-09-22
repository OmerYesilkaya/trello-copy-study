import { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";

import { users } from "constants/users";
import { UserAvatar } from "components";
import { Card } from "models";
import { useBoardStore } from "store";

type Props = {
    card: Card;
};
export function CommentInput({ card }: Props) {
    // users[0].name is the current user, not really but it is
    const targetRef = useRef<HTMLDivElement>(null);
    const [comment, setComment] = useState<string>("");
    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const { getCurrentTheme, addCommentToCard } = useBoardStore((state) => ({
        getCurrentTheme: state.getCurrentTheme,
        addCommentToCard: state.addCommentToCard,
    }));

    function handleClose() {
        setIsEditActive(false);
        setComment("");
    }

    function handleClick() {
        if (!comment) return;
        addCommentToCard(card.id, card.parentListId, comment);
        setIsEditActive(false);
        setComment("");
        // show toast comment saved
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
        <Flex mt="0.5em" direction="column" ref={targetRef}>
            <Flex align="center">
                <UserAvatar name={users[0].name} />
                <Input
                    onFocus={() => setIsEditActive(true)}
                    size="sm"
                    ml="5px"
                    placeholder="Add a comment..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
            </Flex>

            {isEditActive && (
                <Flex mt="0.5em">
                    <Button size="sm" colorScheme={getCurrentTheme()} onClick={handleClick}>
                        Save
                    </Button>
                    <CloseButton onClick={handleClose} ml="0.5em" />
                </Flex>
            )}
        </Flex>
    );
}
