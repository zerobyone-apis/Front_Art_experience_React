import React, { useContext } from 'react';
import moment from 'moment';
import { DialogModal } from '../../../../dialogs/dialog-modal/dialog-modal';
import ReserveActions from '../../../../../actions/Reserve.actions';
import { IReserve } from '../../../../../types/Reserve.type';
import { ButtonContext } from '../../../../../contexts/ButtonsContext';
import { StepperFooter } from '../../../../containers/stepper/stepper-footer';
import { ManagerForm, MANAGER_FIELDLS } from './manager-form';
import { FormProvider } from '../../../../../contexts/FormContext';
import { FaCalendarCheck, FaCross } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import './manager-dialog.scss';

export const ManagerDialog = (props: {
  reserve: IReserve,
  onClose: any,
  // onSaveRefresh: () => any

  //* Deprecated:
  //? onFinalized?: () => any,
  //? onCancelled?: () => any,
  onUpdated?: (updated) => any,
}) => {

  const {
    setDisabledButton,
  } = useContext(ButtonContext);

  // New instance actions 
  //TODO: En un futuro por mas control de instancias deberiamos de tener nuestro archivo de instancias 
  //TODO: para darle vida a una unica instancia y poder utilizarla donde sea necesario. -> Singleton Pattern
  const reserveActions: ReserveActions = new ReserveActions();


  const save = async (fields: any) => {
    setDisabledButton(true);
    let formatDateFront = moment().format('YYYY-MM-DDTHH:mm:ss');

    //* This works
    // console.log(`Estos son mis fields de reserva -> ${fields}`);
    // console.log(`Este es el cel -> ${fields[MANAGER_FIELDLS.celClient].value}`);

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
      reserveId: props.reserve.reserveId,
      clientId: props.reserve.clientId,
      socialNumber: props.reserve.socialNumber,
      nameClient: props.reserve.nameClient,
      barberOrHairdresserId: props.reserve.barberOrHairdresserId,
      mailClient: props.reserve.mailClient,
      additionalCost: props.reserve.additionalCost,
    }
    let response = await reserveActions.update(reserveUpdate);
    if (response) {
      console.log('Update Successfully 😎');
      // await props.onSaveRefresh()

      //! Estos metodos realmente no estaba haciendo nada, debido a que no se le envia ningun update como prop.
       props.onUpdated(reserveUpdate);
      // props.onClose();
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
        <ManagerForm reserve={props.reserve} />
        <StepperFooter
          validate={true}
          noUseWizard={true}
          prevLabel="Volver"
          nextLabel="Guardar"
          nextIcon={<FaCalendarCheck />}
          prevIcon={<MdArrowBack />}
          onNextButtonClick={(fields) => save(fields)}
          onPrevButtonClick={() => props.onClose()}
        />
      </FormProvider>
    </DialogModal>
  )
}
