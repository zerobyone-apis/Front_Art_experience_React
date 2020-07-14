import moment from 'moment';
import IntegrationBackend from '../utils/IntegrationBackend';
import { IClient } from '../types/Client.type'
import { GET_ENDPOIT, POST_ENDPOIT, CLIENT_ROUTE, CLIENT_EXISTS_ROUTE } from '../types/Routes.type';
export default class ClientActions {
    private backend: IntegrationBackend = new IntegrationBackend();

    add = async (newClient: IClient) => {
        console.log("Access to add", newClient)
        let existsEmail = await this.exists(newClient.email);
        if (!existsEmail) {
            try {
                let data: IClient = {
                    "name": newClient.name,
                    "username": newClient.username,
                    "email": newClient.email,
                    "password": newClient.password,
                    "cel": newClient.cel,
                };
                const response: any = await this.backend.send(
                    POST_ENDPOIT,
                    data,
                    CLIENT_ROUTE
                );
                console.log('success post client')
                console.log(response)
            } catch (error) {
                return "Ocurrio un error! Vuelva a intentarlo"
            }
            return newClient;
        } else {
            return "El email ya esta registrado";
        }
    }

    login = async (client: { email: string, password: string }) => {
        console.log("Access to login", client)
        let existsEmail = await this.exists(client.email);
        if (!existsEmail) {
            try {
                // let data: IClient = {
                //     "name": newClient.name,
                //     "username": newClient.username,
                //     "email": newClient.email,
                //     "password": newClient.password,
                //     "cel": newClient.cel,
                // };
                // const response: any = await this.backend.send(
                //     POST_ENDPOIT,
                //     data,
                //     CLIENT_ROUTE
                // );
                // console.log('success post client')
                // console.log(response)
            } catch (error) {
                return "Ocurrio un error! Vuelva a intentarlo"
            }
            return null;
            // return newClient;
        } else {
            return "El email ya esta registrado";
        }
    }

    get = async (email: string, password: string) => {
    }

    exists = async (email: string) => {
        try {
            let data = { email };
            let existsClient: IClient = await this.backend.send(
                GET_ENDPOIT,
                data,
                `${CLIENT_EXISTS_ROUTE}/${email}`
            );
            console.log('No errors exists client ', existsClient)
            return existsClient;
        } catch (error) {
            // usar un switch case para mostrar errores
            console.error(`Error: exists client-> ${error.message}`);
            return null;
        }
    }
}
