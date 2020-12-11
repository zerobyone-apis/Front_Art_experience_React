import React, { useEffect, useState } from "react";
import { Calendar } from "./calendar";
import { HoursBox } from "./hours-box";
import { Text } from "../../../decorators/text";
import { Step } from "../../../containers/stepper/step";
import CompanyTimeActions from "../../../../actions/company/CompanyTime.actions";
import FirebaseActions from "../../../../actions/firebase/Firebase.actions";
import moment from "moment";
import "./time-step.scss";

export const TimeStep = (props: {
  // default values
  date: Date;
  hour: string;
  // selected barber
  barberId: number;
  selectedBarber: { name: string };
  // events on select
  onSelctDate: any;
  onSelctHour: any;
}) => {

  const companyTimeActions: CompanyTimeActions = new CompanyTimeActions();
  const firebaseActions: FirebaseActions = new FirebaseActions();

  // reservesList : total of reserves
  const [reservesList, setReservesList] = useState([])
  // availableHours : reserveList filtradas que estan disponibles
  const [availableHours, setAvailableHours] = useState([])
  // companyHours : horarios de la empresa
  const [companyHours, setCompanyHours] = useState([])
  // fecha de reserva (props.date)
  const [reserveDate, setReserveDate] = useState(undefined)


  // onMount component
  useEffect(() => {
    //define async function
    const getCompanyHours = async () => {
      return await companyTimeActions
        .getCompanyTimes()
        .then((response: any) => {
          setCompanyHours(response);
        })
    }
    const getExceptionTimes = async () => {
      return await companyTimeActions
        .getExceptionTimes()
        .then((response: any) => {
          // setChritmasTimes(response);
        });
    }

    getCompanyHours();
    getExceptionTimes();

    // active useEffect of reserveDate for get reserves
    setReserveDate(props.date);
  }, []);


  // @Watcher onChange reserveDate
  useEffect(() => {
    const getReserveTimes = async () => {
      await getReservationTimes();
    }
    getReserveTimes();
  }, [reserveDate]);


  const getReservationTimes = async () => {
    try {
      const resultDocs = await firebaseActions
        .getQuery(["reservas", "day_reserves"], getFormattedName()) // (props.barberId)

      if (resultDocs) {
        await filterTimes(resultDocs);
      }
    } catch (error) {
      console.error(`Error: Obteniendo las reservas -> ${error}}`);
    }
  }

  const getFormattedName = () => {
    return props.selectedBarber.name.toLowerCase().replace("/' '/g", ".");
  }


  const filterTimes = (resultData: any) => {
    if (resultData) {

      let formattedDates: { date: string; times: string[] }[] = [];

      resultData.map((item) => {
        formattedDates.push({
          date: moment(new Date(item.date.toDate()).toUTCString())
            .format()
            .toString()
            .split("T")[0],
          times: item.times,
        });
      });

      setReservesList(formattedDates);

      if (reserveDate) {
        let filterHours = onSelectDate(reserveDate);
        setAvailableHours(filterHours);
      }
    }
  }


  {/*
      Methods used into onSelectDate
      -> getBusyHours(selectedDate: fornatted selected date)
  */}
  const getBusyHours = (selectedDate) => {
    let listBusyHours = [];
    // Por cada reserva encontrada mapeamos la lista de horas reservadas.
    reservesList.map((reserve: { date: string; times: string[] }) => {
      if (reserve.date === selectedDate) {
        reserve.times.map((reserveHour: string) => {
          listBusyHours.push(reserveHour.substr(0, 5));
        });
      }
    });
    return listBusyHours;
  }


  const onSelectDate = (selectedDate: Date) => {
    let formatSelectedDate = moment(selectedDate).format("YYYY-MM-DD");

    // reset values
    setReserveDate(selectedDate);
    props.onSelctHour(undefined);
    props.onSelctDate(selectedDate);

    // get busy hours by reserve date
    let listBusyHours = getBusyHours(formatSelectedDate);

    // filter available hours by barberShop hours
    let availables = [];
    let actualHour = moment(new Date(), "HH:mm:ss");
    let actualDate = moment(new Date()).format("YYYY-MM-DD");

    // Lista de horas habilitadas por dia
    companyHours.map((barberShopHour) => {

      if (listBusyHours.indexOf(barberShopHour) === -1) { // (1)
        if (actualDate === formatSelectedDate) {// (2)
          let formatBarberShopHour = moment(`${barberShopHour}:00`, "HH:mm:ss");
          if (formatBarberShopHour.isAfter(actualHour)) { // (3)
            availables.push(barberShopHour); // (4)
          }
        } else {
          availables.push(barberShopHour); // (5)
        }
      }

    });
    return availables;
    {/*
      1: Validar si la hora habilitada esta dentro de las horas reservadas.
        Si esta dentro de la hora reservada y el dia seleccionado, filtramos.
      2: Validar si la fecha actual es igual a la fecha seleccionada
      3: Validar si la hora habilitada es mayor o despues de la hora actual.
      4: Creamos la nueva lista de horas habilitadas.
      5: Sino esta dentro del dia actual, simplemento lo añadimos a la nueva lista de horas habilitadas de ese dia..
    */}
  }


  const onSelectHour = (selectedHour: string) => {
    props.onSelctHour(selectedHour);
  }


  return (
    <Step title="Fecha de Reservacion" subtitle="Seleccione la Fecha y Hora">
      <div className="time-box effect-slide-top">
        <Calendar value={reserveDate} onSelectDate={onSelectDate} />
        {
          availableHours.length ? (
            <HoursBox
              hours={availableHours}
              onSelectItem={onSelectHour}
            />
          ) : (
              <Text type="text" className="no-hours">
                No hay horarios disponibles para esta fecha
              </Text>
            )
        }
      </div>
    </Step>
  )
}
