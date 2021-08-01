import { useState, useEffect } from 'react';

export default function CustomHidden({ xAndUp, xAndDown, children }) {
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (e) => {
            setCurrentWidth(e.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div style={{ display: xAndUp >= currentWidth || xAndDown <= currentWidth ? 'none' : 'block' }}>{children}</div>
    );
}
