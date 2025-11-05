'use client';
import ImageCard from '@/app/components/image-card';
import { gsap } from 'gsap';
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

// Simple ImageCard component

function VerticalMarquee() {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const animationRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const speedRef = useRef(1);

    const slideHeight = 410; // 390px + 20px spacing
    const totalHeight = images.length * slideHeight;

    useEffect(() => {
        const content = contentRef.current;

        // Create seamless loop animation
        const setupAnimation = () => {
            // Reset position
            gsap.set(content, { y: 20 });

            // Create infinite loop
            animationRef.current = gsap.to(content, {
                y: -totalHeight,
                duration: images.length * 3, // 3 seconds per image
                ease: 'none',
                repeat: -1,
                modifiers: {
                    y: gsap.utils.unitize(y => parseFloat(y) % totalHeight),
                },
            });
        };

        setupAnimation();

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [totalHeight]);

    // Handle mouse wheel for speed control
    useEffect(() => {
        const container = containerRef.current;
        let wheelTimeout;

        const handleWheel = e => {
            e.preventDefault();

            if (animationRef.current) {
                const delta = e.deltaY;
                // Adjust speed based on wheel direction
                speedRef.current = delta > 0 ? 2 : 0.5;
                animationRef.current.timeScale(speedRef.current);

                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => {
                    speedRef.current = 1;
                    if (animationRef.current && !isPaused) {
                        animationRef.current.timeScale(1);
                    }
                }, 500);
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
            clearTimeout(wheelTimeout);
        };
    }, [isPaused]);

    // Handle hover pause
    const handleMouseEnter = () => {
        setIsPaused(true);
        if (animationRef.current) {
            gsap.to(animationRef.current, {
                timeScale: 0,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        if (animationRef.current) {
            gsap.to(animationRef.current, {
                timeScale: speedRef.current,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    // Triple the images for seamless looping
    const tripleImages = [...images, ...images, ...images];

    return (
        <div className='absolute h-screen right-0 z-20 w-full max-w-lg'>
            <div
                ref={containerRef}
                className='main h-full overflow-hidden relative'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ touchAction: 'none' }}>
                <div
                    ref={contentRef}
                    className='absolute left-1/2 top-1/2 -translate-x-1/2'
                    style={{ width: '354px' }}>
                    {tripleImages.map((image, i) => (
                        <div
                            key={i}
                            className='mb-5 rounded-2xl overflow-hidden shadow-lg'
                            style={{
                                height: '390px',
                                width: '354px',
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

