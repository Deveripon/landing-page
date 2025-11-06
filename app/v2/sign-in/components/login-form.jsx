'use client';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';
import {
    CancelCircleIcon,
    Mail02Icon,
    SquareLock01Icon,
    UserCircleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './inputs/form-input';
import LoginWithGoogle from './inputs/login-with-google';
import SubmitButton from './inputs/submit-button';

const LoginForm = ({ setShowLogin, className }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formType, setFormType] = useState('login'); // 'login' or 'register'
    const formElementsRef = useRef(null);
    const nameFieldRef = useRef(null);
    const formContentRef = useRef(null);
    const headingRef = useRef(null);
    const descriptionRef = useRef(null);
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });

    useEffect(() => {
        // Animate all children with stagger effect
        const elements = formElementsRef.current?.children;
        if (elements) {
            gsap.fromTo(
                elements,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.5,
                    delay: 0.5,
                    ease: 'power3.out',
                }
            );
        }
    }, []);

    const handleFormTypeChange = () => {
        const newFormType = formType === 'login' ? 'register' : 'login';

        // Animate text content changes
        const tl = gsap.timeline();

        // Fade out text first
        tl.to([headingRef.current, descriptionRef.current], {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: 'power2.in',
        });

        if (newFormType === 'register') {
            // First update state, then animate appearing
            tl.call(() => setFormType(newFormType))
                .set(nameFieldRef.current, {
                    height: 0,
                    opacity: 0,
                    marginBottom: 0,
                    overflow: 'hidden',
                })
                .to(
                    nameFieldRef.current,
                    {
                        height: 'auto',
                        opacity: 1,
                        marginBottom: 24,
                        duration: 0.4,
                        ease: 'none',
                    },
                    '<'
                )
                .to(
                    [headingRef.current, descriptionRef.current],
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                    },
                    '-=0.3'
                );
        } else {
            // Animate disappearing - start with text fade out
            tl.to(
                nameFieldRef.current,
                {
                    height: 0,
                    opacity: 0,
                    marginBottom: 0,
                    duration: 0.3,
                    ease: 'none',
                },
                0
            ) // Start at the beginning with text fade
                .call(() => setFormType(newFormType))
                .to([headingRef.current, descriptionRef.current], {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                });
        }
    };

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div
            className={cn(
                'py-8 sm:py-12 md:py-16 lg:py-[81px] px-4 sm:px-6 md:px-10 lg:px-[60px] relative group w-full max-w-full',
                className
            )}>
            <div
                className='back absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 cursor-pointer hover:text-white text-white/30 duration-500 font-dm-sans font-normal text-sm sm:text-[16px] leading-[26px] tracking-[-0.36px]'
                onClick={() => setShowLogin(false)}>
                <HugeiconsIcon
                    onClick={() => setShowLogin(false)}
                    icon={CancelCircleIcon}
                    className='w-5 h-5 sm:w-6 sm:h-6'
                />
            </div>

            <div ref={formElementsRef} className='w-full'>
                <div className='info flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12'>
                    <h1
                        ref={headingRef}
                        className='font-nyght-serif text-3xl sm:text-4xl md:text-5xl leading-tight sm:leading-[54px] tracking-[-1.44px] text-white text-center px-4'>
                        {formType === 'login'
                            ? 'Welcome Back'
                            : 'Create Account'}
                    </h1>
                    <p
                        ref={descriptionRef}
                        className='font-dm-sans text-white text-sm sm:text-base w-full max-w-[430px] mx-auto leading-[26px] text-center tracking-[-0.36px] px-4'>
                        {formType === 'login'
                            ? 'Sign in to continue, Enter your details to access your account and dashboard.'
                            : 'Sign up to get started, Create your account and start exploring your dashboard today.'}
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 sm:space-y-6 w-full max-w-[550px] mx-auto'>
                        <div ref={formContentRef}>
                            <div
                                ref={nameFieldRef}
                                style={{
                                    height:
                                        formType === 'register' ? 'auto' : 0,
                                    opacity: formType === 'register' ? 1 : 0,
                                    marginBottom:
                                        formType === 'register' ? '24px' : 0,
                                    overflow: 'hidden',
                                }}>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FormInput
                                                    type='text'
                                                    field={field}
                                                    placeholder='Jhon Doe'
                                                    icon={UserCircleIcon}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormInput
                                                type='email'
                                                field={field}
                                                placeholder='helloripon@email.com'
                                                icon={Mail02Icon}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='password mt-4 sm:mt-6'>
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FormInput
                                                    type='password'
                                                    field={field}
                                                    placeholder='Enter your password'
                                                    icon={SquareLock01Icon}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {showForgotPassword && (
                                    <div className='flex justify-end'>
                                        <button className='font-dm-sans my-0 text-right cursor-pointer text-[#0d0e30]/70 hover:text-emerald-400 text-xs sm:text-sm leading-[26px] font-normal tracking-[-0.36px]'>
                                            forgot your password?
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <SubmitButton formType={formType} />

                        <div className='form-separator w-full flex items-center my-3 sm:my-4 gap-3 sm:gap-4'>
                            <hr className='h-px w-full bg-[#0d0e13]/70' />
                            <span className='font-dm-sans text-white text-base sm:text-[18px] leading-[26px] tracking-[-0.36px] whitespace-nowrap'>
                                Or
                            </span>
                            <hr className='h-px w-full bg-[#0d0e13]/70' />
                        </div>

                        <LoginWithGoogle />

                        <div className='flex flex-wrap items-center justify-center gap-1 text-center'>
                            <span className='font-dm-sans text-white text-sm sm:text-base md:text-[16px] leading-[26px] tracking-[-0.36px]'>
                                {formType === 'login'
                                    ? "Don't have an account?"
                                    : 'Already have an account?'}{' '}
                            </span>
                            <button
                                type='button'
                                onClick={handleFormTypeChange}
                                className='font-dm-sans cursor-pointer text-emerald-400 hover:text-emerald-500 text-sm sm:text-base md:text-[16px] leading-[26px] font-semibold tracking-[-0.36px]'>
                                {formType === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;

