import { useEffect, useState } from "react";

export function useDebounceEffect(callback: () => void, deps: any[], delay: number): { isLoading: boolean } {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const handler = setTimeout(() => {
            callback();
            setIsLoading(false);
        }, delay);
        return () => {
            clearTimeout(handler);
        };

        // NOTE(omer):
        // eslint-disable-next-line
    }, [...deps, callback, delay]);

    return { isLoading };
}
