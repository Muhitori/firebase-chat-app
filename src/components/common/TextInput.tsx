import { TextField } from '@mui/material';
import { Field, FieldProps } from 'formik';
import React, { CSSProperties } from 'react';

interface Props {
  error: string | undefined;
  touched: boolean | undefined;
  name: string;
  label?: string;
  className?: CSSProperties;
}

const TextInput: React.FC<Props> = ({
  name,
  label,
  className,
  error,
  touched,
}) => {
  const showError = !!error && !!touched;
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <>
          <TextField
            fullWidth
            sx={className}
            variant="outlined"
            label={label}
            error={showError}
            helperText={showError && error}
            {...field}
          />
        </>
      )}
    </Field>
  );
};

export default TextInput;
