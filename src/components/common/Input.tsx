import { TextField } from '@mui/material';
import { FC, CSSProperties } from 'react';
import { Variant } from 'src/types/UI';

interface Props {
  label?: string;
  className?: CSSProperties;
  variant?: Variant;
}

export const Input: FC<Props> = ({ className, variant, label }) => {
  return (
    <TextField
      fullWidth
      sx={className}
      variant={variant || 'outlined'}
      label={label}
    />
  );
};