import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useHistory } from "react-router";
import { useBoardStore } from "store/useBoardStore";
import { generateId } from "utils/generateId";
import { useState } from "react";
import useCustomToast from "hooks/useCustomToast";

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
	const { warningToast } = useCustomToast();
	const [themeColor, setThemeColor] = useState<string>("");
	const { register, handleSubmit } = useForm<FormParams>();
	const { createNewBoard } = useBoardStore((state) => ({ createNewBoard: state.createNewBoard }));

	function onSubmit(data: FormParams) {
		if (!data.boardName) {
			warningToast("Lütfen bir isim giriniz.");
			return;
		}
		if (!themeColor) {
			warningToast("Lütfen bir renk teması seçiniz.");
			return;
		}
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
							<Text fontSize="sm" mb="0.5em" fontWeight="bold">
								Pano adı:
							</Text>
							<Input placeholder="Pano Başlığı Ekle" {...register("boardName")} />
							<Text fontSize="sm" mt="1em" mb="0.5em" fontWeight="bold">
								Renk Teması:
							</Text>
							<RadioGroup onChange={(e) => setThemeColor(e)}>
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
						<Button colorScheme="blue" mr={3} type="submit" size="sm">
							Pano Oluştur
						</Button>
						<Button variant="ghost" onClick={onClose} size="sm">
							Kapat
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
