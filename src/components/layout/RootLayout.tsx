import { Navigate, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from 'src/services/Auth.service';
import { MainLayout } from './MainLayout';
import { GuestLayout } from './GuestLayout';
import { SignUpPage } from '../pages/auth/SignUpPage';
import { SignInPage } from '../pages/auth/SIgnInPage';
import { MainPage } from '../pages/main/MainPage';

export const RootLayout = () => {
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
        <Route path="/" element={<MainPage />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </MainLayout>
    );
  }

  return (
    <GuestLayout>
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/*" element={<Navigate replace to="/login" />} />
    </GuestLayout>
  );
}