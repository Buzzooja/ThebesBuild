import { create } from 'zustand';

interface AddWorkoutModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useDeleteWorkoutModel = create<AddWorkoutModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useDeleteWorkoutModel;