import React, { useState, useRef, useContext, SetStateAction, Dispatch, useEffect } from 'react';
import { DialogModal } from '../DialogModal';
import { ClientAccess } from '../ReserveModal/ClientAccess';
import { UserContext } from '../../contexts/UserContext';
import { ButtonContext } from '../../contexts/ButtonsContext';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { Button } from '../Button';
import './LoginModal.scss';

export const LoginModal = (props: {
    show?: boolean,
    onClose?: Dispatch<SetStateAction<boolean>>,
    onSuccessLogin?: any
}) => {
    // context
    const {
        // @ts-ignore
        userIsLogged,
        getUserData,
        setUserData
    } = useContext(UserContext);
    const {
        // @ts-ignore
        disabled,
        setDisabledButton
    } = useContext(ButtonContext);

    const [showDialog, setShowDialog] = useState(props.show || false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    // control account menu
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setShowAccountMenu);


    const onClientLogged = (clientData: any) => {
        if (props.onSuccessLogin) {
            props.onSuccessLogin(true);
        }
        setTimeout(() => {
            setShowDialog(false)
        }, 2000);
    }

    const launchModal = () => {
        if (userIsLogged()) {
            setShowAccountMenu(true);
        } else {
            setShowDialog(true);
        }
    }

    const logOut = () => {
        setDisabledButton(true)
        setUserData(null)
        setDisabledButton(false)
        document.location.href = '/';
    }

    return (
        <div className="login-modal">
            {!props.show ? (
                <div className="dialog_activator-box">
                    <Button
                        onClick={() => { launchModal() }}
                        className={`activator-btn login-btn art_experience-button_outlined`}
                        label={userIsLogged() ? getUserData().name : 'Acceder'}>
                        <RiAccountCircleLine className="icon" />
                    </Button>
                </div>
            ) : null}

            {!showDialog ? null : (
                <DialogModal
                    title="Inicio de Sesion - ArtExperience"
                    className="login-dialog"
                    width='65vw'
                    height='65vh'
                    onClose={() => {
                        setShowDialog(false);
                        if (props.onClose) {
                            props.onClose(false);
                        }
                    }}
                >
                    <ClientAccess onClientLogged={onClientLogged} />
                </DialogModal>
            )
            }
            {
                showAccountMenu && userIsLogged() ? (
                    <div className="account-menu" ref={wrapperRef}>
                        <p className="item-text user-name">{getUserData().name}</p>
                        <p className="item-text user-email">{getUserData().email}</p>
                        <Button
                            label="Gestion de Reservas"
                            className="item-list_btn art_experience-button_outlined"
                            onClick={() => { document.location.href = '/Dashboard'; }}
                        />
                        <Button
                            label="Pagina Principal"
                            className="item-list_btn art_experience-button_outlined"
                            onClick={() => { document.location.href = '/'; }}
                        />
                        <Button
                            label="Cerrar Seion"
                            className="item-list_btn art_experience-button_outlined"
                            onClick={() => { logOut() }}
                        />
                    </div>
                ) : null
            }
        </div>
    );
}
