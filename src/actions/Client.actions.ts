import IntegrationBackend from '../utils/IntegrationBackend';
import { IClient } from '../types/Client.type';
import {
  GET_ENDPOIT,
  USER_SIGN_IN_ROUTE,
  POST_ENDPOIT,
  CLIENT_ROUTE,
  CLIENT_EXISTS_ROUTE,
} from '../types/Routes.type';
export default class ClientActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  add = async (newClient: IClient) => {
    try {
      const data: IClient = {
        name: newClient.name,
        username: newClient.username,
        password: newClient.password,
        email: newClient.email,
        cel: newClient.cel,
        clientType: 'Nuevo',
        socialNumber: newClient?.socialNumber,
      };
      const response: any = await this.backend.send(
        POST_ENDPOIT,
        data,
        CLIENT_ROUTE
      );
      //console.log('response register ', response)
      return response.data;
    } catch (error) {
      console.error('Ocurrio error en register : ', error);
      return null;
    }
  };

  login = async (client: { email: string; password: string }) => {
    try {
      let data = {
        email: client.email,
        password: client.password,
      };
      const response: any = await this.backend.send(
        POST_ENDPOIT,
        data,
        USER_SIGN_IN_ROUTE
      );
      //console.log('response login', response)
      return response;
    } catch (error) {
      console.error('error: ', JSON.stringify(error));
      return null;
    }
  };

  getByEmail = async (email: string) => {
    try {
      const data = { email };
      const response = await this.backend.send(
        GET_ENDPOIT,
        data,
        `${CLIENT_EXISTS_ROUTE}/${email}`
      );
      if (response.status !== 200) {
        //console.log(response.message)
        return Error(response.message);
      }
      return response.data;
    } catch (error) {
      console.error(`Error: exists client-> ${error.message}`);
      return null;
    }
  };
}
