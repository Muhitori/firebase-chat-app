import { FC, ReactNode } from 'react';
import { Routes } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const GuestLayout: FC<Props> = ({ children }) => {
  return <Routes>{children}</Routes>;
};
