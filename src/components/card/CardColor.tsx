import { Button } from "@chakra-ui/button";
import { Grid, Text, VStack } from "@chakra-ui/layout";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Checkbox } from "@chakra-ui/react";
import { Card } from "models/Card";
import { useBoardStore } from "store/useBoardStore";

type Props = {
	card: Card;
};

export default function CardColor({ card }: Props) {
	const { updateCardColor } = useBoardStore((state) => ({
		updateCardColor: state.updateCardColor,
	}));
	const colors = ["red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"];

	return (
		<Popover>
			<PopoverTrigger>
				<Button size="sm" mr="7px" colorScheme={card.color ? card.color : "gray"}>
					Renk Ekle
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody px="8px" fontSize="sm">
					<VStack spacing="4px">
						{colors.map((color, idx) => (
							<Button
								key={idx}
								colorScheme={color}
								size="xs"
								w="100%"
								onClick={() => updateCardColor(card.id, card.parentListId, color)}
							/>
						))}
					</VStack>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}
