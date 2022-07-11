import { TextField } from '@mui/material';
import { Field, FieldProps } from 'formik';
import React, { CSSProperties } from 'react';

interface Props {
  error: string | undefined;
  touched: boolean | undefined;
  name: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const TextInput: React.FC<Props> = ({
  name,
  label,
  className,
  style,
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
            style={style}
            classes={{ root: className }}
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
