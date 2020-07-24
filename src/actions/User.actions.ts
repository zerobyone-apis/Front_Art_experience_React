import IntegrationBackend from '../utils/IntegrationBackend';
import { GET_ENDPOIT, USER_SIGN_IN_ROUTE } from '../types/Routes.type';
export default class UserActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  login = async (client: { email: string, password: string }) => {
    try {
      let data = {
        email: client.email,
        password: client.password
      }
      const response: any = await this.backend.send(
        GET_ENDPOIT,
        data,
        USER_SIGN_IN_ROUTE
      );

      console.log(response)
      return response.data;
    } catch (error) {
      console.log('Error xd')
      return null
    }
  }
}
