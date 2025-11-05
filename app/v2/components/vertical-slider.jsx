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

function VerticalSlider() {
    const containerRef = useRef(null);
    const slidesRef = useRef([]);
    const autoplayRef = useRef(null);
    const isDraggingRef = useRef(false);
    const startYRef = useRef(0);
    const currentIndexRef = useRef(0);
    const dragThresholdRef = useRef(false);
    const [isHovered, setIsHovered] = useState(false);

    // Triple the images for seamless looping
    const tripleImages = [...images, ...images, ...images];
    const slideHeight = 410; // 390px + 20px spacing

    useEffect(() => {
        const slides = slidesRef.current;
        const container = containerRef.current;

        // Set initial position to middle set
        gsap.set(slides, {
            y: i => (i - images.length) * slideHeight,
        });

        currentIndexRef.current = images.length;

        // Autoplay function
        const startAutoplay = () => {
            if (autoplayRef.current) {
                autoplayRef.current.kill();
            }

            // Slide immediately on load

            slideNext();

            autoplayRef.current = gsap.to(
                {},
                {
                    duration: 3,
                    repeat: -1,
                    repeatDelay: 0,
                    onRepeat: () => {
                        if (!isDraggingRef.current && !isHovered) {
                            slideNext();
                        }
                    },
                }
            );
        };

        // Slide to next
        const slideNext = () => {
            currentIndexRef.current++;

            gsap.to(slides, {
                y: i => (i - currentIndexRef.current) * slideHeight,
                duration: 1,
                ease: 'power1.out',
                onComplete: () => {
                    // Reset position when reaching end of middle set
                    if (currentIndexRef.current >= images.length * 2) {
                        gsap.set(slides, {
                            y: i => (i - images.length) * slideHeight,
                        });
                        currentIndexRef.current = images.length;
                    }
                },
            });
        };

        // Slide to previous
        const slidePrev = () => {
            currentIndexRef.current--;

            gsap.to(slides, {
                y: i => (i - currentIndexRef.current) * slideHeight,
                duration: 1,
                ease: 'power1.out',
                onComplete: () => {
                    // Reset position when reaching start of middle set
                    if (currentIndexRef.current <= 0) {
                        gsap.set(slides, {
                            y: i => (i - images.length) * slideHeight,
                        });
                        currentIndexRef.current = images.length;
                    }
                },
            });
        };

        // Wheel event handler
        let wheelTimeout;
        const handleWheel = e => {
            e.preventDefault();

            clearTimeout(wheelTimeout);

            if (autoplayRef.current) {
                autoplayRef.current.pause();
            }

            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    slideNext();
                } else {
                    slidePrev();
                }

                setTimeout(() => {
                    if (autoplayRef.current && !isHovered) {
                        autoplayRef.current.play();
                    }
                }, 500);
            }, 50);
        };

        // Touch/Mouse drag handlers
        const handleStart = e => {
            e.preventDefault();
            isDraggingRef.current = true;
            dragThresholdRef.current = false;
            startYRef.current = e.type.includes('mouse')
                ? e.clientY
                : e.touches[0].clientY;

            if (autoplayRef.current) {
                autoplayRef.current.pause();
            }

            // Change cursor
            container.style.cursor = 'grabbing';
        };

        const handleMove = e => {
            if (!isDraggingRef.current) return;

            e.preventDefault();

            const currentY = e.type.includes('mouse')
                ? e.clientY
                : e.touches[0].clientY;
            const diff = startYRef.current - currentY;

            // Trigger slide when dragged more than 50px
            if (Math.abs(diff) > 50 && !dragThresholdRef.current) {
                dragThresholdRef.current = true;
                if (diff > 0) {
                    slideNext();
                } else {
                    slidePrev();
                }
            }
        };

        const handleEnd = e => {
            if (!isDraggingRef.current) return;

            e.preventDefault();
            isDraggingRef.current = false;
            dragThresholdRef.current = false;

            // Reset cursor
            container.style.cursor = 'grab';

            setTimeout(() => {
                if (autoplayRef.current && !isHovered) {
                    autoplayRef.current.play();
                }
            }, 300);
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

        startAutoplay();

        return () => {
            if (autoplayRef.current) {
                autoplayRef.current.kill();
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
    }, [isHovered]);

    // Pause on hover
    const handleMouseEnter = () => {
        setIsHovered(true);
        if (autoplayRef.current) {
            autoplayRef.current.pause();
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (autoplayRef.current) {
            autoplayRef.current.resume();
        }
    };

    return (
        <div className='absolute h-screen right-0 z-20 w-full max-w-lg'>
            <div
                ref={containerRef}
                className='main h-full overflow-hidden relative cursor-grab select-none'
                /*    onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} */
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
                            }}>
                            <ImageCard image={image} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VerticalSlider;

