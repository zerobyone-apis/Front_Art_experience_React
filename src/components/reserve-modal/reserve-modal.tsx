import React, { useContext, useState, useEffect } from 'react';

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
import { ErrorMessage } from 'formik';

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

  //* Firebase Reference to list of Docs.
  const [docs, setDocs] = useState([]);

  const reserveActions = new ReserveActions();

  const createReserve = async () => {
    const startDateFormatted = `${
      moment(reserveDate).format().split('T')[0]
    }T${reserveHour}:00`;
    const newReserve: IReserve = {
      barberOrHairdresserId: selectedBarber.barberId,
      clientId: getUserData().clientId,
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
      //* Post & Put Firebase.
      createReserveTimeOnFirebase(selectedBarber.name, startDateFormatted);

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

  //* Post & Put Firebase.
  const createReserveTimeOnFirebase = (barberName, reserveTime) => {
    try {
      let updateReserve;
      let selectedReserveDate;

      //? Create new Times Array and add the reserve time.
      let newTimes = [];
      newTimes.push(
        moment(reserveTime).format().toString().split('T')[1].substr(0, 5)
      );

      //? Flag to validate when is an update or when is a create.
      let stapppToReadFlag = false;

      //? Validate if already exist reserves in the current date.
      console.log('Getting Reserves . . 1 ');
      getReservesFirebase(barberName);

      if (docs.length <= 0) {
        console.log('Getting Reserves. . 2');
        getReservesFirebase(barberName);
      }

      //? Defining and parsing -> selectedReserveDate
      selectedReserveDate = moment(reserveDate.toUTCString())
        .format()
        .toString()
        .split('T')[0];

      //? Getting data from the Array State
      let resultData: {
        id: string;
        date: any;
        times: string[];
      }[] = docs;

      //? Parcing Result Data
      let fullParsedResultData = resultData.map((data) => {
        return {
          id: data.id,
          date: moment(data.date.toDate().toUTCString())
            .format()
            .toString()
            .split('T')[0],
          times: data.times,
        };
      });

      if (fullParsedResultData != []) {
        for (const res of fullParsedResultData) {
          if (res.id) {
            //? Fecha de reserva parseada
            //console.log('Selected Reserve Date -> ', selectedReserveDate);

            //? ID Del dia a reservar
            //console.log('Doc item ID -> ', res.id);

            //? Fecha del dia a reservar parseado
            let resExistDate = res.date;
            //console.log('Doc item date -> ', res.date);

            if (selectedReserveDate === resExistDate) {
              // Validate Dates:
              console.log('Selected Date -> ', selectedReserveDate);
              console.log('Item check Date -> ', res.date);

              newTimes.push(...res.times);
              updateReserve = {
                date: reserveDate,
                times: newTimes,
              };

              //? PUT - Actualizar document de reserva dado a que hay reservas para este dia
              console.log('PUT - Update!');

              db.collection('reservas')
                .doc(nameParcerFunction(barberName))
                .collection('day_reserves')
                .doc(res.id)
                .set(updateReserve);

              //? Flag para controlar y validar si encontro un doc o crea uno nuevo.
              stapppToReadFlag = true;
            }
          }
        }
      }

      //TODO: Revisar validacion de PUT o POST debido a que la primera vez que va a reservar
      //TODO: Elimina todo el documento reemplazando las horas de las reservas por la ultima que se reservo.

      if (stapppToReadFlag === false) {
        //? POST - Crear nueva reserva dado a que no hay ninguna para este dia aún
        console.log('POST - New!');

        db.collection('reservas')
          .doc(nameParcerFunction(barberName))
          .collection('day_reserves')
          .doc(selectedReserveDate)
          .set({
            date: reserveDate,
            times: newTimes,
          });
        console.log('Created Reserve Successfuly!!');
      }
    } catch (error) {
      console.error(
        `Error: Creando o Actualizando Firebase Reserve. -> ${error}`
      );
    }
  };

  //* Parce Method - Name convention for firestore docs.
  const nameParcerFunction = (name: string) => {
    let parsedName = name.toLowerCase().replace(' ', '.');
    console.log('POST firestore -> Nombre pareseado: ', parsedName);
    return parsedName;
  };

  //* Query Method - GET Firestore Reserves
  const getReservesFirebase = (barberName) => {
    const resRef = db
      .collection('reservas')
      .doc(nameParcerFunction(barberName))
      .collection('day_reserves');

    resRef
      .get()
      .then((snapshot) => {
        setDocs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => console.error(err));

    // db.collection('reservas')
    //   .doc(nameParcerFunction(barberName))
    //   .collection('day_reserves')
    //   .onSnapshot((snapshot) => {
    //     setDocs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   });
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
