import React, { useContext, useEffect, useState } from 'react';
import { ButtonContext } from '../contexts/ButtonsContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { BarberListContext } from '../contexts/BarberListContext';
import { IBarber } from '../types/Barber.type';
import { LoaderPage } from '../components/loader-page/loader-page';
import { Toolbar } from '../components/toolbar';
import { BarbersCard } from '../components/main-page/barbers-card/barber-card';
import { AboutUsCard } from '../components/main-page/about-us-card';
import { HomeFooter } from '../components/main-page/home-footer/home-footer';
import { CoursesCard } from '../components/main-page/courses-card/course-card';
import { Banner } from '../components/main-page/banner/banner';
import { ServicesCard } from '../components/main-page/services-card/service-card';
import { pageInfo, services, dividers, courses, aboutusPictures } from '../data/index';
import { toolbarButtons } from '../utils/toolbarButtons';
import BarberAction from '../actions/Barber.actions';
import moment from 'moment';
import './index.scss';
import { ReserveModal } from '../components/reserve-modal/reserve-modal';
import { LoginModal } from '../components/login-modal/login-modal';

const IndexPage = () => {
  const [barbers, setBarbers] = useState([]);


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
      setDisabledButton(true);
      let resultBarbers = null;
      do {
        resultBarbers = await getBarbers();
      } while (!resultBarbers);
      setBarbersList(resultBarbers); // save in store
      setBarbers(resultBarbers);
      setDisabledButton(false);
    };
    // execute the async function
    fetchData();
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
        <Toolbar
          items={toolbarButtons}
          rightItems={[<ReserveModal />, <LoginModal />]} />
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
              title="Nuestros Equipo"
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
