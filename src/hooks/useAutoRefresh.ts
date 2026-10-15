import { useEffect, useRef, useState } from "react";

export function useAutoRefresh(fn: () => void, intervalMs: number) {
    const [enabled, setEnabled] = useState(true);
    const [nextInSec, setNextInSec] = useState(Math.floor(intervalMs / 1000));
    const tRef = useRef<number | null>(null);
    const tickRef = useRef<number | null>(null);

    useEffect(() => {
        if (!enabled) {
            if (tRef.current) window.clearInterval(tRef.current);
            if (tickRef.current) window.clearInterval(tickRef.current);
            return;
        }

        setNextInSec(Math.floor(intervalMs /1000));

        tRef.current = window.setInterval(() => {
            fn();
            setNextInSec(Math.floor(intervalMs / 1000));
        }, intervalMs);

        tickRef.current = window.setInterval(() => {
            setNextInSec((s) => (s > 0 ? s -1 : 0));
        }, 1000);

        return () => {
            if (tRef.current) window.clearInterval(tRef.current);
            if (tickRef.current) window.clearInterval(tickRef.current);
        };

        }, [enabled, intervalMs, fn]);
        return { enabled, setEnabled, nextInSec };
   
}
