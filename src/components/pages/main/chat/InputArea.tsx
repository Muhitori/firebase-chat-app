import { Box, Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useAuthStorage, useChatStorage } from 'src/hooks/UseStore';
import { useStyles } from './styles';

export const InputArea = observer(() => {
  const classes = useStyles();

  const { currentUser } = useAuthStorage();
  const { conversationId, createMessage } = useChatStorage();

  const [message, setMessage] = useState('');

  const handleChange = (newMessage: string) => {
    setMessage(newMessage);
  }

  const handleMessageSend = () => {
    if (!currentUser) return;
    const { uid, name, email } = currentUser;
    const newMessage = message.trim();

    const isInvalidMessage = !conversationId || !uid || !newMessage.length;
    const isUserNameExists = name || email;

    if (isInvalidMessage || !isUserNameExists) return;
    
      createMessage({
        conversationId,
        userId: uid,
        userName: name || email,
        message: newMessage,
      });

    setMessage('');
  }

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      handleMessageSend();
    }
  };

  return conversationId ? (
    <Box sx={classes.inputArea}>
      <TextField
        fullWidth
        value={message}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event.key)}
        sx={classes.input}
        variant="outlined"
        placeholder="Enter message"
      />
      <Button variant="contained" onClick={handleMessageSend}>
        Send
      </Button>
    </Box>
  ) : null;
});