import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isDesktop, setIsDesktop] = useState(width > 576);

    useEffect(() => {
        setIsDesktop(width > 576);
    }, [width]);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return {
        isDesktop,
        isMobile: !isDesktop,
        width,
    };
};
