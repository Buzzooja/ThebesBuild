import { create } from 'zustand';

interface AddExerciseModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddExerciseModel = create<AddExerciseModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAddExerciseModel;