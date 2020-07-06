import IntegrationBackend from '../utils/IntegrationBackend';
// import Datetime from '../utils/DateTime';
import moment from 'moment';
import { IBarber } from '../types/Barber.type';
import ResultObject from '../utils/ResultObject';
import {
    BARBER_ROUTE,
    PUT_ENDPOIT,
    GET_ENDPOIT,
    POST_ENDPOIT,
    DELETE_ENDPOIT
} from '../types/Routes.type';
import {
    ORDER_CONFIRM,
    ORDER_DELIVERED,
    ORDER_RECIVED,
    ORDER_REPAIR,
    ORDER_WORKSHOP
} from '../types/OrderStatus.type';

export default class OrderActions {
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
                let startDate: string[] = (barber.startDate || '').split('T')
                barber.startDate = `${moment(startDate[0]).format('DD/MM/YYYY')} ${startDate[1].split('.')[0]}`,
                    barbers.unshift(barber);

                let endDate: string[] = (barber.endDate || '').split('T')
                barber.endDate = `${moment(endDate[0]).format('DD/MM/YYYY')} ${endDate[1].split('.')[0]}`,
                    barbers.unshift(barber);
            });
            return barbers;
        } catch (error) {
            console.error(`Error: getAll-> ${error.message}`);
            return barbers;
        }
    }
    // Add barber ready - check times on startDate with moment lib
    public async add(barber: IBarber) {
        //    let customMoment = moment;
        //    customMoment.locale();
        //    console.log(barber.startDate)
        //    let startDateCopy: string[] = moment(barber.startDate, 'DD/MM/YYYY hh:mm:ss')
        //      .format().split('T');
        //    console.log(startDateCopy)

        try {
            let data: IBarber = {
                username: barber.username, // obligatorio
                password: barber.password, // obligatorio
                email: barber.email, // obligatorio
                cel: barber.cel, // obligatorio

                //startDate: barber.article,
                //endDate: barber.model,

                name: barber.name, // obligatorio
                localId: barber.localId ? barber.localId : undefined, // en back le seteo algo
                localName: barber.localName ? barber.localName : "", // en back le seteo algo
                workTime: "LV [10:00-18:00] SBDO [11:00-19:00]", // en back le seteo algo
                cutsTimes: barber.cutsTimes ? barber.cutsTimes : "30 min", // en back le seteo algo

                amountOfCuts: barber.amountOfCuts ? barber.amountOfCuts : 0,
                amountOfClients: barber.amountOfClients ? barber.amountOfClients : 0,
                amountOfComments: barber.amountOfComments ? barber.amountOfComments : 0,
                amountOflikesOnComments: barber.amountOflikesOnComments ? barber.amountOflikesOnComments : 0,
                amountOfShares: barber.amountOfShares ? barber.amountOfShares : 0,
                amountDailyReserves: barber.amountDailyReserves ? barber.amountDailyReserves : 0,
                prestige: barber.prestige ? barber.prestige : 4, // Double
                //isActive: true

            };
            const response: IBarber = await this.backend.send(
                POST_ENDPOIT,
                data,
                BARBER_ROUTE
            );
            let newBarber: IBarber = {
                barberId: response[0].barberId,
                userId: response[0].userId,
                username: response[0].username, // obligatorio
                password: response[0].password,
                email: response[0].email,
                cel: response[0].cel,

                startDate: response[0].startDate,
                endDate: response[0].endDate ? response[0].endDate : "",

                name: response[0].name,
                localId: response[0].localId,
                localName: response[0].localName,
                workTime: response[0].workTime,
                cutsTimes: response[0].cutsTimes,

                amountOfCuts: response[0].amountOfCuts,
                amountOfClients: response[0].amountOfClients,
                amountOfComments: response[0].amountOfComments,
                amountOflikesOnComments: response[0].amountOflikesOnComments,
                amountOfShares: response[0].amountOfShares,
                amountDailyReserves: response[0].amountDailyReserves,
                prestige: response[0].prestige,
                isActive: response[0].isActive
            };
            return new ResultObject(200, newBarber);
        } catch (error) {
            console.error('Error barber.actions method add -> ', error.message);
            return new ResultObject(404, error);
        }
    }

    public async save(barber: IBarber) {
        try {
            let data: IBarber = {
                clientname: barber.clientname,
                clientphone: barber.clientphone,
                article: barber.article,
                model: barber.model,
                brand: barber.brand,
                reportedfailure: barber.reportedfailure,
                observations: barber.observations,
                iscanceled: false,
                repairdate:
                    barber.repairdate == ''
                        ? moment().format('YYYY-MM-DD hh:mm:ss')
                        : barber.repairdate,
                status: barber.status != '' ? barber.status : ORDER_RECIVED.text
            };
            const response: any = await this.backend.send(
                PUT_ENDPOIT,
                data,
                `${BARBER_ROUTE}/${barber.id}`
            );
            return barber;
        } catch (error) {
            console.error('Ocurrio un error actualizando el pedido -> ', error);
            return null;
        }
    }

    public async delete(pedido: IBarber) {
        try {
            const response: any = await this.backend.send(
                DELETE_ENDPOIT,
                undefined,
                `${BARBER_ROUTE}/${pedido.id}`
            );
            return true;
        } catch (error) {
            console.error('Error borrando pedidio => ', error);
            return null;
        }
    }

    getMaxIdOfOrders(orders: IBarber[]) {
        let ids: number[] = [];
        orders.map(barber => {
            let id: number = barber.id || -1;
            ids.push(id);
        });
        let maxId: number = Math.max(...ids);
        return maxId === -Infinity ? 0 : maxId + 1;
    }

    private validateStatus = (req: any): string | undefined => {
        switch (this.status) {
            case this.status.recibido:
                return this.status.recibido === true ? ORDER_RECIVED.text : '';
                break;
            case this.status.reparacion:
                return this.status.reparacion === true ? ORDER_REPAIR.text : '';
                break;
            case this.status.confirmando_pago:
                return this.status.confirmando_pago === true ? ORDER_CONFIRM.text : '';
                break;
            case this.status.entregado:
                return this.status.entregado === true ? ORDER_DELIVERED.text : '';
                break;
            case this.status.en_talleres:
                return this.status.en_talleres === true ? ORDER_WORKSHOP.text : '';
                break;
        }
    };

    public orderBase: IBarber = {
        id: 1,
        admissiondate: moment().format('YYYY-MM-DD hh:mm:ss'),
        clientname: '',
        clientphone: '',
        article: '',
        model: '',
        brand: '',
        reportedfailure: '',
        observations: '',
        iscanceled: false,
        repairdate: '',
        deliverydate: '',
        reparation: '',
        price: 0,
        status: ''
    };

    public status: any = {
        recibido: false,
        reparandose: false,
        confirmando_pago: false,
        entregado: false,
        en_talleres: false
    };
}