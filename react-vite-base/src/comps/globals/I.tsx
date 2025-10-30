import { FC, ReactNode } from 'react'

const I : FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='flex flex-col gap-2'>
            {children}     
        </div>
    )
}

export default I