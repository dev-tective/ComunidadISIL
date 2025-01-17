import { useEffect, useRef, useState } from "react";

interface UseErrorFieldOptions {
    value: string;
    errorConditions?: (value: string, setError: (error: string | null) => void) => void;
}

export function useErrorField<T extends HTMLElement>(
    { value, errorConditions }: UseErrorFieldOptions
) {
    const ref = useRef<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    useEffect(() => {
        if (isTouched && errorConditions) {
            errorConditions(value, setError);
        }
    }, [value, isTouched, errorConditions]);

    const handleBlur = () => {
        setIsTouched(true);
        if (errorConditions) {
            errorConditions(value, setError);
        }
    };

    return { ref, error, handleBlur };
}
