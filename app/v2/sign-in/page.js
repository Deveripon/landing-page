import LoginForm from './components/login-form';

const SignInPage = () => {
    return (
        <div className='grid max-lg:grid-cols-1 grid-cols-2 gap-6 h-screen lg:container mx-auto px-42 max-md:px-0  py-32 w-screen'>
            <div className='left-form liquid-glass-enhanced rounded-2xl'>
                <LoginForm />
            </div>
            <div className='right-video max-lg:hidden relative rounded-2xl'>
                <video
                    autoPlay
                    loop
                    muted
                    className='absolute inset-0 w-full h-full rounded-2xl object-cover scale-x-[-1] z-0'>
                    <source src={'/video1.mp4'} type='video/mp4' />
                </video>
                <div
                    className='absolute inset-0 rounded-2xl  z-10 pointer-events-none
            bg-linear-to-br from-black/0  to-black'></div>
            </div>
        </div>
    );
};

export default SignInPage;

