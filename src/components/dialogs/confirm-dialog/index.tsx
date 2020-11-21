import React from 'react';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { StepperFooter } from '../../containers/stepper/stepper-footer';
import './confirm-dialog.scss';

export const ConfirmDialog = (props: {
    onAccept: () => void,
    onCancel: () => void,
    title: string,
    message: string,
    acceptLabel?: string,
    cancelLabel?: string,
}) => {
    return (
        <DialogModal
            className="confirm-dialog"
            title={props.title}
            onClose={() => { props.onCancel() }}
        >
            <div className="confirm-box effect-slide-top">
                <p className="text text-dark confirm-message">{props.message}</p>
            </div>
            <StepperFooter
                nextLabel={props.acceptLabel}
                prevLabel={props.cancelLabel}
                onNextButtonClick={() => props.onAccept()}
                onPrevButtonClick={() => props.onCancel()}
            />
        </DialogModal>
    )
}
