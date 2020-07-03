import React, { Fragment } from 'react';
import { LeftMenu } from '../components/LeftMenu';
import { Toolbar } from '../components/Toolbar';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import './Dashboard.scss';
import * as Icons from 'react-icons/fa';

const IndexPage = () => {
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
      name: "Gestion de reservas",
      info:
        "La gestion automatizada de las reservas mejora el rendimiento y la facilidad de uso.",
      url: "Read More"
    },
    {
      icon: "home",
      name: "Perfil de la barberia",
      info:
        "Tendra toda la informacion de su barberia, incluyendo a sus barberos, productos y promociones",
      url: "Read More"
    },
    {
      icon: "people",
      name: "Perfil del barbero",
      info:
        "Contendra toda la informacion del barbero, incluyendo sus trabajos y opiniones de los clientes",
      url: "Read More"
    },
    {
      icon: "star",
      name: "Sistema de puntuaciones",
      info:
        "Tendra una puntuacion su barberia, la cual aumentara el numero de clientes",
      url: "Read More"
    },
    {
      icon: "info",
      name: "Notificaciones",
      info: "Se mantendra informado de toda la actividad de sus clientes",
      url: "Read More"
    }
  ];
  const courses = [
    {
      icon: "event",
      img:
        "https://www.inquirer.com/resizer/orhvGzXeXNLr2xpL6_d81Lv-IQE=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/PTR2I5SGUNHJJGUGMHSGXFFCKU.jpg",
      name: "Basico",
      duration: "3 meses",
      info: "Curso basico de corte y estilo.",
      url: "Read More"
    },
    {
      icon: "home",
      img:
        "https://static.wixstatic.com/media/bd10eec5564a47b78638ff005f18261d.jpg/v1/crop/x_1203,y_720,w_6156,h_4191/fill/w_602,h_600,al_c,q_85,usm_0.66_1.00_0.01/Barber%20Shop.webp",
      name: "Perfeccionamiento",
      duration: "4 meses",
      info: "Curso de perfeccionamiento de corte y estilo.",
      url: "Read More"
    },
    {
      icon: "people",
      img:
        "https://hairstyleonpoint.com/wp-content/uploads/2017/04/v-shaped-low-fade-mens-haircut.jpg",
      name: "Avanzado",
      duration: "5 meses",
      info: "Curso avanzado de corte y estilo.",
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
        <p className="employee-name">{employee.name}</p>
        <p className="employee-info">{employee.job}</p>
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
        <p className="service-name">{service.name}</p>
        <p className="service-info">{service.info}</p>
      </div>
    )
  }

  const getListCourses = () => {
    return courses.map((course, i) =>
      <div
        className="course-item"
        key={i}
      >
        <p className="course-name">{course.name}</p>
        <img className="course-img" aspect-ratio="1" src={course.img}></img>
        <p className="course-duration">duracion: {course.duration}</p>
        <p className="course-info">{course.info}</p>
      </div >
    )
  }

  const getFooter = () => {
    return (
      <div className="footer">
        <p className="logo" data-aos="fade-up" data-aos-duration="600">Art Experience</p>
        <p className="footer-email">{pageInfo.email}</p>
        <div className="footer-social">

          <a href={pageInfo.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <Icons.FaInstagram className="footer-social-logo social-logo" />
          </a>
          <a href={pageInfo.facebook}>
            <Icons.FaFacebook className="footer-social-logo social-logo" />
          </a>
        </div>
        <p className="footer-bussiness">© 2019 Art Experience</p>
      </div>
    )
  }

  return (
    <div className="index_page">
      <Toolbar />
      <div className="page-box">
        {/* <LeftMenu /> */}
        <div className="dashboard">
          <div className="banner">
            <div className="title-box">
              <p className="title font-title">{pageInfo.name}</p>
              <p className="sub-title font-title">{pageInfo.slogan}</p>
            </div>
            <div className="banner-img" />
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
