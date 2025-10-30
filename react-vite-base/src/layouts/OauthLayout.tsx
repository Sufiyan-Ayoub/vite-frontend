import { Outlet } from 'react-router-dom'

const OauthLayout = () => {
    // flex-col items-center justify-center overflow-y-auto
    return (
        <div className={`--oauth min-h-screen py-2.5 flex items-center justify-center overflow-auto`}>
            <Outlet />
        </div>
    )
}

export default OauthLayout