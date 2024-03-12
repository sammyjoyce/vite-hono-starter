import {ReactNode, useState} from 'react';

interface SwipeToDeleteProps {
    children: ReactNode;
    onSwipe: () => void;
}

export function SwipeToDelete({children, onSwipe}: SwipeToDeleteProps) {
    // Setup
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [swiping, setSwiping] = useState(false);

    // Logic
    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setStartX(touch.clientX);
        setSwiping(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (swiping) {
            const touch = e.touches[0];
            setCurrentX(touch.clientX - startX);
        }
    };

    const handleTouchEnd = () => {
        if (swiping) {
            setSwiping(false);
            if (Math.abs(currentX) > 50) { // Swipe threshold, adjust as necessary
                onSwipe();
            }
            setCurrentX(0);
        }
    };

    // Guard Clauses
    // None

    // Markup
    const swipeStyle = {
        transform: `translateX(${currentX}px)`,
        transition: swiping ? 'none' : 'transform 0.2s ease',
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={swipeStyle}
        >
            {children}
        </div>
    );
}
