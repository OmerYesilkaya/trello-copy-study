import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";

export default function useCustomToast() {
	const toast = useToast();

	const successToast = useCallback(
		(description: string) => {
			toast({
				description: description,
				status: "success",
				title: "Başarılı",
				duration: 3000,
				isClosable: true,
			});
		},
		[toast]
	);

	const errorToast = useCallback(
		(description: string) => {
			toast({
				description: description,
				status: "error",
				title: "Hata",
				duration: 3000,
				isClosable: true,
			});
		},
		[toast]
	);

	const warningToast = useCallback(
		(description: string) => {
			toast({
				description: description,
				title: "Uyarı",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
		},
		[toast]
	);

	return { successToast, errorToast, warningToast };
}
