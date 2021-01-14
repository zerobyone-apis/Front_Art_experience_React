import React, { useContext, useState } from 'react';
import { DialogModal } from '../../../../dialogs/dialog-modal/dialog-modal';
import { IReserve } from '../../../../../types/Reserve.type';
import { ButtonContext } from '../../../../../contexts/ButtonsContext';
import { StepperFooter } from '../../../../containers/stepper/stepper-footer';
import { MANAGER_FIELDLS } from './manager-form';
import { FormProvider } from '../../../../../contexts/FormContext';
import { FaCalendarCheck } from 'react-icons/fa';
import { MdArrowBack, MdSearch } from 'react-icons/md';
import { Step } from '../../../../containers/stepper/step';
import { FormBox } from '../../../../containers/form-box';
import { Textfield } from '../../../../inputs/text-field/text-field';
import { SelectField } from '../../../../inputs/select-field/select-field';
import { TimeStep } from '../../../../dialogs/reserve-dialog/time-step';
import ReserveActions from '../../../../../actions/Reserve.actions';
import moment from 'moment';
import './manager-dialog.scss';
import { IBarber } from '../../../../../types/Barber.type';
import { BarberListContext } from '../../../../../contexts/BarberListContext';
import { Button } from '../../../../inputs/button';
import { ServiceStep } from '../../../../dialogs/reserve-dialog/service-step';
import { services } from '../../../../../data/reserve';
import { IService } from '../../../../../types/Service.type';
import { Text } from '../../../../decorators/text';


export const ManagerDialog = (props: {
  reserve: IReserve,
  onClose: any,
  // onSaveRefresh: () => any

  //* Deprecated:
  //? onFinalized?: () => any,
  //? onCancelled?: () => any,
  onUpdated?: (updated) => any,
}) => {

  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [selectedService, setSelectedService] = useState({ name: '', cost: 0 });
  // const [showTimeDialog, setShowTimeDialog] = useState(false);
  // const [reserve, setReserve] = useState(props.reserve);
  // const [barber, setBarber] = useState(props.barber);

  // New instance actions 
  //TODO: En un futuro por mas control de instancias deberiamos de tener nuestro archivo de instancias 
  //TODO: para darle vida a una unica instancia y poder utilizarla donde sea necesario. -> Singleton Pattern
  const reserveActions: ReserveActions = new ReserveActions();



  const {
    setDisabledButton,
  } = useContext(ButtonContext);

  const {
    getBarbersList
  } = useContext(BarberListContext);

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

  const ClientForm = () => {
    return (
      <FormBox>
        <Textfield
          name={MANAGER_FIELDLS.nameClient}
          defaultvalue={props.reserve.nameClient}
          disabled={true}
          label="Nombre"
          type="text"
        />
        <Textfield
          name={MANAGER_FIELDLS.mailClient}
          defaultvalue={props.reserve.mailClient}
          disabled={true}
          label="Email"
          type="email"
        />
        <Textfield
          name={MANAGER_FIELDLS.celClient}
          defaultvalue={props.reserve.celClient}
          label="Cel"
          type="number"
        />
      </FormBox>
    )
  }

  const ServiceForm = () => {
    return (
      <FormBox>
        <SelectField
          name={MANAGER_FIELDLS.workToDo}
          defaultvalue={selectedService.name || props.reserve.workToDo}
          label="Servicio"
          type="text"
          items={services}
          onChange={(res) => setSelectedService(res)}
          selectBy="name"
        />
        <Textfield
          name={MANAGER_FIELDLS.totalCost}
          defaultvalue={selectedService.cost || props.reserve.totalCost}
          label="Costo Total"
          type="number"
        />
      </FormBox>
    )
  }

  const getServiceByName = (nameService) => {
    console.log(nameService)
    let service = null;

    services.forEach((item: IService) => {
      if (item.name === nameService) {
        service = item;
      }
    })

    return service;
  }

  const ReserveForm = () => {
    return (
      <FormBox>
        <Textfield
          name={MANAGER_FIELDLS.barberName}
          defaultvalue={props.reserve.barberName}
          label="Barbero"
          type="string"
        />
        <Textfield
          name={MANAGER_FIELDLS.startTimeFront}
          defaultvalue={props.reserve.startTimeFront}
          label="Fecha y Hora"
          type="text"
        />
      </FormBox>
    )
  }

  return (
    <>
      <DialogModal
        title="Edición de Reserva"
        onClose={props.onClose}
        className="manager-dialog"
      >
        <FormProvider currentForm={MANAGER_FIELDLS}>
          <div className="content-manager">
            <Step subtitle="Datos del cliente">
              {ClientForm()}
            </Step>
            <Step subtitle="Datos del servicio">
              {ServiceForm()}
            </Step>
            <Step subtitle="Datos de la reserva">
              {ReserveForm()}
            </Step>
          </div>
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

      {
        showServiceDialog &&
        <DialogModal
          width="500px"
          height="640px"
          title="Seleccion de servicio"
          onClose={() => setShowServiceDialog(false)}
          className="manager-dialog"
        >
          <ServiceStep
            value={getServiceByName(props.reserve.workToDo)}
            services={services}
            setService={(res) => {
              setSelectedService(res);
              setShowServiceDialog(false)
            }} />
        </DialogModal>
      }




      {/* {
        true &&
        <DialogModal
          title="Seleccion de fecha"
          onClose={() => setShowServiceDialog(false)}
          className="manager-dialog"
        >
          <TimeStep
            selectedBarber={props.barber}
            barberId={reserve.barberOrHairdresserId} // TODO CHANGE THE NAME OF THIS

            onSelctDate={() => { }}
            onSelctHour={() => { }}
            reserveDate={moment(reserve.startTime).toDate()}
            reserveHour={moment(reserve.startTime).format('HH:mm:ss')}

          />
        </DialogModal>
      } */}
    </>
  )
}
