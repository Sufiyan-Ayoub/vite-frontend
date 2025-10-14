import { FX } from "@/comps/globals/Anim/types";
import { ElementType, HTMLAttributes } from "react";

export type dynamic = { [key: string]: any }; 
export type Base = {
    as?: string | string[],
    fx?: FX,
}
export type Props<T> = HTMLAttributes<T> & Base;
export type Toast = {
    id: string;
    icon?: ElementType;
    message: string;
    type: "success" | "error" | "info";
    duration: number;
    visible: boolean; 
}
export type ToastType = "success" | "error" | "info";
export type ToastCallback = (message: string, type: ToastType, duration: number, icon?: ElementType) => void;
