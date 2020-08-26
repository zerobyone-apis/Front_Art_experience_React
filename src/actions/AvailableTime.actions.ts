import { IBarber } from '../types/Barber.type';
import IntegrationBackend from '../utils/IntegrationBackend';
import { RESERVE_DATES_ROUTE, GET_ENDPOIT } from '../types/Routes.type';
import { stringify } from 'querystring';
import db from '../config/firebase';

export default class AvailableTime {
  private backend: IntegrationBackend = new IntegrationBackend();

  async getBarberShopTime() {
    return ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
  }

  async getDatesByReserves(barberId: number) {
    return [
      { date: '2020-08-26', hours: ['16:00', '16:30', '17:00'] },
      { date: '2020-08-27', hours: ['14:30', '15:00', '15:30', '17:00'] },
      { date: '2020-08-28', hours: ['14:00', '14:30', '15:00', '15:30'] },
      {
        date: '2020-08-29',
        hours: ['14:00', '15:30', '16:00', '16:30', '17:00'],
      },
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
        throw Error(`Error Status code: , ${responseDates.status}`);
      }
      // Formatting data
      let formattingData = [];
      responseDates.data.forEach((item: { date: string; hours: string[] }) => {
        formattingData.push({ date: item.date, hours: [...item.hours] });
      });

      //! Bro wtf jaja estas haciendo un bucle y seteando valores para no retornarlos :_
      //? el return deberia de ser formattingData, pero el dato ya te llega como esperas
      //? Supongo que por eso lo tenes funcando igual.
      return responseDates.data;
    } catch (error) {
      console.error(`Error: Obteniendo fecha de reservas -> ${error}`);
      return [];
    }
  }
  getTimesByReservesFirebase(barberName: string) {
    let reserves = []
    try {
      db.collection('reservas')
        .doc(barberName)
        .collection('day_reserves')
        .orderBy('date', 'asc')
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            reserves.push(doc.data());
          });
        });
      return reserves;
    } catch (error) {
      console.error(`Error: Obteniendo las reservas -> ${error}}`);
      return [];
    }
  }
  getDatesByReservesFirebase(barberName: string) {
    let reserves = [];
    try {
      db.collection('reservas')
        .doc(barberName)
        .collection('day_reserves')
        .orderBy('date', 'asc')
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            reserves.push(doc.data());
          });
        });
      return reserves;
    } catch (error) {
      console.error(`Error: Obteniendo las reservas -> ${error}}`);
      return [];
    }
  }
}
