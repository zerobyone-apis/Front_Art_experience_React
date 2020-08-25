import React, { useContext, useEffect, useState } from 'react';
import { FaCut, FaGift } from 'react-icons/fa';
import { GiPaintedPottery } from 'react-icons/gi';
import BarberAction from '../actions/Barber.actions';
import { ButtonContext } from '../contexts/ButtonsContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { BarberListContext } from '../contexts/BarberListContext';
import { Card } from '../components/card/card';
import { IBarber } from '../types/Barber.type';
import { LoaderPage } from '../components/loader-page/loader-page';
import { Toolbar } from '../components/toolbar/toolbar';
import moment from 'moment';
import { BarbersCard } from '../components/main-page/barbers-card/barber-card';
import { AboutUsCard } from '../components/main-page/about-us-card/about-us-card';
import { HomeFooter } from '../components/main-page/home-footer/home-footer';
import { CoursesCard } from '../components/main-page/courses-card/course-card';
import { Banner } from '../components/main-page/banner/banner';
import { ServicesCard } from '../components/main-page/services-card/service-card';
import './index.scss';
// import '../styles/Effects.scss';
// import '../styles/theme.scss';
import '../styles/ArtExperienceButtons.scss';

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
    setDisabledButton(true);
    getBarbers().then(response => {
      setBarbers(response);
      setBarberList(response); // save in store
      setDisabledButton(false);
    });
    // TODO
    // getPageInfo();
    // getServices();
    // getCourses();
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
    aboutUs: `
      En Art Experience nos enfocamos en brindar un servicio excepcional con la finalidad de que nuestros clientes se sientan comodos y agustos \n
      en un ambiente muy divertido y profesional en el cual se valora el tiempo de cada uno de nuestros clientes\n 
      logrando que cada trabajo sea exclusivo que \nhará resaltar u obtener el estilo que tanto buscas en ese corte o delineado. \n
      sabemos muy bien que la barberia es una zona de relajacion donde a muchos de nuestros clientes les gusta venir a relajarse y disfrutar de un ambiente amistoso, agradable,
      \n haciendo que cada session de corte sea entretenida y relejante.
      Con nuestros servicios los clientes tendran varias opciones para elegir antes de ser atendidos y obtener el resultado esperado`,
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
      name: "Curso intensivo",
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
      img: "https://www.inquirer.com/resizer/orhvGzXeXNLr2xpL6_d81Lv-IQE=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/PTR2I5SGUNHJJGUGMHSGXFFCKU.jpg",
      // img: "https://www.inquirer.com/resizer/orhvGzXeXNLr2xpL6_d81Lv-IQE=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/PTR2I5SGUNHJJGUGMHSGXFFCKU.jpg",
      url: "Read More"
    },
    {
      name: "Perfeccionamiento de colorimentria",
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
        "https://www.inquirer.com/resizer/orhvGzXeXNLr2xpL6_d81Lv-IQE=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/PTR2I5SGUNHJJGUGMHSGXFFCKU.jpg",
      url: "Read More"
    },
    {
      name: "Perfeccionamiento de corte",
      info: `
        En este perfeccionamientoTrabajamos con 4 modelos,
        En los cuales haremos 3 estilos diferentes:\n 
         1 - FrenchCrop.\n 2 - Pompadour.\n 3 - Classic Cuts\n
      `,
      duration: "2 dias", //  / 2 cortes diarios
      cost: 'El curso tiene un costo de $6.000',
      icon: "event",
      img:
        "https://www.inquirer.com/resizer/orhvGzXeXNLr2xpL6_d81Lv-IQE=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/PTR2I5SGUNHJJGUGMHSGXFFCKU.jpg",
      url: "Read More"
    }
  ];
  const aboutusPictures = [
    { url: 'https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/57488298_2276560875734649_7666756016645949298_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=MskQCPZA-BkAX_omsCq&oh=44ff4fcc828dcbe2403bedd48f6383e6&oe=5F57538C' },
    // { url: 'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/54800426_106275450418894_8601708499349892562_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=q4qz70Pjc80AX-b06U8&oh=3251c0cae9f80fbccf8e56c45667f64f&oe=5F30DAD3' }
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
            pictures={aboutusPictures}
          />
          <div id="services" />
          <ServicesCard
            services={services}
            title={pageInfo.servicesTitle}
            subTitle={pageInfo.contactUs} />
          <div id="barbers" />
          <BarbersCard barbers={barbers} />
          <div id="courses" />
          <CoursesCard
            courses={courses}
            title={pageInfo.coursesTitle}
            subtitle={pageInfo.contactUs} />
          <div id="contact" />
          <Card
            title={pageInfo.contactUsTitle}
            subtitle={pageInfo.contactUs}>
            <HomeFooter
              email={pageInfo.email}
              instagram={pageInfo.instagram}
              facebook={pageInfo.facebook} />
          </Card>
        </div>
      </div >
      <LoaderPage show={disabled} />
    </div >
  );
};

IndexPage.displayName = 'Index Page';
export default IndexPage;
