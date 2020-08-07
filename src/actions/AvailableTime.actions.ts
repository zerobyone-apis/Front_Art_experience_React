export default class AvailableTime {

    async getBarberShopTime() {
        return ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']
    }

    async getDatesByReserves() {
        return [
            { date: '2020-08-07', hours: ['16:00', '16:30', '17:00'] },
            { date: '2020-08-08', hours: ['14:30', '15:00', '15:30', '17:00'] },
            { date: '2020-08-09', hours: ['14:00', '14:30', '15:00', '15:30'] },
            { date: '2020-08-10', hours: ['14:00', '15:30', '16:00', '16:30', '17:00'] },
        ];
    }
}
