import { Flex, Text } from "@chakra-ui/layout";
import { ChakraComponent } from "@chakra-ui/system";
import { colors } from "constants/colors";
import { FC } from "react";
import { FaTrello } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { useHistory, useLocation } from "react-router";

type SideBarElementProps = {
	text: string;
	icon: JSX.Element;
};

const SideBarElement: ChakraComponent<FC<SideBarElementProps>> = ({ text, icon, path, ...restProps }) => {
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

export default function SideBar() {
	return (
		<Flex direction="column" fontSize="13px" fontWeight="bold">
			<SideBarElement path="/" icon={<FaTrello />} text="Panolar" />
			<SideBarElement path="/templates" icon={<FaTrello />} text="Şablonlar" />
			<SideBarElement path="/activity" icon={<FiActivity />} text="Anasayfa" />
		</Flex>
	);
}
