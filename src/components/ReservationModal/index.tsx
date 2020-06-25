// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useEffect } from 'react';
import { DialogModal } from '../DialogModal';
import { SearchField } from '../SearchField';
import {
  faShoppingCart,
  faArrowLeft,
  faCartPlus,
  faCartArrowDown,
  faHeadSideCough,
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
      name: "Corte",
      img:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/smart_haircuts_for_men_7.jpg?v=1506147407",
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

  // const [showMenu, setShowMenu] = useState(false);
  const [selectedBarbers, setSelectedBarbers] = useState([]);
  const [clientCart, setClientCart] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [wizard, setWizard] = useState(0);

  const onChangeSearchResult = (value: any) => {
    setSearchResult(value);
  }

  // SERVICE
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

  const stepper = () => {
    switch (wizard) {
      case 0:
        return (
          // Step 0: select service
          <div className="reservation-step">
            <p className='subtitle'>Seleccione el servicio que se desea realizar</p>
            <div className="top-box">
              <div className="left-box">
                <SearchField
                  items={services}
                  itemFilter="name"
                  showButton={false}
                  fieldLabel="Buscar Servicio"
                  className="search-field"
                  onChangeResults={onChangeSearchResult} />
              </div>
              <div className="right-box">
                <FontAwesomeIcon
                  color="#69f0ae"
                  icon={faShoppingCart}
                  className="shopping_cart-icon" />
                <p className="total-price">{getTotalCost()}</p>
              </div>
            </div>

            <div className="services-box">
              <div className="list_services-box">
                {
                  true ? searchResult.map(item => {
                    return (
                      <div
                        key={`service_${searchResult.indexOf(item)}`}
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
                  }) : <p className="no-results">No se encontraron resultados</p>
                }
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
                            className="add_cart-btn"
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
                    clientCart.map(item => {
                      return (
                        <div key={`selected_service_${clientCart.indexOf(item)}`} className="selected_service">
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
        // Step 2: select date and hour
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
        buttonLabel="Reservar Aqui"
        buttonClassName="reservation-btn"
        width={'640px'}
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

            {
              selectedService ? null : (
                <Button
                  className="footer-button"
                  label={wizard < 2 ? 'Siguiente' : 'Realizar Reserva'}
                  onClick={() => {
                    setWizard(wizard + 1);
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
