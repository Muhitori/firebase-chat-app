import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MainLayout } from './MainLayout';
import { GuestLayout } from './GuestLayout';
import { SignUp } from '../pages/auth/SignUp';
import { SignIn } from '../pages/auth/SIgnInPage';
import { MainPage } from '../pages/MainPage';

export const RootLayout = () => {
  const auth = getAuth();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, []);

  if (isLogged) {
    return (
      <MainLayout>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<MainPage />} />
      </MainLayout>
    );
  }

  return (
    <GuestLayout>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/*" element={<Navigate replace to="/login" />} />
      </Routes>
    </GuestLayout>
  );
}