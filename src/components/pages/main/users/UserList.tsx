import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { User } from 'src/components/common/User';
import { useUserStorage } from 'src/hooks/UseStore';
import { IUser } from 'src/types/User';


export const UserList: FC = () => {
  const userModel = useUserStorage();
  const [users, setUsers] = useState<IUser[] | null>(null);

  useEffect(() => {
    const func = async () => {
      const allUsers = await userModel.getAllUsers();
      setUsers(allUsers);
    };
    func();
  }, []);
  
  return (
    <Box>
      {users && users.map((user) => (
        <User key={user.uid} user={user} />
      ))}
    </Box>
  );
}