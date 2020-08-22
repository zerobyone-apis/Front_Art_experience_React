import './ReserveTime.scss';
import '../../../styles/Effects.scss';

import React, { useEffect, useState } from 'react';
import { Button } from '../../Button';
import AvailableTimeActions from '../../../actions/AvailableTime.actions';
import { CalendarBox } from '../CalendarBox';
import { HourBox } from '../HourBox';
import moment from 'moment';

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
    const [barberShopTime, setBarberShopTime] = useState([]);
    const [reserveDate, setReserveDate] = useState(props.reserveDate || undefined);
    const [reserveHour, setReserveHour] = useState(props.reserveHour || null);

    const timeActions: AvailableTimeActions = new AvailableTimeActions();

    const getHoursByBarberShop = async () => {
        let response = await timeActions.getBarberShopTime();
        return response
    }

    const getDatesByReserves = async () => {
        let response = await timeActions.getDatesByReserves2(props.barberId);
        console.log('get date by reserve: ', response)
        return response;
    }

    useEffect(() => {
        getDatesByReserves().then((response: any) => { setReservesList(response) })
        getHoursByBarberShop().then((response: any) => {
            setBarberShopTime(response);
        })
    }, [])

    useEffect(() => {
        if (reserveDate) {
            onSelectDate(reserveDate)
        }
    }, [reserveDate])

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
        setAvailableHours(availables)
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
                <div className="hours-item">
                    <div className="hours-box effect-slide_top">
                        {availableHours.map((hour, i) => {
                            return (
                                <Button
                                    className={`art_experience-button_outlined hour-item ${reserveHour === hour ? 'selected-hour' : null}`}
                                    key={i}
                                    label={hour}
                                    onClick={() => {
                                        onSelectHour(hour)
                                    }} />
                            )
                        })}
                    </div>
                </div >
            ) : (
                    <p className="no-hours art_experience-text-light">No hay horarios disponibles para esta fecha</p>
                )
            }
        </div>
    );
}