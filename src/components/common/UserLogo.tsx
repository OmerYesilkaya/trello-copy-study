import { Center } from "@chakra-ui/layout";

type Props = {
	name: string;
};

export default function UserLogo({ name }: Props) {
	return (
		<Center
			w="10px"
			h="10px"
			minW="10px"
			minH="10px"
			p="16px"
			bg="gray.300"
			color="gray.900"
			fontSize="14px"
			borderRadius="60px"
			fontWeight="semibold"
			title="Omer Faruk"
		>
			{name.split(" ")[0][0].toUpperCase() + name.split(" ")[1][0].toUpperCase()}
		</Center>
	);
}
