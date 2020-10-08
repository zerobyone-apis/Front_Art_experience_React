import React, { useContext } from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Card } from '../../card/card';
import './home-footer.scss';
import '../../../styles/theme.scss';
import Maps from '../google_maps/google-maps';

export const HomeFooter = (props: {
  email: string;
  number: string;
  title: string;
  subtitle: string;
  instagram: string;
  facebook: string;
  theme?: 'dark' | 'light';
}) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);


  const test = () => {
    return (
      <div className="content-info">

        <img
          className="footer_logo-img effect-opacity"
          src="https://i.ibb.co/hfX81DT/art-experience-500.png"
          alt=""
        />
        <p className={`footer-email text text-dark`}>{props.email}</p>
        <p className={`footer-email text text-dark`}>{'  ' + props.number}</p>
        <div className="footer-social">
          <a href={props.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <FaInstagram className="footer-social-logo social-logo" />
          </a>
          <a href={props.facebook}>
            <FaFacebook className="footer-social-logo social-logo" />
          </a>
        </div>
        <a
          className="footer-bussiness-link"
          href="https://www.instagram.com/zerobyone_/"
        >
          <p className={`text text-${getTheme()}`}>
            © 2020 Art Experience - Desarrollado por ZeroByOne
          </p>
        </a>

      </div>
    )
  }

  return (
    // ${props.theme ? props.theme : getTheme()}
    <>
      <Card className="footer-card" title={props.title} subtitle={''}>
        <div className={`home-footer`}>
          <Maps className="footer-map" subtitle={props.subtitle} />
        </div>
      </Card>
      {test()}
    </>
  );
};
