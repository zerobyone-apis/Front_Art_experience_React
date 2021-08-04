import moment from "moment";
import React, { useState } from "react";
import {getQuery} from "../../../../../actions/firebase/Firebase.actions";

const useTimeSelector = () => {
    // const [reservesList, setReservesList] = useState([])

    const filterTimes = (firebaseResponse: any) => {
        let formattedDates: { 
            date: string; times: string[] 
        }[] = [];
    
        firebaseResponse.map((item) => {
          formattedDates.push({
            date: moment(new Date(item.date.toDate()).toUTCString())
              .format()
              .toString()
              .split("T")[0],
            times: item.times,
          });
        });
        return formattedDates
    }
    
    const loadReserveTimes = async (barberName: string) => {
      // obtiene todas las reservas 
      const formattedBarberName = barberName.toLowerCase().replace("/' '/g", ".")
      const response = await getQuery(["reservas", "day_reserves"], formattedBarberName)
      return filterTimes(response)
    }

    const getBusyHours = (reservesList, selectedDate) => {
      let listBusyHours = [];
      // map hours by reserves
      reservesList.map((reserve: { date: string; times: string[] }) => {
        if (reserve.date === selectedDate) {
          reserve.times.map((reserveHour: string) => {
            listBusyHours.push(reserveHour.substr(0, 5));
          });
        }
      });
      return listBusyHours;
    }

    return {
        // reservesList: reservesList,
        loadReserveTimes: loadReserveTimes,
        getBusyHours: getBusyHours
    }
}
export default useTimeSelector;