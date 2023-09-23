import { useHistory } from "react-router";

import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FiInfo } from "react-icons/fi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaBell, FaHome, FaTrello } from "react-icons/fa";

import trelloLogo from "assets/trello_logo.gif";
import { users } from "constants/users";
import { useBoardStore } from "store";
import { UserAvatar, MotionImage } from "components";

type Props = {
    onClick?: VoidFunction;
    children: JSX.Element;
};

export function NavbarButton({ onClick, children }: Props) {
    const { getCurrentTheme } = useBoardStore((state) => ({ getCurrentTheme: state.getCurrentTheme }));

    return (
        <Button colorScheme={getCurrentTheme()} h="30px" minW="30px" p="0px" mr="5px" onClick={onClick}>
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
                <NavbarButton>
                    <BsFillGrid3X3GapFill />
                </NavbarButton>
                <NavbarButton onClick={() => history.push("/")}>
                    <FaHome />
                </NavbarButton>
                <NavbarButton>
                    <Flex px="10px" align="center">
                        <FaTrello />
                        <Text ml="6px" fontSize="14px">
                            Boards
                        </Text>
                    </Flex>
                </NavbarButton>
            </Flex>
            {/* 40 is about the same with half of the trello logo width, it is hardcoded, maybe get image width with ref in the future */}
            <Flex
                cursor="pointer"
                position="absolute"
                left={window.innerWidth / 2 - 40}
                alignItems="center"
                onClick={() => history.push("/")}
            >
                <MotionImage opacity={0.6} whileHover={{ opacity: 1 }} h="15px" src={trelloLogo} />
            </Flex>
            <Flex align="center">
                <NavbarButton>
                    <Text fontSize="14px" px="10px">
                        Create
                    </Text>
                </NavbarButton>
                <NavbarButton>
                    <FiInfo />
                </NavbarButton>
                <NavbarButton>
                    <FaBell />
                </NavbarButton>
                <UserAvatar name={users[0].name} />
            </Flex>
        </Flex>
    );
}
