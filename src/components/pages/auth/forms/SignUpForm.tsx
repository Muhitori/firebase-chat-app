import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { PasswordInput } from 'src/components/common/form/PasswordInput';
import { TextInput } from 'src/components/common/form/TextInput';
import { SignUpUser } from 'src/types/User';
import { Button } from '@mui/material';
import { FC } from 'react';
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

          <Button
            sx={classes.input}
            variant="contained"
            component="label"
          >
            Upload Avatar
            <input
              type="file"
              name="avatar"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  setFieldValue('avatar', event.currentTarget.files[0]);
                }
              }}
              hidden
            />
          </Button>

          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};
