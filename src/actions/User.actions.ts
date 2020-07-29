import IntegrationBackend from '../utils/IntegrationBackend';
import { GET_ENDPOIT, USER_SIGN_IN_ROUTE, USER_ROUTE, POST_ENDPOIT } from '../types/Routes.type';
import { IUser } from '../types/User.type';
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
      console.log('response ', response)
      return response.data;
    } catch (error) {
      console.log('error: ')
      console.log(JSON.stringify(error))
      return null
    }
  }

  register = async (user: IUser) => {
    try {
      const data: IUser = {
        username: user.username,
        email: user.email,
        password: user.password,
        cel: user.cel,
        admin: user.admin,
        barberId: user.barberId,
        createOn: user.createOn,
        fullName: user.fullName,
        status: user.status,
        userId: user.userId
      };
      const response: any = await this.backend.send(
        POST_ENDPOIT,
        data,
        USER_ROUTE
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

  }
}
