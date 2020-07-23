import IntegrationBackend from '../utils/IntegrationBackend';
import ResultObject from '../utils/ResultObject';
import { RESERVE_ROUTE, POST_ENDPOIT, GET_ENDPOIT } from '../types/Routes.type';
import { IReserve } from '../types/Reserve.type';
import moment from 'moment';

export default class ReserveActions {
    private backend: IntegrationBackend = new IntegrationBackend();

    public async add(reserve: IReserve) {
        console.log("Accede Reserve Actions", reserve)
        let customMoment = moment;
        customMoment.locale();
        try {
            const response: any = await this.backend.send(
                POST_ENDPOIT,
                reserve,
                `${RESERVE_ROUTE}/${reserve.clientId}`
            );
            if (response.status !== 201) {
                console.log(response.message)
                throw Error(response.message)
            }
            console.log("Reserve success \n", response.data)
            return response.data
        } catch (error) {
            console.error('Error Reserve.actions method add -> ', error.message);
            return new ResultObject(404, error, {});
        }
    }

    public async getAll() {
        try {
            const response: any = await this.backend.send(
                GET_ENDPOIT,
                undefined,
                `${RESERVE_ROUTE}`
            );
            console.log('accede', response)
            return response.data;
        } catch (error) {
            console.error('Error Reserve.actions method add -> ', error.message);
            return null;
        }
    }
}
