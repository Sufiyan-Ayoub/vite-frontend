import { Footer, Header } from "@/comps/main"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
    
    return (
        <div className={`--app w-screen h-screen overflow-y-auto`}>
            <Header />
            <div className={`--content flex-1`}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout