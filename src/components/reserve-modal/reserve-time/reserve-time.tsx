import React, { useEffect, useState, useContext } from 'react';
import { Button } from '../../button/button';
import AvailableTimeActions from '../../../actions/AvailableTime.actions';
import { CalendarBox } from '../calendar-box/calendar-box';
import { HourBox } from '../hour-box/hour-box';
import moment from 'moment';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './reserve-time.scss';
import '../../../styles/effects.scss';
import '../../../styles/theme-buttons.scss';
import db from '../../../config/firebase';

export const ReserveTime = (props: {
  reserveDate: Date;
  reserveHour: string;
  barberId: number;
  onSelctDate: any;
  onSelctHour: any;
}) => {
  var flag = false;
  // list of all reserves: [ date: string, hours: string[] ]
  const [reservesList, setReservesList] = useState([]);
  // hours in HoursBox
  const [availableHours, setAvailableHours] = useState([]);
  const [listHours, setListHours] = useState([]);
  const [barberShopTime, setBarberShopTime] = useState([]);
  const [reserveDate, setReserveDate] = useState(undefined);
  const [reserveHour, setReserveHour] = useState(props.reserveHour || null);

  //? States firebase
  const [reservesDatesFirebase, setReservesDatesFirebase] = useState([]);
  const [reservesHoursFirebase, setReservesHoursFirebase] = useState([]);
  const [firebaseObj, setFirebaseObj] = useState([]);

  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const timeActions: AvailableTimeActions = new AvailableTimeActions();

  //This is not necessary anymore
  const getHoursByBarberShop = async () => {
    let response = await timeActions.getBarberShopTime();
    return response;
  };

  //? From firebase datahook Realtime
  const getHoursByBarberShopUsingFirebase = (barberName) => {
    // How we are having the realtime database we can use
    // this method directly to check the db under the hook 'useEffect()'
    let response = timeActions.getDatesByReservesFirebase(barberName);
    console.log('Objeto response', response);
    setFirebaseObj(response);
    setBarberShopTime(response);


    
    console.log('doctimes > ', ((reserve: { date: string; times: string[] }) => reserve.date.valueOf()))
    
    
    response.map(doc => console.log('docdate > ',doc.date))
    //Set the list of hours from firebase
    
    //TODO: Estos hooks aun no se setean con los valores
    //TODO: hay que Averiguar como lograr setearlos para 
    //TODO: poder setear el estado de horas y mostrar los componentes  
    setReservesHoursFirebase(
      response.map((reserve: { date: string; times: string[] }) => {
        console.log('this is the doc date ', reserve.date);
        console.log('this is the reserve time ', reserve.times);

        let times = reserve.times;
        if (times) {
          console.log(
            'this is the times ->',
            times
          );
          return times;
        }
      })
    );

    //Set the list of dates from firebase
    setReservesDatesFirebase(
      response.map((reserve: { date: string; times: string[] }) => {
        console.log('this is the doc date ', reserve.date);
        console.log('this is the reserve time ', reserve.times);

        let date = reserve.date;
        if (date) {
          console.log(
            'this is the date ->',
            new Date(date).toUTCString()
          );
          return new Date(date).toUTCString();
        }
      })
    );


    console.log('response firebase Obj -> ', firebaseObj);
    console.log('response barberShopTime -> ', barberShopTime);
    console.log('response reserves dates -> ', reservesDatesFirebase);
    console.log('response reserves hours-> ', reservesHoursFirebase);
  };

  //This is not necessary anymore
  const getDatesByReserves = async () => {
    let response = await timeActions.getDatesByReserves(props.barberId);
    return response;
  };

  //useEffect firebase
  useEffect(() => {
    //? Suponiendo como funca aca deberias tener un arreglo de objetos y se lo seteas
    //? a barberShopTime
    //? getHoursByBarberShop().then((response: any) => { setBarberShopTime(response) })
    getHoursByBarberShopUsingFirebase('mariano.moreno');
    getDatesByReserves()
      .then((response: any) => {
        setReservesList(response);
      })
      .then((result) => {
        setReserveDate(props.reserveDate);
      });
  }, []);

  useEffect(() => {
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
    reservesList.map((reserve: { date: string; hours: string[] }) => {
      if (reserve.date === formatSelectedDate) {
        reserve.hours.map((reserveHour: string) => {
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

  const onSelectDateUsingFirebase = (selectedDate: Date) => {
    let formatSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
    setReserveDate(selectedDate);
    setReserveHour(undefined);
    props.onSelctHour(undefined);
    props.onSelctDate(selectedDate);
    let listBusyHours = [];
    // get busy hours by reserve date
    firebaseObj.map((reserve: { date: string; times: string[] }) => {
      if (reserve.date === formatSelectedDate) {
        reserve.times.map((reserveHour: string) => {
          console.log('Time format -> ', reserveHour);
          listBusyHours.push(reserveHour);
        });
      }
    });

    // filter available hours by barberShop hours
    let availables = [];
    let actualHour = moment(new Date(), 'HH:mm:ss');
    let actualDate = moment(new Date()).format('YYYY-MM-DD');
    firebaseObj.map((reserve: { date: string; times: string[] }) => {
      if (listBusyHours.indexOf(reserve.times) === -1) {
        // check if is after barbershop hour to actual hour if is the actual date
        if (actualDate === formatSelectedDate) {
          let formatBarberShopHour = moment(`${reserve.times}:00`, 'HH:mm:ss');
          if (formatTimes.isAfter(actualHour)) {
            availables.push(reserve.times);
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
      {/* <p>{`hora: ${reserveHour}`}</p>
            <p>{`fecha: ${reserveDate}`}</p> */}
      <CalendarBox value={reserveDate} onSelectDate={onSelectDate} />
      {availableHours.length ? (
        <div className="hours-item">
          <div className="hours-box effect-slide_top">
            {availableHours.map((hour, i) => (
              <Button
                className={`theme-button-outlined 
                                 hour-item 
                                ${
                                  reserveHour === hour ? 'selected-hour' : null
                                }`}
                key={i}
                label={hour}
                onClick={() => {
                  onSelectHour(hour);
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
