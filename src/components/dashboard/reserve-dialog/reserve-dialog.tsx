import React, { useContext, useState } from 'react';
import { DialogModal } from '../../dialog-modal/dialog-modal';
import ReserveActions from '../../../actions/Reserve.actions';
import { IReserve } from '../../../types/Reserve.type';
import { ValidationForm } from '../../validation-form/validation-form';
import { TextField } from '../../text-field/text-field';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import moment from 'moment';
import { StepperFooter } from '../../reserve-modal/stepper-footer';
import { ConfirmDialog } from '../../confirm-dialog';
import './reserve-dialog.scss';
import '../../../styles/theme-buttons.scss';
import '../../../styles/effects.scss';

export const ReserveDialog = (props: {
  reserve: IReserve,
  onClose: any,
  onFinalized?: () => undefined,
  onCancelled?: () => undefined,
  onUpdated?: () => undefined,
}) => {
  const baseReserve: IReserve = {
    barberOrHairdresserId: -1,
    celClient: '',
    clientId: -1,
    mailClient: '',
    nameClient: '',
    priceWork: 0,
    startTime: '',
    additionalCost: 0,
  };
  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);

  const reserveActions: ReserveActions = new ReserveActions();
  // const [showDialog, setShowDialog] = useState(false);
  const [reserve, setReserve] = useState(props.reserve || baseReserve);
  const [showFinalizeDialog, setFinalizeDialog] = useState(false);
  const [showCancelDialog, setCancelDialog] = useState(false);

  const onChangeReserve = (value: string, fieldName: string) => {
    setReserve({ ...reserve, [fieldName]: value });
  };

  /* UPDATE RESERVE */
  const onUpdate = async () => {
    setDisabledButton(true);
    let formatDate = moment(reserve.startTime).format('YYYY-MM-DDTHH:mm:ss');
    let reserveUpdate: IReserve = {
      reserveId: reserve.reserveId,
      nameClient: reserve.nameClient,
      barberOrHairdresserId: reserve.barberOrHairdresserId,
      clientId: reserve.clientId,
      celClient: reserve.celClient,
      mailClient: reserve.mailClient,
      workToDo: reserve.workToDo,
      priceWork: reserve.priceWork,
      additionalCost: reserve.additionalCost,
      startTime: formatDate,
    }
  }

  /* FINALIZE RESERVE */
  const finalizeReserve = async () => {
    setDisabledButton(true);
    let response = await reserveActions.doneReserve(reserve.barberOrHairdresserId, reserve.reserveId);
    console.log('finalized')
    if (response) {
      console.log('success finalize')
      props.onClose();
      setDisabledButton(false);
    } else {
      console.log('error', response)
    }
  }

  /* CANCEL RESERVE */
  const cancelReserve = async () => {
    setDisabledButton(true);
    let response = await reserveActions.cancel(reserve.barberOrHairdresserId, reserve.reserveId);
    console.log('cancel')
    if (response) {
      console.log('success cancel')
      props.onClose();
      setDisabledButton(false);
    } else {
      console.log('error cancel :', response)
    }
  }

  return (
    <DialogModal
      className="reserve-modal"
      title="Control de Reserva"
      onClose={props.onClose}
    >
      <div className="reserve-modal">
        <div className="reserve_data-box">
          <p className="reserve_info effect-slide_left">Datos del Cliente</p>
          <ValidationForm
            objectTest={reserve}
            onClick={() => setFinalizeDialog(true)}
            onPrevButtonClick={() => setCancelDialog(true)}
            nextButtonLabel='Finalizar Reserva'
            prevButtonLabel='Cancelar Reserva'
          >
            <TextField
              value={reserve.nameClient}
              disabled={true}
              name="nameClient"
              type="string"
              required={false}
              label="Nombre"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.mailClient}
              name="mailClient"
              type="email"
              required={true}
              label="Email"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.celClient}
              name="celClient"
              type="number"
              required={true}
              label="Celular"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <p className="reserve_info">Datos de la Reserva</p>
            <TextField
              value={reserve.startTimeFront}
              name="startTimeFront"
              type="allow"
              required={true}
              label="Fecha y hora"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.barberName}
              name="barberOrHairdresserId"
              type="allow"
              required={true}
              disabled={true}
              label="Barbero"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.workToDo}
              name="workToDo"
              type="allow"
              required={true}
              label="Servicio"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.totalCost}
              name="totalCost"
              type="number"
              required={true}
              label="Costo Total"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
          </ValidationForm>
        </div>
      </div>

      {/* <StepperFooter
        nextButtonLabel="Finalizar Reserva"
        prevButtonLabel="Cancelar Reserva"
        nextButtonStyle="theme-button-outlined"
        onNextButtonClick={() => setFinalizeDialog(true)}
        onPrevButtonClick={() => setCancelDialog(true)}
      /> */}

      {
        showFinalizeDialog ? (
          <ConfirmDialog
            title="Finalizacion de reserva"
            message="Esta seguro de que desea finalizar la reserva?"
            acceptLabel="Finalizar"
            cancelLabel="Volver"
            onAccept={() => finalizeReserve()}
            onCancel={() => setFinalizeDialog(false)}
          />
        ) : null
      }
      {
        showCancelDialog ? (
          <ConfirmDialog
            title="Cancelacion de reserva"
            message="Esta seguro de que desea cancelar la reserva?"
            acceptLabel="Cancelar"
            cancelLabel="Volver"
            onAccept={() => cancelReserve()}
            onCancel={() => setCancelDialog(false)}
          />
        ) : null
      }
    </DialogModal>
  );
};
