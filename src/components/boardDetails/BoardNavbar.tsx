import { Button, IconButton } from "@chakra-ui/button";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import UserLogo from "components/common/UserLogo";
import { Board } from "models/Board";
import { TiStar, TiStarOutline } from "react-icons/ti";
import { useBoardStore } from "store/useBoardStore";

type BoardNavbarParams = {
	data: Board;
};

export default function BoardNavbar({ data }: BoardNavbarParams) {
	const { toggleFavoriteBoard } = useBoardStore((state) => ({ toggleFavoriteBoard: state.toggleFavoriteBoard }));
	return (
		<Flex minH="4.5vh" align="center" w="100%" px="0.5em" color="white">
			<Text fontSize="20px" fontWeight="bold" mr="0.5em">
				{data.name}
			</Text>
			<IconButton
				size="sm"
				icon={data.isFavorited ? <TiStar size="1.42em" /> : <TiStarOutline size="1.42em" />}
				aria-label="Favorite Board"
				colorScheme="whiteAlpha"
				mr="0.5em"
				onClick={() => toggleFavoriteBoard(data.id)}
			/>
			<Divider orientation="vertical" h="50%" mr="0.5em" />
			<Button colorScheme="whiteAlpha" size="sm" mr="0.5em">
				Çalışma alanı ekle
			</Button>
			<Divider orientation="vertical" h="50%" mr="0.5em" />
			<Button colorScheme="whiteAlpha" size="sm" mr="0.5em">
				Görünürlüğü değiştir
			</Button>
			<Divider orientation="vertical" h="50%" mr="0.5em" />
			{data.assignees.map((assignee) => (
				<UserLogo key={assignee.id} name={assignee.name} />
			))}
			<Button colorScheme="whiteAlpha" size="sm" mr="0.5em">
				Davet et
			</Button>
		</Flex>
	);
}
