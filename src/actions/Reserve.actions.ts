import IntegrationBackend from '../utils/IntegrationBackend';
import ResultObject from '../utils/ResultObject';
import { RESERVE_ROUTE, POST_ENDPOIT } from '../types/Routes.type';
import { IReserve } from '../types/Reserve.type';
import moment from 'moment';

export default class ReserveActions {
    private backend: IntegrationBackend = new IntegrationBackend();

    public async add(reserve: IReserve) {
        console.log("Accede ReserveActions", reserve)
        let customMoment = moment;
        customMoment.locale();
        try {
            const response: any = await this.backend.send(
                POST_ENDPOIT,
                reserve,
                `${RESERVE_ROUTE}/${reserve.clientId}`
            );
            console.log("response reserve action:", response)
            return new ResultObject(201, 'reserve created success')
        } catch (error) {
            console.error('Error Reserve.actions method add -> ', error.message);
            return new ResultObject(404, error);
        }
    }
}
