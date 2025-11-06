'use client';

import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { useRef, useState } from 'react';
import LoginForm from '../sign-in/components/login-form';
import HeroContent from './hero-content';
import HorizontalMarquee from './horizontal-marquee.jsx';
import LoginButton from './login-button';
import VerticalMarquee from './vertical-marque';

export default function Content() {
    const [showLogin, setShowLogin] = useState(false);
    const loginFormRef = useRef(null);
    const topContentRef = useRef(null);
    const heroContentRef = useRef(null);

    const handleShowLogin = () => {
        // Hide other content first
        if (topContentRef.current) {
            gsap.to(topContentRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
        if (heroContentRef.current) {
            gsap.to(heroContentRef.current, {
                y: -150,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
            });
        }

        setShowLogin(true);

        // Expand animation - from top-left (slight delay to ensure element is rendered)
        setTimeout(() => {
            gsap.fromTo(
                loginFormRef.current,
                {
                    scale: 0,
                    transformOrigin: 'top left',
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                }
            );
        }, 0);
    };

    const handleHideLogin = () => {
        // Collapse animation - back to top-left
        gsap.to(loginFormRef.current, {
            scale: 0,
            transformOrigin: 'top left',
            opacity: 0,
            duration: 0.7,
            ease: 'power3.in',
            onComplete: () => {
                setShowLogin(false);
            },
        });

        // Show other content
        if (topContentRef.current) {
            gsap.fromTo(
                topContentRef.current,
                {
                    y: -30,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    delay: 0.9,
                    ease: 'power2.out',
                }
            );
        }
        if (heroContentRef.current) {
            gsap.fromTo(
                heroContentRef.current,
                {
                    y: -30,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    delay: 0.9,
                    ease: 'power2.out',
                }
            );
        }
    };

    return (
        <div className='content relative'>
            {/* Top content - always rendered */}
            <div
                ref={topContentRef}
                className={cn(
                    'absolute top-16 left-10 max-w-[422px] max-h-[156px]',
                    showLogin && 'pointer-events-none'
                )}>
                <div className='text-left'>
                    {/* Description */}
                    <p className='md:text-[18px] text-[16px] font-normal font-dm-sans text-white mb-4 leading-[26px] -tracking-[2%]'>
                        Experience the magic of turquoise waters, golden
                        beaches, and vibrant cultures. From relaxing getaways to
                        thrilling island tours.
                    </p>

                    {/* Buttons */}
                    <div className='flex items-center gap-4 flex-wrap'>
                        <LoginButton
                            handleShowLogin={handleShowLogin}
                            className='font-dm-sans font-semibold tracking-[2%] leading-[26px] md:text-[18px] text-[16px] bg-white text-black hover:text-white hover:bg-white/90 duration-200 rounded-full py-3 md:py-4 px-3 md:px-6'
                            icon
                            text='Get started'
                        />
                    </div>
                </div>
            </div>

            {/* bottom content - always rendered */}
            <div
                ref={heroContentRef}
                className={showLogin ? 'pointer-events-none' : ''}>
                <HeroContent />
            </div>

            {/* Login form - conditionally rendered */}
            {showLogin && (
                <div
                    ref={loginFormRef}
                    className='absolute max-sm:top-5 max-sm:left-1 top-10 left-5 lg:top-20 lg:left-10 z-30 max-w-xl liquid-glass-enhanced rounded-2xl'>
                    <LoginForm
                        className='max-w-xl liquid-glass-enhanced rounded-2xl'
                        setShowLogin={handleHideLogin}
                    />
                </div>
            )}

            <div className='md:hidden block'>
                <HorizontalMarquee />
            </div>
            <div className='hidden md:block'>
                <VerticalMarquee />
            </div>
        </div>
    );
}

