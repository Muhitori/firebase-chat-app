import { TextField } from '@mui/material';
import { Field, FieldProps, ErrorMessage } from 'formik';
import { FC } from 'react';

interface Props {
  name: string;
  label?: string;
  className?: string;
}

const TextInput: FC<Props> = ({ name, label, className }) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <>
          <TextField
            fullWidth
            className={className}
            variant="filled"
            label={label}
            {...field}
          />
          <ErrorMessage name={field.name} />
        </>
      )}
    </Field>
  );
};

export default TextInput;
