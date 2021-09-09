import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { colors } from "constants/colors";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaBell, FaHome, FaSearch, FaTrello } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import trelloLogo from "assets/trello_logo.gif";

import { MotionImage } from "motion/chakra";
import NavbarButton from "./NavbarButton";
import { useHistory } from "react-router";
import { useBoardStore } from "store/useBoardStore";
import UserLogo from "components/common/UserLogo";
import { users } from "constants/users";

export default function Navbar() {
	const history = useHistory();
	const { getCurrentTheme } = useBoardStore((state) => ({ getCurrentTheme: state.getCurrentTheme }));

	return (
		<Flex minH="4.5vh" w="100%" bg={`${getCurrentTheme()}.700`} px="5px" align="center" position="relative" justify="space-between">
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
							Panolar
						</Text>
					</Flex>
				</NavbarButton>
				<InputGroup size="sm" w="200px">
					<Input fontSize="14px" border="none" placeholder="Şuraya atla..." />
					<InputRightElement children={<FaSearch color={colors.primaryWhite} />} />
				</InputGroup>
			</Flex>
			{/* 40 is about the same with half of the trello logo width, it is hardcoded, maybe get image width with ref in the future */}
			<Box cursor="pointer" position="absolute" left={window.innerWidth / 2 - 40} onClick={() => history.push("/")}>
				<MotionImage opacity={0.6} whileHover={{ opacity: 1 }} h="15px" src={trelloLogo} />
			</Box>
			<Flex align="center">
				<NavbarButton>
					<Text fontSize="14px" px="10px">
						Oluştur
					</Text>
				</NavbarButton>
				<NavbarButton>
					<FiInfo />
				</NavbarButton>
				<NavbarButton>
					<FaBell />
				</NavbarButton>
				<UserLogo name={users[0].name} />
			</Flex>
		</Flex>
	);
}
