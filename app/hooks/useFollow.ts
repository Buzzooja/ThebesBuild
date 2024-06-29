import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModel from "./useLoginModel";

interface IUseFollow {
    userId: string;
    currentUser?: SafeUser | null;
}

const useFollow = ({
    userId,
    currentUser
}: IUseFollow) => {
    const router = useRouter();
    const loginModel = useLoginModel();

    const hasFollowed = useMemo(() => {
        const list = currentUser?.followingIDs || [];

        return list.includes(userId);
    }, [currentUser, userId]);

    const toggleFollow = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!currentUser) {
            return loginModel.onOpen();
        }

        try {
            let request;

            if(hasFollowed) {
                request = () => axios.delete(`/api/following/${userId}`);
            } else {
                request = () => axios.post(`/api/following/${userId}`);
        }

        await request();
        router.refresh();
        toast.success('Change Made');
    }   catch (error) {
        toast.error('Something Went Wrong.');
    }
    },
    [
        currentUser,
        hasFollowed,
        userId,
        loginModel,
        router
    ]);
    return {
        hasFollowed,
        toggleFollow
    }
}

export default useFollow;