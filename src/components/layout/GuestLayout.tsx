import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const GuestLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
