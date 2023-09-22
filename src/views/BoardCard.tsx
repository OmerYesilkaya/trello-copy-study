import { useState } from "react";
import { useHistory } from "react-router";
import { Text } from "@chakra-ui/layout";
import { RiCloseLine } from "react-icons/ri";
import { TiStar, TiStarOutline } from "react-icons/ti";

import { MotionCenter, MotionFlex } from "components";
import { Board } from "models";
import { useBoardStore } from "store";

type DeleteButtonProps = {
    id: string;
};

const variants = {
    active: { opacity: 1 },
    disabled: { opacity: 0 },
};

function DeleteButton({ id }: DeleteButtonProps) {
    const { removeBoard } = useBoardStore((state) => ({ removeBoard: state.removeBoard }));
    return (
        <MotionCenter
            whileHover={{ backgroundColor: "#ffffffa9" }}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                removeBoard(id);
            }}
            w="16px"
            h="16px"
            borderRadius="50%"
            bg="#ffffff39"
            color="gray.700"
            top="5px"
            right="5px"
            position="absolute"
        >
            <RiCloseLine size="1em" />
        </MotionCenter>
    );
}

type Props = {
    board: Board;
};

export function BoardCard({ board }: Props) {
    const history = useHistory();
    const [hover, setHover] = useState<boolean>(false);
    const { toggleFavoriteBoard } = useBoardStore((state) => ({ toggleFavoriteBoard: state.toggleFavoriteBoard }));

    return (
        <MotionFlex
            whileHover={{ filter: "brightness(1.1)" }}
            cursor="pointer"
            w="100%"
            h="100px"
            borderRadius="md"
            boxShadow="lg"
            bg={`${board.themeColor}.400`}
            p="0.5em"
            color="white"
            fontWeight="bold"
            onClick={() => {
                history.push(`/board/${board.id}`);
            }}
            position="relative"
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <Text fontSize="md">{board.name}</Text>
            <MotionCenter
                onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    toggleFavoriteBoard(board.id);
                }}
                variants={variants}
                animate={hover ? "active" : "disabled"}
                position="absolute"
                bottom="5px"
                right="5px"
            >
                {board.isFavorited ? <TiStar size="1.42em" /> : <TiStarOutline size="1.42em" />}
            </MotionCenter>
            <DeleteButton id={board.id} />
        </MotionFlex>
    );
}
