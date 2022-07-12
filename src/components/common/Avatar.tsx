import MuiAvatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { CSSProperties, FC} from 'react';

interface Props {
  avatar?: string | null;
  styles?: CSSProperties
}

export const Avatar: FC<Props> = ({ avatar, styles }) => {
  if (avatar) {
    return (
      <MuiAvatar
        sx={{ ...styles, marginRight: '0.5rem' }}
        src={`data:image/png;base64,${avatar}`}
      />
    );
  }

  return (
    <MuiAvatar sx={{ ...styles, marginRight: '0.5rem' }}>
      <PersonIcon />
    </MuiAvatar>
  );
};