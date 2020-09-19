import React, { useContext, useEffect, useState } from 'react';
import BarberAction from '../actions/Barber.actions';
import moment from 'moment';
import { FaCut, FaGift } from 'react-icons/fa';
import { GiPaintedPottery } from 'react-icons/gi';
import { ButtonContext } from '../contexts/ButtonsContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { BarberListContext } from '../contexts/BarberListContext';
import { IBarber } from '../types/Barber.type';
import { LoaderPage } from '../components/loader-page/loader-page';
import { Toolbar } from '../components/toolbar/toolbar';
import { BarbersCard } from '../components/main-page/barbers-cardv2/barber-card';
import { AboutUsCard } from '../components/main-page/about-us-card/about-us-card';
import { HomeFooter } from '../components/main-page/home-footer/home-footer';
import { CoursesCard } from '../components/main-page/courses-card/course-card';
import { Banner } from '../components/main-page/banner/banner';
import { ServicesCard } from '../components/main-page/services-card/service-card';
import './index.scss';

const IndexPage = () => {
  const [barbers, setBarbers] = useState([]);
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  const {
    // @ts-ignore
    setDisabledButton,
    disabled
  } = useContext(ButtonContext);
  const {
    // @ts-ignore
    setBarberList,
  } = useContext(BarberListContext);

  const barberActions = new BarberAction();

  useEffect(() => {

    const fetchData = async () => {
      let resultBarbers = null;
      do {
        resultBarbers = await getBarbers();
      } while (!resultBarbers);

      setBarbers(resultBarbers);
      setBarberList(resultBarbers); // save in store
    }

    // execute the async function
    setDisabledButton(true);
    fetchData();
    setDisabledButton(false);

  }, [])

  const pageInfo = {
    name: "Art Experience",
    slogan: "Space for Men",
    openTimeLV: "11 a 19hs",
    openTimeSBD: "10 a 18hs",
    number: "22913056",
    cel: "095 499 023",
    email: "art.experience.uy.2020@gmail.com",
    instagram: 'https://www.instagram.com/artexperiencee/',
    facebook: 'https://www.facebook.com/artexperiencee/?epa=SEARCH_BOX',
    aboutUsTitle: "Acerca de Nosotros",
    aboutUs: `En Art Experience nos enfocamos en el cliente, no es solo un corte de pelo, sino que es una experiencia competa desde que el cliente ingresa al local hasta que se retira, cada aspecto es importante. El ambiente la música, la atención, etc. 
    Intentando superarnos y mejorar cada día para obtener una mejor experiencia del cliente. Eso nos diferencia del resto. Gracias por elegirnos.`,
    servicesTitle: "Nuestros Servicios",
    services:
      "Brindamos servicios de calidad y asesoramiento personalizado",
    coursesTitle: "Nuestros Cursos",
    courses: "Ofrecemos cursos para aumentaran su experiencia",
    contactUsTitle: "Contactenos",
    contactUs: "Comuniquese con nosotros para mas informacion"
  };
  const services = [
    {
      icon: <FaCut className="service-icon" />,
      name: "Cortes",
      info:
        "La mejor calidad de cortes modernos y clasicos",
      url: "Read More"
    },
    {
      icon: <GiPaintedPottery className="service-icon" />,
      name: "Colores",
      info:
        "Toda la gama de colores y el mejor proceso de tintado, protegiendo la salud del cabello",
      url: "Read More"
    },
    {
      icon: <FaGift className="service-icon" />,
      name: "Promos",
      info:
        "Beneficios en seleccion de servicios especiales, tales como combos y productos",
      url: "Read More"
    },
  ];
  const courses = [
    {
      name: "INTENSIVO",
      duration: "4 meses", //  / 1 clase por semana a partir de las 13:30hrs
      info: `
      El curso incluye los materialez a utilizar en el mismo.
      Conoceras y entenderas las diferentes tecnicas y conceptos que \nte harán ser un barbero
      capaz de Manejar, Utilizar y Perfeccionar estilos de las ultimas tendendias.
      \nFreestyle \nFade (Degradé) \nPeinados \nMarketing \nFotografia \nParticiones y secciones de la cabeza\n`,
      cost: `
      Contamos con  2 posibilidades de pago:
         - Contado :   $ 13.000\n 
         - Financiado: $ 4.000 (hasta en 4 cuotas)\n\n
      Posibilidad de reservar un lugar con una seña de $1500
      `,
      icon: "event",
      img: "https://i.ibb.co/WPb2qQJ/modelo-10.jpg",
      url: "Read More"
    },
    {
      name: "COLOMETRIA",
      info: `
      Tiene los materiales incluidos.\n
      Se realizaran los siguientes trabajos en cada uno de los modelos\n
      dando lugar a poder conocer las diferentes tecnicas aplicadas para cada una de los colores aplicados.
      
      \nEn la clase trabajamos con 3 modelos.\n
      1 - Modelo: Platinado\n
      2 - Modelo: Fantasia\n
      3 - Modelo: Mechitas\n

      Este curso le otorgará un certificado de concurrencia
      Fecha a coordinar 
      `,
      duration: "6 Horas",
      cost: 'El curso tiene un costo de $8.000',
      icon: "event",
      img:
        "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/58409183_137399877418737_8950341037487835391_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=ghmBqUjlw2cAX_cKRlu&_nc_tp=18&oh=db69053f9623d99bbe45100e522a76e6&oe=5F7B92FC",
      url: "Read More"
    },
    {
      name: "AVANZADO",
      info: `
        En este perfeccionamientoTrabajamos con 4 modelos,
        En los cuales haremos 3 estilos diferentes:\n 
         1 - FrenchCrop.\n 2 - Pompadour.\n 3 - Classic Cuts\n
      `,
      duration: "2 dias", //  / 2 cortes diarios
      cost: 'El curso tiene un costo de $6.000',
      icon: "event",
      img:
        "https://i.ibb.co/S3yctcs/modelo-13.jpg",
      url: "Read More"
    }
  ];
  const aboutusPictures = [
    { url: 'https://i.ibb.co/9ZqynfD/Premiacion-Barber-Shop-Style.jpg' },
  ]
  const dividers = [
    {
      img: "https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/57488298_2276560875734649_7666756016645949298_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=MskQCPZA-BkAX_omsCq&oh=44ff4fcc828dcbe2403bedd48f6383e6&oe=5F57538C",
      align: 'right'
    },
    {
      img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/54800426_106275450418894_8601708499349892562_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=q4qz70Pjc80AX-b06U8&oh=3251c0cae9f80fbccf8e56c45667f64f&oe=5F30DAD3",
      align: 'left'
    },
    {
      img: "https://scontent.fmvd4-1.fna.fbcdn.net/v/t1.0-9/s960x960/45230851_310326229560512_8082084365997178880_o.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=LwkdhjYPttcAX8sw6hk&_nc_ht=scontent.fmvd4-1.fna&_nc_tp=7&oh=e90cde8ea10295ce8a00a64d7e1cae1a&oe=5F565319",
      align: 'right'
    }
  ];

  const getBarbers = async () => {
    const response: IBarber[] = await barberActions.getAll();
    if (response) {
      barbers.map((barber: IBarber) => {
        // formatting data
        barber.startDate = moment(barber.startDate).format('DD/MM/YYYY hh:mm:ss').substr(0, 16);
        barber.job = 'Professional Barber';
      })
      return response;
    }
    return undefined
  }

  return (
    <div className="index_page">
      <div className="toolbar-box">
        <Toolbar />
      </div>
      <div className="page-box">
        <div className="dashboard">
          <div id="banner" />
          <Banner />
          <div id="about_us" />

          <AboutUsCard
            title={pageInfo.aboutUsTitle}
            info={pageInfo.aboutUs}
            picture={aboutusPictures[0].url}
          />
          <div id="barbers" />
          {barbers.length ? (
            <BarbersCard barbers={barbers}
              title="Nuestros Barberos"
              subTitle={""}
            />
          ) : null}
          <div id="services" />
          <ServicesCard
            services={services}
            title={pageInfo.servicesTitle}
            subTitle={pageInfo.contactUs} />
          <div id="courses" />
          <CoursesCard
            courses={courses}
            title={pageInfo.coursesTitle}
            subTitle={pageInfo.contactUs} />
          <div id="contact" />
          <HomeFooter
            title={pageInfo.contactUsTitle}
            subtitle={pageInfo.contactUs}
            email={pageInfo.email}
            instagram={pageInfo.instagram}
            facebook={pageInfo.facebook}
            theme="light"
          />
        </div>
      </div >
      <LoaderPage show={disabled} />
    </div >
  );
};

IndexPage.displayName = 'Index Page';
export default IndexPage;
