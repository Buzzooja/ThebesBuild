import { create } from 'zustand';
import { SafeExercises } from '../types';

interface UpdateExerciseModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUpdateExerciseModel = create<UpdateExerciseModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUpdateExerciseModel;