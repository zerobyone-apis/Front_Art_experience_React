import React, { useState, useContext } from 'react';
import { DialogModal } from '../DialogModal';
import { ClientAccess } from '../ReserveModal/ClientAccess';
import { IClient } from '../../types/Client.type';
import { Button } from '../Button';
import './LoginModal.scss';

export const LoginModal = () => {
    const defaultClient: IClient = {
        cel: '',
        email: '',
        name: '',
        password: '',
        username: '',
        userId: -1
    }

    const [showDialog, setShowDialog] = useState(false);
    const [client, setClient] = useState(defaultClient);

    return (
        <div className="login-modal">
            <div className="dialog_activator-box">
                <Button
                    onClick={() => { setShowDialog(true) }}
                    className={`activator-btn login-btn art_experience-button_outlined`}
                    label={'Acceder'} />
            </div>
            {!showDialog ? null : (
                <DialogModal
                    title="Inicio de Sesion - ArtExperience"
                    className="login-dialog"
                    width='65vw'
                    height='65vh'
                    onClose={() => { setShowDialog(false) }}
                >
                    <ClientAccess onClientLogged={setClient} />
                </DialogModal>
            )
            }
        </div>
    );
}
