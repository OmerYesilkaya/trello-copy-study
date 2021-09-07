import { Flex } from "@chakra-ui/layout";
import Boards from "components/home/Boards";
import SideBar from "components/home/SideBar";
import { useEffect } from "react";
import { useBoardStore } from "store/useBoardStore";

export default function Home() {
	const { setActiveBoardId } = useBoardStore((state) => ({ setActiveBoardId: state.setActiveBoardId }));

	useEffect(() => {
		setActiveBoardId(null);
	}, [setActiveBoardId]);

	return (
		<Flex w="55%" mt="2em">
			<SideBar />
			<Boards />
		</Flex>
	);
}
