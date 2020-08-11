import React, { useContext, useState } from 'react';

import { BarbersList } from './BarbersList';
import { Button } from '../Button';
import { ButtonContext } from '../../contexts/ButtonsContext';
import { DialogModal } from '../DialogModal';
import { IReserve } from '../../types/Reserve.type';
import { LoginModal } from '../LoginModal';
import ReserveActions from '../../actions/Reserve.actions';
import { ReserveFooter } from './ReserveFooter';
import { ReserveTime } from './ReserveTime';
import { ServicesList } from './ServicesList';
import { Stepper } from '../Stepper';
import { UserContext } from '../../contexts/UserContext';
import { defaultBarber } from '../../types/Barber.type';
import { defaultService } from '../../types/Service.type';
import { FaRegCalendarCheck } from 'react-icons/fa';
import moment from 'moment';

import 'date-fns';
import './ReserveModal.scss';
import '../../styles/theme.scss';
import '../../styles/Effects.scss';
import '../../styles/ArtExperienceButtons.scss';

export const ReserveModal = (props: { className?: string }) => {
  const {
    // @ts-ignore
    userIsLogged,
    getUserData,
  } = useContext(UserContext);
  const {
    // @ts-ignore
    disabled,
    setDisabledButton
  } = useContext(ButtonContext);
  const services = [
    {
      workId: 1,
      name: "Degradé",
      img: "",
      cost: 280
    },
    {
      workId: 2,
      name: "Degrade & barba",
      img: "",
      cost: 350
    },
    {
      workId: 3,
      name: "Degrade & cejas",
      img: "",
      cost: 320
    },
    {
      workId: 4,
      name: "Black Mask",
      img: "",
      cost: 250
    },
    {
      workId: 5,
      name: "Cejas",
      img: "",
      cost: 50
    },
    {
      workId: 6,
      name: "Barba",
      img: "",
      cost: 100
    },
    {
      workId: 7,
      name: "Platinado",
      img: "",
      cost: 1450
    },
    {
      workId: 8,
      name: "Mechas rubias",
      img: "",
      cost: 1000
    },
    {
      workId: 9,
      name: "Mechas grises, blancas",
      img: "",
      cost: 1100
    },
    {
      workId: 10,
      name: "Colores fantasia",
      img: "",
      cost: 900
    },
    {
      workId: 10,
      name: "Franjas fantasia",
      img: "",
      cost: 700
    },
  ];
  const [showDialog, setShowDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [reserveHour, setReserveHour] = useState("");
  const [reserveDate, setReserveDate] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(defaultBarber);
  const [selectedService, setSelectedService] = useState(defaultService);
  const [wizard, setWizard] = useState(0);

  const reserveActions = new ReserveActions();

  const createReserve = async () => {
    const totalCost = 0;
    const startDateFormatted = `${moment(reserveDate).format().split('T')[0]}T${reserveHour}:00`;
    const newReserve: IReserve = {
      barberOrHairdresserId: selectedBarber.barberId,
      clientId: getUserData().clientId,
      nameClient: getUserData().name,
      mailClient: getUserData().email,
      celClient: getUserData().cel,
      startTime: startDateFormatted,
      priceWork: selectedService.cost,
      workToDo: selectedService.name,
    }
    setDisabledButton(true);
    const response: any = await reserveActions.add(newReserve);
    if (response) {
      setWizard(4);
      setTimeout(() => { // restart all steps of reserve_modal
        setSelectedService(defaultService);
        setSelectedBarber(defaultBarber);
        setReserveDate(new Date());
        setReserveHour("");
        setShowDialog(false);
        setWizard(0);
      }, 3000);
    }
    setDisabledButton(false);
  }

  const checkStep = () => {
    switch (wizard) {
      case 0:
        return selectedService.name ? true : false;
      case 1:
        return selectedBarber.name ? true : false;
      case 2:
        return (reserveDate && reserveHour) ? true : false;
      case 3:
        return true;
    }
    return false;
  }

  const goToReserve = () => {
    setShowLoginDialog(false)
    setShowDialog(true)
  }

  return (
    <div className="reserve-modal">

      <div className="dialog_activator-box">
        <Button
          onClick={() => {
            userIsLogged() ? setShowDialog(true) : setShowLoginDialog(true);
          }}
          className={`activator-btn reserve-btn art_experience-button_outlined`}
          label={'Reservar'} />
      </div>

      {!showDialog ? null : (
        <DialogModal
          title="Reservacion - ArtExperience"
          className="dialog_modal"
          width='65vw'
          height='65vh'
          onClose={() => { setShowDialog(false) }}
          hideCloseButton={wizard == 4}>
          <Stepper wizard={wizard}>
            <div className="reserve-step">
              <div className="step-title">
                <p>Seleccione el servicio que se desea realizar</p>
              </div>
              <ServicesList
                services={services}
                value={selectedService}
                setService={setSelectedService} />
            </div>

            <div className="reserve-step">
              <div className="step-title">
                <p>Seleccione el Barbero</p>
              </div>
              <BarbersList
                value={selectedBarber}
                setBarber={setSelectedBarber} />
            </div>

            <div className="reserve-step">
              <div className="step-title">
                <p>Seleccione el Barbero</p>
              </div>
              <ReserveTime
                reserveDate={reserveDate}
                reserveHour={reserveHour}
                onSelctDate={setReserveDate}
                onSelctHour={setReserveHour} />
            </div>

            <div className="reserve-step">
              <div className="step-title">
                <p>Confirmacion de reserva</p>
              </div>
              <div className="confirm_data-box">
                <p className="confirm_info effect-slide_left">
                  {`Fecha de reservacion: ${moment(reserveDate).format("DD/MM/YYYY")}`}
                </p>
                <p className="confirm_info">{`Nombre del cliente: ${getUserData().username}`}</p>
                <p className="confirm_info">{`Celular/Telefono del cliente: ${getUserData().cel}`}</p>
                <p className="confirm_info">{`Email del cliente: ${getUserData().email}`}</p>
                <p className="confirm_info">{`Servicio: ${selectedService ? selectedService.name : 'No se selecciono servicio'}`}</p>
                <p className="confirm_info">{`Barbero: ${selectedBarber ? selectedBarber.name : ''}`}</p>
                <p className="confirm_info">{`Horario: ${reserveHour}`}</p>
                <p className="confirm_info">{`Costo: ${selectedService ? `$${selectedService.cost}` : 'No se selecciono servicio'}`}</p>
              </div>
            </div>
            <div className="reserve-step">
              <div className="step-title">
                <p>Reservacion - ArtExperience</p>
              </div>
              <div className="confirm_data-box">
                <p className="confirm_info">Se ha realizado la reserva de forma exitosa!</p>
                <FaRegCalendarCheck className="success-icon effect-slide_top" />
              </div>
            </div>
          </Stepper>
          {wizard != 4 ? (
            <ReserveFooter
              wizard={wizard}
              checkStep={checkStep}
              onChangeWizard={setWizard}
              finalize={createReserve} />
          ) : null}
        </DialogModal>
      )
      }
      {showLoginDialog ? (
        <LoginModal
          show={true}
          onClose={setShowLoginDialog}
          onSuccessLogin={goToReserve} />
      ) : null}
    </div>
  );
}
