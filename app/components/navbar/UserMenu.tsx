'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModel from '@/app/hooks/useRegisterModel';
import useLoginModel from '@/app/hooks/useLoginModel';

import { signOut } from "next-auth/react";
import { SafeUser } from '@/app/types';



interface UserMenuProps {
    currentUser?: SafeUser | null
} 

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();


    return (
       <div>
        {currentUser ? (
            <>
                <div className="
                flex
                flex-start
                space-x-3
                ">
                    <div className="">
                        <Avatar src={currentUser.image} />
                    </div>
                    <div 
                            className="
                            cursor-pointer
                            py-3
                            px-4
                            rounded-full
                            bg-teal-600
                            hover:bg-neutral-300
                            hover:text-teal-600
                                    ">
                                <MenuItem 
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                        </div>
                </div>
            </>
        ) : (
            <>
                <div
                    className="
                    flex
                    flex-start
                    space-x-1.5
                    ">
                    <div 
                        className="
                        cursor-pointer
                        py-3
                        px-4
                        rounded-full
                        bg-teal-600
                        hover:bg-neutral-300
                        hover:text-teal-600
                                ">
                            <MenuItem 
                                onClick={loginModel.onOpen}
                                label="Login"
                            />
                    </div>
                    <div
                        className="
                        cursor-pointer
                        py-3
                        px-4
                        rounded-full
                        bg-teal-600
                        hover:bg-neutral-300
                        hover:text-teal-600
                                ">
                        <MenuItem 
                            onClick={registerModel.onOpen}
                            label="Sign Up"
                        />   
                    </div>
                </div>
            </>
        )}

       </div>
    );
}

export default UserMenu;