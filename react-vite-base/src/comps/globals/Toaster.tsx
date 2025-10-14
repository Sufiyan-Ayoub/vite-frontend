import React from "react"
import { useToast } from "@/cores/hooks"
import { Button } from "@/ui/button";
import { X } from "lucide-react";

const Toaster: React.FC = () => {
    const { toasts, removeToast } = useToast();
    console.log(toasts)
    return (
        <div className={`toast-container`}>
            {toasts
                .slice()
                .map((toast, index) => (
                    <div
                        key={toast.id}
                        className={`toast anim:.3s flex aic toast-${toast.type} ${toast.visible ? `visible` : ``}`}
                        style={{
                            top: `${index * 70 + 40}px`,
                        }}
                    >
                        <div className={`bg ${toast.visible ? `bgv` : ``}`}>
                            {toast.icon ? <toast.icon /> : <div className="w-[20px] h-[20px] rounded-2xl bg-white"></div>}
                            <div className="w-fit">{toast.message}</div>
                            <Button onClick={() => removeToast(toast.id)}>
                                <X className="size-[24px]" />
                            </Button>
                        </div>
                    </div>
                ))}
        </div>
    );
}
export default Toaster