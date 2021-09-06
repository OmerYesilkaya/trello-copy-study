import { Button } from "@chakra-ui/button";

type NavbarButtonProps = {
	children: JSX.Element;
};

export default function NavbarButton({ children }: NavbarButtonProps) {
	return (
		<Button colorScheme="twitter" h="30px" minW="30px" p="0px" mr="5px">
			{children}
		</Button>
	);
}
