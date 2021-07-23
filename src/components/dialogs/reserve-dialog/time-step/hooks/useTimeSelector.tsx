import moment from "moment";
import React, { useState } from "react";
import {getQuery} from "../../../../../actions/firebase/Firebase.actions";

const useTimeSelector = () => {
    const [reservesList, setReservesList] = useState([])

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
        console.log("CCCC")
        const formattedBarberName = barberName.toLowerCase().replace("/' '/g", ".")
        const response = await getQuery(["reservas", "day_reserves"], formattedBarberName) 
        setReservesList(filterTimes(response))
    }

    return {
        reservesList: reservesList,
        loadReserveTimes: loadReserveTimes
    }
}
export default useTimeSelector;