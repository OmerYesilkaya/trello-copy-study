import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";

export function useCustomToast() {
    const toast = useToast();

    const successToast = useCallback(
        (description: string) => {
            toast({
                description: description,
                status: "success",
                title: "Success",
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
                title: "Error",
                status: "error",
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
                title: "Warning",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        },
        [toast]
    );

    return { successToast, errorToast, warningToast };
}
