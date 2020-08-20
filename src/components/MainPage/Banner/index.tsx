import React, { useContext } from 'react';
import './Banner.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { url } from 'inspector';

export const Banner = () => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const urlImage = "url(https://lh6.googleusercontent.com/proxy/sGPIfOpDBdIbW2kUprDAFEa3kxMpBjhegwDGzZoRrxny1TQWUX666MXQlTr-ujrj-Nugzn9yCroQtUzRuMh6JZOrqP5HrJB59XN8N-WomzS6sONOPkb6HEtdTLZb6bC206svYLyh0UWBgvmc=s0-d)";

    return (
        <div className={`banner ${getTheme()}`}>
            <div className="banner-img" style={{ backgroundImage: urlImage }}>
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
    )
}