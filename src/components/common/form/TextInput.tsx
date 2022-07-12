import { TextField } from '@mui/material';
import { Field, FieldProps } from 'formik';
import React, { CSSProperties } from 'react';
import { Variant } from 'src/types/UI';

interface Props {
  error?: string | undefined;
  touched?: boolean | undefined;
  name?: string;
  label?: string;
  className?: CSSProperties;
  variant?: Variant;
}

export const TextInput: React.FC<Props> = ({
  name,
  label,
  className,
  error,
  touched,
  variant,
}) => {
  const showError = !!error && !!touched;
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <TextField
          fullWidth
          sx={className}
          variant={variant || "outlined"}
          label={label}
          error={showError}
          helperText={showError && error}
          {...field}
        />
      )}
    </Field>
  );
};
