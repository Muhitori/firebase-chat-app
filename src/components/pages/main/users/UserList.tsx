import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useUserStorage } from 'src/hooks/UseStore';
import { auth } from 'src/services/Auth.service';
import { observer } from 'mobx-react-lite';
import { User } from './User';

export const UserList: FC = observer(() => {
  const userModel = useUserStorage();
  const { currentUser } = auth;
  const { users } = userModel;

  useEffect(() => {
    if (currentUser) {
      userModel.getAllContacts(currentUser.uid);
    }
  }, []);
  
  return (
    <Box height="100%" display="flex" flexDirection="column" padding="0.5rem">
      {!!users.length && users.map((user) => (
        <User key={user.uid} user={user} styles={{ marginBottom: '1rem' }} />
      ))}
    </Box>
  );
})