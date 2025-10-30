import { useId } from "react";
type AnimProps = {
    when?: boolean;
    duration?: number;
    delay?: number;
    text: string;
    stagger?: number;
    scaleFrom?: number;
}

export const SplitText = ({
    text,
    when = true,
    delay = 0,
    duration = 0.75,
    stagger = 0.045,
    scaleFrom = 2,
}: AnimProps) => {
    const id = useId();

    return (
        <div
            className={`split-text-${id}`}
            data-animate={when ? "true" : "false"}
            style={{
                whiteSpace: `pre`,
                "--stagger": `${stagger}s`,
                "--duration": `${duration}s`,
                "--delay": `${delay}s`,
                "--scale-from": scaleFrom,
            } as React.CSSProperties}
        >
            {[...text].map((char, i) => (
                <span key={`${id}-${i}`} style={{ ["--i" as any]: i }}>{char}</span>
            ))}
        </div>
    );
};


type SplitLinesProps = {
  text: string;
  when?: boolean;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
};

export const SplitLines = ({
    text,
    when = true,
    delay = 0,
    y = 20,
    duration = 0.5,
    stagger = 0.3,
}: SplitLinesProps) => {
    const id = useId();
    return (
        <div
            className={`"split-lines-${id}`}
            data-animate={when ? "true" : "false"}
            style={{
                whiteSpace: `pre`,
                "--stagger": `${stagger}s`,
                "--duration": `${duration}s`,
                "--y": `${y}px`,
            } as React.CSSProperties}
        >
            {text.split("\n").map((line, i) => (
                <div
                    key={`${id}-${i}`}
                    style={{ ["--i" as any]: i }}
                >
                    {line}
                </div>
            ))}
        </div>
    );
};
type PopElementProps = {
    children: React.ReactNode;
    when?: boolean;
    delay?: number;
    duration?: number;
    stagger?: number;
    i?: number; // optional index for stagger
};

export const PopAnim = ({
    children,
    when = true,
    delay = 0,
    duration = 0.35,
    stagger = 0.05,
    i = 0,
}: PopElementProps) => (
    <div
        className="pop-child"
        data-animate={when ? "true" : "false"}
        style={{
            "--delay": `${delay}s`,
            "--duration": `${duration}s`,
            "--stagger": `${stagger}s`,
            "--i": i,
        } as React.CSSProperties}
    >
        {children}
    </div>
);


type BoltWrapProps = {
  children: React.ReactNode;
  when?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
  i?: number;
};

export const BoltWrap = ({
  children,
  when = true,
  delay = 0,
  duration = 0.4,
  stagger = 0.05,
  i = 0,
}: BoltWrapProps) => (
  <div className="inline-block w-6 h-10">
    {when && (
      <div
        className="bolt-wrap"
        data-animate="true"
        style={{
          "--delay": `${delay}s`,
          "--duration": `${duration}s`,
          "--stagger": `${stagger}s`,
          "--i": i,
        } as React.CSSProperties}
      >
        {children}
      </div>
    )}
  </div>
);

// export const BoltWrap = ({ children, when = 0}: Children & { when?: WhenProp }) => (
//     <Box as={`inlineBlock w:24 h:40`}>
//         {when ? <div className="bolt-wrap">{children}</div> : null}
//     </Box>
// );