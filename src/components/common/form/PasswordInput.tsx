import { CSSProperties, FC, useCallback, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Field, FieldProps } from 'formik';

interface Props {
  name: string;
  label?: string;
  className?: CSSProperties;
  error: string | undefined;
  touched: boolean | undefined;
}

export const PasswordInput: FC<Props> = ({
  name,
  label,
  className,
  error,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const showError = !!error && !!touched;

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <TextField
          fullWidth
          sx={className}
          variant="outlined"
          label={label}
          type={showPassword ? 'text' : 'password'}
          error={showError}
          helperText={showError && error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...field}
        />
      )}
    </Field>
  );
};
