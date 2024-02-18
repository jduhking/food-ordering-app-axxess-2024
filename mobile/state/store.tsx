import Food from '@/models/Food';
import Patient from '@/models/Patient';
import { create } from 'zustand';

type State = {
    patient: Patient | undefined;
    cart: Food[];
    setPatient: (patient: Patient) => void;
    setCart: (items: Food[]) => void;
}

export const useAppStore = create<State>((set) => ({
    patient: undefined,
    cart: [],
    setPatient: (patient: Patient) => set((state) => ({ patient: patient})),
    setCart: (items: Food[]) => set((state) => ({ cart: items}))
}))