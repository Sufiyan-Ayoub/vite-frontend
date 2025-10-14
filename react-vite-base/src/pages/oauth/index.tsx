import { useParams } from 'react-router-dom'
import Signin from './Signin'
import Signup from './Signup'
import Verify from './Verify'
import Recover from './Recover'
import { NotFoundError } from '@/comps/errors'

const Oauth = () => {
    const { section, token } = useParams()
    
    
    if ( 
        !section || 
        !['signin', 'signup', 'verify', 'recover'].includes(section) || 
        (section === 'verify' && !token) || 
        (section !== 'verify' && token) 
    ) return <NotFoundError />;
    

    return (
        <>
            {section == `signin` && <Signin />}
            {section == `signup` && <Signup />}
            {section == `verify` && <Verify />}
            {section == `recover` && <Recover />}
        </>
    )
}

export default Oauth