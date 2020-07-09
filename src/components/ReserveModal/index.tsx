// eslint-disable-next-line no-unused-vars
import 'date-fns';
// IMPORTS
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import moment from 'moment';
// COMPONENTS
import { DialogModal } from '../DialogModal';
import { Button } from '../Button';
import { ReserveFooter } from './ReserveFooter';
import { ReserveStepper } from './ReserveStepper';

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


export const ReserveModal = (props: { className?: string }) => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }),
  );
  const classes = useStyles();

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
      name: "Pablo Mendez",// tengo que averiguar el appellido
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
  const defaultReserveFields = {
    reserveDate: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    barberName: '',
    services: []
  };

  // STATES
  const [showDialog, setShowDialog] = useState(false);
  const [reserveHour, setReserveHour] = useState("");
  const [reserveDate, setReserveDate] = useState(null);
  const [reserveFields, setReserveFields] = useState(defaultReserveFields);
  const [selectedBarber, setSelectedBarber] = useState(defaultBarber);
  const [clientCart, setClientCart] = useState([]);
  const [selectedService, setSelectedService] = useState({ name: '' });
  const [wizard, setWizard] = useState(0);
  // const [client, setClient] = useState(null);

  // ACTIONS
  const reserveActions = new ReserveActions();
  const clientActions = new ClientActions();

  const onChangeReserveFields = (fieldName: string, value: string) => {
    setReserveFields({ ...reserveFields, [fieldName]: value })
  }

  // CREATE RESERVE
  const createReserve = () => {
    let totalCost = 0;
    clientCart.forEach((item: any) => {
      totalCost += item.cost;
    });
    let startDateFormatted = `${moment(reserveDate).format().split('T')[0]}T${reserveHour}-03:00`
    let newReserve: IReserve = {
      clientId: -1,
      barberOrHairdresserId: selectedBarber.barberId,
      nameClient: reserveFields.clientName,
      mailClient: reserveFields.clientEmail,
      celClient: reserveFields.clientPhone,
      workTime: 30, // default work time
      startTime: startDateFormatted,
      endTime: '', // TODO
      priceWork: totalCost,
      workToDo: selectedService.name,
    }
    reserveActions.add(newReserve);
    // restart all steps of reserve_modal
    setReserveHour("");
    setReserveDate(new Date());
    setSelectedBarber(defaultBarber);
    setClientCart([]);
    setReserveFields(defaultReserveFields);
    setWizard(0);
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
        if (reserveFields.clientEmail && reserveFields.clientName && reserveFields.clientPhone) {
          const client = clientActions.get(reserveFields.clientEmail);
          if (client) {
            // get client info
            // setClient(client);
          } else {
            // create client 
            const clientData: IClient = {
              cel: reserveFields.clientPhone,
              email: reserveFields.clientEmail,
              name: reserveFields.clientName,
              password: '',
              username: '',
            }
            clientActions.add(clientData);
          }
          return true;
        }
        break;
      case 4:
        return true;
        break;
    }
    return false;
  }


  return (
    <div className="reserve-modal">
      <div className="dialog_activator-box" onClick={() => { setShowDialog(true) }}>
        <Button className={`activator-btn reserve-btn art_experience-button`} label={'Reservar Aqui'} />
      </div>
      {!showDialog ? null : (
        <DialogModal
          title="Reservacion - ArtExperience"
          className="dialog_modal"
          width='65vw'
          height='65vh'
          onClose={() => { setShowDialog(false) }}
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
            clientStep={{
              clientEmail: reserveFields.clientEmail,
              clientName: reserveFields.clientName,
              clientPhone: reserveFields.clientPhone,
              setReserveFields: onChangeReserveFields
            }}
          />
          <ReserveFooter
            wizard={wizard}
            checkStep={checkStep}
            onChangeWizard={setWizard}
            finalize={createReserve}
          />
        </DialogModal>
      )
      }
    </div>
  );
}