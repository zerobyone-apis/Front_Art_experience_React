import React, { useContext } from 'react';
import { BarberListContext } from '../../../contexts/BarberListContext';
import { IBarber } from '../../../types/Barber.type';
import './BarbersList.scss';
import '../../../styles/Effects.scss';
import '../../../styles/theme.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';

export const BarbersList = (props: {
    value: any,
    setBarber: any,
    barbers?: any[]
}) => {
    const {
        // @ts-ignore
        getBarberList,
    } = useContext(BarberListContext);
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className="barbers-box">
            <div className="list_barbers-box">
                {
                    (props.barbers || getBarberList()).map((barber: IBarber) => {
                        return (
                            <div
                                className={`barber effect-slide_top ${props.value.name === barber.name ? 'selected-barber' : null}`}
                                onClick={() => {
                                    props.setBarber(barber);
                                }}
                                key={`barber_${(props.barbers || getBarberList()).indexOf(barber)}`}
                            >
                                <img src={barber.urlProfileImage} className="img" />
                                <p className={`text text-${getTheme()} barber-name`}>{barber.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}