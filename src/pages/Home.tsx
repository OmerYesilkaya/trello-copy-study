import { Flex } from "@chakra-ui/layout";
import Boards from "components/Home/Boards";
import SideBar from "components/Home/SideBar";

export default function Home() {
	return (
		<Flex w="55%" mt="2em">
			<SideBar />
			<Boards />
		</Flex>
	);
}
