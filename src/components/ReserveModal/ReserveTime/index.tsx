import React, { useState, useEffect } from 'react';
import { CalendarBox } from '../CalendarBox';
import { HourBox } from '../HourBox';
import AvailableTimeActions from '../../../actions/AvailableTime.actions';
import moment from 'moment';
import './ReserveTime.scss';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

export const ReserveTime = (props: {}) => {
    // list of all reserves: [ date: string, hours: string[] ]
    const [reservesList, setReservesList] = useState([]);
    // hours in HoursBox
    const [availableHours, setAvailableHours] = useState([]);


    const [barberShopTime, setBarberShopTime] = useState([])

    const [reserveDate, setReserveDate] = useState(undefined);
    const [reserveHour, setReserveHour] = useState(null);

    const timeActions: AvailableTimeActions = new AvailableTimeActions();

    const getHoursByBarberShop = async () => {
        let response = await timeActions.getBarberShopTime();
        return response
    }

    const getDatesByReserves = async () => {
        let response = await timeActions.getDatesByReserves();
        return response
    }

    useEffect(() => {
        getDatesByReserves().then((response: any) => { setReservesList(response) })
        getHoursByBarberShop().then((response: any) => setBarberShopTime(response))
    }, [])

    const onSelectDate = (selectedDate: Date) => {
        let formatSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
        setReserveDate(selectedDate);
        let listBusyHours = [];

        // get busy hours by reserve date
        reservesList.map((reserve: { date: string, hours: string[] }) => {
            if (reserve.date === formatSelectedDate) {
                reserve.hours.map((reserveHour: string) => {
                    listBusyHours.push(reserveHour)
                });
            }
        })

        // filter available hours by barberShop hours
        let availables = []
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
    }

    return (
        <div className="time-box">
            <CalendarBox
                value={reserveDate}
                onSelectDate={onSelectDate} />
            {availableHours ? (
                <HourBox
                    hours={[...availableHours]}
                    value={reserveHour}
                    onSelectHour={onSelectHour} />
            ) : (
                    <p className="art_experience-text-light">No hay horarios disponibles para esta fecha</p>
                )
            }
        </div>
    );
}