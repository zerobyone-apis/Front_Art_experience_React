import { Button } from '../button';
import { LeftMenu } from '../left-menu/left-menu';
import React from 'react';
import './toolbar.scss';
import './toolbar-mobile.scss';


export interface IToolbarItem {
  icon?: any,
  label: string,
  href?: string
}


export const Toolbar = (props: {
  items?: IToolbarItem[]
  rightItems?: any[]
}) => {


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

        {props.items && props.items.map((button, i) => {
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
        {props.rightItems && props.rightItems.map((item, i) => {
          return (
            <div key={i}>
              {item}
            </div>
          )
        })}
      </div>

    </div>
  );
};
