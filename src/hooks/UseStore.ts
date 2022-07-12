import { createContext, useContext } from 'react';
import { RootStoreModel } from 'src/store';

export const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = (): RootStoreModel => useContext(StoreContext);
export const useAuthStorage = () => useStore().auth;
export const useUserStorage = () => useStore().user;
