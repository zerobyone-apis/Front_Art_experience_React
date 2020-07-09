import IntegrationBackend from '../utils/IntegrationBackend';
import ResultObject from '../utils/ResultObject';
import { RESERVE_ROUTE, POST_ENDPOIT } from '../types/Routes.type';
import { IReserve } from '../types/Reserve.type';
import moment from 'moment';

export default class ReserveActions {
    private backend: IntegrationBackend = new IntegrationBackend();

    public async add(reserve: IReserve) {
        let customMoment = moment;
        customMoment.locale();

        try {
            let data: IReserve = {
                barberOrHairdresserId: reserve.barberOrHairdresserId,
                clientId: -1,
                nameClient: reserve.nameClient,
                mailClient: reserve.mailClient,
                celClient: reserve.celClient,
                totalCost: reserve.totalCost,
                startTime: moment(reserve.startTime).format(),
                endTime: reserve.endTime,
                priceWork: reserve.priceWork,
                workTime: reserve.workTime,
                workToDo: reserve.workToDo,
                reserveDay: reserve.reserveDay,
                isActive: reserve.isActive,
            };

            console.log(data);

            // const response: { id: number }[] = await this.backend.send(
            //     POST_ENDPOIT,
            //     data,
            //     RESERVE_ROUTE
            // );

            return new ResultObject(201, 'reserve created success')
        } catch (error) {
            console.error('Error Reserve.actions method add -> ', error.message);
            return new ResultObject(404, error);
        }
    }
}
