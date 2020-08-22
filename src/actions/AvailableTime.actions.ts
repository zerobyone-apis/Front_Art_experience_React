import { IBarber } from '../types/Barber.type';
import IntegrationBackend from '../utils/IntegrationBackend';
import {
    RESERVE_DATES_ROUTE,
    GET_ENDPOIT,
} from '../types/Routes.type';
import { stringify } from 'querystring';

export default class AvailableTime {
    private backend: IntegrationBackend = new IntegrationBackend();

    async getBarberShopTime() {
        return ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']
    }

    async getDatesByReserves(barberId: number) {
        return [
            { date: '2020-08-07', hours: ['16:00', '16:30', '17:00'] },
            { date: '2020-08-08', hours: ['14:30', '15:00', '15:30', '17:00'] },
            { date: '2020-08-09', hours: ['14:00', '14:30', '15:00', '15:30'] },
            { date: '2020-08-10', hours: ['14:00', '15:30', '16:00', '16:30', '17:00'] },
        ];
    }

    async getDatesByReserves2(barberId: number) {
        try {
            const responseDates: any = await this.backend.send(
                GET_ENDPOIT,
                undefined,
                `${RESERVE_DATES_ROUTE}/${barberId}`
            );
            if (responseDates.status != 200) {
                throw Error(`Error Status code: , ${responseDates.status}`)
            }
            // Formatting data
            console.log('RESPONSE DATES: ', responseDates)
            let formattingData = [];
            responseDates.data.forEach((item: { date: string, hours: string[] }) => {
                formattingData.push({ date: item.date, hours: [...item.hours] })
            })
            console.log('formatting: ', formattingData)
            return responseDates.data;
        } catch (error) {
            console.error(`Error: Obteniendo fecha de reservas -> ${error}`);
            return [];
        }
    }
}
