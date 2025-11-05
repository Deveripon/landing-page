'use client';
import { Button } from '@/components/ui/button';
import GoogleIcon from '../svg/google-icon';

const LoginWithGoogle = () => {
    /*     async function signInWithOAuth(provider) {
        if (provider === 'google') {
            await signIn('google', { redirectTo: '/onboarding' });
        }
        if (provider === 'twitter') {
            await signIn('twitter', { redirectTo: '/onboarding' });
        }
        if (provider === 'github') {
            await signIn('github', { redirectTo: '/onboarding' });
        }
    } */

    return (    
        <Button
            /*   onClick={() => signInWithOAuth('google')} */
            className='w-full cursor-pointer px-5 py-4 h-[54px] rounded-full bg-white font-semibold text-[0D0E13]  text-[18px] leading-[26px] mb-4 tracking-[-0.36px] hover:bg-white/70 transition-all'>
            <GoogleIcon className='size-5' /> Sign in with Google
        </Button>
    );
};

export default LoginWithGoogle;

