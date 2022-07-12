import { FC, ReactNode, ReactElement } from 'react';
import { StoreContext } from 'src/hooks/UseStore';
import { RootStoreModel } from 'src/store';

interface Props {
  store: RootStoreModel;
  children: ReactNode;
}

export const StoreProvider: FC<Props> = ({ children, store}): ReactElement => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
