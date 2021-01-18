import React, {
    createContext,
    useState,
    ReactElement,
    useEffect,
} from 'react';
import { IBarber } from '../types/Barber.type';
import { BARBERLIST_DATA_STORAGE } from '../types/StorageData.type';
import { barbers as BarbersData } from '../data/reserve';

export const BarberListContext = createContext({
    getBarbersList: () => undefined,
    setBarbersList: (barbersData) => undefined,
});

export const BarberListProvider = (props: {
    value?: any[],
    children: ReactElement;
}) => {
    const storex = require('store'); // store :3
    const [barbers, setBarbers] = useState(BarbersData);

    useEffect(() => {
        storex.set(BARBERLIST_DATA_STORAGE, barbers);
    }, [barbers])

    const setBarbersList = (newBarbers: any) => {
        storex.set(BARBERLIST_DATA_STORAGE, newBarbers);
        setBarbers(newBarbers);
    }

    const getBarbersList = () => {
        return barbers;
    }

    const context = { getBarbersList, setBarbersList };

    return (
        <BarberListContext.Provider value={context}>
            {props.children}
        </BarberListContext.Provider>
    );
};