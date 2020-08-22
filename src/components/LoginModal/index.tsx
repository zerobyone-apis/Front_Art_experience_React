import React, { useState, useRef, useContext, SetStateAction, Dispatch } from 'react';
import { DialogModal } from '../DialogModal';
import { Button } from '../Button';
import { ClientAccess } from '../ClientAccess';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { UserContext } from '../../contexts/UserContext';
import { ButtonContext } from '../../contexts/ButtonsContext';
import { getPageName } from '../../utils/utils';
import { INDEX_PAGE, DASHBOARD_PAGE } from '../../types/Pages.type';
import './LoginModal.scss';
import '../../styles/Effects.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

export const LoginModal = (props: {
    show?: boolean,
    onClose?: Dispatch<SetStateAction<boolean>>,
    onSuccessLogin?: any
}) => {
    const [showDialog, setShowDialog] = useState(props.show || false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    // context
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
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
                        className={!userIsLogged() ? "art_experience-button" : "art_experience-button_outlined " + `activator-btn login-btn`}
                        icon={<RiAccountCircleLine />}
                        label={userIsLogged() ? getUserData().username : 'Acceder para Reservar'} />
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
                    <p className={`text text-${getTheme()}`}>Acceda para poder reservar y disfrutar de nuestros servicios</p>
                    <ClientAccess onClientLogged={onClientLogged} />
                </DialogModal>
            )
            }







            {
                showAccountMenu && userIsLogged() ? (
                    <div className={`account-menu effect-opacity ${getTheme()}`} ref={wrapperRef}>
                        <p className={`item-text user-name text text-${getTheme()}`}>{getUserData().username}</p>
                        <p className={`item-text user-email text text-${getTheme()}`}>{getUserData().email}</p>
                        {(getPageName() === INDEX_PAGE && getUserData().admin) ? (
                            <Button
                                label="Gestion de Reservas"
                                className="item-list_btn art_experience-button_outlined"
                                onClick={() => { document.location.href = '/Dashboard'; }}
                            />
                        ) : null}
                        {getPageName() === DASHBOARD_PAGE ? (
                            <Button
                                label="Pagina Principal"
                                className="item-list_btn art_experience-button_outlined"
                                onClick={() => { document.location.href = '/'; }}
                            />
                        ) : null}
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
