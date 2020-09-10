import React, { useContext, useState } from 'react';

import { BarbersList } from './barbers-list/barber-list';
import { Button } from '../button/button';
import { ButtonContext } from '../../contexts/ButtonsContext';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { IReserve } from '../../types/Reserve.type';
import { LoginModal } from '../login-modal/login-modal';
import { ReserveFooter } from './reserve-footer/reserve-footer';
import { ReserveTime } from './reserve-time/reserve-time';
import { ServicesList } from './services-list/services-list';
import { Stepper } from '../stepper/stepper';
import { UserContext } from '../../contexts/UserContext';
import { defaultBarber } from '../../types/Barber.type';
import { defaultService } from '../../types/Service.type';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ConfirmBox } from './confirm-box/confirm-box';
import ReserveActions from '../../actions/Reserve.actions';
import moment, { now } from 'moment';
import db from '../../config/firebase';
import firebase from 'firebase';

import 'date-fns';
import './reserve-modal.scss';
import '../../styles/theme.scss';
import '../../styles/theme-buttons.scss';
import '../../styles/effects.scss';
import { stringify } from 'querystring';

export const ReserveModal = (props: { className?: string }) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  const {
    // @ts-ignore
    userIsLogged,
    getUserData,
  } = useContext(UserContext);
  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);
  const services = [
    {
      workId: 1,
      name: 'Degradé',
      img: '',
      cost: 280,
    },
    {
      workId: 2,
      name: 'Degrade & barba',
      img: '',
      cost: 350,
    },
    {
      workId: 3,
      name: 'Degrade & cejas',
      img: '',
      cost: 320,
    },
    {
      workId: 4,
      name: 'Black Mask',
      img: '',
      cost: 250,
    },
    {
      workId: 5,
      name: 'Cejas',
      img: '',
      cost: 50,
    },
    {
      workId: 6,
      name: 'Barba',
      img: '',
      cost: 100,
    },
    {
      workId: 7,
      name: 'Platinado',
      img: '',
      cost: 1450,
    },
    {
      workId: 8,
      name: 'Mechas rubias',
      img: '',
      cost: 1000,
    },
    {
      workId: 9,
      name: 'Mechas grises, blancas',
      img: '',
      cost: 1100,
    },
    {
      workId: 10,
      name: 'Colores fantasia',
      img: '',
      cost: 900,
    },
    {
      workId: 10,
      name: 'Franjas fantasia',
      img: '',
      cost: 700,
    },
  ];
  const [showDialog, setShowDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [reserveHour, setReserveHour] = useState('');
  const [reserveDate, setReserveDate] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(defaultBarber);
  const [selectedService, setSelectedService] = useState(defaultService);
  const [wizard, setWizard] = useState(0);

  const [reservesTimes, setReservesTimes] = useState([]);
  const [reservesIds, setReservesIds] = useState([]);
  const [docs, setDocs] = useState([]);

  const reserveActions = new ReserveActions();

  const dayReserves = [];

  const createReserve = async () => {
    const totalCost = 0;
    const startDateFormatted = `${
      moment(reserveDate).format().split('T')[0]
    }T${reserveHour}:00`;
    const newReserve: IReserve = {
      barberOrHairdresserId: selectedBarber.barberId,
      clientId: getUserData().userId,
      nameClient: getUserData().username,
      mailClient: getUserData().email,
      celClient: getUserData().cel || '0000',
      startTime: startDateFormatted,
      priceWork: selectedService.cost,
      workToDo: selectedService.name,
    };

    setDisabledButton(true);
    const response: any = await reserveActions.add(newReserve);

    if (response) {
      // !  Firebase POST
      // !  ---------------
      createReserveTimeOnFirebase(selectedBarber.name, startDateFormatted);
      // !  ---------------

      setWizard(4);
      setTimeout(() => {
        // restart all steps of reserve_modal
        setSelectedService(defaultService);
        setSelectedBarber(defaultBarber);
        setReserveDate(new Date());
        setReserveHour('');
        setShowDialog(false);
        setWizard(0);
      }, 3000);
    }
    setDisabledButton(false);
  };

  // TODO: post firebase RESERVE
  const createReserveTimeOnFirebase = (barberName, reserveTime) => {
    try {
      let updateReserve;
      let currentDate = moment(new Date().toUTCString())
        .format()
        .toString()
        .split('T')[0];
      let existingDate;

      //? Create new Array of times and add the reserve time.
      let newTimes = [];
      newTimes.push(reserveTime);

      //? Validate if already exist reserves in the current date.
      //TODO: I need to check this method, now is not getting data.
      db.collection('reservas')
        .doc(nameParcerFunction(barberName))
        .collection('day_reserves')
        .onSnapshot((snapshot) => {
          setReservesTimes(snapshot.docs.map((doc) => doc.data()));
          setReservesIds(snapshot.docs.map((doc) => doc.id));
          //setDocs(snapshot.docs.map((doc) => doc));
        });

      console.log('Reserves ids -> ', reservesIds);
      console.log('Reserves Date & Times -> ', reservesTimes);
      //console.log('Docs -> ', docs);

      let resultData: {
        id: string;
        date: { seconds: number; nanoseconds: number };
        times: string[];
      }[] = reservesTimes;

      if (resultData != []) {
        console.log('paso del post -> ', resultData);
        for (const res of resultData) {
          // TODO crear logica de asignacion de ID por Documento, hasta averiguar como setearlo en le mismo objeto.
          // TODO Cada documento debe tener su propio ID correcto,
          // TODO para actualizarlo en caso de que sea el mismo dia que se este Reservando.

          reservesIds.forEach((id) => {
            res.id = id;
          });

          console.log('Item res date -> ', res.date);
          console.log('Item res id -> ', res.id);
          console.log('Item res Times -> ', res.times);
        }

        /*  if (res.id) {
            existingDate = moment(new Date(reserveDate.toDate()).toUTCString())
              .format()
              .toString()
              .split('T')[0];
            console.log('Si existe ID element -> ', res.id);
            console.log('Si existe ID element -> ', res.data());

            console.log('ExistingDate -> ', existingDate);
            console.log(
              'Firebase date -> ',
              firebase.firestore.FieldValue.serverTimestamp()
            );
            console.log('Current Date -> ', currentDate);
            console.log('Item Reserve Date -> ', res.data.date);

            let date = moment(new Date(res.data.date.toDate()).toUTCString())
              .format()
              .toString()
              .split('T')[0];

            let times = res.data.times;

            if (date === currentDate || existingDate === date) {
              newTimes.concat(times);
              updateReserve = {
                date: firebase.firestore.FieldValue.serverTimestamp(),
                times: newTimes,
              };
              console.log(
                `Este es el objeto actualizado para guardar en firebase -> ${updateReserve}`
              );

              db.collection('reserves')
                .doc(nameParcerFunction(barberName))
                .collection('day_reserves')
                .doc(res.id)
                .update(updateReserve);
            }
          }
        } );*/
      } else {
        //? Create new Day Reserve
        db.collection('reserves')
          .doc(nameParcerFunction(barberName))
          .collection('day_reserves')
          .add({
            date: firebase.firestore.FieldValue.serverTimestamp(),
            times: newTimes,
          });
      }
    } catch (error) {
      console.error(
        `Error: Creando o Actualizando Firebase Reserve. -> ${error}`
      );
    }
  };

  const bulkDataReserves = (doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  };

  //? PARCING NAME TO MATCH WITH THE DATABASE NAMES DOCUMENTS
  const nameParcerFunction = (name: string) => {
    console.log(
      'POST firebase -> Nombre pareseado: ',
      name.toLowerCase().replace(' ', '.')
    );
    return name.toLowerCase().replace(' ', '.');
  };

  const checkStep = () => {
    switch (wizard) {
      case 0:
        return selectedService.name ? true : false;
      case 1:
        return selectedBarber.name ? true : false;
      case 2:
        return reserveDate && reserveHour ? true : false;
      case 3:
        return true;
    }
    return false;
  };

  const goToReserve = () => {
    setShowLoginDialog(false);
    setShowDialog(true);
  };

  return (
    <div className="reserve-modal">
      <div className="dialog_activator-box">
        <Button
          className={`activator-btn reserve-btn theme-button`}
          label="Reservar"
          icon={false}
          onClick={() => {
            userIsLogged() ? setShowDialog(true) : setShowLoginDialog(true);
          }}
        />
      </div>
      {!showDialog ? null : (
        <DialogModal
          title="Reservacion - ArtExperience"
          className="dialog_modal"
          width="65vw"
          height="65vh"
          onClose={() => {
            setShowDialog(false);
          }}
          hideCloseButton={wizard == 4}
        >
          <Stepper className="reserve-stepper" wizard={wizard}>
            <div className="reserve-step">
              <div className="step-title">
                <p className={`step-subtitle text text-${getTheme()}`}>
                  Seleccione el servicio que se desea realizar
                </p>
              </div>
              <ServicesList
                services={services}
                value={selectedService}
                setService={setSelectedService}
              />
            </div>
            <div className="reserve-step">
              <div className="step-title">
                <p className={`step-subtitle text text-${getTheme()}`}>
                  Seleccione el Barbero
                </p>
              </div>
              <BarbersList
                value={selectedBarber}
                setBarber={setSelectedBarber}
              />
            </div>
            <div className="reserve-step">
              <div className="step-title">
                <p className={`step-subtitle text text-${getTheme()}`}>
                  Seleccione la fecha y hora
                </p>
              </div>
              <ReserveTime
                reserveDate={reserveDate}
                reserveHour={reserveHour}
                barberId={selectedBarber.barberId || -1}
                selectedBarber={selectedBarber || {}}
                onSelctDate={setReserveDate}
                onSelctHour={setReserveHour}
              />
            </div>
            <div className="reserve-step">
              <div className="step-title">
                <p className={`step-subtitle text text-${getTheme()}`}>
                  Confirmacion de reserva
                </p>
              </div>
              <ConfirmBox
                barber={selectedBarber}
                service={selectedService}
                hour={reserveHour}
                date={moment(reserveDate).format('DD/MM/YYYY')}
              />
            </div>
            {/* Success reservation message  */}
            <div className="reserve-step">
              <div className="step-title">
                <p className={`step-subtitle text text-${getTheme()}`}>
                  Reservacion - ArtExperience
                </p>
              </div>
              <div className="confirm_data-box">
                <p className={`confirm_info text text-${getTheme()}`}>
                  Se ha realizado la reserva de forma exitosa!
                </p>
                <FaRegCalendarCheck className="success-icon effect-slide_top" />
              </div>
            </div>
          </Stepper>
          {wizard != 4 ? (
            <ReserveFooter
              wizard={wizard}
              checkStep={checkStep}
              onChangeWizard={setWizard}
              finalize={createReserve}
            />
          ) : null}
        </DialogModal>
      )}
      {showLoginDialog ? (
        <LoginModal
          show={true}
          onClose={setShowLoginDialog}
          onSuccessLogin={goToReserve}
        />
      ) : null}
    </div>
  );
};
