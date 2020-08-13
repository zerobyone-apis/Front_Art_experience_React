/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, {
    createContext,
    useState,
    ReactElement,
    useEffect,
} from 'react';
import { IUser } from '../types/User.type';
import { USER_DATA_STORAGE } from '../types/StorageData.type';

export const UserContext = createContext({
    userIsLogged: () => undefined,
    getUserData: () => undefined,
    setUserData: (userData: any) => undefined,
});

export const UserProvider = (props: {
    value?: IUser,
    children: ReactElement;
}) => {
    const storex = require('store'); // store :3
    const [user, setUser] = useState(props.value || null);

    useEffect(() => {
        storex.set(USER_DATA_STORAGE, user);
    }, [user])

    const setUserData = (userData: any) => {
        setUser(userData);
    }

    const getUserData = () => {
        console.log('user data', user)
        if (user) {
            try {
                let userData = user['user'];
                return userData;
            } catch (error) {
                let clientData = user['client'];
                return clientData;
            }
        }
        return null;
    }

    const userIsLogged = () => {
        return user ? true : false;
    }

    const context = { userIsLogged, getUserData, setUserData };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
};