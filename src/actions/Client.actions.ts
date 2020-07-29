import IntegrationBackend from '../utils/IntegrationBackend';
// eslint-disable-next-line no-unused-vars
import { IClient } from '../types/Client.type'
import { GET_ENDPOIT, USER_SIGN_IN_ROUTE, POST_ENDPOIT, CLIENT_ROUTE, CLIENT_EXISTS_ROUTE } from '../types/Routes.type';
export default class ClientActions {
    private backend: IntegrationBackend = new IntegrationBackend();

    add = async (newClient: IClient) => {
        console.log("Access to add", newClient)
        const existsEmail = await this.getByEmail(newClient.email);
        if (!existsEmail) {
            try {
                const data: IClient = {
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
        try {
            let data = {
                email: client.email,
                password: client.password
            }
            const response: any = await this.backend.send(
                POST_ENDPOIT,
                data,
                USER_SIGN_IN_ROUTE
            );
            console.log('response ', response)
            return response.data;
        } catch (error) {
            console.log('error: ')
            console.log(JSON.stringify(error))
            return null
        }
    }

    getByEmail = async (email: string) => {
        try {
            const data = { email };
            const response = await this.backend.send(
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
