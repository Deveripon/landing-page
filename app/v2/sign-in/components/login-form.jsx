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
                        duration: 0.5,
                        ease: 'power3.out',
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
                    duration: 0.4,
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
        <div className={cn('py-[81px] px-[60px] relative group', className)}>
            <div
                className='back absolute top-6 right-6 items-center gap-2 cursor-pointer hover:text-white text-white/30 duration-500 font-dm-sans font-normal text-[16px] leading-[26px] tracking-[-0.36px]'
                onClick={() => setShowLogin(false)}>
                <HugeiconsIcon
                    onClick={() => setShowLogin(false)}
                    icon={CancelCircleIcon}
                />
            </div>

            <div ref={formElementsRef}>
                <div className='info flex flex-col gap-4 mb-12'>
                    <h1
                        ref={headingRef}
                        className='font-nyght-serif text-5xl leading-[54px] tracking-[-1.44px] text-white text-center'>
                        {formType === 'login'
                            ? 'Welcome Back'
                            : 'Create Account'}
                    </h1>
                    <p
                        ref={descriptionRef}
                        className='font-dm-sans text-white w-[430px] leading-[26px] text-center tracking-[-0.36px]'>
                        {formType === 'login'
                            ? 'Sign in to continue, Enter your details to access your account and dashboard.'
                            : 'Sign up to get started, Create your account and start exploring your dashboard today.'}
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'>
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

                            <div className='password mt-6'>
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
                                        <button className='font-dm-sans my-0 text-right cursor-pointer text-[#0d0e30]/70 hover:text-emerald-400 text-sm leading-[26px] font-normal tracking-[-0.36px]'>
                                            forgot your password?
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <SubmitButton formType={formType} />

                        <div className='form-separator w-full flex items-center my-4 gap-4'>
                            <hr className='h-px w-full bg-[#0d0e13]/70' />
                            <span className='font-dm-sans text-white text-[18px leading-[26px] tracking-[-0.36px]'>
                                Or
                            </span>
                            <hr className='h-px w-full bg-[#0d0e13]/70' />
                        </div>

                        <LoginWithGoogle />

                        <div className='flex items-center justify-center'>
                            <span className='font-dm-sans text-white text-[18px leading-[26px] tracking-[-0.36px]'>
                                {formType === 'login'
                                    ? "Don't have an account?"
                                    : 'Already have an account?'}{' '}
                            </span>
                            <button
                                type='button'
                                onClick={handleFormTypeChange}
                                className='font-dm-sans cursor-pointer text-emerald-400 hover:text-emerald-500 leading-[26px] font-semibold ml-1 tracking-[-0.36px]'>
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

