import moment from 'moment';
import IntegrationBackend from '../utils/IntegrationBackend';
import { IClient } from '../types/Client.type'
import { GET_ENDPOIT, POST_ENDPOIT, CLIENT_ROUTE, CLIENT_EXISTS_ROUTE } from '../types/Routes.type';
export default class ClientActions {
    private backend: IntegrationBackend = new IntegrationBackend();

    add = async (newClient: IClient) => {
        console.log("Access to add", newClient)
        let existsEmail = await this.getByEmail(newClient.email);
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
                
                if (response.status !== 201) {
                    console.log('Error on create client', response.message)
                    return Error('Error on create client')
                }
                console.log('success post client')
                return response.data;
            } catch (error) {
                return "Ocurrio un error! Vuelva a intentarlo"
            }
        } else {
            return "El email ya esta registrado";
        }
    }

    login = async (client: { email: string, password: string }) => {
        console.log("Access to login", client)
        let existsEmail = await this.getByEmail(client.email);
        console.log(existsEmail)
        if (existsEmail) {
            try {
                // login method
                return existsEmail;
            } catch (error) {
                return "Ocurrio un error! Vuelva a intentarlo"
            }
        } else {
            return "El email no esta registrado";
        }
    }

    getByEmail = async (email: string) => {
        try {
            let data = { email };
            let response = await this.backend.send(
                GET_ENDPOIT,
                data,
                `${CLIENT_EXISTS_ROUTE}/${email}`
            );
            if (response.status !== 200) {
                console.log(response.message)
                return Error(response.message)
            }
            return response.data;
        } catch (error) {
            console.error(`Error: exists client-> ${error.message}`);
            return null;
        }
    }
}
