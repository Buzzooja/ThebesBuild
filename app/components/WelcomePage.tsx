'use client';

import Button from "./Button";
import Heading from "./Heading";
import LogoSmall from "./models/Logosmall";
import useLoginModel from "../hooks/useLoginModel";
import useRegisterModel from "../hooks/useRegisterModel";

const WelcomePage = ({
}) => {

    const loginModel = useLoginModel();
    const registerModel = useRegisterModel();

    return (
        <div className="
        relative
        w-full
        md:w4/6
        lg:w-3/6
        xl:w-2/5
        my-6
        mx-auto
        bg-neutral-800
        rounded-lg
        p-2
        ">  
            <div className="
            flex
            justify-center
            border-neutral-300
            border-b-[1px]
            ">
                <LogoSmall />
            </div>
            <div className="
                flex
                justify-center
                border-neutral-300
                border-b-[1px]
            ">
                <Heading
                    title="Welcome to Thebes"
                    subtitle="Join to share and keep track of your workouts with your friends"
                    center={true}
                />
            </div>
            <div className="
            flex
            justify-center
            space-x-40
            p-2
            ">  
                <div className="
                w-40
                ">
                    <Button
                        label="Log In"
                        onClick={loginModel.onOpen}
                    />
                </div>
                <div className="
                w-40
                ">
                    <Button
                        label="Sign Up"
                        onClick={registerModel.onOpen}
                    />
                </div>
            </div>
            
        </div>
    );
}

export default WelcomePage;