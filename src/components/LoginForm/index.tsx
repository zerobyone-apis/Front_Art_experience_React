import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import './LoginForm.scss';
import { TextField } from '../Textfield';
import { FormContext } from '../../contexts/FormContext';
import { Button } from '../../components/Button';

export const LoginForm = (props: { className?: string }) => {

  const initialValues = {
    username: { value: '', error: '', required: true },
    x: { value: '', error: '', required: true },
    password: { value: '', error: '', required: true }
  }

  const [fields, setFields] = useState(initialValues);

  const onChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    console.log(`${value} ${name}`)
    setFields({ ...fields, [name]: { ...fields[name], value: value } });
  };

  const validationFields = (fields: any) => {
    Object.keys(fields).forEach((fieldName: string) => {
      if (!fields[fieldName].value && fields[fieldName].required) {
        setFields({ ...fields, [fieldName]: { ...fields[fieldName], error: "El campo es requerido!" } })
      } else {
        setFields({ ...fields, [fieldName]: { ...fields[fieldName], error: "" } })
      }
    })
  }

  const login = () => {
    // validationFields(fields)
    document.location.href = 'Dashboard';
  }

  return (
    <div className="login-box">
      <TextField
        name="username"
        label="Usuario"
        type="username"
        value={fields.username.value}
        error={fields.username.error}
        onChange={onChange}
      />
      <TextField
        name="password"
        label="Contrasena"
        type="password"
        value={fields.password.value}
        error={fields.password.error}
        onChange={onChange}
      />
      <Button width="100px" onClick={login} label="Login" />
    </div>
  );
};
LoginForm.displayName = 'Login Form';
