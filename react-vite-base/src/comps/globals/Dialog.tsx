import { cn } from '@/cores';
import { Icon } from '@/types/utils';
import { Button } from '@/ui/button';
import {
    Dialog as LDialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/ui/dialog';
import { forwardRef, ReactNode, useId, useImperativeHandle, useState } from 'react';

export type DialogHandler = {
    open: () => void;
    close: () => void;
}

type DialogProps = {
    trigger?: ReactNode;
    label?: string;
    children: ReactNode;
    as?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    actions?: {
        label?: string,
        onClick?: () => void;
        variant?: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`,
        size?: `default` | `sm` | `lg` | `icon`,
        icon?: Icon
    }[]
}

const Dialog = forwardRef<DialogHandler, DialogProps>(({ trigger, label, children, actions, as, open: controlledOpen, onOpenChange }, ref) => {
    const id = useId()
    const [internalOpen, setInternalOpen] = useState<boolean>(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = (state: boolean) => {
        if (!isControlled) setInternalOpen(state);
        if (onOpenChange) onOpenChange(state);
    };

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
        open: () => handleOpenChange(true),
        close: () => handleOpenChange(false)
    }));

    return (
        <LDialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || <Button size="sm">Open Dialog</Button>}
            </DialogTrigger>

            <DialogContent className={cn("max-w-3xl max-h-[90vh] flex flex-col gap-4 overflow-auto", as)}>
                {/* Header with title and close button */}
                <DialogHeader className="bg-input flex justify-between items-start border-b border-dialog">
                    <DialogTitle className="text-sm font-medium">{label || 'Dialog Title'}</DialogTitle>
                    {/* <DialogClose asChild>
                        <button 
                            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none"
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </DialogClose> */}
                </DialogHeader>

                {/* Body */}
                {children || <p className="text-gray-600">Dialog content goes here...</p>}
                {actions && actions.length > 0 && <DialogFooter>
                    {actions.map((a, i) => <Button
                        key={`dialog-${label}-${id}`}
                        variant={a.variant}
                        size={a.size}
                        onClick={a.onClick}
                    >
                        {a.icon && <a.icon />}
                        {a.label}
                    </Button>)}
                </DialogFooter>}
            </DialogContent>
        </LDialog>
    );
});

export default Dialog;
