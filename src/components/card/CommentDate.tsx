import { HStack, Text } from "@chakra-ui/layout";
import { Comment } from "models/Comment";

type Props = {
	comment: Comment;
};

export default function CommentDate({ comment }: Props) {
	return (
		<HStack>
			<Text color="gray.500" fontSize="12px" overflowWrap="break-word">
				{new Date(comment.createDate).toUTCString()}
			</Text>
			{comment.lastEditDate && (
				<Text color="gray.500" fontSize="12px" overflowWrap="break-word">
					( Son düzenleme: {new Date(comment.lastEditDate).toUTCString()} )
				</Text>
			)}
		</HStack>
	);
}
