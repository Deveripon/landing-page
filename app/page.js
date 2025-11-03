'use client';

import Header from './components/header';
import HeroContent from './components/hero-content';
import VideoBackground from './components/video-background';

export default function HomePage() {
    return (
        /*  <ShaderBackground> */
        <VideoBackground>
            <Header />
            <HeroContent />
        </VideoBackground>
        /* </ShaderBackground> */
    );
}

