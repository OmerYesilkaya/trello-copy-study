import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import UserLogo from "components/common/UserLogo";
import { users } from "constants/users";
import { Card } from "models/Card";
import { Comment } from "models/Comment";
import { useEffect, useRef, useState } from "react";
import { useBoardStore } from "store/useBoardStore";
import CommentDate from "./CommentDate";

type Props = {
	card: Card;
	comment: Comment;
};

export default function CommentElement({ card, comment }: Props) {
	const targetRef = useRef<HTMLDivElement>(null);
	const [editActive, setEditActive] = useState<boolean>(false);
	const [text, setText] = useState(comment.text);
	const { getCurrentTheme, removeComment, updateComment } = useBoardStore((state) => ({
		getCurrentTheme: state.getCurrentTheme,
		updateComment: state.updateComment,
		removeComment: state.removeComment,
	}));

	function handleDeleteComment() {
		setEditActive(false);
		removeComment(card.id, card.parentListId, comment.id);
	}

	function handleClick() {
		updateComment(card.id, card.parentListId, comment.id, text);
		setEditActive(false);
		setText("");
	}

	useEffect(() => {
		// check wheter mouse click is on create list element, if it is not close edit segment
		if (!targetRef.current) return;
		function handleMouseDown(e: MouseEvent) {
			if (targetRef.current && targetRef.current.contains(e.target as any)) return;
			setEditActive(false);
		}

		window.addEventListener("mousedown", handleMouseDown);
		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
		};
	}, []);

	return (
		<Flex align="center" mt="1em">
			<UserLogo name={comment.user.name} />
			{editActive ? (
				<VStack ref={targetRef} w="100%" ml="5px">
					<Input w="100%" size="sm" value={text} onChange={(e) => setText(e.target.value)} />

					<Flex mt="0.5em" align="center" alignSelf="start">
						<Button size="sm" colorScheme={getCurrentTheme()} onClick={handleClick}>
							Kaydet
						</Button>
						<CloseButton ml="0.5em" onClick={() => setEditActive(false)} />
					</Flex>
				</VStack>
			) : (
				<Box ml="5px" w="100%">
					<Box p="0.5em" borderRadius="md" bg="gray.100" w="100%">
						<Text fontSize="14px">{comment.text}</Text>
						<CommentDate comment={comment} />
					</Box>
					{/* Note(omer): Normally we would have some sort of authentication here but since there is no user system I will just hardcode my name here */}
					{users[0].name === "??mer Ye??ilkaya" && (
						<HStack spacing="5px" color="gray.400" fontSize="xs">
							<Text cursor="pointer" textDecoration="underline" onClick={() => setEditActive(true)}>
								D??zenle
							</Text>
							<Text cursor="pointer" textDecoration="underline" onClick={handleDeleteComment}>
								Sil
							</Text>
						</HStack>
					)}
				</Box>
			)}
		</Flex>
	);
}
