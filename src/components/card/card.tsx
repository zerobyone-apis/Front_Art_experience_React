// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './card.scss';
import '../../styles/theme.scss';

export const Card = (props: {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: any;
  id?: string;
  theme?: 'dark' | 'light';
}) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  return (
    <div
      className={`${props.className + ' ' || ''}card ${
        props.theme ? props.theme : getTheme()
      }`}
      id={props.id}
    >
      <div className="anchor" id="about_us"></div>

      {props.title ? (
        <p
          className={`text-${
            props.theme ? props.theme : getTheme()
          } card_title title`}
        >
          {props.title}
        </p>
      ) : null}

      {props.subtitle ? (
        <p
          className={`card_subtitle text text-${
            props.theme ? props.theme : getTheme()
          }`}
        >
          {props.subtitle.split('\n').map((line, i) => {
            return <p key={i}>{line}</p>;
          })}
        </p>
      ) : null}

      <div className="card_items">{props.children}</div>
    </div>
  );
};
