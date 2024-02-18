import Patient from '@/models/Patient';
import { create } from 'zustand';

type State = {
    patient: Patient | undefined;
    setPatient: (patient: Patient) => void;
}

export const useAppStore = create<State>((set) => ({
    patient: undefined,
    setPatient: (patient: Patient) => set((state) => ({ patient: patient}))
    
}))