import { Button } from "@chakra-ui/button";

type NavbarButtonTypes = {
	children: JSX.Element;
};

export default function NavbarButton({ children }: NavbarButtonTypes) {
	return (
		<Button colorScheme="twitter" h="30px" minW="30px" p="0px" mr="5px">
			{children}
		</Button>
	);
}
