import { create } from 'zustand';

interface DeleteTemplateModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useDeleteTemplateModel = create<DeleteTemplateModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useDeleteTemplateModel;