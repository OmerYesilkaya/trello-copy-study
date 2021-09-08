import { Box, Flex, Text } from "@chakra-ui/layout";
import UserLogo from "components/common/UserLogo";
import { Comment } from "models/Comment";

type Props = {
	comment: Comment;
};

export default function CommentElement({ comment }: Props) {
	return (
		<Flex align="center" mt="1em">
			<UserLogo name={comment.user.name} />
			<Box ml="5px" p="0.5em" borderRadius="md" bg="gray.100" w="100%">
				<Text fontSize="14px">{comment.text}</Text>
				<Text color="gray.500" fontSize="12px" overflowWrap="break-word">
					{new Date(comment.createDate).toUTCString()}
				</Text>
			</Box>
		</Flex>
	);
}
