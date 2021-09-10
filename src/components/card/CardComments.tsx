import { Flex, Text } from "@chakra-ui/layout";
import { Card } from "models/Card";
import { MdList } from "react-icons/md";
import CommentElement from "./CommentElement";
import CommentInput from "./CommentInput";

type Props = {
	card: Card;
};
export default function CardComments({ card }: Props) {
	return (
		<>
			<Flex align="center" mt="10px">
				<MdList size="1.5em" />{" "}
				<Text fontWeight="semibold" ml="5px">
					Etkinlik
				</Text>
			</Flex>
			<CommentInput card={card} />
			<Flex direction="column">
				{card.comments.map((comment) => (
					<CommentElement key={comment.id} card={card} comment={comment} />
				))}
			</Flex>
		</>
	);
}
