import { Button } from "@chakra-ui/button";

import { useBoardStore } from "store";

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    children: JSX.Element;
};

export function NavbarButton({ onClick, children }: Props) {
    const { getCurrentTheme } = useBoardStore((state) => ({ getCurrentTheme: state.getCurrentTheme }));

    return (
        <Button colorScheme={getCurrentTheme()} h="30px" minW="30px" p="0px" mr="5px" onClick={onClick}>
            {children}
        </Button>
    );
}
