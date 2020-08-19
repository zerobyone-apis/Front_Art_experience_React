import React, { useContext } from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './HomeFooter.scss';

export const HomeFooter = (props: {
    email: string,
    instagram: string,
    facebook: string
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className="home-footer">
            <img className="footer_logo-img effect-opacity" src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
            <p className={`footer-email text-${getTheme()}`}>{props.email}</p>
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
                <p className={`art-text text-${getTheme()}`}>© 2020 Art Experience - Desarrollado por ZeroByOne</p>
            </a>
        </div>
    )
}