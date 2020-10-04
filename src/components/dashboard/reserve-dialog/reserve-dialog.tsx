import React, { useContext, useState } from 'react';
import { DialogModal } from '../../dialog-modal/dialog-modal';
import ReserveActions from '../../../actions/Reserve.actions';
import { IReserve } from '../../../types/Reserve.type';
import { ValidationForm } from '../../validation-form/validation-form';
import { Textfield } from '../../text-field/text-field';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import moment from 'moment';
import { StepperFooter } from '../../reserve-modal/stepper-footer';
import { ConfirmDialog } from '../../confirm-dialog';
import './reserve-dialog.scss';
import '../../../styles/theme-buttons.scss';
import '../../../styles/effects.scss';

export const ReserveDialog = (props: {
  reserve: IReserve;
  onClose: any;
  onFinalized?: () => undefined;
  onCancelled?: () => undefined;
  updated?: () => undefined;
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
    socialNumber: 0,
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
  const [showUpdateDialog, setUpdateDialog] = useState(false);

  const onChangeReserve = (value: string, fieldName: string) => {
    setReserve({ ...reserve, [fieldName]: value });
  };

  /* UPDATE RESERVE */
  const updateReserve = async () => {
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
      socialNumber: reserve.socialNumber,
    };
    let response = await reserveActions.update(reserveUpdate);
    console.log('Update reserve');
    if (response) {
      console.log('Success updated');
      props.onClose();
      setDisabledButton(false);
    } else {
      console.log('Error updating:', response);
    }
  };

  /* FINALIZE RESERVE */
  const finalizeReserve = async () => {
    setDisabledButton(true);
    let response = await reserveActions.doneReserve(
      reserve.barberOrHairdresserId,
      reserve.reserveId
    );
    console.log('finalized');
    if (response) {
      console.log('success finalize');
      props.onClose();
      setDisabledButton(false);
    } else {
      console.log('error', response);
    }
  };

  /* CANCEL RESERVE */
  const cancelReserve = async () => {
    setDisabledButton(true);
    let response = await reserveActions.cancel(
      reserve.clientId,
      reserve.reserveId
    );
    console.log('cancel');
    if (response) {
      console.log('success cancel');
      props.onClose();
      setDisabledButton(false);
    } else {
      console.log('error cancel :', response);
    }
  };

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
            onUpdateButtonClick={() => setUpdateDialog(true)}
            nextButtonLabel="Finalizar Reserva"
            prevButtonLabel="Cancelar Reserva"
            updaButtonLabel="Actualizar Reserva"
          >
            <Textfield
              id={'1'}
              name="nameClient"
              label="Nombre del cliente"
              type="string"
              value={reserve.nameClient}
            />
            <Textfield
              id={'2'}
              name="mailClient"
              label="Email del cliente"
              type="string"
              value={reserve.mailClient}
            />
            <Textfield
              id={'3'}
              label="Cel del cliente"
              name="celClient"
              type="string"
              value={reserve.celClient}
            />
            <p className="reserve_info">Datos de la Reserva</p>
            <Textfield
              id={'3'}
              name="startTimeFront"
              label="Fecha y Hora de Reserva"
              type="string"
              value={reserve.startTimeFront}
            />
            <Textfield
              id={'4'}
              name="barberName"
              label="Nombre Barbero"
              type="string"
              value={reserve.barberName}
            />
            <Textfield
              id={'5'}
              name="workToDo"
              label="Servicio Seleccionado"
              type="string"
              value={reserve.workToDo}
            />
            <Textfield
              id={'6'}
              name="totalCost"
              label="Costo Total"
              type="number"
              value={reserve.totalCost}
            />
          </ValidationForm>
        </div>
      </div>

      {showFinalizeDialog ? (
        <ConfirmDialog
          title="Finalizacion de reserva"
          message="Esta seguro de que desea finalizar la reserva?"
          acceptLabel="Finalizar"
          cancelLabel="Volver"
          onAccept={() => finalizeReserve()}
          onCancel={() => setFinalizeDialog(false)}
        />
      ) : null}
      {showCancelDialog ? (
        <ConfirmDialog
          title="Cancelacion de reserva"
          message="Esta seguro de que desea cancelar la reserva?"
          acceptLabel="Cancelar"
          cancelLabel="Volver"
          onAccept={() => cancelReserve()}
          onCancel={() => setCancelDialog(false)}
        />
      ) : null}
    </DialogModal>
  );
};
