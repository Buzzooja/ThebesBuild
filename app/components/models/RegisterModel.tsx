'use client'

import axios from 'axios';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModel from '@/app/hooks/useRegisterModel';
import useLoginModel from '@/app/hooks/useLoginModel';
import Model from './models';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from "next-auth/react";
import LoginModel from './LoginModel'; 


const RegisterModel = () => {
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModel.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModel.onClose();
        loginModel.onOpen();
    }, [loginModel, registerModel]);
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Thebes"
                subtitle="Create an account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={AiOutlineGoogle}
                onClick={() => {signIn('google')}}
            />
            <div
                className="
                    text-neutral-300
                    text-center
                    mt-4
                    font-light
                ">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have and account?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                            text-white
                            cursor-pointer
                            hover:text-teal-600
                        "
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Model
            disabled={isLoading}
            isOpen={registerModel.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModel;