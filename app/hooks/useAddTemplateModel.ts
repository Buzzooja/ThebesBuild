import { create } from 'zustand';

interface AddTemplateModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddTemplateModel = create<AddTemplateModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAddTemplateModel;