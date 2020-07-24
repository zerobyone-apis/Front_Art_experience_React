// eslint-disable-next-line no-unused-vars
import { IBarber } from '../types/Barber.type';
import IntegrationBackend from '../utils/IntegrationBackend';
import {
    BARBER_ROUTE,
    GET_ENDPOIT,
} from '../types/Routes.type';

export default class BarberActions {
    private backend: IntegrationBackend = new IntegrationBackend();
    public async getAll() {
        const barbers: IBarber[] = [];
        try {
            const responseBarbers: IBarber[] = await this.backend.send(
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