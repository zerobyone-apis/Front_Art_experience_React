import React, { useContext, useState } from 'react';
import { DialogModal } from '../../../../dialogs/dialog-modal/dialog-modal';
import ReserveActions from '../../../../../actions/Reserve.actions';
import { IReserve } from '../../../../../types/Reserve.type';
import { ButtonContext } from '../../../../../contexts/ButtonsContext';
import { StepperFooter } from '../../../../containers/stepper/stepper-footer';
import { ConfirmDialog } from '../../../../dialogs/confirm-dialog';
import { ManagerForm, MANAGER_FIELDLS } from './manager-form';
import { Button } from '../../../../inputs/button';
import moment from 'moment';
import './manager-dialog.scss';
import { FormProvider } from '../../../../../contexts/FormContext';
import { BiSave } from 'react-icons/bi';


export const ManagerDialog = (props: {
  reserve: IReserve,
  onClose: any,
  onFinalized?: () => undefined,
  onCancelled?: () => undefined,
  onUpdated?: (updated) => any,
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
  const [reserve, setReserve] = useState(props.reserve || baseReserve);
  const [showFinalizeDialog, setFinalizeDialog] = useState(false);
  const [showCancelDialog, setCancelDialog] = useState(false);


  /* UPDATE RESERVE */
  const save = async (fields: any) => {
    setDisabledButton(true);
    //let formatDateOld = moment(reserve.startTime).format('YYYY-MM-DDTHH:mm:ss');
    let formatDateFront = moment(fields.startTimeFront.value).format('YYYY-MM-DDTHH:mm:ss');
    let reserveUpdate: IReserve = {

      /* Check the start time: need pass the startTimeFront formatted? 
        add a callendar?
      */
      startTime: formatDateFront,

      /* Fields of form */
      workToDo: fields.workToDo.value,
      priceWork: fields.totalCost.value, /* <-- Are not the same but is necesary */
      celClient: fields.celClient.value,

      /* Not updated fields (disabled or not specify) */
      reserveId: reserve.reserveId,
      clientId: reserve.clientId,
      socialNumber: reserve.socialNumber,
      nameClient: reserve.nameClient,
      barberOrHairdresserId: reserve.barberOrHairdresserId,
      mailClient: reserve.mailClient,
      additionalCost: reserve.additionalCost,
    }
    console.log('RESERVE', reserveUpdate)
    let response = await reserveActions.update(reserveUpdate);
    console.log('Update reserve');
    if (response) {
      console.log('Success updated');
      props.onUpdated(reserveUpdate);
      props.onClose();
      setDisabledButton(false);
    } else {
      console.log('Error updating:', response);
    }
  }


  /* FINALIZE RESERVE */
  const finalize = async () => {
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
  }



  /* CANCEL RESERVE */
  const cancel = async () => {
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
  }

  const confirmAction = () => {
  }

  return (
    <DialogModal
      title="Control de Reserva"
      onClose={props.onClose}
      width="400px"
      fullscreenOnMobile={true}
    >

      <FormProvider currentForm={MANAGER_FIELDLS}>
        <ManagerForm reserve={reserve} />
        <StepperFooter
          noUseWizard={true}
          validate={true}
          nextLabel="Guardar"
          prevLabel="Finalizar"
          onNextButtonClick={(fields) => save(fields)}
          onPrevButtonClick={() => setFinalizeDialog(true)}
          prevButtonStyle="outlined"
        >
          <Button
            label="Cancelar"
            style="outlined"
            onClick={() => setCancelDialog(true)}
          />
        </StepperFooter>
      </FormProvider>

      {showFinalizeDialog && (
        <ConfirmDialog
          title="Finalizacion de reserva"
          message="Esta seguro de que desea finalizar la reserva?"
          acceptLabel="Confirmar Accion"
          cancelLabel="Volver"
          onAccept={() => finalize()}
          onCancel={() => setFinalizeDialog(false)}
        />
      )}

      {showCancelDialog && (
        <ConfirmDialog
          title="Cancelacion de reserva"
          message="Esta seguro de que desea cancelar la reserva?"
          acceptLabel="Confirmar Accion"
          cancelLabel="Volver"
          onAccept={() => cancel()}
          onCancel={() => setCancelDialog(false)}
        />
      )}

    </DialogModal>
  )
}
