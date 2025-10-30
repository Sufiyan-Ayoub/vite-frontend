import { getCookie } from '@/cores';
import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Authenticate: FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const oauth = () => {
        if ( typeof window != `undefined`) return;
        const _ui = getCookie(`ui`)
        if ( pathname.startsWith(`/dashboard`) && !_ui ){
            navigate(`/u/signin`)
        }else if ( _ui && !pathname.startsWith(`/dashboard`)){
            navigate(`/dashboard`)
        }

    }

    useEffect(() => {
        oauth();
    }, [])

    return null;
}

export default Authenticate