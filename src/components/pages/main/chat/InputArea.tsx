import { Box, Button } from '@mui/material';
import { Input } from 'src/components/common/Input';
import { useStyles } from './styles';

export const InputArea = () => {
  const classes = useStyles();

  return (
    <Box sx={classes.inputArea}>
      <Input className={classes.input} />
      <Button variant="contained">Send</Button>
    </Box>
  );
}