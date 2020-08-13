import './index.scss';
import '../styles/Effects.scss';
import '../styles/ArtExperienceButtons.scss';

import React, { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCut, FaGift, FaInstagram, FaFacebook } from 'react-icons/fa';
import { GiPaintedPottery } from 'react-icons/gi';

import BarberAction from '../actions/Barber.actions';
import { Button } from '../components/Button';
import { ButtonContext } from '../contexts/ButtonsContext';
import { BarberListContext } from '../contexts/BarberListContext';
import { Card } from '../components/Card';
import { DialogModal } from '../components/DialogModal';
import { Divider } from '../components/Divider';
import { IBarber } from '../types/Barber.type';
import { LoaderPage } from '../components/LoaderPage';
import { Toolbar } from '../components/Toolbar';
import moment from 'moment';

const IndexPage = () => {
  const [showDialogCourse, setShowDialogCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [barbers, setBarbers] = useState([]);

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
      img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/43490422_709651562739316_4357652159001526272_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=7YqzfuNMHbMAX-_3tw5&oh=9ef930cc35eec708b3c616984ce7aa5c&oe=5F3401A6",
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
        "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/58409183_137399877418737_8950341037487835391_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=GubE4LWr7IEAX_aM2cn&oh=7fffce0f31cd8bdf1b3b86a0a82cd985&oe=5F3461FC",
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
        "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/42445912_1055449394629308_9141098897463050240_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=RPxUTU8psqcAX_M2dDx&oh=8bc9581f0c52b504ccc3f2307e00d3e2&oe=5F310548",
      url: "Read More"
    }
  ];
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

  const getEmployees = () => {
    return barbers.map((employee, i) =>
      <div className="employee-item effect-opacity" key={i}>
        <p className="employee-name art_experience-text-light">{employee.name}</p>
        <div className="content-box">
          <img className="employee-img" src={employee.urlProfileImage} aspect-ratio="1"></img>
          <div className="info-box">
            <p className="employee-info effect-opacity art_experience-text-light">{employee.job}</p>
            <p className="employee-info effect-opacity art_experience-text-light">{employee.barberDescription}</p>
          </div>
          <p className="see-more effect-opacity art_experience-text-light">Pulse para mas información</p>
        </div>
        <div className="employee-social">
          <a href={employee.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <FaInstagram className="employee-social-logo social-logo" />
          </a>
          <a href={employee.facebook}>
            <FaFacebook className="employee-social-logo social-logo" />
          </a>
        </div>
      </div>
    )
  }

  const getServices = () => {
    return services.map((service, i) =>
      <div className="service-item" key={i}>
        {service.icon}

        {/* { ? (
          

          <FontAwesomeIcon
            icon={Icons[service.icon]}
            className="service-icon" />
        ) : null} */}
        <p className="service-name art_experience-text-light">{service.name}</p>
        <p className="service-info art_experience-text-light">{service.info}</p>
      </div>
    )
  }

  const getCourses = () => {
    return courses.map((course, i) =>
      <div className="course-item" key={i}>
        <p className="course-name art_experience-text-light">{course.name}</p>
        <img className="course-img" aspect-ratio="1" src={course.img}></img>
        <p className="course-duration art_experience-text-light">Duracion: {course.duration}</p>
        <Button className="see_more-btn art_experience-button_outlined"
          label="Ver mas"
          onClick={() => {
            setSelectedCourse(course);
            setShowDialogCourse(true);
          }} />
      </div >
    )
  }

  const getFooter = () => {
    return (
      <div className="footer">
        <img className="footer_logo-img effect-opacity" src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
        <p className="footer-email art_experience-text-light">{pageInfo.email}</p>
        <div className="footer-social">
          <a href={pageInfo.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <FaInstagram className="footer-social-logo social-logo" />
          </a>
          <a href={pageInfo.facebook}>
            <FaFacebook className="footer-social-logo social-logo" />
          </a>
        </div>
        <a className="footer-bussiness-link" href="https://www.instagram.com/zerobyone_/">
          <p className="art-text art_experience-text-light">© 2020 Art Experience - Desarrollado por ZeroByOne</p>
        </a>
      </div>
    )
  }

  return (
    <div className="index_page">
      <Toolbar />
      <div className="page-box">
        <div className="dashboard">
          <div id="banner" />
          <div className="banner">
            <div className="banner-img">
              <img src="https://lh6.googleusercontent.com/proxy/sGPIfOpDBdIbW2kUprDAFEa3kxMpBjhegwDGzZoRrxny1TQWUX666MXQlTr-ujrj-Nugzn9yCroQtUzRuMh6JZOrqP5HrJB59XN8N-WomzS6sONOPkb6HEtdTLZb6bC206svYLyh0UWBgvmc=s0-d" alt="" />
            </div>
            <div className="title-box">
              <div className="box-shadow_space">
              </div>
              <img
                className="logo-img effect-opacity"
                src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
              <div className="box-shadow_logo">
              </div>
            </div>
          </div>
          <div id="about_us" />
          <Card title={pageInfo.aboutUsTitle} subtitle={pageInfo.aboutUs}>
            {getEmployees()}
          </Card>
          <Divider align={dividers[1].align} img={dividers[0].img} />
          <div id="services" />
          <Card title={pageInfo.servicesTitle} subtitle={pageInfo.services}>
            {getServices()}
          </Card>
          <Divider align={dividers[2].align} img={dividers[1].img} />
          <div id="courses" />
          <Card title={pageInfo.coursesTitle} subtitle={pageInfo.courses}>
            {getCourses()}
          </Card>
          <Divider align={dividers[1].align} img={dividers[2].img} />
          <div id="contact" />
          <Card title={pageInfo.contactUsTitle} subtitle={pageInfo.contactUs}>
            {getFooter()}
          </Card>
        </div>
      </div >
      {!showDialogCourse ? null :
        <DialogModal
          className="dialog"
          title={selectedCourse.name}
          onClose={() => { setShowDialogCourse(false) }} >
          {selectedCourse.info.split('\n').map((item, i) => {
            return <p className="course-info art_experience-text-light" key={i}>{item}</p>
          })}
          <div className="divider"></div>
          {selectedCourse.cost.split('\n').map((item, i) => {
            return <p className="course-info art_experience-text-light" key={i}>{item}</p>
          })}
        </DialogModal>}
      <LoaderPage show={disabled} />
    </div >
  );
};

IndexPage.displayName = 'Index Page';
export default IndexPage;
