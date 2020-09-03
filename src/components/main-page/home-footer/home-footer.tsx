import React, { useContext } from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './home-footer.scss';

export const HomeFooter = (props: {
    email: string,
    instagram: string,
    facebook: string,
    theme?: string
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        // ${props.theme ? props.theme : getTheme()}
        <div className={`home-footer`}>
            <img className="footer_logo-img effect-opacity" src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
            <p className={`footer-email text text-${props.theme ? props.theme : getTheme()}`}>{props.email}</p>
            <div className="footer-social">
                <a href={props.instagram}>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                    <FaInstagram className="footer-social-logo social-logo" />
                </a>
                <a href={props.facebook}>
                    <FaFacebook className="footer-social-logo social-logo" />
                </a>
            </div>
            <a className="footer-bussiness-link" href="https://www.instagram.com/zerobyone_/">
                <p className={`text text-${getTheme()}`}>© 2020 Art Experience - Desarrollado por ZeroByOne</p>
            </a>
        </div>
    )
}