import { TRANSITIONS } from "./enums";

export type FX = {
    transition?: TRANSITIONS;
    curve?: string;
    duration?: number;
    delay?: number;
    when?: boolean;
};