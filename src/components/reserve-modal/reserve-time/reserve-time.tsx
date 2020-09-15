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
        getDatesByReserves().then((response: any) => {
            setReservesList(response);
        }).then(
            result => {
                setReserveDate(props.reserveDate);
            })
    }, [])

    useEffect(() => {
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
                        {availableHours.map((hour, i) => <Button
                            className={
                                `theme-button-outlined 
                                 hour-item 
                                ${reserveHour === hour ? 'selected-hour' : null}`}
                            key={i}
                            label={hour}
                            onClick={() => {
                                onSelectHour(hour)
                            }} />
                        )}
                    </div>
                </div >
            ) : (
                    <p className={`no-hours text text-${getTheme()}`}>No hay horarios disponibles para esta fecha</p>
                )
            }
        </div >
    );
}