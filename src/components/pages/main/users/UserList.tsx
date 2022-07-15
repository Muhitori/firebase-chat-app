import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAuthStorage, useChatStorage, useUserStorage } from 'src/hooks/UseStore';
import { observer } from 'mobx-react-lite';
import { User } from './User';
import { useStyles } from './styles';

export const UserList: FC = observer(() => {
  const classes = useStyles();
  const userModel = useUserStorage();
  const { contacts } = userModel;

  const { currentUser } = useAuthStorage();

  const chatStorage = useChatStorage();
  const { companionId, getConversation } = chatStorage;

  useEffect(() => {
    if (currentUser?.uid) {
      userModel.subscribeOnContacts(currentUser?.uid);
    }
  }, [currentUser?.uid]);

  const isCompanion = (uid: string) => uid === companionId;

  const handleClick = (uid: string) => {
    getConversation(uid);
  };

  return (
    <Box sx={classes.userList}>
      {!!contacts.length &&
        contacts.map((user) => (
          <User
            key={user.uid}
            user={user}
            isCompanion={isCompanion(user.uid)}
            onClick={handleClick}
            styles={{ marginBottom: '1rem' }}
          />
        ))}
    </Box>
  );
})