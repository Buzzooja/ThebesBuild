import { create } from 'zustand';

interface AddFriendModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddFriendModel = create<AddFriendModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAddFriendModel;