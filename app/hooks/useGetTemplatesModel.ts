import { create } from 'zustand';

interface GetTemplatesStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useGetTemplatesModel = create<GetTemplatesStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useGetTemplatesModel;