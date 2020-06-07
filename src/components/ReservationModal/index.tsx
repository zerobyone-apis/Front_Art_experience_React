// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useEffect } from 'react';
import { DialogModal } from '../DialogModal';
import { SearchField } from '../SearchField';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ReservationModal.scss';
import '../../styles/theme.scss';

export const ReservationModal = () => {
  const data_services = [
    {
      workId: 1,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407",
      name: "Corte",
      cost: 250
    },
    {
      workId: 2,
      name: "Lavado",
      cost: 50,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 3,
      name: "Brushing",
      cost: 200,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 4,
      name: "Depilacion",
      cost: 70,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 5,
      name: "Botox",
      cost: 50,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 6,
      name: "HIDROCAUTERIZACION",
      cost: 590,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 7,
      name: "BRUSHING_PROGRESIVO",
      cost: 1200,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 8,
      name: "CLARITOS",
      cost: 900,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 9,
      name: "MECHAS",
      cost: 900,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 10,
      name: "REFLEJOS",
      cost: 900,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 20,
      name: "FADE",
      cost: 270,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 21,
      name: "Clasico",
      cost: 230,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 22,
      name: "Barba",
      cost: 120,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 23,
      name: "Cejas",
      cost: 70,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 24,
      name: "Afeitado clasico",
      cost: 160,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 25,
      name: "BRUSHING_PROGRESIVO_BARBER",
      cost: 500,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 26,
      name: "MECHAS_BARBER",
      cost: 500,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 26,
      name: "PLANCHADO",
      cost: 1200,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    },
    {
      workId: 27,
      name: "COLORES_FANTASIA_BARBER",
      cost: 800,
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407"
    }
  ];
  const data_barbers = [
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
      img: "https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/101334228_246173533338982_6815021257935814656_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_ohc=rJtpc6mj9ksAX8YaeCv&oh=f3b1f238e0da8efcc806201a8862cfe9&oe=5F06DA28",
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
      img: "https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/101334228_246173533338982_6815021257935814656_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_ohc=rJtpc6mj9ksAX8YaeCv&oh=f3b1f238e0da8efcc806201a8862cfe9&oe=5F06DA28",
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
      img: "https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/101334228_246173533338982_6815021257935814656_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_ohc=rJtpc6mj9ksAX8YaeCv&oh=f3b1f238e0da8efcc806201a8862cfe9&oe=5F06DA28",
      instagram: "https://www.instagram.com/damianezetiel/",
      facebook: "https://www.facebook.com/TheUniqueDesign"
    }
  ];

  const [showMenu, setShowMenu] = useState(false);
  const [services, setServices] = useState(data_services);
  const [barbers, setBarber] = useState(data_barbers);
  const [selectedBarbers, setSelectedBarbers] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [wizard, setWizard] = useState(0);

  const onChangeSearchResult = (value: any) => {
    setSearchResult(value);
  }

  const selectService = (selectedService: any) => {
    setSelectedServices([...selectedServices, selectedService])
    console.log(selectedServices)
  }

  const unselectService = (selectedItem: any) => {
    console.log('//////////////')
    console.log(selectedServices)
    let copy = selectedServices;
    setSelectedServices(copy.splice(copy.indexOf(selectedItem), 1));
    console.log(selectedServices)
  }

  const selectBarber = (barber: any) => {
    setSelectedBarbers([...selectedBarbers, barber])
    console.log(selectedBarbers)
  }

  const unselectBarber = (barber: any) => {
    console.log('//////////////')
    console.log(selectedBarbers)
    let copy = selectedBarbers;
    setSelectedBarbers(copy.splice(copy.indexOf(barber), 1));
    console.log(selectedBarbers)
  }

  const getTotalCost = () => {
    let total: number = 0;
    selectedServices.forEach(service => {
      total += service.cost;
    })
    return `$ ${total}`;
  }

  const stepper = () => {
    switch (wizard) {
      case 0:
        return (
          // Step 0: select service
          <div className="reservation-step">
            <div className="top-box">
              <div className="left-box">
                <SearchField
                  items={services}
                  itemFilter="name"
                  buttonLabel="Buscar"
                  fieldLabel="Buscar Servicio"
                  className="search-field"
                  onChangeResults={onChangeSearchResult} />
              </div>
              <div className="right-box">
                <FontAwesomeIcon
                  color="pink"
                  icon={faShoppingCart}
                  className="shopping_cart-icon" />
                <p className="total-price">{getTotalCost()}</p>
              </div>
            </div>

            <p className='subtitle'>Seleccione el servicio que se desea realizar</p>
            <div className="services-box">
              <div className="list_services-box">
                {
                  searchResult.map(item => {
                    return (
                      <div
                        key={`service_${searchResult.indexOf(item)}`}
                        onClick={() => {
                          selectService(item);
                        }}
                        className="service">
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
              </div>
              <div className="selected_services-box">
                {
                  selectedServices.map(item => {
                    return (
                      <div className="selected_service">
                        <div
                          className="service"
                          key={`selected_service_${selectedServices.indexOf(item)}`}
                          onClick={() => {
                            unselectService(item);
                          }}
                        >
                          <p className="name">{item.name}</p>
                          <p className="price">$ {item.cost}</p>
                          <FontAwesomeIcon
                            color="pink"
                            icon={faTrash}
                            className="trash-icon" />
                        </div>
                      </div>

                    )
                  })
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
                      <div className="barber">
                        <img onClick={() => {
                          selectBarber(barber);
                        }} src={barber.img} className="img" />
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
                      <div className="barber">
                        <img onClick={() => {
                          unselectBarber(barber);
                        }} src={barber.img} className="img" />
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
        // Step 3: select date and hour
        <div className="reservation-step">
          <p className='subtitle'>Seleccione el fecha y hora</p>
          <div className="barbers-box">

          </div>
        </div>
        break;
    }
  }

  return (
    <div className="reservation-modal">
      <DialogModal
        title="Reservacion"
        buttonLabel="Reservar"
        buttonClassName="reservation-btn"
        // header={null}
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
            <Button
              className="footer-button"
              label={wizard < 2 ? 'Siguiente' : 'Realizar Reserva'}
              onClick={() => {
                setWizard(wizard + 1);
              }}
            />
          </div>
        }
        content={
          stepper()
        }
      />
    </div>
  );
}
