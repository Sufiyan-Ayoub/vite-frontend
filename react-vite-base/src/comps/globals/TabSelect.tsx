import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/ui/tabs"
import { useState } from "react"

type TabSelectProps<T extends string | number> = {
    defaultValue?: T
    options: Array<{ value: T; label: string }>
    name?: string
}

const TabSelect = <T extends string | number>({ options, defaultValue, name }: TabSelectProps<T>) => {
    const [value, setValue] = useState<T>(defaultValue ?? options[0].value)

    return (
        <>
            <Tabs
                value={value?.toString()}
                onValueChange={v => setValue(v as T)}
            >
                <TabsList className="bg-input">
                    {options.map((option) => (
                        <TabsTrigger key={option.value?.toString()} value={option.value?.toString()} className="capitalize">
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