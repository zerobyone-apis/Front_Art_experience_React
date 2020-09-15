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
import { IBarber } from '../../../types/Barber.type';
import db from '../../../config/firebase';

export const ReserveTime = (props: {
  reserveDate: Date;
  reserveHour: string;
  selectedBarber: any;
  barberId: number;
  onSelctDate: any;
  onSelctHour: any;
}) => {
  // list of all reserves: [ date: string, hours: string[] ]
  const [reservesList, setReservesList] = useState([]);
  // hours in HoursBox
  const [availableHours, setAvailableHours] = useState([]);
  const [listHours, setListHours] = useState([]);
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
    // execute useEffect and charge dates and hours
    setReserveDate(props.reserveDate);
  }, []);

  const getReservesHoursByReseres = (barberName) => {
    try {
      // Validate reserveTimes not empty
      getQuery(barberName);
      setInterval(() => {
        if (reserveTimes.length === 0) {
          getQuery(barberName);
        }
      }, 2000);
    } catch (error) {
      console.error(`Error: Obteniendo las reservas -> ${error}}`);
      return [];
    }
  };

  const getQuery = (barberName) => {
    db.collection('reservas')
      .doc(barberName)
      .collection('day_reserves')
      .orderBy('date', 'asc')
      .onSnapshot((snapshot) => {
        setReservesTimes(snapshot.docs.map((doc) => doc.data()));
      });
  };

  useEffect(() => {
    // get firebase data
    getReservesHoursByReseres(nameParcerFunction(props.selectedBarber.name));

    let resultData: {
      date: { seconds: number; nanoseconds: number };
      times: string[];
    }[] = reserveTimes;

    console.log('get result data: ', resultData);

    let formattedDates: { date: string; times: string[] }[] = [];

    (resultData || []).map((item) => {
      // console.log('Este la item ', item);
      let date: any = item.date;
      formattedDates.push({
        date: moment(new Date(date.toDate()).toUTCString())
          .format()
          .toString()
          .split('T')[0],
        times: item.times,
      });
    });

    setReservesList(formattedDates);
    console.log('data para reserve-time: ', formattedDates);
    if (reserveDate) {
      let filterHours = onSelectDate(reserveDate);
      setAvailableHours(filterHours);
    }
  }, [reserveDate]);

  useEffect(() => {
    setListHours(availableHours);
  }, [availableHours]);

  const onSelectDate = (selectedDate: Date) => {
    let formatSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
    setReserveDate(selectedDate);
    setReserveHour(undefined);
    props.onSelctHour(undefined);
    props.onSelctDate(selectedDate);
    let listBusyHours = [];
    // get busy hours by reserve date
    reservesList.map((reserve: { date: string; times: string[] }) => {
      if (reserve.date === formatSelectedDate) {
        reserve.times.map((reserveHour: string) => {
          listBusyHours.push(reserveHour.substr(0, 5));
        });
      }
    });
    // filter available hours by barberShop hours
    let availables = [];
    let actualHour = moment(new Date(), 'HH:mm:ss');
    let actualDate = moment(new Date()).format('YYYY-MM-DD');
    barberShopTime.map((barberShopHour) => {
      if (listBusyHours.indexOf(barberShopHour) === -1) {
        // check if is after barbershop hour to actual hour if is the actual date
        if (actualDate === formatSelectedDate) {
          let formatBarberShopHour = moment(`${barberShopHour}:00`, 'HH:mm:ss');
          if (formatBarberShopHour.isAfter(actualHour)) {
            availables.push(barberShopHour);
          }
        } else {
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
        <div className="hours-item">
          <div className="hours-box effect-slide_top">
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
