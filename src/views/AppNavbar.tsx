import { useHistory } from "react-router";

import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FiInfo } from "react-icons/fi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaBell, FaHome, FaTrello } from "react-icons/fa";

import { users } from "constants/users";
import { useBoardStore } from "store";
import { UserAvatar, MotionFlex } from "components";

type Props = {
    onClick?: VoidFunction;
    isDisabled?: boolean;
    children: JSX.Element;
};

export function NavbarButton({ onClick, isDisabled, children }: Props) {
    const { getCurrentTheme } = useBoardStore((state) => ({ getCurrentTheme: state.getCurrentTheme }));

    return (
        <Button
            colorScheme={getCurrentTheme()}
            h="30px"
            minW="30px"
            p="0px"
            mr="5px"
            onClick={onClick}
            isDisabled={isDisabled}
        >
            {children}
        </Button>
    );
}

export function AppNavbar() {
    const history = useHistory();
    const { getCurrentTheme } = useBoardStore((state) => ({ getCurrentTheme: state.getCurrentTheme }));

    return (
        <Flex
            h="40px"
            py="5px"
            w="100%"
            bg={`${getCurrentTheme()}.700`}
            px="5px"
            align="center"
            position="relative"
            justify="space-between"
        >
            <Flex>
                <NavbarButton isDisabled>
                    <BsFillGrid3X3GapFill />
                </NavbarButton>
                <NavbarButton onClick={() => history.push("/")}>
                    <FaHome />
                </NavbarButton>
                <NavbarButton isDisabled>
                    <Flex px="10px" align="center">
                        <FaTrello />
                        <Text ml="6px" fontSize="14px">
                            Boards
                        </Text>
                    </Flex>
                </NavbarButton>
            </Flex>
            {/* 40 is about the same with half of the trello logo width, it is hardcoded, maybe get image width with ref in the future */}
            <MotionFlex
                cursor="pointer"
                position="absolute"
                left={window.innerWidth / 2 - 40}
                alignItems="center"
                opacity={0.6}
                whileHover={{ opacity: 1 }}
                onClick={() => history.push("/")}
                color="white"
            >
                <FaTrello />
                <Text ml="6px" fontSize="18px" fontWeight="bold">
                    TrelloClone
                </Text>
            </MotionFlex>
            <Flex align="center">
                <NavbarButton isDisabled>
                    <Text fontSize="14px" px="10px">
                        Create
                    </Text>
                </NavbarButton>
                <NavbarButton isDisabled>
                    <FiInfo />
                </NavbarButton>
                <NavbarButton isDisabled>
                    <FaBell />
                </NavbarButton>
                <UserAvatar name={users[0].name} />
            </Flex>
        </Flex>
    );
}
