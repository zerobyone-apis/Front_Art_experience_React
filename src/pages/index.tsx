import React, { Fragment, useEffect } from 'react';
import { LeftMenu } from '../components/LeftMenu';
import { Toolbar } from '../components/Toolbar';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import './index.scss';
import * as Icons from 'react-icons/fa';
import BarberAction from '../actions/Barber.actions';

const IndexPage = () => {
  const barberActions = new BarberAction();

  async function getBarbers() {
    await barberActions.getAll()
  }

  const employees = [
    {
      barberId: 1,
      userId: 1,
      name: "Mariano Moreno",
      job: "Profecional Barber",
      amountCuts: 2,
      clientsBarber: 5,//amountClients
      rateOfBarber: 0,//prestige
      amountOfReservesByDay: 10,//amountDailyReserves
      info: "",
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
      info: '2 años de experiencia laboral comenzó cortando en su casa y luego se incorporó al equipo art donde fue capacitado por Mariano Moreno se destaca en su gran atencion al publico por su buen freestyle',
      img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/77094002_605862643493062_9053649117496349366_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=EL9qbeJc2QQAX8ZwTaZ&oh=acda434810cd3a8546c350c24dda8b7d&oe=5F283230",
      instagram: "https://www.instagram.com/mernis.01/",
      facebook: "https://www.facebook.com/TheUniqueDesign"
    }
  ];
  const pageInfo = {
    name: "Art Experience",
    slogan: "Space for Men",
    openTimeLV: "11 a 19hs",
    openTimeSBD: "10 a 18hs",
    number: "22913056",
    cel: "099 999 999",
    email: "artexperience@gmail.com",
    instagram: 'https://www.instagram.com/artexperiencee/',
    facebook: 'https://www.facebook.com/artexperiencee/?epa=SEARCH_BOX',
    aboutUsTitle: "Acerca de Nosotros",
    aboutUs:
      "Art Experience brinda servicios de calidad dedicados a gestion de barberias y administracion de reservas para clientes.",
    servicesTitle: "Nuestros Servicios",
    services:
      "Brindamos servicios de calidad que facilitan su trabajo y aumenta su productividad.",
    coursesTitle: "Nuestros Cursos",
    courses: "Ofrecemos cursos para aumentaran su experiencia",
    contactUsTitle: "Contactenos",
    contactUs: "Comuniquese con nosotros para mas informacion"
  };
  const services = [
    {
      icon: "event",
      name: "Clasico",
      info:
        "La gestion automatizada de las reservas mejora el rendimiento y la facilidad de uso.",
      url: "Read More"
    },
    {
      icon: "event",
      name: "Estilo Libre",
      info:
        "Tendra toda la informacion de su barberia, incluyendo a sus barberos, productos y promociones",
      url: "Read More"
    },
    {
      icon: "Tratamiento Facial",
      name: "Perfil del barbero",
      info:
        "Contendra toda la informacion del barbero, incluyendo sus trabajos y opiniones de los clientes",
      url: "Read More"
    },
  ];
  const courses = [
    {
      name: "Curso intensivo",
      duration: "4 meses / 1 clase por semana a partir de las 13:30hrs",
      info: `
      Es un curso intensivo en donde se aprendera:
      técnicas de fade
      - uso correspondiente de las herramientas 
      - barbas
      - freestyle 
      - peinados 
      - marketing 
      -fotografia 
      - atención al publico
      -particiones y secciones de la cabeza
      `,
      cost: `
      Contamos con  2 posibilidades de pago:
      Contado : $ 13.000 
      Financiado: $ 4.000 en 4 cuotas
      Posibilidad de reservar un lugar con una seña de $1500
      `,
      icon: "event",
      img:
        "https://www.inquirer.com/resizer/orhvGzXeXNLr2xpL6_d81Lv-IQE=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/PTR2I5SGUNHJJGUGMHSGXFFCKU.jpg",
      url: "Read More"
    },
    {
      name: "Perfeccionamiento de colorimentria",
      info: `
      Tiene los materiales incluidos.
      En la clase trabajamos con 3 modelos:
      Modelo 1 platinado
      - Modelo 2 fantasia
      - Modelo 3 mechitas.
      Va con certificado de concurrencia y la fecha a es coordinar
      `,
      duration: "3 meses",
      cost: 'El curso tiene un costo de $8.000',
      icon: "event",
      img:
        "https://www.inquirer.com/resizer/orhvGzXeXNLr2xpL6_d81Lv-IQE=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/PTR2I5SGUNHJJGUGMHSGXFFCKU.jpg",
      url: "Read More"
    },
    {
      name: "Perfeccionamiento de corte",
      info: `
        Trabajamos con 4 modelos hacemos 3 estilos diferentes por ej: 
        french crop pompadour y classic cuts.
      `,
      duration: "2 dias / 2 cortes diarios",
      cost: 'El curso tiene un costo de $6.000',
      icon: "event",
      img:
        "https://www.inquirer.com/resizer/orhvGzXeXNLr2xpL6_d81Lv-IQE=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/PTR2I5SGUNHJJGUGMHSGXFFCKU.jpg",
      url: "Read More"
    }
  ];
  const dividers = [
    {
      img: "https://kontinent.se/wp-content/uploads/Barbershop_7.jpg",
      align: 'right'
    },
    {
      img: "http://pointbarber.com/images/home-slideshow/pointbarber-slideshow2.jpg",
      align: 'left'
    },
    {
      img: "https://kontinent.se/wp-content/uploads/Barbershop_7.jpg",
      align: 'right'
    }
  ];
  const getListEmployees = () => {
    return employees.map((employee, i) =>
      <div
        className="employee-item"
        key={i}
      >
        <img className="employee-img" src={employee.img} aspect-ratio="1"></img>
        <p className="employee-name art_experience-text-light">{employee.name}</p>
        <p className="employee-info art_experience-text-light">{employee.job}</p>
        {/* <p className="employee-info art_experience-text-light">{employee.info}</p> */}

        <div className="employee-social">
          <a href={employee.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <Icons.FaInstagram className="employee-social-logo social-logo" />
          </a>
          <a href={employee.facebook}>
            <Icons.FaFacebook className="employee-social-logo social-logo" />
          </a>
        </div>
      </div>
    )
  }
  const getListServices = () => {
    return services.map((service, i) =>
      <div
        className="service-item"
        key={i}
      >
        <Icons.FaHome className="service-icon" />
        <p className="service-name art_experience-text-light">{service.name}</p>
        <p className="service-info art_experience-text-light">{service.info}</p>
      </div>
    )
  }
  const getListCourses = () => {
    return courses.map((course, i) =>
      <div
        className="course-item"
        key={i}
      >
        <p className="course-name art_experience-text-light">{course.name}</p>
        <img className="course-img" aspect-ratio="1" src={course.img}></img>
        <p className="course-duration art_experience-text-light">Duracion: {course.duration}</p>
        <p className="course-info art_experience-text-light">{course.info}</p>
        <p className="course-info art_experience-text-light">{course.cost}</p>
      </div >
    )
  }
  const getFooter = () => {
    return (
      <div className="footer">
        <p className="logo art_experience-text-light" data-aos="fade-up" data-aos-duration="600">Art Experience</p>
        <p className="footer-email art_experience-text-light">{pageInfo.email}</p>
        <div className="footer-social">

          <a href={pageInfo.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <Icons.FaInstagram className="footer-social-logo social-logo" />
          </a>
          <a href={pageInfo.facebook}>
            <Icons.FaFacebook className="footer-social-logo social-logo" />
          </a>
        </div>
        <p className="footer-bussiness art_experience-text-light">© 2019 Art Experience</p>
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
            <div className="banner-img" />
            <div className="title-box">
              <div className="box-shadow_space">
              </div>
              <img className="logo-img" src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
              <div className="box-shadow_logo">
              </div>
            </div>
          </div>
          <div id="about_us" />
          <Card title={pageInfo.aboutUsTitle} subtitle={pageInfo.aboutUs}>
            {getListEmployees()}
          </Card>
          <Divider align={dividers[1].align} img={dividers[1].img} />
          <div id="services" />
          <Card title={pageInfo.servicesTitle} subtitle={pageInfo.services}>
            {getListServices()}
          </Card>
          <Divider align={dividers[2].align} img={dividers[2].img} />
          <div id="courses" />
          <Card title={pageInfo.coursesTitle} subtitle={pageInfo.courses}>
            {getListCourses()}
          </Card>
          <Divider align={dividers[1].align} img={dividers[1].img} />
          <div id="contact" />
          <Card title={pageInfo.contactUsTitle} subtitle={pageInfo.contactUs}>
            {getFooter()}
          </Card>
        </div>
      </div >
    </div >
  );
};

IndexPage.displayName = 'Index Page';
export default IndexPage;
