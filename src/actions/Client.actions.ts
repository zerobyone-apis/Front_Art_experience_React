import moment from 'moment';
import IntegrationBackend from '../utils/IntegrationBackend';
import { IClient } from '../types/Client.type'
import { GET_ENDPOIT, CLIENT_ROUTE } from '../types/Routes.type';
export default class ClientActions {
    private backend: IntegrationBackend = new IntegrationBackend();

    get = async (email: string) => {
        try {
            let data = { email };
            let responseClient: IClient = await this.backend.send(
                GET_ENDPOIT,
                data,
                CLIENT_ROUTE
            );
            return responseClient;
        } catch (error) {
            console.error(`Error: getAll barber-> ${error.message}`);
            return null;
        }
    }

    add = async (newClient: IClient) => {
        console.log('accede a add client')
        console.log(newClient)
        newClient.userId = 666;
        return newClient;
    }
}
