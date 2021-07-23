import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "./calendar";
import { HoursBox } from "./hours-box";
import { Step } from "../../../containers/stepper/step";
import CompanyTimeActions from "../../../../actions/company/CompanyTime.actions";
import moment from "moment";
import { ButtonContext } from "../../../../contexts/ButtonsContext";
import useTimeSelector from "./hooks/useTimeSelector";
import "./time-step.scss";

export const TimeStep = (props: {
  date: Date;
  hour: string;
  barberId: number;
  selectedBarber: { name: string };
  onSelctDate: any;
  onSelctHour: any;
}) => {
  
  const [availableHours, setAvailableHours] = useState([])
  const [companyHours, setCompanyHours] = useState([])
  const [reserveDate, setReserveDate] = useState(undefined)
  const companyTimeActions: CompanyTimeActions = new CompanyTimeActions();

  const {
    disabled,
    setDisabledButton
  } = useContext(ButtonContext);

  const {
    reservesList,
    loadReserveTimes 
  } = useTimeSelector()

  useEffect(() => {
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
    }
    onSelectDate(new Date())
    getCompanyHours();
    getExceptionTimes();
    setReserveDate(props.date);
  }, []);

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

  const onSelectDate = async (selectedDate: Date) => {
    setDisabledButton(true)
    let formatSelectedDate = moment(selectedDate).format("YYYY-MM-DD");
    setReserveDate(selectedDate);
    await loadReserveTimes(props.selectedBarber.name)  
    props.onSelctHour(undefined);
    props.onSelctDate(selectedDate);

    let listBusyHours = getBusyHours(formatSelectedDate);
    let availables = [];
    let actualHour = moment(new Date(), "HH:mm:ss");
    let actualDate = moment(new Date()).format("YYYY-MM-DD");
    {/*
      1: Validar si la hora habilitada esta dentro de las horas reservadas.
        Si esta dentro de la hora reservada y el dia seleccionado, filtramos.
      2: Validar si la fecha actual es igual a la fecha seleccionada
      3: Validar si la hora habilitada es mayor o despues de la hora actual.
      4: Creamos la nueva lista de horas habilitadas.
      5: Sino esta dentro del dia actual, simplemento lo añadimos a la nueva lista de horas habilitadas de ese dia..
    */}
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

    setAvailableHours(availables);
    setDisabledButton(false)
    return availables;
  }

  const onSelectHour = (selectedHour: string) => {
    props.onSelctHour(selectedHour);
  }

  // const getHoursBox = () => {
  //   console.log("get hour box")
  //   if (!disabled && reserveDate) {
  //     return (
  //       <HoursBox
  //         hours={availableHours}
  //         onSelectItem={onSelectHour}
  //       />
  //     )
  //   }
  // }

  return (
    <Step title="Fecha de Reservacion" subtitle="Seleccione la Fecha y Hora">
      <div className="time-box effect-slide-top">
        <Calendar
          value={reserveDate}
          onSelectDate={onSelectDate}
        />
        <HoursBox
          hours={availableHours}
          onSelectItem={onSelectHour}
        />
        {/* {
          (!disabled && reserveDate) &&
            <HoursBox
              hours={availableHours}
              onSelectItem={onSelectHour}
            />
        } */}
        {/* {getHoursBox()} */}
      </div>
    </Step>
  )
}
