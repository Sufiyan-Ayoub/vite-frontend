import { TRANSITIONS } from "@/comps/globals/Anim/enums";
import { animationPresets, defaults } from "@/comps/globals/Anim/presets";
import { FX } from "@/comps/globals/Anim/types";
import { useEffect, useState } from "react";

const useAnim = (fx?: FX) => {
    const { transition, curve, duration, delay, when } = { ...defaults, ...fx };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (when) {
            const timer = setTimeout(() => setMounted(true), 50);
            return () => clearTimeout(timer);
        } else {
            setMounted(false);
        }
    }, [when]);

    const preset = animationPresets[transition!] || animationPresets[TRANSITIONS.Fade];

    const style = (d?:number) => ({
        ...preset.from,
        ...(mounted ? preset.to : {}),
        transition: `all ${duration}s ${curve} ${d || delay }s`,
    });

    return style;
};
export default useAnim