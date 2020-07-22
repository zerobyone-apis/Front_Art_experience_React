import React, { useState, useContext, SetStateAction, Dispatch, useEffect } from 'react';
import { DialogModal } from '../DialogModal';
import { ClientAccess } from '../ReserveModal/ClientAccess';
import { ClientContext } from '../../contexts/ClientContext';
import { RiAccountCircleLine } from 'react-icons/ri';
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
        clientIsLogged,
        getClientData
    } = useContext(ClientContext);

    useEffect(() => {
        console.log(getClientData())
    }, [])

    const [showDialog, setShowDialog] = useState(props.show || false);

    const onClientLogged = (clientData: any) => {
        if (props.onSuccessLogin) {
            props.onSuccessLogin(true);
        }
    }
    return (
        <div className="login-modal">
            {!props.show ? (
                <div className="dialog_activator-box">
                    <Button
                        onClick={() => { setShowDialog(true) }}
                        className={`activator-btn login-btn art_experience-button_outlined`}
                        label={clientIsLogged() ? getClientData().name : 'Acceder'}>
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
        </div>
    );
}
