import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { colors } from "constants/colors";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaBell, FaHome, FaSearch, FaTrello } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import NavbarButton from "./NavbarButton";
import trelloLogo from "assets/trello_logo.gif";
import PlaceholderUserLogo from "components/PlaceholderUserLogo";

export default function Navbar() {
	return (
		<Flex w="100%" bg={colors.primaryBlueDark} p="5px" align="center" position="relative" justify="space-between">
			<Flex>
				<NavbarButton>
					<BsFillGrid3X3GapFill />
				</NavbarButton>
				<NavbarButton>
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
			<Box position="absolute" left={window.innerWidth / 2 - 40}>
				<Image h="15px" src={trelloLogo} opacity={0.6} />
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
				<PlaceholderUserLogo />
			</Flex>
		</Flex>
	);
}
