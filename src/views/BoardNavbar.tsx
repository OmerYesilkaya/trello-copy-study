import { useState } from "react";
import shallow from "zustand/shallow";
import { TiStar, TiStarOutline } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { Button, IconButton } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Divider, Flex, HStack, Text } from "@chakra-ui/layout";

import { UserAvatar } from "components";
import { Board } from "models";
import { useBoardStore } from "store";

type BoardNavbarParams = {
    data: Board;
};

export function BoardNavbar({ data }: BoardNavbarParams) {
    const { toggleFavoriteBoard, getCurrentTheme, currentSearchFilter, setCurrentSearchFilter } = useBoardStore(
        (state) => ({
            toggleFavoriteBoard: state.toggleFavoriteBoard,
            getCurrentTheme: state.getCurrentTheme,
            currentSearchFilter: state.currentSearchFilter,
            setCurrentSearchFilter: state.setCurrentSearchFilter,
        }),
        shallow
    );
    const [searchValue, setSearchValue] = useState("");

    function handleSearch() {
        setCurrentSearchFilter(searchValue);
    }

    function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        switch (e.key) {
            case "Enter":
                handleSearch();
                break;
            case "Escape":
                setSearchValue("");
                break;
            default:
                break;
        }
    }

    return (
        <Flex h="40px" py="5px" align="center" w="100%" px="0.5em" color="white">
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
                Add work area
            </Button>
            <Divider orientation="vertical" h="50%" mr="0.5em" />
            <Button colorScheme="whiteAlpha" size="sm" mr="0.5em">
                Change visibility
            </Button>
            <Divider orientation="vertical" h="50%" mr="0.5em" />
            {data.assignees.map((assignee) => (
                <UserAvatar key={assignee.id} name={assignee.name} />
            ))}

            <Button colorScheme="whiteAlpha" size="sm" mr="0.5em">
                Invite
            </Button>
            <Divider orientation="vertical" h="50%" mr="0.5em" />

            <HStack spacing="5px">
                <InputGroup size="sm" w="200px">
                    <Input
                        border="none"
                        fontSize="14px"
                        value={searchValue}
                        placeholder="Search in board..."
                        bg={`${getCurrentTheme()}.700`}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => handleSearchKeyDown(e)}
                    />
                    <InputRightElement children={<FaSearch color="white" />} />
                </InputGroup>
                {searchValue && (
                    <Button size="sm" colorScheme={getCurrentTheme()} onClick={handleSearch}>
                        Search
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
                        Remove filters
                    </Button>
                )}
            </HStack>
        </Flex>
    );
}
