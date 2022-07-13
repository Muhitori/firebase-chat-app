import { Box, Grid, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { Avatar } from 'src/components/common/Avatar';
import { useStyles } from './styles';

interface Props {
  message: {
    id: string;
    message: string;
    avatar: string | null;
    timestamp: Date;
  }
}

const MyId = '1';

export const Message: FC<Props> = ({ message: { id, message, avatar, timestamp } }) => {
  const classes = useStyles();

  const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;

  const isMyMessage = useMemo(() => MyId === id, [id]);

  return (
    <Grid container justifyContent={isMyMessage ? 'end' : 'start'}>
      <Avatar avatar={avatar} />
      <Paper sx={isMyMessage ? classes.myMessage : classes.notMyMessage}>
        <Box whiteSpace="normal">{message}</Box>
        <Typography variant="caption" sx={classes.time}>
          {time}
        </Typography>
      </Paper>
    </Grid>
  );
};