import {MutableRefObject, useEffect, useRef, useState} from "react";

interface UseCascadeResult {
    amountToDisplay: number;
    ref: MutableRefObject<HTMLDivElement|null>;
}

function useCascade(amount: number): UseCascadeResult {
    const [amountToDisplay, setAmountToDisplay] = useState<number>(amount)
    const ref = useRef<HTMLDivElement|null>(null);
    const increment = amount;
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setAmountToDisplay((prev) => prev + increment);
                }
            },
            { threshold: 1.0 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [increment]);

    return {
        amountToDisplay,
        ref
    }
}

export default useCascade;