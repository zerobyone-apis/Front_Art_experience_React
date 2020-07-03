// eslint-disable-next-line no-unused-vars
import 'date-fns';
import React, { useState } from 'react';
import { DialogModal } from '../DialogModal';
import { TextField } from '../TextField';
import Calendar from 'react-calendar';
import { FaCartPlus } from 'react-icons/fa';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import '../../styles/ArtExperienceButtons.scss';
import 'react-calendar/dist/Calendar.css';
import '../../styles/ArtExperienceButtons.scss';
import './ReservationModal.scss';
import '../../styles/theme.scss';
import moment from 'moment';
import {
  faArrowLeft,
  faCartPlus,
  faCartArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableFooter } from '@material-ui/core';

export const ReservationModal = (props: {
  className?: string,
}) => {
  const services = [
    {
      workId: 1,
      name: "Corte-Barba-Cejas",
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407",
      cost: 250
    },
    {
      workId: 2,
      name: "Barba-Cejas",
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407",
      cost: 250
    },
    {
      workId: 2,
      name: "Corte-Cejas",
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407",
      cost: 250
    },
    {
      workId: 3,
      name: "Corte-Tintado",
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407",
      cost: 250
    },
  ];
  const barbers = [
    {
      barberId: 1,
      userId: 1,
      name: "Mariano Moreno",
      job: "Profecional Barber",
      amountCuts: 2,
      clientsBarber: 5,//amountClients
      rateOfBarber: 0,//prestige
      amountOfReservesByDay: 10,//amountDailyReserves
      img:
        "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/81096072_209788046863421_8027631315464043835_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=tHUEjcHZ2UwAX9KqbzI&oh=1fe698f633765cf59bf8e671b6e91a0c&oe=5F2A13A1",
      instagram: "https://www.instagram.com/marianomoreno.11/",
      facebook: "https://www.facebook.com/mariano.moreno.5209000/"
    },
    {
      barberId: 2,
      userId: 2,
      name: "Pablo Mendez",// tengo que averiguar el appellido
      job: "Profecional Barber",
      amountCuts: 2,
      clientsBarber: 5,//amountClients
      rateOfBarber: 0,//prestige
      amountOfReservesByDay: 10,//amountDailyReserves
      img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/77094002_605862643493062_9053649117496349366_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=EL9qbeJc2QQAX8ZwTaZ&oh=acda434810cd3a8546c350c24dda8b7d&oe=5F283230",
      instagram: "https://www.instagram.com/mernis.01/",
      facebook: "https://www.facebook.com/TheUniqueDesign"
    }
  ];
  const hours = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];
  const defaultReservationFields = {
    reservationDate: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    barberName: '',
    services: []
  };
  const [showDialog, setShowDialog] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [reservationDate, setReservationDate] = useState(new Date());
  const [reservationFields, setReservationFields] = useState(defaultReservationFields);
  const [selectedBarbers, setSelectedBarbers] = useState([]);
  const [clientCart, setClientCart] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [wizard, setWizard] = useState(0);

  const onChangeReservationFields = (fieldName: string, value: string) => {
    setReservationFields({ ...reservationFields, [fieldName]: value })
  }
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }),
  );
  const classes = useStyles();
  const getDefaultDate = () => {
    // this date is for default date of Textfield date
    let dateParts = moment().format().split(':');
    return `${dateParts[0]}:${dateParts[1]}`
  }
  // SERVICE
  const getServices = () => {
    return services.map((item, i) => {
      return (
        <div
          key={`service_${i}`}
          onClick={() => {
            selectService(item);
          }}
          className="service">
          <FaCartPlus
            color="silver"
            className="circle-icon" />
          <p className="name">
            {item.name}
          </p>
          <p className="price">
            ${item.cost}
          </p>
        </div>
      )
    })
  }
  const getClientKart = () => {
    return clientCart.map((item, i) => {
      return (
        <div key={i} className="selected_service">
          <div
            className="service"
            onClick={() => {
              unselectService(item);
            }}
          >
            <FontAwesomeIcon
              color="#69f0ae"
              icon={faCartArrowDown}
              className="circle-icon" />
            <p className="name">{item.name}</p>
            <p className="price">$ {item.cost}</p>
            <FontAwesomeIcon
              color="pink"
              icon={faArrowLeft}
              className="trash-icon" />
          </div>
        </div>
      )
    })
  }
  const selectService = (selectedService: any) => {
    setSelectedService(selectedService);
  }
  const unselectService = (selectedItem: any) => {
    let removedItem = clientCart.filter(item => {
      return (item != selectedItem);
    });
    setClientCart(removedItem);
  }
  const addService = (selectedService: any) => {
    let existsItem = clientCart.filter(item => {
      return item === selectedService;
    });
    if (existsItem.length == 0) {
      setClientCart([...clientCart, selectedService]);
    }
    setSelectedService(null);
  }
  // BARBER
  const selectBarber = (selectedItem: any) => {
    let existsItem = selectedBarbers.filter(item => {
      return item === selectedItem;
    });
    if (existsItem.length == 0) {
      setSelectedBarbers([...selectedBarbers, selectedItem]);
    }
  }
  const unselectBarber = (selectedItem: any) => {
    let removedItem = selectedBarbers.filter(item => {
      return (item != selectedItem);
    });
    setSelectedBarbers(removedItem);
  }
  const getTotalCost = () => {
    let total: number = 0;
    clientCart.forEach(service => {
      total += service.cost;
    })
    return `$ ${total}`;
  }
  const onChange = date => {
    setReservationDate(date);
  }
  const CalendarBox = () => {
    return (
      <div className="calendar-box">
        <Calendar
          onChange={onChange}
          value={reservationDate}
        />
      </div>
    );
  }
  const HoursBox = () => {
    return (
      <div className="hours-item">
        <div className="hours-box">
          {hours.map((hour, i) => {
            return (
              <Button
                className={`hour-item ${selectedHour === hour ? 'selected-hour' : null}`}
                key={i}
                label={hour}
                onClick={() => {
                  setSelectedHour(hour)
                }} />
            )
          })}
        </div>
      </div >
    )
  }
  const checkStep = () => {
    switch (wizard) {
      case 0:
        if (clientCart.length) {
          return true;
        }
        break;
      case 1:
        if (selectedBarbers.length) {
          return true;
        }
        break;
      case 2:
        if (reservationDate && selectedHour) {
          return true;
        }
        break;
      case 3:
        if (reservationFields.clientName && reservationFields.clientPhone) {
          return true;
        }
        break;
      case 4:
        return true;
        break;
    }
    return false;
  }
  const stepper = () => {
    switch (wizard) {
      case 0:
        return (
          // Step 0: select service
          <div className="reservation-step">
            <div className="step-title">
              <p>Seleccione el servicio que se desea realizar</p>
            </div>
            <div className="services-box">
              <div className="list_services-box">
                {getServices()}
              </div>
              <div className="selected_services-box">
                {
                  selectedService ? (
                    <div className="confirm_service-box">
                      <p className="name">{selectedService.name}</p>
                      <p className="price">$ {selectedService.cost}</p>
                      <p className="info">Info acerca del servicio, se caracteriza por ciertas caracteristicas.</p>
                      <div className="sub-footer">
                        <div className="content-footer">
                          <Button
                            className="art_experience-button add_cart-btn confirm"
                            label="Colocar en el carrito"
                            onClick={() => {
                              addService(selectedService);
                            }}
                          />
                          <Button
                            className="cancel_cart-btn"
                            label="No incluir"
                            onClick={() => {
                              setSelectedService(null);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) :
                    getClientKart()
                }
              </div>
            </div>
          </div>
        );
        break;
      case 1:
        return (
          // Step 1: select barber
          <div className="reservation-step">
            <div className="step-title">
              <p>Seleccione el barbero</p>
            </div>
            <div className="barbers-box">
              <div className="list_barbers-box">
                {
                  barbers.map(barber => {
                    return (
                      <div onClick={() => {
                        selectBarber(barber);
                      }} key={`barber_${barbers.indexOf(barber)}`} className="barber">
                        <img src={barber.img} className="img" />
                        <p className="barber-name">{barber.name}</p>
                      </div>
                    )
                  })
                }
              </div>
              <div className="selected_barber-box">
                {
                  selectedBarbers.map(barber => {
                    return (
                      <div onClick={() => {
                        unselectBarber(barber);
                      }} key={`selected_barber_${barbers.indexOf(barber)}`} className="barber">
                        <img src={barber.img} className="img" />
                        <p className="barber-name">{barber.name}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        );
        break;
      case 2:
        return (
          // Step 2: select date and hour
          <div className="reservation-step">
            <div className="step-title">
              <p >Seleccione fecha y hora</p>
            </div>
            <div className="time-box">
              {CalendarBox()}
              {HoursBox()}
              {/* {reservationDate ? (
                <p className="selcted_datetime">
                  {`${
                    moment(reservationDate).format("DD/MM/YYYY")
                    } ${selectedHour}`}
                </p>
              ) : null} */}
            </div>
          </div>
        );
        break;
      case 3:
        return (
          // Step 3 - Client info
          <div className="reservation-step">
            <div className="step-title">
              <p>Ingrese sus datos personales</p>
            </div>
            <div className="client_info-box">
              <form>
                <TextField
                  tabIndex={1}
                  label="ingrese su nombre"
                  name="clientName"
                  defaultValue={reservationFields.clientName}
                  value={reservationFields.clientName}
                  onChange={onChangeReservationFields} />
                <TextField
                  tabIndex={1}
                  label="ingrese su email"
                  name="clientEmail"
                  defaultValue={reservationFields.clientEmail}
                  value={reservationFields.clientEmail}
                  onChange={onChangeReservationFields} />
                <TextField
                  tabIndex={2}
                  label="Ingrese su telefono"
                  name="clientPhone"
                  value={reservationFields.clientPhone}
                  onChange={onChangeReservationFields} />
              </form>
            </div>
          </div>
        );
        break;
      case 4:
        return (
          // Step 4 - Confirm data
          <div className="reservation-step">
            <div className="step-title">
              <p>Confirmacion de reserva</p>
            </div>
            <div className="confirm_data-box">
              <p className="confirm_info">Nombre: {reservationFields.clientName}</p>
              <p className="confirm_info">Telefono: {reservationFields.clientPhone}</p>
              <p className="confirm_info">
                {`Fecha de reservacion: ${
                  moment(reservationDate).format("DD/MM/YYYY")
                  }`}
              </p>
              <p className="confirm_info">{`Hora: ${selectedHour}`}</p>
              <p className="confirm_info">{`Barbero: ${selectedBarbers.length ? selectedBarbers[0].name : ''}`}</p>
              <p className="confirm_info">{`Servicio: ${clientCart.length ? clientCart[0].name : ''}`}</p>

            </div>
          </div>
        );
        break;
    }
  }
  const footer = () => {
    return <div className="footer">
      <div className="footer_right-box">
        {
          wizard ? (
            <Button
              className="footer-button"
              label="Volver"
              onClick={() => {
                setWizard(wizard - 1);
              }}
            />
          ) : null
        }
        {
          !checkStep() ? null : (
            <Button
              className="art_experience-button footer-button confirm"
              label={wizard < 4 ? 'Siguiente' : 'Reservar'}
              onClick={() => {
                if (wizard < 4) {
                  setWizard(wizard + 1);
                } else {
                  createReservation();
                }
              }}
            />
          )
        }
      </div>
    </div>
  }
  const createReservation = () => {
    // restart all steps of reservation_modal
    setSelectedHour("");
    setReservationDate(new Date());
    setSelectedBarbers([]);
    setClientCart([]);
    setReservationFields(defaultReservationFields);
    setWizard(0);
  }
  return (
    <div className="reservation-modal">
      <div className="dialog_activator-box" onClick={() => { setShowDialog(true) }}>
        <Button className={`activator-btn reservation-btn art_experience-button`} label={'Reservar Aqui'} />
      </div>
      {!showDialog ? null : (
        <DialogModal
          title="Reservacion - ArtExperience"
          className="dialog_modal"
          width='65vw'
          height='65vh'
          onClose={() => { setShowDialog(false) }}
        >
          {stepper()}
          {footer()}
        </DialogModal>
      )
      }
    </div>
  );
}
