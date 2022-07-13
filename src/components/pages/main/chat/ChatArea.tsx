import { Box } from '@mui/material';
import { useStyles } from './styles';
import { InputArea } from './InputArea';
import { MessageList } from './MessageList';

export const ChatArea = () => {
  const classes = useStyles();

  return (
    <Box sx={classes.chatArea}>
      <Box flexGrow={1}>
        <MessageList />
      </Box>
      <InputArea />
    </Box>
  );
};
