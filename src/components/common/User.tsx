import { Box } from '@mui/material';
import { FC } from 'react';
import { IUser } from 'src/types/User';
import { Avatar } from './Avatar';

interface Props {
  user: IUser;
}

export const User: FC<Props> = ({ user }) => {
  const { uid, name, email, avatar } = user;

  return (
    <Box display="flex" alignItems="center">
      <Avatar avatar={avatar} />
      {name || email}
    </Box>
  );
}