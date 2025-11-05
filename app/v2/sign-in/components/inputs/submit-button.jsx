import { Button } from '@/components/ui/button';

const SubmitButton = ({ formType }) => {
    return (
        <Button
            className='w-full cursor-pointer px-5 py-4 h-[54px] rounded-full bg-emerald-400 font-semibold text-[0D0E13] border border-emerald-400 text-[18px] leading-[26px] tracking-[-0.36px] hover:bg-emerald-500 transition-all'
            type='submit'>
            {formType === 'login' ? 'Sign in' : 'Sign up'}
        </Button>
    );
};

export default SubmitButton;

