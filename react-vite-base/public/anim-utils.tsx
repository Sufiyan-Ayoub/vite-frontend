import { Box } from "@zuzjs/ui";
import React, { useId } from "react";
import { Children } from "@/types";

const resolveDelay = (when: WhenProp, index = 0, stagger = 0) => {
    if (typeof when === "boolean") return when ? `${index * stagger}s` : "-1s";
    if (Array.isArray(when)) return `${when[0] + index * stagger}s`;
    return `${when + index * stagger}s`;
};

type WhenProp = number | [number, number] | boolean;

type BaseAnimProps = {
    when?: WhenProp;
    duration?: number;
};

export const SplitText = ({
    text,
    when = 0,
    duration = 0.75,
    stagger = 0.045,
    scaleFrom = 2,
}: BaseAnimProps & { text: string; stagger?: number; scaleFrom?: number }) => {
    const id = useId();
    return (
        <Box style={{ whiteSpace: "pre" }}>
            {[...text].map((char, i) => (
                <span
                    key={`${id}-${i}`}
                    style={{
                        display: "inline-block",
                        opacity: 0,
                        transform: `scale(${scaleFrom})`,
                        animation: `fadeInScale ${duration}s var(--elastic-out) forwards`,
                        animationDelay: resolveDelay(when, i, stagger),
                    }}
                >
                    {char}
                </span>
            ))}
        </Box>
    );
};

export const SplitLines = ({
    text,
    when = 0,
    yFrom = 20,
    duration = 0.5,
    stagger = 0.3,
}: BaseAnimProps & { text: string; yFrom?: number; stagger?: number }) => {
    const id = useId();
    return (
        <div className="split-lines">
            {text.split("\n").map((line, i) => (
                <div
                    key={`${id}-${i}`}
                    className="line"
                    style={{
                        opacity: 0,
                        transform: `translateY(${yFrom}px)`,
                        animation: `fadeInUp ${duration}s cubic-bezier(0.4, 0.8, 0.74, 1) forwards`,
                        animationDelay: resolveDelay(when, i, stagger),
                    }}
                >
                    {line}
                </div>
            ))}
        </div>
    );
};

export const PopElement = ({
    children,
    when = 0.35,
}: { children: React.ReactNode; when?: WhenProp }) => (
    <div
        className="pop-child"
        style={{
            animationDelay: resolveDelay(when),
        }}
    >
        {children}
    </div>
);

export const BoltWrap = ({ children, when = 0}: Children & { when?: WhenProp }) => (
    <Box as={`inlineBlock w:24 h:40`}>
        {when ? <div className="bolt-wrap">{children}</div> : null}
    </Box>
);