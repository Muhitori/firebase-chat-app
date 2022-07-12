import { Navigate, Route } from 'react-router-dom';
import { useAuthStorage } from 'src/hooks/UseStore';
import { observer } from 'mobx-react-lite';
import { MainLayout } from './MainLayout';
import { GuestLayout } from './GuestLayout';
import { SignUpPage } from '../pages/auth/SignUpPage';
import { SignInPage } from '../pages/auth/SIgnInPage';
import { MainPage } from '../pages/main/MainPage';

export const RootLayout = observer(() => {
  const authModel = useAuthStorage();
  const { currentUser } = authModel;

  if (currentUser) {
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
});