import { Button } from '@mui/material';
import { useAuth } from 'src/hooks/UseStore';

export const MainPage = () => {
  const authModel = useAuth();

  const onSignOut = () => {
    authModel.signOut();
  }
  return <Button onClick={onSignOut}>Sign out</Button>;
}