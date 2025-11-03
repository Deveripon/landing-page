'use client';

import { useRef } from 'react';
import ImageCard from './image-card';
import LoginButton from './login-button';

const images = [
    '/cardimage.jpg',
    '/cardimage1.jpg',
    '/cardimage2.jpg',
    '/cardimage3.jpg',
    '/cardimage4.jpg',
    '/cardimage5.jpg',
    '/cardimage6.jpg',
    '/cardimage7.jpg',
    '/cardimage8.jpg',
    '/cardimage9.jpg',
];
export default function HeroContent() {
    const imageContainerRef = useRef();

    return (
        <div className='content'>
            <div className='absolute bottom-8 left-8 z-20 max-w-lg'>
                <div className='text-left'>
                    {/* Badge / Highlight */}
                    <div
                        className='inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative'
                        style={{
                            filter: 'url(#glass-effect)',
                        }}>
                        <div className='absolute top-0 left-1 right-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent rounded-full' />
                        <span className='text-white/90 text-xs font-light relative z-10'>
                            🏝️ Discover Paradise with Us
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className='text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4'>
                        <span className='font-medium italic instrument'>
                            Explore
                        </span>{' '}
                        Stunning Islands
                        <br />
                        <span className='font-light tracking-tight text-white'>
                            &{' '}
                            <span className='italic instrument'>Timeless</span>{' '}
                            <span>Adventures</span>
                        </span>
                    </h1>

                    {/* Description */}
                    <p className='text-xs font-light text-white/70 mb-4 leading-relaxed'>
                        Experience the magic of turquoise waters, golden
                        beaches, and vibrant cultures. From relaxing getaways to
                        thrilling island tours — we make every journey
                        unforgettable.
                    </p>

                    {/* Buttons */}
                    <div className='flex items-center gap-4 flex-wrap'>
                        <LoginButton icon text='Get started' />
                    </div>
                </div>
            </div>
            <div className='absolute top-[15%] right-[25%] z-20 max-w-lg'>
                <div className='relative'>
                    {images.map((image, i) => (
                        <div
                            ref={imageContainerRef}
                            key={i}
                            className='absolute left-0 transition-all duration-300 hover:scale-105'
                            style={{
                                top: `${i * 30}px`,
                                zIndex: 10 + i,
                                transform: `rotate(${(i - 1) * 3}deg)`,
                                opacity: 1,
                            }}>
                            <ImageCard image={image} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

