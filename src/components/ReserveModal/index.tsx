// eslint-disable-next-line no-unused-vars
import 'date-fns';
// IMPORTS
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { UserContext } from '../../contexts/UserContext';
import { ButtonContext } from '../../contexts/ButtonsContext';
// COMPONENTS
import { DialogModal } from '../DialogModal';
import { Button } from '../Button';
import { ReserveFooter } from './ReserveFooter';
import { ReserveStepper } from './ReserveStepper';
import { LoginModal } from '../LoginModal';

// ACTIONS
import ReserveActions from '../../actions/Reserve.actions';
import ClientActions from '../../actions/Client.actions';
// TYPES
import { IReserve } from '../../types/Reserve.type';
import { IClient } from '../../types/Client.type';
// STYLES
import '../../styles/ArtExperienceButtons.scss';
import './ReserveModal.scss';
import '../../styles/theme.scss';
import ResultObject from '../../utils/ResultObject';

export const ReserveModal = (props: { className?: string }) => {
  // context
  const {
    // @ts-ignore
    userIsLogged,
    getUserData
  } = useContext(UserContext);
  const {
    // @ts-ignore
    disabled,
    setDisabledButton
  } = useContext(ButtonContext);

  // DATA
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
  const barbers = [
    {
      barberId: 1,
      userId: 1,
      name: "Mariano Moreno",
      job: "Profecional Barber",
      amountCuts: 2,
      clientsBarber: 5,//amountClients
      rateOfBarber: 0,//prestige
      amountOfReservesByDay: 10,//amountDailyReserves
      img:
        "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/81096072_209788046863421_8027631315464043835_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=tHUEjcHZ2UwAX9KqbzI&oh=1fe698f633765cf59bf8e671b6e91a0c&oe=5F2A13A1",
      instagram: "https://www.instagram.com/marianomoreno.11/",
      facebook: "https://www.facebook.com/mariano.moreno.5209000/"
    },
    {
      barberId: 2,
      userId: 2,
      name: "Pablo Merniz",// tengo que averiguar el appellido
      job: "Profecional Barber",
      amountCuts: 2,
      clientsBarber: 5,//amountClients
      rateOfBarber: 0,//prestige
      amountOfReservesByDay: 10,//amountDailyReserves
      img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/77094002_605862643493062_9053649117496349366_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=EL9qbeJc2QQAX8ZwTaZ&oh=acda434810cd3a8546c350c24dda8b7d&oe=5F283230",
      instagram: "https://www.instagram.com/mernis.01/",
      facebook: "https://www.facebook.com/TheUniqueDesign"
    }
  ];
  //
  const defaultBarber = {
    name: '',
    barberId: -1
  }
  const defaultClient: IClient = {
    cel: '',
    email: '',
    name: '',
    password: '',
    username: '',
    userId: -1
  }
  const defaultService = {
    name: '', cost: 0
  }

  // STATES
  const [showDialog, setShowDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [reserveHour, setReserveHour] = useState("");
  const [reserveDate, setReserveDate] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(defaultBarber);
  const [selectedService, setSelectedService] = useState(defaultService);
  const [wizard, setWizard] = useState(0);

  // ACTIONS
  const reserveActions = new ReserveActions();
  const clientActions = new ClientActions();

  // CREATE RESERVE
  const createReserve = async () => {
    const totalCost = 0; // Total cost lo calculo en el backend es al pedo que este aca
    const startDateFormatted = `${moment(reserveDate).format().split('T')[0]}T${reserveHour}:00`
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
    const createdReserve: any = await reserveActions.add(newReserve);
    setDisabledButton(false);

    if (createReserve) {
      setWizard(4);
      setTimeout(() => {
        // restart all steps of reserve_modal
        setSelectedService(defaultService);
        setSelectedBarber(defaultBarber);
        setReserveDate(new Date());
        setReserveHour("");
        setShowDialog(false);
        setWizard(0);
      }, 3000);
    }
  }

  const checkStep = () => {
    switch (wizard) {
      case 0:
        if (selectedService.name) {
          return true;
        }
        break;
      case 1:
        if (selectedBarber.name) {
          return true;
        }
        break;
      case 2:
        if (reserveDate && reserveHour) {
          return true;
        }
        break;
      case 3:
        return true;
        break;
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
            if (userIsLogged()) {
              setShowDialog(true)
            } else {
              setShowLoginDialog(true)
            }
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
          hideCloseButton={wizard == 4}
        >
          <ReserveStepper
            wizard={wizard}
            serviceStep={{
              services: services,
              selectedService: selectedService,
              setService: setSelectedService
            }}
            barberStep={{
              barbers: barbers,
              selectedBarber: selectedBarber,
              setBarber: setSelectedBarber
            }}
            timeStep={{
              reserveDate: reserveDate,
              reserveHour: reserveHour,
              setDate: setReserveDate,
              setHour: setReserveHour
            }}
          />
          {wizard != 4 ? ( // exception
            <ReserveFooter
              wizard={wizard}
              checkStep={checkStep}
              onChangeWizard={setWizard}
              finalize={createReserve}
            />
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
