import React, { useContext, useEffect, useState } from "react";
import Calendar from "./calendar";
import { HoursBox } from "./hours-box";
import { Step } from "../../../containers/stepper/step";
import moment from "moment";
import { ButtonContext } from "../../../../contexts/ButtonsContext";
import useTimeSelector from "./hooks/useTimeSelector";
import "./time-step.scss";
import { COMPANY_TIMES } from "../../../../actions/company/CompanyTime.actions";

export const TimeStep = (props: {
  barberId: number;
  selectedBarber: { name: string };
  onSelctDate: any;
  onSelctHour: any;
}) => {
  
  const [availableHours, setAvailableHours] = useState([])
  const [reserveDate, setReserveDate] = useState(new Date())

  const {
    setDisabledButton
  } = useContext(ButtonContext);

  const {
    loadReserveTimes,
    getBusyHours 
  } = useTimeSelector()

  const onSelectDate = async (selectedDate: Date) => {
    setDisabledButton(true)
    let formatSelectedDate = moment(selectedDate).format("YYYY-MM-DD");
    setReserveDate(selectedDate);
    let responseReserves = await loadReserveTimes(props.selectedBarber.name) 
    props.onSelctHour(undefined);
    props.onSelctDate(selectedDate);
    let listBusyHours = getBusyHours(responseReserves, formatSelectedDate);
    let availables = [];
    let actualHour = moment(new Date(), "HH:mm:ss");
    let actualDate = moment(new Date()).format("YYYY-MM-DD");
    COMPANY_TIMES.map((barberShopHour) => {
      if (listBusyHours.indexOf(barberShopHour) === -1) { // (1)
        if (actualDate === formatSelectedDate) {          // (2)
          let formatBarberShopHour = moment(`${barberShopHour}:00`, "HH:mm:ss");
          if (formatBarberShopHour.isAfter(actualHour)) { // (3)
            availables.push(barberShopHour);              // (4)
          }
        } else {
          availables.push(barberShopHour);                // (5)
        }
      }
    });
    {/*
      1: Validar si la hora habilitada esta dentro de las horas reservadas.
        Si esta dentro de la hora reservada y el dia seleccionado, filtramos.
      2: Validar si la fecha actual es igual a la fecha seleccionada
      3: Validar si la hora habilitada es mayor o despues de la hora actual.
      4: Creamos la nueva lista de horas habilitadas.
      5: Sino esta dentro del dia actual, simplemento lo añadimos a la nueva lista de horas habilitadas de ese dia..
    */}
    setAvailableHours(availables);
    setDisabledButton(false)
    return availables;
  }

  const onSelectHour = (selectedHour: string) => {
    props.onSelctHour(selectedHour);
  }

  return (
    <Step title="Fecha de Reservacion" subtitle="Seleccione la Fecha y Hora">
      <div className="time-box effect-slide-top">
              <Calendar
                value={reserveDate}
                onSelectDate={onSelectDate}
              />
              {
                availableHours &&
                  <HoursBox
                    hours={availableHours}
                    onSelectItem={onSelectHour}
                  />
              }
      </div>
    </Step>
  )
}
