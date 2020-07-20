/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, {
    createContext,
    useState,
    ReactElement,
} from 'react';


export const ClientContext = createContext({
    clientIsLogged: {},
    setClientData: (clientData: object) => undefined,
});

export const ClientProvider = (props: {
    children: ReactElement;
}) => {
    const [client, setClient] = useState({});

    const setClientData = (clientData: object) => {
        setClient(clientData);
    }

    const clientIsLogged = () => {
        return client ? true : false;
    }

    const context = { clientIsLogged, setClientData };

    return (
        <ClientContext.Provider value={context}>
            {props.children}
        </ClientContext.Provider>
    );
};