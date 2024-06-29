import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModel from "./useLoginModel";
import getUserById from "../actions/getUserById";

interface IUseFollowing {
    currentUser?: SafeUser | null;
    user?: SafeUser | null;
    currentUserId: string;
    userId: string;
}

const useFollowing = ({
    currentUser,
    user,
    currentUserId,
    userId
}: IUseFollowing) => {


    const router = useRouter();
    const loginModel = useLoginModel();

    const isFollowing = useMemo(() => {
        const list = user?.followerIds || [];

        return list.includes(currentUserId);
    }, [user, currentUserId]);

    const toggleFollower = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!currentUser) {
            return loginModel.onOpen();
        }

        try {
            let request;

            if(isFollowing) {
                request = () => axios.delete(`/api/follower/${userId}`);
            } else {
                request = () => axios.post(`/api/follower/${userId}`);
        }

        await request();
        router.refresh();
        toast.success('Success');
    }   catch (error) {
        toast.error('Something Went Wrong.');
    }
    },
    [
        currentUser,
        isFollowing,
        userId,
        loginModel,
        router
    ]);
    return {
        isFollowing,
        toggleFollower
    }
}

export default useFollowing;