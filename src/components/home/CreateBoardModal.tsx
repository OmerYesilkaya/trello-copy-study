import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useHistory } from "react-router";
import { useBoardStore } from "store/useBoardStore";
import { generateId } from "utils/generateId";
import { useState } from "react";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

type ColorTagProps = {
	label: string;
};

function RadioColorTag({ label }: ColorTagProps) {
	const color = label.toLowerCase();
	return (
		<Radio colorScheme={color} value={color}>
			<Flex align="center" fontSize="14px">
				{label} <Box ml="5px" w="16px" h="16px" borderRadius="md" bg={`${color}.500`} />
			</Flex>
		</Radio>
	);
}

type FormParams = {
	boardName: string;
};

export default function CreateBoardModal({ isOpen, onClose }: Props) {
	const history = useHistory();
	const [themeColor, setThemeColor] = useState<string>("");
	const { register, handleSubmit } = useForm<FormParams>();
	const { createNewBoard } = useBoardStore((state) => ({ createNewBoard: state.createNewBoard }));

	function onSubmit(data: FormParams) {
		const uid = generateId();
		history.push(`/board/${uid}`);
		createNewBoard(uid, data.boardName, themeColor);
		onClose();
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>Pano Oluştur</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex direction="column">
							<Input placeholder="Pano Başlığı Ekle" {...register("boardName")} />
							<RadioGroup mt="1em" onChange={(e) => setThemeColor(e)}>
								<Grid templateColumns="1fr 1fr 1fr" gap="5px">
									<RadioColorTag label="Blue" />
									<RadioColorTag label="Green" />
									<RadioColorTag label="Pink" />
									<RadioColorTag label="Purple" />
									<RadioColorTag label="Red" />
									<RadioColorTag label="Yellow" />
								</Grid>
							</RadioGroup>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} type="submit">
							Pano Oluştur
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Kapat
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
