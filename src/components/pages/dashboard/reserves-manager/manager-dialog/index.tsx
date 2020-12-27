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
import { FaCalendarCheck, FaCross } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { MdSave } from 'react-icons/md';


export const ManagerDialog = (props: {
  reserve: IReserve,
  onClose: any,
  onFinalized?: () => any,
  onCancelled?: () => any,
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
    let formatDateFront = moment(fields[MANAGER_FIELDLS.startTimeFront].value).format('YYYY-MM-DDTHH:mm:ss');
    let reserveUpdate: IReserve = {

      /* Check the start time: need pass the startTimeFront formatted? 
        add a callendar?
      */
      startTime: formatDateFront,

      /* Fields of form */
      workToDo: fields[MANAGER_FIELDLS.workToDo].value,
      priceWork: fields[MANAGER_FIELDLS.totalCost].value, /* <-- Are not the same but is necesary */
      celClient: fields[MANAGER_FIELDLS.celClient].value,

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
    } else {
      console.log('Error updating:', response);
    }
    setDisabledButton(false);
  }


  return (
    <DialogModal
      title="Edición de Reserva"
      onClose={props.onClose}
      width="400px"
      fullscreenOnMobile={true}
    >
      <FormProvider currentForm={MANAGER_FIELDLS}>
        <ManagerForm reserve={reserve} />
        <StepperFooter
          validate={true}
          nextLabel="Guardar"
          nextIcon={<FaCalendarCheck />}
          onNextButtonClick={(fields) => save(fields)}
        />
      </FormProvider>

    </DialogModal>
  )
}
