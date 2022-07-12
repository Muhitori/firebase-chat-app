import MuiAvatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { FC} from 'react';

interface Props {
  avatar?: string | null;
}

export const Avatar: FC<Props> = ({ avatar }) => {
  if (avatar) {
    return (
      <MuiAvatar
        sx={{ marginRight: '0.5rem' }}
        src={`data:image/png;base64,${avatar}`}
      />
    );
  }

  return (
    <MuiAvatar sx={{ marginRight: '0.5rem' }}>
      <PersonIcon />
    </MuiAvatar>
  );
};