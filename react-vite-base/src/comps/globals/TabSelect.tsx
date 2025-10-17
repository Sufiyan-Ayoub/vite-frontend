import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/ui/tabs"
import { useState } from "react"

type TabSelectProps<T extends string> = {
    defaultValue?: T
    options: Array<{ value: T; label: string }>
    name?: string
}

const TabSelect = <T extends string>({ options, defaultValue, name }: TabSelectProps<T>) => {
    const [value, setValue] = useState<T>(defaultValue ?? options[0].value)

    return (
        <>
            <Tabs
                value={value}
                onValueChange={v => setValue(v as T)}
            >
                <TabsList className="bg-input">
                    {options.map((option) => (
                        <TabsTrigger key={option.value} value={option.value} className="capitalize">
                            {option.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <input type={`hidden`} name={name ||  `tab-select`} value={value} />
        </>
    )
}
export default TabSelect