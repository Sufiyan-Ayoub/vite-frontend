'use client';
import { useState, useEffect, ElementType } from "react";
import { ToastService } from "../index";
import { Toast } from "@/types";

const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        const handleToast = (message: string, type: "success" | "error" | "info", duration: number, icon?: ElementType) => {
            const id = Math.random().toString(36).slice(2, 11);
            setToasts((prev) => [
                ...prev,
                { id, message, icon: icon, type, duration, visible: false }
            ]);

            setTimeout(() => {
                setToasts((prev) =>
                    prev.map((toast) =>
                        toast.id === id ? { ...toast, visible: true } : toast
                    )
                );
            }, 100);

            setTimeout(() => {
                setToasts((prev) =>
                    prev.map((toast) =>
                        toast.id === id ? { ...toast, visible: false } : toast
                    )
                );
            }, duration);

            setTimeout(() => {
                setToasts((prev) => prev.filter((toast) => toast.id !== id));
            }, duration + 300);
        };

        ToastService.subscribe(handleToast);
        return () => {
            ToastService.unsubscribe(handleToast);
        };
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) =>
            prev.map((toast) =>
                toast.id === id ? { ...toast, visible: false } : toast
            )
        );

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 300); 
    };
    
    return { toasts, removeToast };
}

export default useToast