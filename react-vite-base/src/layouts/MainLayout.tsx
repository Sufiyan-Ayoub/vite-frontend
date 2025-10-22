import { Sidebar } from "@/comps/main"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <div className={`--main w-screen h-screen fixed inset-0 overflow-hidden flex`}>
            <Sidebar />
            <div className={`--content bg-main-bg flex flex-1 h-fulloverflow-y-auto`}>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout