// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useEffect } from 'react';
import { DialogModal } from '../DialogModal';
import { SearchField } from '../SearchField';
import './ReservationModal.scss';

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

  const [showMenu, setShowMenu] = useState(false);
  const [services, setServices] = useState(data_services);
  const [searchResult, setSearchResult] = useState([]);

  const onChangeSearchResult = (value: any) => {
    setSearchResult(value);
    console.log('llefa')
  }

  return (
    <div className="reservation-modal">
      <DialogModal
        title="Reservacion"
        buttonLabel="Reservar"
        buttonClassName="reservation-btn"
        // header={null}
        // footer={null}
        content={
          // Step 1: select service
          <div className="reservation-step">

            <SearchField
              items={services}
              itemFilter="name"
              buttonLabel="Buscar"
              fieldLabel="Buscar Servicio"
              className="search-field"
              onChangeResults={onChangeSearchResult} />

            <p className='subtitle'>Seleccione el servicio que se desea realizar</p>
            <div className="services-box">
              {
                searchResult.map(item => {
                  return (<p>{item.name}</p>)
                })
              }

              {/* {
                searchResult.map(item => {
                  return (
                    <div id={item.id} className="service">
                      <p>{item.name}</p>
                      <div className="service-img">
                      </div>
                      <p>${item.cost}</p>
                    </div>
                  )
                })
              } */}
            </div>
          </div>
        }
      />
    </div>
  );
}
