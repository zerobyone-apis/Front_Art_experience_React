import React, { useState, useContext, Fragment } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ButtonContext } from '../../contexts/ButtonsContext';
import { UserContext } from '../../contexts/UserContext';
import { ValidationForm } from '../validation-form/validation-form';
import { IClient } from '../../types/Client.type';
import ClientActions from '../../actions/Client.actions';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Textfield } from '../text-field/text-field';
import './client-access.scss';
import '../../styles/theme-buttons.scss';
import '../../styles/effects.scss';
import { StepperFooter } from '../reserve-modal/stepper-footer';





export const ClientAccess = (props: {
    onClientLogged: any
}) => {
    const defaultLoginFields = {
        email: '',
        password: '',
    };
    const defaultRegisterFields = {
        name: '',
        email: '',
        socialNumber: '',
        password: '',
        password2: '',
        cel: '',
    };
    const baseMessage = {
        value: '',
        isError: false,
    };

    const [accessMode, setAccessMode] = useState(1); // 1 - Login / 0 - register
    const [loginFields, setLoginFields] = useState(defaultLoginFields);
    const [registerFields, setRegisterFields] = useState(defaultRegisterFields);
    const [message, setMessage] = useState(baseMessage);

    const clientActions: ClientActions = new ClientActions();

    /* CONTEXTS */
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    const {
        // @ts-ignore
        disabled,
        setDisabledButton,
    } = useContext(ButtonContext);
    const {
        // @ts-ignore
        setUserData,
    } = useContext(UserContext);


    const onChangeLoginField = (value: string, fieldName: string) => {
        setLoginFields({ ...loginFields, [fieldName]: value });
    };
    const onChangeRegisterField = (value: string, fieldName: string) => {
        setRegisterFields({ ...registerFields, [fieldName]: value })
    }


    /* LOGIN */
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

    /* REGISTER */
    const signUp = async () => {
        setMessage({ value: '', isError: false }); //clear
        const fields: IClient = {
            username: registerFields.name,
            cel: registerFields.cel,
            email: registerFields.email,
            name: registerFields.name,
            password: registerFields.password,
            password2: registerFields.password2
        }
        setDisabledButton(true);
        const response = await clientActions.add(fields);
        if (response) {
            if (response.status == 201) {
                // props.onClientRegister(response);
                props.onClientLogged(response);
                setUserData(response);
                setMessage({ value: 'Registro realizado con exito', isError: false });
            } else {
                setMessage({ value: response.statusText, isError: true });
            }
        } else {
            setMessage({ value: 'Ocurrio un error!, vuelva a intentarlo', isError: true });
        }
        setDisabledButton(false);
    }






    /////////////////////////////////////////////////////
    const { register, handleSubmit, control, errors } = useForm();
    const onSubmit = values => console.log(values)

    const SocialBox = () => {
        const [socialChecked, setSocialChecked] = useState(false);
        return (
            <div className="social-box">
                <li>
                    <ul>
                        <FormControlLabel
                            label="Soy Socio de ArtExperience"
                            className="social-form-control-label"
                            control={
                                <Checkbox
                                    onChange={
                                        (e: React.ChangeEvent<HTMLInputElement>) => {
                                            setSocialChecked(e.target.checked)
                                        }}
                                />}
                        />
                    </ul>
                    <ul>
                        <SocialForm show={socialChecked} />
                    </ul>
                </li>
            </div>
        )
    }


    const SocialForm = (props: { show: boolean }) => {
        return (
            <>
                {props.show && (
                    <Textfield
                        id="socialNumber"
                        name="socialNumber"
                        label="Numero Social"
                        inputRef={register({ required: true })}
                    />
                )}
            </>
        );
    }

    const LoginForm = () => {
        return (
            <ValidationForm
                objectTest={loginFields}
                buttonClassName="access_btn theme-button-outlined"
                onClick={() => login()}
                nextButtonLabel='Acceder'
                prevButtonLabel='Si no esta registrado, Acceda aqui'
                onPrevButtonClick={() => setAccessMode(0)}
            >
                {/* <TextField
                    tabindex={1}
                    value={loginFields.email}
                    name="email"
                    type="email"
                    required={true}
                    label="Email o Numero Social"
                    className="theme-text_field--dark"
                    onChange={onChangeLoginField}
                />
                <TextField
                    tabindex={2}
                    value={loginFields.password}
                    name="password"
                    type="password"
                    required={true}
                    label="Contraseña"
                    className="theme-text_field--dark"
                    onChange={onChangeLoginField}
                /> */}
                <div></div>
            </ValidationForm>
        )
    }


    const RegisterForm = () => {
        return (
            <Fragment>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <li style={{ listStyle: 'none' }}>
                        <ul>
                            <SocialBox />
                        </ul>
                        <ul>
                            <Textfield
                                id="name"
                                name="name"
                                label="Nombre"
                                inputRef={register({ required: true })}
                            />
                        </ul>
                        <ul>
                            <Textfield
                                id="email"
                                name="email"
                                label="Email"
                                inputRef={register({
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "El email no es valido"
                                    }
                                })}
                            />
                        </ul>
                        <ul>
                            <Textfield
                                id="cel"
                                name="cel"
                                label="Celular / Telefono"
                                inputRef={register({ required: true })}
                            />
                        </ul>
                        <ul>
                            <Textfield
                                id="password"
                                name="password"
                                label="Contraseña"
                                inputRef={register({ required: true })}
                            />
                        </ul>
                        <ul>
                            <Textfield
                                id="repitPassword"
                                name="repitPassword"
                                label="Repita Contraseña"
                                inputRef={register({ required: true })}
                            />
                        </ul>
                    </li>
                    <StepperFooter
                        nextButtonLabel="Registrarse"
                        prevButtonLabel="Si ya esta registrado, inicie aqui"
                        onNextButtonClick={() => { }}
                        onPrevButtonClick={() => { }}
                    />
                </form>
            </Fragment>
        )
    }

    return (
        <div className="login-box">
            {
                message.isError ? (<p className="error_message">{message.value}</p>) :
                    (<p className="success_message">{message.value}</p>)
            }
            {accessMode ? (<LoginForm />) : (<RegisterForm />)}
        </div>
    );
}
