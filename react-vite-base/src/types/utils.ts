import { FX } from "@/comps/globals/Anim/types";
import { LucideProps } from "lucide-react";
import { ElementType, ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";

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
export enum FileStatus {
    InQue,
    Uploading,
    Success,
    Error,
    Canceled
}

export type FileInfo = {
    ID: string;
    size?: number;
    name?: string;
    type?: string;
    progress?: number;
    status?: FileStatus
    uri?: string;
    url?: string | null;
    cancelRequest?: (() => void) | null
}

export type UploaderProps = {
    onChange: (file: FileInfo) => void;
    onComplete: (file: FileInfo, response: dynamic) => void;
    onError: (file: FileInfo) => void;
    onCancel: (file: FileInfo, status: FileStatus) => void;
}
export type ToastType = "success" | "error" | "info";
export type ToastCallback = (message: string, type: ToastType, duration: number, icon?: ElementType) => void;
export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;