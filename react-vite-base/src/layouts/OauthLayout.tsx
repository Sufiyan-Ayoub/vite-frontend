import { Outlet } from 'react-router-dom'

const OauthLayout = () => {
    // flex-col items-center justify-center overflow-y-auto
    return (
        <div className={`--oauth min-h-screen py-[10px] flex items-center justify-center overflow-auto`}>
            <Outlet />
        </div>
    )
}

export default OauthLayout