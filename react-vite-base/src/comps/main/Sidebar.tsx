import { APP_NAME } from "@/config"
import { BadgePercent, BookOpenText, Cloud, DatabaseZapIcon, House, Store, TagsIcon, Target, Users2 } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = () => {

    return (
        <div className="--app-sidebar w-[200px] flex flex-col h-full border-r border-border">
            {/* <Link to={`/dashboard`} className="mb-2 flex items-center gap-3 font-medium px-4 py-3 cursor-pointer transition-colors"> */}
            {/* <Link to="/" className="font-black flex items-center gap-2 text-xl text-primary">
					<Cloud className='size-7' />
					Cloud POS
				</Link> */}
            {/* </Link> */}
            <div className="flex flex-col flex-1">
                {/* {[
                    { label: `Dashboard`, uri: ``, icon: House },
                    { label: `Products`, uri: `/products`, icon: TagsIcon },
                    { label: `Categories`, uri: `/categories`, icon: BookOpenText },
                    { label: `Customers`, uri: `/products`, icon: Users2 },
                    { label: `Marketing`, uri: `/products`, icon: Target },
                    { label: `Discounts`, uri: `/discounts`, icon: BadgePercent },
                    { label: `Branches`, uri: `/branches`, icon: Store }
                ].map((o, i) => (
                    <Link
                        key={`nav-${i}-${o.uri}`}
                        to={`/dashboard${o.uri}`}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                    >
                        <o.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{o.label}</span>
                    </Link>
                ))} */}
            </div>
            <div></div>
        </div>
    )
}

export default Sidebar