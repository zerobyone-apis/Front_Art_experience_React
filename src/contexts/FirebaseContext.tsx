import React, {
    ReactElement,
    createContext,
    useState,
    useEffect,
} from 'react';
import db from '../config/firebase';
import TimeActions from '../actions/AvailableTime.actions';

export const FirebaseContext = createContext({
    query: (queryText: string) => undefined,
    getData: () => undefined
});

export const FirebaseProvider = (props: {
    children: ReactElement;
}) => {

    const timeActions: TimeActions = new TimeActions();
    const [data, setData] = useState(undefined);

    useEffect(() => {
        query('mariano.moreno')
    }, []);

    const query = (queryText: string) => {
        let response = timeActions.getDatesByReservesFirebase(queryText);
        setData(response);
        console.log('Objeto response', response);
    };

    const getData = () => {
        return data;
    }

    const context = { query, getData };

    return (
        <FirebaseContext.Provider value={context}>
            {props.children}
        </FirebaseContext.Provider>
    );
};