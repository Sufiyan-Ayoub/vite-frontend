import {
  Select as LSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"
import { FC, useState } from "react";

type Option = {
    value: string;
    label: string;
}

const Select : FC<{options?: Option[], defaultValue?: string, name?: string }> = ({ options, defaultValue, name }) => {
    const [value, setValue] = useState<string | undefined>(defaultValue);
    return (
        <>
            <LSelect value={value} onValueChange={val => setValue(val)}>
                <SelectTrigger className="w-full bg-input border-border">
                    <SelectValue placeholder="Select UOM" />
                </SelectTrigger>
                <SelectContent>
                    {options && options.length > 0 ? options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    )) : <SelectItem disabled value="-1">No options</SelectItem>}
                </SelectContent>
            </LSelect>
            <input type={`hidden`} name={name || `drop-select`} value={value || ``} />
        </>
    )
}
export default Select