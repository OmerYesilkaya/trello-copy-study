import { Button, IconButton } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Divider, Flex, HStack, Text } from "@chakra-ui/layout";
import UserLogo from "components/common/UserLogo";
import { Board } from "models/Board";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TiStar, TiStarOutline } from "react-icons/ti";
import { useBoardStore } from "store/useBoardStore";

type BoardNavbarParams = {
	data: Board;
};

export default function BoardNavbar({ data }: BoardNavbarParams) {
	const { toggleFavoriteBoard, getCurrentTheme, currentSearchFilter, setCurrentSearchFilter } = useBoardStore((state) => ({
		toggleFavoriteBoard: state.toggleFavoriteBoard,
		getCurrentTheme: state.getCurrentTheme,
		currentSearchFilter: state.currentSearchFilter,
		setCurrentSearchFilter: state.setCurrentSearchFilter,
	}));
	const [searchValue, setSearchValue] = useState("");

	function handleSearch() {
		setCurrentSearchFilter(searchValue);
	}

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
			<Divider orientation="vertical" h="50%" mr="0.5em" />

			<HStack spacing="5px">
				<InputGroup size="sm" w="200px">
					<Input
						border="none"
						fontSize="14px"
						value={searchValue}
						placeholder="Panoda ara..."
						bg={`${getCurrentTheme()}.600`}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<InputRightElement children={<FaSearch color="white" />} />
				</InputGroup>
				{searchValue && (
					<Button size="sm" colorScheme={getCurrentTheme()} onClick={handleSearch}>
						Ara
					</Button>
				)}
				{currentSearchFilter && (
					<Button
						size="sm"
						colorScheme="red"
						onClick={() => {
							setCurrentSearchFilter("");
							setSearchValue("");
						}}
					>
						Filtreyi kaldır
					</Button>
				)}
			</HStack>
		</Flex>
	);
}
