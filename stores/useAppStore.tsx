import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const DOTBASE_APP_STORE = 'DOTBASE_APP_STORE';
type StoreType = {
  oaiKey: string;
  setOAIKey: (key: string) => void;
};

const useAppStore = create<StoreType>()(
  persist(
    (set) => ({
      oaiKey: '',
      setOAIKey: (key: string) => set({ oaiKey: key }),
    }),
    {
      name: DOTBASE_APP_STORE,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        state.oaiKey = '';
        return state;
      },
    },
  ),
);

export default useAppStore;
