import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { AnimationBox } from '../../animation-box/animation-box';
import './banner.scss';

export const Banner = () => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const urlImage =
    'url(https://lh6.googleusercontent.com/proxy/sGPIfOpDBdIbW2kUprDAFEa3kxMpBjhegwDGzZoRrxny1TQWUX666MXQlTr-ujrj-Nugzn9yCroQtUzRuMh6JZOrqP5HrJB59XN8N-WomzS6sONOPkb6HEtdTLZb6bC206svYLyh0UWBgvmc=s0-d)';

  return (
    <div className={`banner ${getTheme()}`}>
      <div className="banner-img" style={{ backgroundImage: urlImage }}></div>
      <div className="title-box">
        <div className="box-shadow_space"></div>
        <AnimationBox active={true} type="scale">
          <img
            className="logo-img"
            src="https://i.ibb.co/FXcFKVY/art-experiecnce.png"
            alt=""
          />
        </AnimationBox>
        <div className="box-shadow_logo"></div>
      </div>
    </div>
  );
};
