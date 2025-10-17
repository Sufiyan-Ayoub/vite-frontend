import { FC, forwardRef, useImperativeHandle, useState } from 'react'
import { CoverHandler, CoverProps } from './types';
import './index.css'

const Cover = forwardRef<CoverHandler, CoverProps>(({ msg, fullMode=true }, ref) => {
    const [visible, setVisible] = useState(true);
    
    useImperativeHandle(ref, () => ({
        setLoading: (state: boolean) => setVisible(state),
        open: () => setVisible(true),
        close: () => setVisible(false)
    }));

    if (!visible) return null;

    const css = fullMode 
        ? "loader fixed inset-0 flex items-center justify-center z-50 bg-background/50" 
        : "loader relative w-full h-full flex items-center justify-center bg-background/50 rounded-md";

    return (
        <div aria-label="Loading..." role="status" className={css}>
            <svg className="icon" viewBox="0 0 256 256">
                <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            </svg>
            <span className="loading-text">{msg || `Loading...`}</span>
        </div>
    )
})

export default Cover