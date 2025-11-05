'use client';
import ImageCard from '@/app/components/image-card';
import { useEffect, useRef, useState } from 'react';

// Placeholder ImageCard component

const images = [
    '/im1.jpg',
    '/im3.jpg',
    '/im1.jpg',
    '/im5.jpg',
    '/im2.jpg',
    '/im6.jpg',
    '/im7.jpg',
    '/im2.jpg',
];

function VerticalMarquee() {
    const containerRef = useRef(null);
    const slidesRef = useRef([]);
    const animationRef = useRef(null);
    const isDraggingRef = useRef(false);
    const startYRef = useRef(0);
    const currentPositionRef = useRef(0);
    const velocityRef = useRef(1); // pixels per frame
    const dragThresholdRef = useRef(false);
    const [isHovered, setIsHovered] = useState(false);
    const isPausedRef = useRef(false);

    // Triple the images for seamless looping
    const tripleImages = [...images, ...images, ...images];
    const slideHeight = 410; // 390px + 20px spacing
    const totalHeight = images.length * slideHeight;

    useEffect(() => {
        const slides = slidesRef.current;
        const container = containerRef.current;

        // Set initial positions
        slides.forEach((slide, i) => {
            if (slide) {
                slide.style.transform = `translateY(${
                    (i - images.length) * slideHeight
                }px)`;
            }
        });

        currentPositionRef.current = 0;

        // Marquee animation function
        const animate = () => {
            if (!isDraggingRef.current && !isPausedRef.current) {
                currentPositionRef.current += velocityRef.current;

                // Reset position for seamless loop
                if (currentPositionRef.current >= totalHeight) {
                    currentPositionRef.current -= totalHeight;
                }

                slides.forEach((slide, i) => {
                    if (slide) {
                        const baseY = (i - images.length) * slideHeight;
                        const y = baseY - currentPositionRef.current;
                        slide.style.transform = `translateY(${y}px)`;
                    }
                });
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        // Wheel event handler
        let wheelTimeout;
        const handleWheel = e => {
            e.preventDefault();

            clearTimeout(wheelTimeout);

            // Temporarily increase velocity based on wheel direction
            const wheelDelta = e.deltaY * 0.5;
            velocityRef.current = Math.max(
                0.5,
                Math.min(5, Math.abs(wheelDelta) * 0.1)
            );

            if (e.deltaY < 0) {
                velocityRef.current *= -1;
            }

            wheelTimeout = setTimeout(() => {
                // Return to normal speed
                velocityRef.current = 0.5;
            }, 500);
        };

        // Touch/Mouse drag handlers
        let lastY = 0;
        let lastTime = Date.now();

        const handleStart = e => {
            e.preventDefault();
            isDraggingRef.current = true;
            dragThresholdRef.current = false;
            startYRef.current = e.type.includes('mouse')
                ? e.clientY
                : e.touches[0].clientY;
            lastY = startYRef.current;
            lastTime = Date.now();

            container.style.cursor = 'grabbing';
        };

        const handleMove = e => {
            if (!isDraggingRef.current) return;

            e.preventDefault();

            const currentY = e.type.includes('mouse')
                ? e.clientY
                : e.touches[0].clientY;
            const currentTime = Date.now();
            const deltaY = lastY - currentY;
            const deltaTime = Math.max(1, currentTime - lastTime);

            // Update position based on drag
            currentPositionRef.current += deltaY;

            // Keep within bounds for seamless loop
            if (currentPositionRef.current >= totalHeight) {
                currentPositionRef.current -= totalHeight;
            } else if (currentPositionRef.current < 0) {
                currentPositionRef.current += totalHeight;
            }

            // Calculate velocity for momentum
            velocityRef.current = (deltaY / deltaTime) * 16; // Convert to per-frame velocity

            lastY = currentY;
            lastTime = currentTime;
        };

        const handleEnd = e => {
            if (!isDraggingRef.current) return;

            e.preventDefault();
            isDraggingRef.current = false;
            dragThresholdRef.current = false;

            container.style.cursor = 'grab';

            // Apply momentum and gradually slow down
            const momentum = velocityRef.current;
            let currentMomentum = momentum;
            const friction = 0.95;

            const applyMomentum = () => {
                if (Math.abs(currentMomentum) > 0.1 && !isDraggingRef.current) {
                    currentMomentum *= friction;
                    velocityRef.current = currentMomentum;
                    requestAnimationFrame(applyMomentum);
                } else {
                    velocityRef.current = 0.5; // Return to normal speed
                }
            };

            applyMomentum();
        };

        // Add event listeners
        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('mousedown', handleStart);
        container.addEventListener('mousemove', handleMove);
        container.addEventListener('mouseup', handleEnd);
        container.addEventListener('mouseleave', handleEnd);
        container.addEventListener('touchstart', handleStart, {
            passive: false,
        });
        container.addEventListener('touchmove', handleMove, { passive: false });
        container.addEventListener('touchend', handleEnd, { passive: false });

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('mousedown', handleStart);
            container.removeEventListener('mousemove', handleMove);
            container.removeEventListener('mouseup', handleEnd);
            container.removeEventListener('mouseleave', handleEnd);
            container.removeEventListener('touchstart', handleStart);
            container.removeEventListener('touchmove', handleMove);
            container.removeEventListener('touchend', handleEnd);
            clearTimeout(wheelTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pause on hover
    const handleMouseEnter = () => {
        setIsHovered(true);
        isPausedRef.current = true;
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        isPausedRef.current = false;
    };

    return (
        <div className='absolute h-screen right-0 z-20 w-full max-w-lg'>
            <div
                ref={containerRef}
                className='main h-full overflow-hidden relative cursor-grab select-none'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ touchAction: 'none' }}>
                <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                    {tripleImages.map((image, i) => (
                        <div
                            key={i}
                            ref={el => (slidesRef.current[i] = el)}
                            className='absolute rounded-2xl overflow-hidden shadow-lg w-full'
                            style={{
                                height: '390px',
                                width: '354px',
                                pointerEvents: 'none',
                                willChange: 'transform',
                            }}>
                            <ImageCard image={image} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VerticalMarquee;

