import { Box } from '@mui/material';
import { useStyles } from '../styles';
import { InputArea } from './InputArea';

export const ChatArea = () => {
  const classes = useStyles();

  return (
    <Box sx={classes.chatArea}>
      <Box flexGrow={1} />
      <InputArea />
    </Box>
  );
};
