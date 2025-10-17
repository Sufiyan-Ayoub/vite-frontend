import { Icon } from "@/types/utils"
import { Button } from "@/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FC, MouseEvent } from "react"
import { Link } from "react-router-dom"

type HeadProps = {
    label?: string,
    uri?: string,
    actions?: {
        label: string,
        onClick: (e: MouseEvent<HTMLElement>) => void,
        icon?: Icon
    }[]
}

const Head : FC<HeadProps> = ({ label, uri, actions }) => {
    return (
        <div className="page-header flex border-b min-h-[50px] px-4 py-2">
            <div className="flex-1 flex items-center">
                <div className="flex-1 flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="transition-colors cursor-pointer hover:text-inherit text-gray-400">
                            <ChevronLeft size={20} />
                        </div>    
                        <div className="transition-colors cursor-pointer hover:text-inherit text-gray-400">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                    <Link to={uri || `#`} className="font-medium">{label}</Link>
                </div>
                <div className="flex-1 flex items-center justify-end gap-2">
                    {actions?.map((o, i) => (
                        <Button key={`action-${i}-${o.label}`} onClick={o.onClick} size={`sm`}>
                            {o.icon && <o.icon className="w-4 h-4 mr-2" />}
                            {o.label}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Head