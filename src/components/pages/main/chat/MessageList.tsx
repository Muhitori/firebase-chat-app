import { Grid } from '@mui/material'
import { observer } from 'mobx-react-lite';
import { useChatStorage } from 'src/hooks/UseStore';
import { useEffect, useRef } from 'react';
import { useStyles } from './styles';
import { Message } from './Message';

export const MessageList = observer(() => {
  const classes = useStyles();
  const messagesEnd = useRef<HTMLDivElement | null>(null);

  const { messages } = useChatStorage();

  useEffect(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Grid container sx={classes.messageList}>
      {messages &&
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      <div ref={messagesEnd} />
    </Grid>
  );
});