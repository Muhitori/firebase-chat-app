import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/UseStore';

export const SignIn = () => {
  const navigate = useNavigate();
  const authModel = useAuth();

  const onClick = () => {
    authModel.signInWithGoogle(() => navigate('/'));
  }

  return (
    <Paper>
      SignIn
      <Button onClick={onClick}>Sign in with google</Button>
    </Paper>
  );
};

