import { Navigate, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from 'src/services/Auth.service';
import { MainLayout } from './MainLayout';
import { GuestLayout } from './GuestLayout';
import { SignUp } from '../pages/auth/SignUp';
import { SignIn } from '../pages/auth/SIgnInPage';
import { MainPage } from '../pages/MainPage';

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
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/*" element={<Navigate replace to="/login" />} />
    </GuestLayout>
  );
}