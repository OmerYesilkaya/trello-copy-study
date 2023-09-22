import { useHistory } from "react-router";

import { Box, Flex, Text } from "@chakra-ui/layout";
import { FiInfo } from "react-icons/fi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaBell, FaHome, FaTrello } from "react-icons/fa";

import trelloLogo from "assets/trello_logo.gif";
import { users } from "constants/users";
import { useBoardStore } from "store";
import { UserAvatar, MotionImage } from "components";
import { NavbarButton } from "views";

export function Navbar() {
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
            <Box
                cursor="pointer"
                position="absolute"
                left={window.innerWidth / 2 - 40}
                onClick={() => history.push("/")}
            >
                <MotionImage opacity={0.6} whileHover={{ opacity: 1 }} h="15px" src={trelloLogo} />
            </Box>
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
