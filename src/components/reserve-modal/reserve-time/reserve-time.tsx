import React, { useEffect, useState, useContext } from 'react';
import { Button } from '../../button/button';
import { CalendarBox } from '../calendar-box/calendar-box';
import { ThemeContext } from '../../../contexts/ThemeContext';
//import { FirebaseContext } from '../../../contexts/FirebaseContext';
import AvailableTimeActions from '../../../actions/AvailableTime.actions';
import moment from 'moment';
import './reserve-time.scss';
import '../../../styles/effects.scss';
import '../../../styles/theme-buttons.scss';
import db from '../../../config/firebase';

export const ReserveTime = (props: {
  reserveDate: Date;
  reserveHour: string;
  selectedBarber: any;
  barberId: number;
  onSelctDate: any;
  onSelctHour: any;
}) => {
  // fecha actual para obtener la data si no hay fecha seleccionada
  const currentDate = moment(new Date()).format().toString().split('T')[0];

  // list of all reserves: [ date: string, hours: string[] ]
  const [reservesList, setReservesList] = useState([]);
  // hours in HoursBox
  const [availableHours, setAvailableHours] = useState([]);
  //const [listHours, setListHours] = useState([]);
  const [barberShopTime, setBarberShopTime] = useState([]);
  const [reserveDate, setReserveDate] = useState(undefined);
  const [reserveHour, setReserveHour] = useState(props.reserveHour || null);

  const [reserveTimes, setReservesTimes] = useState([]);

  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const timeActions: AvailableTimeActions = new AvailableTimeActions();

  const getHoursByBarberShop = async () => {
    let response = await timeActions.getBarberShopTime();
    return response;
  };

  const nameParcerFunction = (name: string) => {
    console.log(
      'GET firebase -> Nombre parseado: ',
      name.toLowerCase().replace(' ', '.')
    );
    return name.toLowerCase().replace(' ', '.');
  };

  useEffect(() => {
    getHoursByBarberShop().then((response: any) => {
      setBarberShopTime(response);
    });

    //* execute useEffect and charge dates and hours
    setReserveDate(props.reserveDate);
  }, []);

  useEffect(() => {
    const getReservesTimes = async () => {
      //* get firebase data
      return await getReservesHoursByReserves(
        nameParcerFunction(props.selectedBarber.name)
      );
    };

    //* Async functions promise resolve
    getReservesTimes();
  }, [reserveDate]);

  const getReservesHoursByReserves = async (barberName) => {
    try {
      //* Validate reserveTimes[] is not empty
      await getQuery(barberName);

      //* Esperando que se resuelva la promesa . . .');
      do {
        setTimeout(() => {}, 10000);
      } while (!reserveTimes);

      if (reserveTimes) {
        await filterTimesAndSetAvailables(reserveTimes);
      }
    } catch (error) {
      console.error(`Error: Obteniendo las reservas -> ${error}}`);
      return [];
    }
  };

  //* GET - Reserves Documents from Reserves - Firestore
  const getQuery = async (barberName) => {
    const resRef = await db
      .collection('reservas')
      .doc(nameParcerFunction(barberName))
      .collection('day_reserves');

    resRef
      .get()
      .then((snapshot) => {
        setReservesTimes(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((err) => console.error(err));
  };

  const filterTimesAndSetAvailables = (resultData: any) => {
    if (resultData) {
      console.log('First Result data: ', resultData);

      //* Nueva lista con fecha formateada
      let formattedDates: { date: string; times: string[] }[] = [];

      (resultData || []).map((item) => {
        let date: any = item.date;
        formattedDates.push({
          date: moment(new Date(date.toDate()).toUTCString())
            .format()
            .toString()
            .split('T')[0],
          times: item.times,
        });
      });

      // Seteamos la lista de reservas con la lista formateada.
      // console.log('Seteando ReserveList -> : ', formattedDates);
      setReservesList(formattedDates);
      if (reserveDate) {
        // Le asignamos las horas filtradas para este dia.
        let filterHours = onSelectDate(reserveDate);
        setAvailableHours(filterHours);
      }
    }
  };

  const onSelectDate = (selectedDate: Date) => {
    let formatSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
    setReserveDate(selectedDate);
    setReserveHour(undefined);
    props.onSelctHour(undefined);
    props.onSelctDate(selectedDate);

    //! Lista de horas ocupadas por dia.
    //* get busy hours by reserve date
    let listBusyHours = [];

    //! Por cada reserva encontrada mapeamos la lista de horas reservadas.
    reservesList.map((reserve: { date: string; times: string[] }) => {
      if (reserve.date === formatSelectedDate) {
        reserve.times.map((reserveHour: string) => {
          listBusyHours.push(reserveHour.substr(0, 5));
        });
      }
    });

    //* filter available hours by barberShop hours
    let availables = [];
    let actualHour = moment(new Date(), 'HH:mm:ss');
    let actualDate = moment(new Date()).format('YYYY-MM-DD');

    //! Lista de horas habilitadas por dia
    barberShopTime.map((barberShopHour) => {
      //* Validar si la hora habilitada esta dentro de las horas reservadas.
      //* Si esta dentro de la hora reservada y el dia seleccionado, filtramos.
      if (listBusyHours.indexOf(barberShopHour) === -1) {
        //* Validar si la fecha actual es igual a la fecha seleccionada
        if (actualDate === formatSelectedDate) {
          let formatBarberShopHour = moment(`${barberShopHour}:00`, 'HH:mm:ss');
          //* Validar si la hora habilitada es mayor o despues de la hora actual.
          if (formatBarberShopHour.isAfter(actualHour)) {
            //* Creamos la nueva lista de horas habilitadas.
            availables.push(barberShopHour);
          }
        } else {
          //* Sino esta dentro del dia actual, simplemento lo añadimos a la nueva lista de horas habilitadas de ese dia..
          availables.push(barberShopHour);
        }
      }
    });
    return availables;
  };

  const onSelectHour = (selectedHour: string) => {
    setReserveHour(selectedHour);
    props.onSelctHour(selectedHour);
  };

  return (
    <div className="time-box effect-slide_top">
      <CalendarBox value={reserveDate} onSelectDate={onSelectDate} />
      {availableHours.length ? (
        <div className="hours-box effect-slide_top">
          <div className="container">
            {availableHours.map((time, i) => (
              <Button
                className={`theme-button-outlined hour-item 
                ${reserveHour === time ? 'selected-hour' : null}`}
                key={i}
                label={time}
                onClick={() => {
                  onSelectHour(time);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className={`no-hours text text-${getTheme()}`}>
          No hay horarios disponibles para esta fecha
        </p>
      )}
    </div>
  );
};
