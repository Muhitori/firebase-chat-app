import MuiAvatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { FC, useEffect, useState } from 'react';
import { useUserStorage } from 'src/hooks/UseStore';

interface Props {
  userId: string;
}

export const Avatar: FC<Props> = ({ userId }) => {
  const userModel = useUserStorage();
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const asyncSetAvatar = async () => {
      const userImage = await userModel.getAvatar(userId);
      if (userImage) {
        setAvatar(userImage);
      }
    }
    asyncSetAvatar();
  }, []);
  
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
}