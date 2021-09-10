import { Button } from "@chakra-ui/button";
import { useBoardStore } from "store/useBoardStore";

type NavbarButtonProps = {
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	children: JSX.Element;
};

export default function NavbarButton({ onClick, children }: NavbarButtonProps) {
	const { getCurrentTheme } = useBoardStore((state) => ({ getCurrentTheme: state.getCurrentTheme }));

	return (
		<Button colorScheme={getCurrentTheme()} h="30px" minW="30px" p="0px" mr="5px" onClick={onClick}>
			{children}
		</Button>
	);
}
