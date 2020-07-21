import React, { useState, useContext, useEffect, SetStateAction, Dispatch } from 'react';
import { DialogModal } from '../DialogModal';
import { ClientAccess } from '../ReserveModal/ClientAccess';
import { IClient } from '../../types/Client.type';
import { Button } from '../Button';
import './LoginModal.scss';

export const LoginModal = (props: {
    show?: boolean,
    onClose?: Dispatch<SetStateAction<boolean>>,
    onSuccessLogin: any
}) => {
    const defaultClient: IClient = {
        cel: '',
        email: '',
        name: '',
        password: '',
        username: '',
        userId: -1
    }

    const [showDialog, setShowDialog] = useState(props.show || false);
    const [client, setClient] = useState(defaultClient);

    const onClientLogged = (clientData: any) => {
        setClient(clientData);
        props.onSuccessLogin(true);
    }

    return (
        <div className="login-modal">
            {!props.show ? (
                <div className="dialog_activator-box">
                    <Button
                        onClick={() => { setShowDialog(true) }}
                        className={`activator-btn login-btn art_experience-button_outlined`}
                        label={'Acceder'} />
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
                        props.onClose(false);
                    }}
                >
                    <ClientAccess onClientLogged={onClientLogged} />
                </DialogModal>
            )
            }
        </div>
    );
}
