import React, { useState, useContext, useEffect } from 'react';
import { Toolbar } from '../components/Toolbar';
import { Card } from '../components/Card';
import { DialogModal } from '../components/DialogModal';
import { Divider } from '../components/Divider';
import { Button } from '../components/Button';
import * as Icons from 'react-icons/fa';
import BarberAction from '../actions/Barber.actions';
import { ButtonContext } from '../contexts/ButtonsContext';
import { LoaderPage } from '../components/LoaderPage';
import './index.scss';
import '../styles/ArtExperienceButtons.scss';
import { IBarber } from '../types/Barber.type';
import moment from 'moment';


const IndexPage = () => {
  // context
  const {
    // @ts-ignore
    disabled
  } = useContext(ButtonContext);

  const barberActions = new BarberAction();

  const [showDialogCourse, setShowDialogCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    getBarbers();
  }, [])

  const getBarbers = async () => {
    const barbers: IBarber[] = await barberActions.getAll();
    if (barbers) {
      // formatting date
      barbers.map((barber: IBarber) => {
        barber.startDate = moment(barber.startDate).format('DD/MM/YYYY hh:mm:ss').substr(0, 16);
        barber.job = 'Professional Barber';
      })
      setBarbers(barbers)
    }
  }


  /* ?  const employees = [
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
  
    */
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
      img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/43817515_183935092515961_6000014555973943296_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=kTnSWPExREMAX_FyY7p&oh=48bb5b4b313cb1997be070d53a800d08&oe=5F31C7A2",
      // img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/43367910_1351984181604340_350490896384393216_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Tc4IEcYpfOcAX8MyDhZ&se=7&oh=a2e734fdb106dca03958d2183fced125&oe=5F310F38",
      align: 'right'
    },
    {
      img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/54800426_106275450418894_8601708499349892562_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=q4qz70Pjc80AX-b06U8&oh=3251c0cae9f80fbccf8e56c45667f64f&oe=5F30DAD3",
      align: 'left'
    },
    {
      img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/40756317_547596808994027_4028564252884205568_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=srMCC6hpZMwAX-h656-&oh=c9e0bfbd7eb63d38243e9a5e08f99a99&oe=5F33820C",
      // img: "https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/54732253_1263206357161931_429745595166432294_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=cGjYvzoqLzQAX_vzeKj&oh=739a0d7634799d1dd4b860ceea4e3540&oe=5F341B10",
      align: 'right'
    }
  ];
  const getEmployees = () => {
    return barbers.map((employee, i) =>
      <div
        className="employee-item"
        key={i}
      >
        <img className="employee-img" src={employee.urlProfileImage} aspect-ratio="1"></img>
        <p className="employee-name art_experience-text-light">{employee.name}</p>
        <p className="employee-info art_experience-text-light">{employee.job}</p>
        <p className="employee-info art_experience-text-light">{employee.barberDescription}</p>
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

  const getServices = () => {
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

  const getCourses = () => {
    return courses.map((course, i) =>
      <div
        className="course-item"
        key={i}
      >
        <p className="course-name art_experience-text-light">{course.name}</p>
        <img className="course-img" aspect-ratio="1" src={course.img}></img>
        <p className="course-duration art_experience-text-light">Duracion: {course.duration}</p>
        <Button
          className="see_more-btn art_experience-button_outlined"
          label="Ver mas"
          onClick={() => {
            setSelectedCourse(course);
            setShowDialogCourse(true);
          }}
        />
      </div >
    )
  }

  const getFooter = () => {
    return (
      <div className="footer">
        <img className="footer_logo-img" src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
        {/* <p className="logo art_experience-text-light">Art Experience</p> */}
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
        <a className="footer-bussiness-link" href="https://www.instagram.com/zerobyone_/">
          <p className="art_experience-text-light">© 2020 Art Experience - Powered by ZeroByOne</p>
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
          {
            selectedCourse.info.split('\n').map((item, i) => {
              return <p className="course-info art_experience-text-light" key={i}>{item}</p>
            })
          }
          <div className="divider"></div>
          {
            selectedCourse.cost.split('\n').map((item, i) => {
              return <p className="course-info art_experience-text-light" key={i}>{item}</p>
            })
          }
        </DialogModal>
      }
      <LoaderPage show={disabled} />
    </div >
  );
};

IndexPage.displayName = 'Index Page';
export default IndexPage;
