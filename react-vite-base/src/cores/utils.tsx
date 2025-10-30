
// import gsap from "gsap";
// import { SplitText } from "gsap/all";
// import { ReactElement, RefObject } from "react";

// type AnimateSplitCharsOptions = {
//     duration?: number;
//     ease?: string;
//     stagger?: number;
//     scaleFrom?: number;
// };

// export const animateSplitChars = (
//     selector: string,
//     delay: number = 0,
//     {
//         duration = 0.75,
//         ease = "elastic.out(1, 0.4)",
//         stagger = 0.045,
//         scaleFrom = 2,
//     }: AnimateSplitCharsOptions = {}
// ) => {
//     const split = new SplitText(selector, { type: "chars" });
//     const chars = split.chars;

//     gsap.set(chars, {
//         opacity: 0,
//         scale: scaleFrom,
//     });

//     gsap.to(chars, {
//         willChange: `transform`,
//         opacity: 1,
//         scale: 1,
//         duration,
//         ease,
//         stagger,
//         delay,
//     });

//     return split;
// };



// export const animateSplitLines = (
//     selector: string,
//     delay = 0,
//     options: {
//         duration?: number;
//         ease?: string;
//         stagger?: number;
//         yFrom?: number;
//     } = {}
// ) => {
//     const {
//         duration = 0.7,
//         ease = "power2.out",
//         stagger = 0.3,
//         yFrom = 20,
//     } = options;

//     const split = new SplitText(selector, { type: "lines" });
//     const lines = split.lines;

//     gsap.set(lines, { opacity: 0, y: yFrom });
//     gsap.to(lines, {
//         opacity: 1,
//         y: 0,
//         duration,
//         ease,
//         stagger,
//         delay,
//     });

//     return split;
// };
