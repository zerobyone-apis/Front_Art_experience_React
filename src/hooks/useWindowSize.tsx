import { useState, useEffect } from 'react';

// Hook
export const useWindowSize = () => {
    const [size, setSize] = useState({
        width: -1,
        height: -1,
    });

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = () => {
            // Set window width/height to state
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    const isXS = () => {
        return size.width != -1 ? (size.width < 600 ? true : false) : false;
    }
    const isSM = () => {
        return size.width != -1 ? ((size.width > 601 && size.width < 960) ? true : false) : false;
    }
    const isMD = () => {
        return size.width != -1 ? ((size.width > 961 && size.width < 1280) ? true : false) : false;
    }

    return { size, isXS, isSM, isMD };
}