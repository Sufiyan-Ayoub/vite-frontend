import { Sidebar } from "@/comps/main"
// import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        // <div className={`--main w-screen h-screen fixed inset-0 overflow-hidden flex`}>
        //     <Sidebar />
        //     <div className={`--content bg-main-bg flex flex-1 h-fulloverflow-y-auto`}>
        //         <Outlet />
        //     </div>
        // </div>
        <div className={`--main w-screen relative h-screen flex`}>
            <Sidebar />
            <div className={`--content flex flex-1 h-full overflow-y-auto`}>
                {/* <Outlet /> */}
            </div>
        </div>
    )
}

export default MainLayout