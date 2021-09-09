import { Box, HStack, Badge } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { Card } from "models/Card";
import { MotionBox } from "motion/chakra";
import AddTagPopover from "./AddTagPopOver";

type Props = {
	card: Card;
};
export default function CardTags({ card }: Props) {
	return (
		<>
			{card.tags.length !== 0 && (
				<Box mt="0.5em">
					<Text color="gray.500" fontSize="xs" ml="3px">
						Etiketler
					</Text>
					<HStack spacing="4px">
						{card.tags.map((tag, idx) => (
							<MotionBox key={idx} whileHover={{ y: -2 }} cursor="pointer">
								<Badge ml="4px" colorScheme={tag.toLowerCase()} variant="subtle">
									{tag}
								</Badge>
							</MotionBox>
						))}
					</HStack>
				</Box>
			)}
			<AddTagPopover card={card} />
		</>
	);
}
