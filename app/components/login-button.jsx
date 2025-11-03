import { ArrowUpRight } from 'lucide-react';

const LoginButton = ({ icon, text = 'Get started' }) => {
    return (
        <div className='login-button' id='login-button'>
            <button className='hidden relative md:flex items-center overflow-hidden gap-2 cursor-pointer pr-2 pl-4 py-1.5 liquid-glass-enhanced text-white  rounded-full font-medium  text-md duration-200 transition group'>
                <span className='relative z-10 font-medium'>{text}</span>
                {icon && (
                    <span className='liquid-glass p-1.5 rounded-full relative z-10'>
                        <ArrowUpRight size={18} className='text-emerald-400' />
                    </span>
                )}

                {/* Overlay from bottom-left */}
                <span className='liquid-glass absolute inset-0 h-full w-full z-0 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-bottom-left rounded-full'></span>
            </button>
        </div>
    );
};

export default LoginButton;

