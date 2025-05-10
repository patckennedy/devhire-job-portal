import { create } from 'zustand';
import userSlice from './slices/user.slice.js';

// Combine all slices in the store:
const useStore = create((...args) => {
    const store = {
        ...userSlice(...args),
    };

    if (typeof window !== 'undefined') {
        window.__STORE__ = store;
    }

    return store;
});

export default useStore;
