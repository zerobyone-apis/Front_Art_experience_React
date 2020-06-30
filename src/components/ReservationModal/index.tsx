// eslint-disable-next-line no-unused-vars
import 'date-fns';
import React, { useState, ChangeEvent } from 'react';
import { DialogModal } from '../DialogModal';
import { TextField } from '../TextField';
import Calendar from 'react-calendar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import {
  faArrowLeft,
  faCartPlus,
  faCartArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ReservationModal.scss';
import '../../styles/theme.scss';

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
      name: "Maximiliano Olivera",
      job: "Barbero",
      amountCuts: 2,
      clientsBarber: 5,
      rateOfBarber: 0,
      amountOfReservesByDay: 10,
      img:
        "https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/51832663_382908072507752_2052880357581127680_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_ohc=7ydmF-QY_OkAX_AVJo7&oh=c1bfde98b1e10ce06cee75b55d20b112&oe=5F072FAB",
      instagram: "https://www.instagram.com/damianezetiel/",
      facebook: "https://www.facebook.com/TheUniqueDesign"
    },
    {
      barberId: 2,
      userId: 2,
      name: "Damian Rodriguez",
      job: "Peluquero",
      amountCuts: 2,
      clientsBarber: 5,
      rateOfBarber: 0,
      amountOfReservesByDay: 10,
      img: "https://scontent.fmvd4-1.fna.fbcdn.net/v/t1.0-9/101099602_1279890275735698_3012316497491001344_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=xFiEkzwl8RIAX-z3lmK&_nc_ht=scontent.fmvd4-1.fna&oh=ff5c2cb3b4272e965b6643c87618160d&oe=5F04BBAF",
      instagram: "https://www.instagram.com/damianezetiel/",
      facebook: "https://www.facebook.com/TheUniqueDesign"
    },
    {
      barberId: 2,
      userId: 2,
      name: "JorgeXD",
      job: "Peluquero",
      amountCuts: 2,
      clientsBarber: 5,
      rateOfBarber: 0,
      amountOfReservesByDay: 10,
      img: "https://scontent.fmvd4-1.fna.fbcdn.net/v/t31.0-8/12240880_162684954085327_8170328642351335943_o.jpg?_nc_cat=111&_nc_sid=7aed08&_nc_ohc=Wb6hzMQ-6HoAX9kfGgI&_nc_ht=scontent.fmvd4-1.fna&oh=6b2a6f34ca8edd58546e3a7ccf2cf109&oe=5F042709",
      instagram: "https://www.instagram.com/damianezetiel/",
      facebook: "https://www.facebook.com/TheUniqueDesign"
    },
    {
      barberId: 2,
      userId: 2,
      name: "Mariano Moreno",
      job: "Peluquero",
      amountCuts: 2,
      clientsBarber: 5,
      rateOfBarber: 0,
      amountOfReservesByDay: 10,
      img: "https://scontent.fmvd4-1.fna.fbcdn.net/v/t31.0-8/26172137_2286283258264781_8470637382988249565_o.jpg?_nc_cat=110&_nc_sid=dd7718&_nc_ohc=wvzUR0SOwY8AX_TpgRV&_nc_ht=scontent.fmvd4-1.fna&oh=4c5e24e9d9432cd46331f46fa82c892b&oe=5F029CDD",
      instagram: "https://www.instagram.com/damianezetiel/",
      facebook: "https://www.facebook.com/TheUniqueDesign"
    }
  ];
  const hours = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];

  const [selectedHour, setSelectedHour] = useState("");
  const [selectedDate, setSelectedDate] = useState(moment().format());
  const [reservationDate, setReservationDate] = useState(new Date());
  const [selectedBarbers, setSelectedBarbers] = useState([]);
  const [clientCart, setClientCart] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [wizard, setWizard] = useState(0);

  const defaultReservationFields = {
    reservationDate: '',
    clientName: '',
    clientPhone: '',
    barberName: '',
    services: []
  };
  const [reservationFields, setReservationFields] = useState(defaultReservationFields);
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
  const onChangeSearchResult = (value: any) => {
    setSearchResult(value);
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
          <FontAwesomeIcon
            color="silver"
            icon={faCartPlus}
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
        {selectedDate ? (
          <p className="selcted_datetime">
            {`${
              moment(reservationDate).format("DD/MM/YYYY")
              } ${selectedHour}`}
          </p>
        ) : null}
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
  const createReservation = () => {

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
        if (selectedDate && selectedHour) {
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
            <p className='subtitle'>Seleccione el servicio que se desea realizar</p>
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
                            className="add_cart-btn confirm"
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
            <p className='subtitle'>Seleccione el barbero</p>
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
            <p className='subtitle'>Seleccione el fecha y hora</p>
            <div className="time-box">
              {CalendarBox()}
              {HoursBox()}
            </div>
          </div>
        );
        break;
      case 3:
        return (
          // Step 3 - Client info
          <div className="reservation-step">
            <p className='subtitle'>Ingrese sus datos personales</p>
            <div className="client_info-box">
              <TextField
                label="ingrese su nombre"
                name="clientName"
                defaultValue={reservationFields.clientName}
                value={reservationFields.clientName}
                onChange={onChangeReservationFields} />
              <TextField
                label="Ingrese su telefono"
                name="clientPhone"
                value={reservationFields.clientPhone}
                onChange={onChangeReservationFields} />
            </div>
            {
              `${reservationFields.clientName}`
            }

          </div>
        );
        break;
      case 4:
        return (
          // Step 4 - Confirm data
          <div className="reservation-step">
            <p className='subtitle'>Confirmacion de reserva</p>
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
  return (
    <div className="reservation-modal">
      <DialogModal
        title="Reservacion"
        buttonLabel="Reservar Aqui"
        buttonClassName="reservation-btn"
        className="dialog_modal"
        width={'640px'}
        footer={
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
                  className="footer-button confirm"
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
        }
        content={
          stepper()
        }
      />
    </div>
  );
}
