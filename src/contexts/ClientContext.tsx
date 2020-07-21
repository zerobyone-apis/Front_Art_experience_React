/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, {
    createContext,
    useState,
    ReactElement,
} from 'react';
import { IClient } from '../types/Client.type';


export const ClientContext = createContext({
    clientIsLogged: () => undefined,
    getClientData: () => undefined,
    setClientData: (clientData: object) => undefined,
});

export const ClientProvider = (props: {
    children: ReactElement;
}) => {
    const [client, setClient] = useState(null);

    const setClientData = (clientData: object) => {
        setClient(clientData);
    }

    const getClientData = () => {
        return client;
    }

    const clientIsLogged = () => {
        return client ? true : false;
    }

    const context = { clientIsLogged, getClientData, setClientData };

    return (
        <ClientContext.Provider value={context}>
            {props.children}
        </ClientContext.Provider>
    );
};