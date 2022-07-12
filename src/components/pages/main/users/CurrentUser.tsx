import { Box, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { User } from 'src/components/common/User';
import { useAuthStorage } from 'src/hooks/UseStore';
import { useStyles } from '../styles';

export const CurrentUser = observer(() => {
  const classes = useStyles();
  const authModel = useAuthStorage();
  const {currentUser} = authModel;

  useEffect(() => {
    authModel.getCurrentUser();
  }, []);

  const onSignOut = () => {
    authModel.signOut();
  };
  
  return (
    <Box sx={classes.currentUser}>
      {currentUser && <User user={currentUser} />}
      <Button onClick={onSignOut}>Sign out</Button>
    </Box>
  );
});