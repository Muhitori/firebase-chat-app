import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { User } from 'src/components/common/User';
import { useAuthStorage } from 'src/hooks/UseStore';
import { IUser } from 'src/types/User';
import { useStyles } from '../styles';

export const CurrentUser = () => {
  const classes = useStyles();
  const authModel = useAuthStorage()

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const asyncSetAvatar = async () => {
      const currentUser = await authModel.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    asyncSetAvatar();
  }, []);

  const onSignOut = () => {
    authModel.signOut();
  };
  
  return (
    <Box sx={classes.currentUser}>
      {user && <User user={user} />}
      <Button onClick={onSignOut}>Sign out</Button>
    </Box>
  );
}