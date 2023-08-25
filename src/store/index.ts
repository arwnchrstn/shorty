import { create } from "zustand";

type State = {
    message: string | null
    error: Error | string | null,
    show?: boolean
}

type Action = {
    setError: (error: State) => void
    removeError: () => void,
    showError: (show: boolean) => void
}

export const useStore = create<State & Action>((set) => ({
    message: null,
    error: null,
    show: false,
    setError: (error: State) => {
        set((state: State) => ({...state, message: error.message, error: error.error, show: true}))
    },
    removeError: () => {
        set(() => ({message: null, error: null}))
    },
    showError: (show: boolean) => {
        set((state: State) => ({...state, show: show}))
    }
}))