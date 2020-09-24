import React, { useContext, useEffect, useState } from 'react';
import BarberAction from '../actions/Barber.actions';
import moment from 'moment';
import { FaGift, FaCartArrowDown } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { GiCoffeeCup, GiBeard, GiPaintedPottery } from 'react-icons/gi';
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

  const pageInfo = {
    name: 'Art Experience',
    slogan: '',
    openTimeLV: '11 a 19hs',
    openTimeSBD: '10 a 18hs',
    number: '22913056',
    cel: '095 499 023',
    email: 'art.experience.uy.2020@gmail.com',
    instagram: 'https://www.instagram.com/artexperiencee/',
    facebook: 'https://www.facebook.com/artexperiencee/?epa=SEARCH_BOX',
    aboutUsTitle: 'Acerca de Nosotros',
    aboutUs: `En Art Experience nos enfocamos en el cliente 
    \n..No es solo un corte de Pelo..
    \n Es una experiencia completa desde que el cliente 
    \ningrese al local hasta que se retire.
    \n Creemos que cada aspecto es ¡importante!. 
    \n \"... El Ambiente, La Música y nuestra Atención ...\"
    \n Seran algunos de los aspectos que experimentaras en nuestro local.
    \n Queremos que cada cliente encuentre su lugar,  
    \n el confort de adecuarse al ambiente y sentirse cómodo y en buena compañía.
    \n Nuestro equipo esta constantemente intentando superarse y mejorar cada día para brindar una mejor experiencia al cliente.
    \n Ese es el valor agregado de nuestro servicios 
    \n .. Queremos que marcar la diferencia ..
    \n \n Disfrute de los nuevos servicios`,
    servicesTitle: 'Nuestros Servicios',
    services: 'Brindamos Servicios de Calidad y Asesoramiento Personalizado',
    coursesTitle: 'Nuestros Cursos',
    courses: 'Ofrecemos Cursos para Aumentaran su Experiencia',
    contactUsTitle: 'Contactenos',
    contactUs: 'Contactenos para mas informacion',
  };
  const services = [
    {
      icon: <GiBeard className="service-icon" />,
      name: 'Barberia',
      info:
        'La mejor calidad de Cortes Modernos y Clasicos,\n Barbas, Cejas, Black Mask',
      url: 'Read More',
    },
    {
      icon: <FiUserPlus className="service-icon" />,
      name: 'Peluqueria',
      info:
        'Incorporamos la mejor calidad en \nCortes, Colores y Peinados para Damas',
      url: 'Read More',
    },
    {
      icon: <GiCoffeeCup className="service-icon" />,
      name: 'CoffeShop',
      info:
        'El nuevo servicio de cafeteria \nTragos y un Menu para que puedas disfrutar',
      url: 'Read More',
    },
    {
      icon: <FaCartArrowDown className="service-icon" />,
      name: 'Productos',
      info:
        'La mejor calidad en todos los productos \n para que tu cuidado personal',
      url: 'Read More',
    },
    {
      icon: <FaGift className="service-icon" />,
      name: 'Beneficios',
      info:
        'Beneficios y descuentos en todos nuestros servicios \npara usuarios de la barberia',
      url: 'Read More',
    },
  ];
  const courses = [
    {
      name: 'INTENSIVO',
      duration: '4 meses', //  / 1 clase por semana a partir de las 13:30hrs
      info: `
      El curso incluye los materiales a utilizar en el mismo.
      Conoceras y entenderas las diferentes tecnicas y conceptos claves 
      \nQue te harán ser un barbero capaz de Manejar, Utilizar y Perfeccionar. 
      \n 🏆 Estilos de las últimas tendencias 🏆
      \n ➬ Freestyle      
      \n ➫ Fade (Degradé) 
      \n ➬ Peinados       
      \n ➫ Marketing      
      \n ➬ Fotografia     
      \n ➬ Particiones y secciones de la cabeza 
      \n..🕒 Duración 4 meses ..
      \n... 🗓️ Fecha a coordinar ...`,
      cost: ` \n💈 Formas de Pago 💈  \n
         \n Contamos con 2 posibilidades de pago 🙌
         \n 👉 Contado:   💲 13.000 
         \n 👉 Financiado: 💲 4.000 (hasta en 4 cuotas) 
         \n \nPosibilidad de reservar un lugar con una seña de 💲 1.500 
      `,
      icon: 'event',
      img: 'https://i.ibb.co/WPb2qQJ/modelo-10.jpg',
      url: 'Read More',
    },
    {
      name: 'COLOMETRIA',
      info: `
      Materiales incluidos.
      \nSe realizaran los siguientes trabajos en cada uno de los modelos
      \nDando lugar a poder conocer las diferentes técnicas 
      \nutilizadas en cada color que apliquemos en el curso.
      
      \n🏆 En la clase trabajamos con 3 modelos 🏆
      \n ➬ 👦 Platinado
      \n ➫ 👧 Fantasia
      \n ➬ 👩 Mechitas

      Este curso le otorgará un certificado de concurrencia
      \n..🕒 Duración 6 Horas ..
      ... 🗓️ Fecha a coordinar ... 
      `,
      duration: '6 Horas',
      cost: `\n💈 Formas de Pago 💈  \n
           \n Contamos con 1 posibilidad de pago 🙌
           \n 👉 Contado:   💲 8.000 
      \n \nPosibilidad de reservar un lugar con una seña de 💲 1.000 
   `,
      icon: 'event',
      img:
        'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/58409183_137399877418737_8950341037487835391_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=ghmBqUjlw2cAX_cKRlu&_nc_tp=18&oh=db69053f9623d99bbe45100e522a76e6&oe=5F7B92FC',
      url: 'Read More',
    },
    {
      name: 'AVANZADO',
      info: `
          En este perfeccionamiento Trabajaremos con 4 modelos
        \nEn los cuales se realizaran 3 estilos diferentes.
        \nTendras la oportunidad de expandir tus conocimientos. 
        \nRealizando tres de los estilos mas demandados 🚀
        \nLa modalidad sera, escojeras uno de los estilos que mas te guste.
        \nUna vez que escojas ese estilo, Lo applicarás en dos de tus modelos.
        \nmientras que los otros dos modelos, se les hará los demas estilos.
       
        \n 🏆 Estos son los estilos que aprenderas a realizar 🏆  
        \n ➬ 👦 FrenchCrop 
        \n ➫ 👦 Pompadour
        \n ➬ 👦 Classic Cuts
        \n..🕒 Duración 6 Horas ..
        \n ... 🗓️ Fecha a coordinar ... 
      `,
      duration: '2 dias', //  / 2 cortes diarios
      cost: `\n💈 Formas de Pago 💈  \n
             \n Contamos con 1 posibilidad de pago 🙌
             \n 👉 Contado:   💲 6.000 
             \n \nPosibilidad de reservar un lugar con una seña de 💲 1.000`,
      icon: 'event',
      img: 'https://i.ibb.co/S3yctcs/modelo-13.jpg',
      url: 'Read More',
    },
  ];
  const aboutusPictures = [
    { url: 'https://i.ibb.co/9ZqynfD/Premiacion-Barber-Shop-Style.jpg' },
  ];
  const dividers = [
    {
      img:
        'https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/57488298_2276560875734649_7666756016645949298_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=MskQCPZA-BkAX_omsCq&oh=44ff4fcc828dcbe2403bedd48f6383e6&oe=5F57538C',
      align: 'right',
    },
    {
      img:
        'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/54800426_106275450418894_8601708499349892562_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=q4qz70Pjc80AX-b06U8&oh=3251c0cae9f80fbccf8e56c45667f64f&oe=5F30DAD3',
      align: 'left',
    },
    {
      img:
        'https://scontent.fmvd4-1.fna.fbcdn.net/v/t1.0-9/s960x960/45230851_310326229560512_8082084365997178880_o.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=LwkdhjYPttcAX8sw6hk&_nc_ht=scontent.fmvd4-1.fna&_nc_tp=7&oh=e90cde8ea10295ce8a00a64d7e1cae1a&oe=5F565319',
      align: 'right',
    },
  ];
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  const {
    // @ts-ignore
    setDisabledButton,
    disabled,
  } = useContext(ButtonContext);
  const {
    // @ts-ignore
    setBarbersList,
    getBarbersList,
  } = useContext(BarberListContext);
  const barberActions = new BarberAction();

  useEffect(() => {
    const fetchData = async () => {
      let resultBarbers = null;
      do {
        resultBarbers = await getBarbers();
      } while (!resultBarbers);

      setBarbersList(resultBarbers); // save in store
      setBarbers(resultBarbers);
    };

    // execute the async function
    setDisabledButton(true);
    fetchData();
    setDisabledButton(false);
  }, []);

  const getBarbers = async () => {
    const response: IBarber[] = await barberActions.getAll();
    if (response) {
      barbers.map((barber: IBarber) => {
        // formatting data
        barber.startDate = moment(barber.startDate)
          .format('DD/MM/YYYY hh:mm:ss')
          .substr(0, 16);
      });
      return response;
    }
    return undefined;
  };

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
            <BarbersCard
              barbers={barbers}
              title="Nuestros Barberos"
              subTitle={''}
            />
          ) : null}
          <div id="services" />
          <ServicesCard
            services={services}
            title={pageInfo.servicesTitle}
            subTitle={pageInfo.contactUs}
          />
          <div id="courses" />
          <CoursesCard
            courses={courses}
            title={pageInfo.coursesTitle}
            subTitle={pageInfo.contactUs}
          />
          <div id="contact" />
          <HomeFooter
            title={pageInfo.contactUsTitle}
            subtitle={pageInfo.contactUs}
            email={pageInfo.email}
            number={pageInfo.number}
            instagram={pageInfo.instagram}
            facebook={pageInfo.facebook}
            theme="light"
          />
        </div>
      </div>
      <LoaderPage show={disabled} />
    </div>
  );
};

IndexPage.displayName = 'Index Page';
export default IndexPage;
