import IntegrationBackend from '../utils/IntegrationBackend';
// import Datetime from '../utils/DateTime';
import moment from 'moment';
import { IBarber } from '../types/Barber.type';
import ResultObject from '../utils/ResultObject';
import {
    BARBER_ROUTE,
    GET_ENDPOIT,
} from '../types/Routes.type';

export default class BarberActions {
    private backend: IntegrationBackend = new IntegrationBackend();

    // Get Barbers ready
    public async getAll() {
        let barbers: IBarber[] = [];
        try {
            let responseBarbers: IBarber[] = await this.backend.send(
                GET_ENDPOIT,
                undefined,
                BARBER_ROUTE
            );
            responseBarbers.forEach((barber: IBarber) => {
                console.log(barber)
            });
            return barbers;
        } catch (error) {
            console.error(`Error: getAll barber-> ${error.message}`);
            return barbers;
        }
    }
}