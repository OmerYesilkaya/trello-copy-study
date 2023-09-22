import { Center, Text, VStack } from "@chakra-ui/layout";
import { FaSearch } from "react-icons/fa";

export function CardNotFound() {
    return (
        <Center
            h="400px"
            w="300px"
            borderRadius="md"
            border="3px dashed"
            borderColor="whiteAlpha.300"
            p="1em"
            mr="1em"
            color="white"
            textAlign="center"
        >
            <VStack spacing="10px">
                <FaSearch size="1.5em" />
                <Text>Sorry, we couldn’t find a card matching your search. Please try a different query.</Text>
            </VStack>
        </Center>
    );
}
