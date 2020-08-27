import React, { useContext } from 'react';
import { BarberListContext } from '../../../contexts/BarberListContext';
import { IBarber } from '../../../types/Barber.type';
import './barbers-list.scss';
import '../../../styles/effects.scss';
import '../../../styles/theme.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';

export const BarberItem = (props: {
    name: string,
    img: string,
    selected?: boolean,
    onSelect?: any,
    key?: number,
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className={`barber effect-slide_top ${props.selected ? 'selected-barber' : null}`}
            onClick={() => {
                props.onSelect ? props.onSelect() : null;
            }}
        >
            <img src={props.img} className="img" />
            <p className={`text text-${getTheme()} barber-name`}>{props.name}</p>
        </div>
    )
}

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
                    (props.barbers || getBarberList()).map((barber: IBarber, i: number) => {
                        return (
                            <div key={i}>
                                <BarberItem name={barber.name}
                                    img={barber.urlProfileImage}
                                    selected={props.value.name === barber.name ? true : false}
                                    onSelect={() => { props.setBarber(barber) }}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}