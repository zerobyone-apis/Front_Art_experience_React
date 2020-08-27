import React, { useEffect, useState, useContext } from 'react';
import { Button } from '../../button/button';
import { CalendarBox } from '../calendar-box/calendar-box';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FirebaseContext } from '../../../contexts/FirebaseContext';
import AvailableTimeActions from '../../../actions/AvailableTime.actions';
import moment from 'moment';
import './reserve-time.scss';
import '../../../styles/effects.scss';
import '../../../styles/theme-buttons.scss';

export const ReserveTime = (props: {
  reserveDate: Date,
  reserveHour: string,
  barberId: number,
  onSelctDate: any,
  onSelctHour: any,
}) => {
  // list of all reserves: [ date: string, hours: string[] ]
  const [reservesList, setReservesList] = useState([]);
  // hours in HoursBox
  const [availableHours, setAvailableHours] = useState([]);
  const [listHours, setListHours] = useState([]);
  const [barberShopTime, setBarberShopTime] = useState([]);
  const [reserveDate, setReserveDate] = useState(undefined);
  const [reserveHour, setReserveHour] = useState(props.reserveHour || null);

  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  const {
    // @ts-ignore
    getData,
  } = useContext(FirebaseContext);

  const timeActions: AvailableTimeActions = new AvailableTimeActions();

  const getHoursByBarberShop = async () => {
    let response = await timeActions.getBarberShopTime();
    return response
  }

  const getDatesByReserves = async () => {
    let response = await timeActions.getDatesByReserves(props.barberId);
    return response;
  }

  useEffect(() => {
    getHoursByBarberShop().then((response: any) => { setBarberShopTime(response) })
    /* in this case not found firebase functions
      getDatesByReserves().then((response: any) => {
      setReservesList(response);
    }).then(
      result => {
        setReserveDate(props.reserveDate);
      })
    */
    // test this for execute useEffect and charge dates and hours
    setReserveDate(props.reserveDate);
  }, [])

  useEffect(() => {
    // firebase data
    let data: {
      date: { seconds: number, nanoseconds: number },
      times: string[]
    }[] = getData();

    console.log('get data: ', data)

    /* Formating date for use in component
      { date: { seconds: 3434954, nanoseconds: 0 } }
      to
      { date: '2020-08-26', hours: ['16:00'] },
    */

    let formattedDates: { date: string, hours: string[] }[] = [];

    data.map((item) => {
      let date: any = item.date;
      formattedDates.push({
        date: moment(new Date(date.toDate())
          .toUTCString())
          .format()
          .toString()
          .split('T')[0],
        hours: item.times
      })
    });

    setReservesList(formattedDates);
    console.log('data para reserve-time: ', formattedDates)
    if (reserveDate) {
      let filterHours = onSelectDate(reserveDate);
      setAvailableHours(filterHours)
    }
  }, [reserveDate])

  useEffect(() => {
    setListHours(availableHours)
  }, [availableHours])

  const onSelectDate = (selectedDate: Date) => {
    let formatSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
    setReserveDate(selectedDate);
    setReserveHour(undefined);
    props.onSelctHour(undefined);
    props.onSelctDate(selectedDate);
    let listBusyHours = [];
    // get busy hours by reserve date
    reservesList.map((reserve: { date: string, hours: string[] }) => {
      if (reserve.date === formatSelectedDate) {
        reserve.hours.map((reserveHour: string) => {
          listBusyHours.push(reserveHour.substr(0, 5))
        });
      }
    })
    // filter available hours by barberShop hours
    let availables = [];
    let actualHour = moment(new Date(), 'HH:mm:ss');
    let actualDate = moment(new Date()).format('YYYY-MM-DD');
    barberShopTime.map(barberShopHour => {
      if (listBusyHours.indexOf(barberShopHour) === -1) {
        // check if is after barbershop hour to actual hour if is the actual date
        if (actualDate === formatSelectedDate) {
          let formatBarberShopHour = moment(`${barberShopHour}:00`, 'HH:mm:ss');
          if (formatBarberShopHour.isAfter(actualHour)) {
            availables.push(barberShopHour)
          }
        } else {
          availables.push(barberShopHour)
        }
      }
    })
    return availables;
  }

  const onSelectHour = (selectedHour: string) => {
    setReserveHour(selectedHour);
    props.onSelctHour(selectedHour);
  }

  return (
    <div className="time-box effect-slide_top">

      <CalendarBox
        value={reserveDate}
        onSelectDate={onSelectDate} />

      {availableHours.length ? (
        <div className="hours-box effect-slide_top">
          <div className="container">
            {availableHours.map((hour, i) =>
              <div className={`hour-item ${reserveHour === hour ? 'selected-hour' : null}`}>
                <Button
                  className={`theme-button-outlined`}
                  key={i}
                  label={hour}
                  onClick={() => {
                    onSelectHour(hour)
                  }} />
              </div>
            )}
          </div>
        </div>
      ) : (
          <p className={`no-hours text text-${getTheme()}`}>No hay horarios disponibles para esta fecha</p>
        )
      }
    </div >
  );
}