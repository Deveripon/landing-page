'use client';
import ImageCard from '@/app/components/image-card';
import { useEffect, useRef, useState } from 'react';

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

function HorizontalMarquee() {
    const containerRef = useRef(null);
    const slidesRef = useRef([]);
    const animationRef = useRef(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const currentPositionRef = useRef(0);
    const velocityRef = useRef(1.5); // pixels per frame
    const dragThresholdRef = useRef(false);
    const [isHovered, setIsHovered] = useState(false);
    const isPausedRef = useRef(false);
    const [slideWidth, setSlideWidth] = useState(374);

    // Triple the images for seamless looping
    const tripleImages = [...images, ...images, ...images];
    const totalWidth = images.length * slideWidth;

    // Update slideWidth based on screen size
    useEffect(() => {
        const updateSlideWidth = () => {
            if (window.innerWidth >= 768) {
                // md breakpoint
                setSlideWidth(374); // 354px + 20px spacing
            } else {
                setSlideWidth(265); // 250px + 15px spacing
            }
        };

        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);

        return () => window.removeEventListener('resize', updateSlideWidth);
    }, []);

    useEffect(() => {
        const slides = slidesRef.current;
        const container = containerRef.current;

        // Set initial positions
        slides.forEach((slide, i) => {
            if (slide) {
                slide.style.transform = `translateX(${
                    (i - images.length) * slideWidth
                }px)`;
            }
        });

        currentPositionRef.current = 0;

        // Marquee animation function
        const animate = () => {
            if (!isDraggingRef.current && !isPausedRef.current) {
                currentPositionRef.current += velocityRef.current;

                // Reset position for seamless loop
                if (currentPositionRef.current >= totalWidth) {
                    currentPositionRef.current -= totalWidth;
                }

                slides.forEach((slide, i) => {
                    if (slide) {
                        const baseX = (i - images.length) * slideWidth;
                        const x = baseX - currentPositionRef.current;
                        slide.style.transform = `translateX(${x}px)`;
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
            const wheelDelta = e.deltaX || e.deltaY * 0.5;
            velocityRef.current = Math.max(
                0.5,
                Math.min(5, Math.abs(wheelDelta) * 0.1)
            );

            if (wheelDelta < 0) {
                velocityRef.current *= -1;
            }

            wheelTimeout = setTimeout(() => {
                // Return to normal speed
                velocityRef.current = 1.5;
            }, 500);
        };

        // Touch/Mouse drag handlers
        let lastX = 0;
        let lastTime = Date.now();

        const handleStart = e => {
            e.preventDefault();
            isDraggingRef.current = true;
            dragThresholdRef.current = false;
            startXRef.current = e.type.includes('mouse')
                ? e.clientX
                : e.touches[0].clientX;
            lastX = startXRef.current;
            lastTime = Date.now();

            container.style.cursor = 'grabbing';
        };

        const handleMove = e => {
            if (!isDraggingRef.current) return;

            e.preventDefault();

            const currentX = e.type.includes('mouse')
                ? e.clientX
                : e.touches[0].clientX;
            const currentTime = Date.now();
            const deltaX = lastX - currentX;
            const deltaTime = Math.max(1, currentTime - lastTime);

            // Update position based on drag
            currentPositionRef.current += deltaX;

            // Keep within bounds for seamless loop
            if (currentPositionRef.current >= totalWidth) {
                currentPositionRef.current -= totalWidth;
            } else if (currentPositionRef.current < 0) {
                currentPositionRef.current += totalWidth;
            }

            // Calculate velocity for momentum
            velocityRef.current = (deltaX / deltaTime) * 16; // Convert to per-frame velocity

            lastX = currentX;
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
                    velocityRef.current = 1.5; // Return to normal speed
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
    }, [slideWidth, totalWidth]);

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
        <div className='absolute left-0 top-[65vh] z-0 w-screen'>
            <div
                ref={containerRef}
                className='main md:h-[390px] h-[200px] overflow-hidden relative cursor-grab select-none'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ touchAction: 'none' }}>
                <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                    {tripleImages.map((image, i) => (
                        <div
                            key={i}
                            ref={el => (slidesRef.current[i] = el)}
                            className='absolute rounded-2xl md:h-[390px] h-[200px] md:w-[354px] w-[250px] overflow-hidden shadow-lg'
                            style={{
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

export default HorizontalMarquee;

