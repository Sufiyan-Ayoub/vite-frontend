import { TRANSITIONS } from "./enums";
import { FX } from "./types";

export const defaults: FX = {
    transition: TRANSITIONS.Fade,
    curve: "ease",
    duration: 0.5,
    delay: 0,
    when: true,
};

export const animationPresets: Record<string, { from: React.CSSProperties; to: React.CSSProperties }> = {
    [TRANSITIONS.Fade]: { from: { opacity: 0 }, to: { opacity: 1 } },
    [TRANSITIONS.SlideTop]: { from: { opacity: 0, transform: "translateY(-20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
    [TRANSITIONS.SlideBottom]: { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
    [TRANSITIONS.SlideLeft]: { from: { opacity: 0, transform: "translateX(-20px)" }, to: { opacity: 1, transform: "translateX(0)" } },
    [TRANSITIONS.SlideRight]: { from: { opacity: 0, transform: "translateX(20px)" }, to: { opacity: 1, transform: "translateX(0)" } },
    [TRANSITIONS.ScaleUp]: { from: { opacity: 0, transform: "scale(0.8)" }, to: { opacity: 1, transform: "scale(1)" } },
    [TRANSITIONS.ScaleDown]: { from: { opacity: 0, transform: "scale(1.2)" }, to: { opacity: 1, transform: "scale(1)" } },
    [TRANSITIONS.Rotate]: { from: { opacity: 0, transform: "rotate(-15deg)" }, to: { opacity: 1, transform: "rotate(0deg)" } },
    [TRANSITIONS.Shake]: { from: { transform: "translateX(-5px)" }, to: { transform: "translateX(0px)" } },
    [TRANSITIONS.Bounce]: { from: { transform: "translateY(-20px)" }, to: { transform: "translateY(0)" } },
    [TRANSITIONS.Pulse]: { from: { transform: "scale(0.95)", opacity: 0.5 }, to: { transform: "scale(1)", opacity: 1 } },
    [TRANSITIONS.Swing]: { from: { transform: "rotate(-5deg)" }, to: { transform: "rotate(0deg)" } },
    [TRANSITIONS.FlipX]: { from: { transform: "rotateY(90deg)", opacity: 0 }, to: { transform: "rotateY(0deg)", opacity: 1 } },
    [TRANSITIONS.FlipY]: { from: { transform: "rotateX(90deg)", opacity: 0 }, to: { transform: "rotateX(0deg)", opacity: 1 } },
    [TRANSITIONS.ZoomIn]: { from: { transform: "scale(0.8)", opacity: 0 }, to: { transform: "scale(1)", opacity: 1 } },
    [TRANSITIONS.ZoomOut]: { from: { transform: "scale(1.2)", opacity: 0 }, to: { transform: "scale(1)", opacity: 1 } },
    [TRANSITIONS.Flip]: { from: { transform: "rotateY(180deg)", opacity: 0 }, to: { transform: "rotateY(0deg)", opacity: 1 } },
};


// export const animationPresets: Record<TRANSITIONS, { from: string; to: string }> = {
//     [TRANSITIONS.Fade]: { from: "opacity-0", to: "opacity-100" },
//     [TRANSITIONS.SlideTop]: { from: "opacity-0 -translate-y-5", to: "opacity-100 translate-y-0" },
//     [TRANSITIONS.SlideBottom]: { from: "opacity-0 translate-y-5", to: "opacity-100 translate-y-0" },
//     [TRANSITIONS.SlideLeft]: { from: "opacity-0 -translate-x-5", to: "opacity-100 translate-x-0" },
//     [TRANSITIONS.SlideRight]: { from: "opacity-0 translate-x-5", to: "opacity-100 translate-x-0" },
//     [TRANSITIONS.ScaleUp]: { from: "opacity-0 scale-95", to: "opacity-100 scale-100" },
//     [TRANSITIONS.ScaleDown]: { from: "opacity-0 scale-105", to: "opacity-100 scale-100" },
//     [TRANSITIONS.Rotate]: { from: "opacity-0 -rotate-12", to: "opacity-100 rotate-0" },
//     [TRANSITIONS.ZoomIn]: { from: "opacity-0 scale-95", to: "opacity-100 scale-100" },
//     [TRANSITIONS.ZoomOut]: { from: "opacity-0 scale-105", to: "opacity-100 scale-100" },
//     [TRANSITIONS.Bounce]: { from: "-translate-y-5", to: "translate-y-0" },
//     [TRANSITIONS.Shake]: { from: "-translate-x-1", to: "translate-x-0" },
//     [TRANSITIONS.Pulse]: { from: "opacity-50 scale-95", to: "opacity-100 scale-100" },
//     [TRANSITIONS.Swing]: { from: "-rotate-5", to: "rotate-0" },
//     [TRANSITIONS.FlipX]: { from: "rotate-y-90 opacity-0", to: "rotate-y-0 opacity-100" },
//     [TRANSITIONS.FlipY]: { from: "rotate-x-90 opacity-0", to: "rotate-x-0 opacity-100" },
//     [TRANSITIONS.Flip]: { from: "rotate-y-180 opacity-0", to: "rotate-y-0 opacity-100" },
// };
