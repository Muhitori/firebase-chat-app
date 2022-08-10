import { Box, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useAuthStorage, useChatStorage } from 'src/hooks/UseStore';
import { useStyles } from './styles';
import { User } from './User';

export const CurrentUser = observer(() => {
  const classes = useStyles();

  const authModel = useAuthStorage();
  const chatModel = useChatStorage();

  const { currentUser } = authModel;

  useEffect(() => {
    authModel.setCurrentUserAsync();
  }, []);

  const onSignOut = () => {
    if (currentUser) {
      authModel.signOut(currentUser.uid);
    }

    chatModel.setConversationId(null);
    chatModel.setConversationId(null);
    chatModel.setMessages(null);
    chatModel.setCompanionId(null);
  };
  
  return (
    <Box sx={classes.currentUserContainer}>
      {currentUser && (
        <User styles={classes.currentUser} user={currentUser} />
      )}
      <Button onClick={onSignOut}>Sign out</Button>
    </Box>
  );
});