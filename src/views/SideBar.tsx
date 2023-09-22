import { useHistory, useLocation } from "react-router";
import { Flex, Text } from "@chakra-ui/layout";
import { ChakraComponent } from "@chakra-ui/system";
import { FaTrello } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";

import { colors } from "constants/colors";

type SideBarElementProps = {
    text: string;
    icon: JSX.Element;
    path: string;
};

const SideBarElement: ChakraComponent<React.FC<SideBarElementProps>> = ({ text, icon, path, ...restProps }) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const pathNameArray = pathname.split("/");
    const currentPath = pathNameArray[pathNameArray.length - 1];

    function isActive() {
        if (currentPath === path.split("/")[1]) {
            return true;
        }
        return false;
    }

    return (
        <Flex
            {...restProps}
            p="0.5em"
            mt="5px"
            w="200px"
            align="center"
            cursor="pointer"
            borderRadius="5px"
            onClick={() => history.push(path)}
            color={isActive() ? "#0079BF" : "#42526E"}
            bg={isActive() ? "#E4F0F6" : colors.primaryWhite}
            _hover={{
                backgroundColor: isActive() ? "#E4F0F6" : "#f1f3f5",
            }}
        >
            {icon}
            <Text ml="1em" fontWeight="bold">
                {text}
            </Text>
        </Flex>
    );
};

export function SideBar() {
    return (
        <Flex direction="column" fontSize="13px" fontWeight="bold">
            <SideBarElement path="/" icon={<FaTrello />} text="Boards" />
            <SideBarElement path="/templates" icon={<FaTrello />} text="Templates" />
            <SideBarElement path="/activity" icon={<FiActivity />} text="Feed" />
        </Flex>
    );
}
