import { APP_NAME } from "@/config"
import { BadgePercent, BookOpenText, DatabaseZapIcon, House, TagsIcon, Target, Users2 } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = () => {

    const nav = [
        { label: `Dashboard`, uri: ``, icon: House },
        { label: `Products`,  uri: `/products`, icon: TagsIcon },
        { label: `Categories`,  uri: `/categories`, icon: BookOpenText },
        { label: `Customers`, uri: `/products`, icon: Users2 },
        { label: `Marketing`, uri: `/products`, icon: Target },
        { label: `Discounts`, uri: `/discounts`, icon: BadgePercent },
    ]

    return (
        <div className="--app-sidebar w-[200px] flex flex-col h-full bg-sidebar border-r border-border">
            <Link to={`/dashboard`} className="mb-2 flex items-center gap-3 font-medium px-4 py-3 cursor-pointer transition-colors">
                <DatabaseZapIcon />
                {APP_NAME}
            </Link>
            <div className="flex flex-col flex-1">
                {nav.map((o, i) => (
                    <Link 
                        key={`nav-${i}-${o.uri}`}
                        to={`/dashboard${o.uri}`} 
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                    >
                        <o.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{o.label}</span>
                    </Link>
                ))}
            </div>
            <div></div>
        </div>
    )
}

export default Sidebar