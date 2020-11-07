import { Button } from '../button';
import { LeftMenu } from '../left-menu/left-menu';
import { LoginModal } from '../login-modal/login-modal';
import React, { useContext } from 'react';
import { ReserveModal } from '../reserve-modal/reserve-modal';
import { UserContext } from '../../contexts/UserContext';
import './toolbar.scss';
import './toolbar-mobile.scss';
import '../../styles/theme-buttons.scss';


export interface IToolbarItem {
  icon?: any,
  label: string,
  href?: string
}


export const Toolbar = (props: {
  items: IToolbarItem[]
}) => {


  const {
    // @ts-ignore
    userIsLogged,
    getUserData,
  } = useContext(UserContext);


  return (
    <div className={`toolbar effect-slide_bottom shadow-dark`}>
      <div id="start_page" />
      <div className="left-box">
        <LeftMenu />
        <a href="#banner">
          <img
            className="logo-img effect-opacity"
            src="https://i.ibb.co/hfX81DT/art-experience-500.png"
            alt=""
          />
        </a>

        {props.items.map((button, i) => {
          return (
            <Button
              style="text"
              key={i}
              href={button.href}
              className="toolbar-btn"
              label={`${button.label}`}
            />
          )
        })}

      </div>
      <div className="right-box">
        {userIsLogged() && !getUserData().admin ? <ReserveModal /> : null}
        <LoginModal />
      </div>
    </div>
  );
};
