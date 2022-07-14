import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { PasswordInput } from 'src/components/common/form/PasswordInput';
import { TextInput } from 'src/components/common/form/TextInput';
import { SignUpUser } from 'src/types/User';
import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { useAuthStorage } from 'src/hooks/UseStore';
import { useStyles } from '../styles';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email('Email field does not match requirements'),
  password: Yup.string().required().min(8),
});

const initialValues = {
  email: '',
  password: '',
  name: '',
  avatar: undefined
};

export const SignUpForm: FC = () => {
  const classes = useStyles();
  const authModel = useAuthStorage();
  const [filename, setFilename] = useState<string | null>(null);

  const handleSubmit = (formData: SignUpUser) => {
    authModel.signUp(formData);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form style={classes.form}>
          <TextInput
            className={classes.input}
            error={errors.email}
            touched={touched.email}
            name="email"
            label="Email*"
          />
          <TextInput
            className={classes.input}
            error={errors.name}
            touched={touched.name}
            name="name"
            label="Name"
          />
          <PasswordInput
            className={classes.input}
            error={errors.password}
            touched={touched.password}
            name="password"
            label="Password*"
          />

          <Box>
            <Button sx={classes.input} variant="contained" component="label">
              Upload Avatar
              <input
                type="file"
                name="avatar"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    const file = event.currentTarget.files[0];
                    setFieldValue('avatar', file);
                    setFilename(file.name);
                  }
                }}
                hidden
              />
            </Button>
            {!!filename && `(${filename})`}
          </Box>

          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};
