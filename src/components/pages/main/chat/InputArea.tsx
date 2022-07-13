import { Box, Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useAuthStorage, useChatStorage } from 'src/hooks/UseStore';
import { useStyles } from './styles';

export const InputArea = observer(() => {
  const classes = useStyles();

  const currentUserId = useAuthStorage().getCurrentUserId();
  const { conversationId, createMessage } = useChatStorage();

  const [message, setMessage] = useState('');

  const onChange = (newMessage: string) => {
    setMessage(newMessage);
  }

  const onMessageSend = () => {
    const newMessage = message.trim();
    const isInvalidMessage = !conversationId || !currentUserId || !newMessage.length;

    if (isInvalidMessage) return;

    createMessage({
      conversationId,
      userId: currentUserId,
      message: newMessage,
    });

    setMessage('');
  }

  return (
    <Box sx={classes.inputArea}>
      <TextField
        fullWidth
        value={message}
        onChange={(event) => onChange(event.target.value)}
        sx={classes.input}
        variant='outlined'
        placeholder='Enter message'
      />
      <Button variant="contained" onClick={onMessageSend}>
        Send
      </Button>
    </Box>
  );
});