import React, { useContext, useState } from 'react';

import { ButtonContext } from '../../../contexts/ButtonsContext';
import ClientActions from '../../../actions/Client.actions';
import { TextField } from '../../text-field/text-field';
import { UserContext } from '../../../contexts/UserContext';
import { ValidationForm } from '../../validation-form/validation-form';
import './login-form.scss';
import '../../../styles/theme-buttons.scss';

export const LoginForm = (props: {
  onClientLogged: (response: any) => void;
}) => {
  const defaultLoginFields = {
    email: '',
    password: '',
  };

  const baseMessage = {
    value: '',
    isError: false,
  };

  const [loginFields, setLoginFields] = useState(defaultLoginFields);
  const [message, setMessage] = useState(baseMessage);

  const onChangeLoginField = (value: string, fieldName: string) => {
    setLoginFields({ ...loginFields, [fieldName]: value });
  };

  const clientActions: ClientActions = new ClientActions();

  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);
  const {
    // @ts-ignore
    setUserData,
  } = useContext(UserContext);

  // LOGIN
  const login = async () => {
    setMessage({ value: '', isError: false }); //clear
    const fields = {
      email: loginFields.email,
      password: loginFields.password,
    };
    setDisabledButton(true);
    const response = await clientActions.login(fields);
    if (response) {
      props.onClientLogged(response);
      setUserData({ ...response.data.user, ...response.data.client });
      setMessage({ value: 'Has iniciado sesion con exito', isError: false });
    } else {
      setMessage({
        value: 'No se pudo iniciar sesion, verifique email y contaseña',
        isError: true,
      });
    }
    setDisabledButton(false);
  };

  return (
    <div className="login-box">
      <ValidationForm
        objectTest={loginFields}
        buttonLabel="Acceder"
        buttonClassName="access_btn theme-button-outlined"
        onClick={() => {
          login();
        }}
      >
        <TextField
          value={loginFields.email}
          name="email"
          type="email"
          required={true}
          label="Email"
          className="theme-text_field--dark"
          onChange={onChangeLoginField}
        />
        <TextField
          value={loginFields.password}
          name="password"
          type="password"
          required={true}
          label="Contraseña"
          className="theme-text_field--dark"
          onChange={onChangeLoginField}
        />
      </ValidationForm>
      {message.isError ? (
        <p className="error_message">{message.value}</p>
      ) : (
        <p className="success_message">{message.value}</p>
      )}
    </div>
  );
};
