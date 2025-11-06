import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const LoginButton = ({
    icon,
    handleShowLogin,
    className,
    text = 'Get started',
}) => {
    const [origin, setOrigin] = useState({ x: 50, y: 50 });

    const handleMouseMove = e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setOrigin({ x, y });
    };

    return (
        <div className='login-button' id='login-button'>
            <button
                onMouseMove={handleMouseMove}
                onClick={handleShowLogin}
                className={cn(
                    ' relative flex items-center overflow-hidden gap-2 cursor-pointer pr-2 pl-4 py-1.5  text-white  rounded-full font-semibold  text-md duration-200 transition group',
                    className
                )}>
                <span className='relative z-10 font-medium'>{text}</span>
                {icon && (
                    <ArrowUpRight className='text-black md:h-5 h-[18px]  group-hover:text-white z-10 group-hover:rotate-45 transition-transform duration-200' />
                )}

                {/* Overlay that follows mouse */}
                <span
                    className='bg-emerald-400 absolute rounded-full z-0 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out'
                    style={{
                        transformOrigin: `${origin.x}% ${origin.y}%`,
                        width: '300%',
                        height: '300%',
                        left: '-100%',
                        top: '-100%',
                    }}></span>
            </button>
        </div>
    );
};

export default LoginButton;

