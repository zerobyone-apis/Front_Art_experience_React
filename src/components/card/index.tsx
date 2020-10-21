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
      id={props.id}
      className={`card ${props.className} ${props.theme || getTheme()}`}
    >
      <div className="anchor" id="about_us" />
      {
        props.title &&
        <p className={`text-${props.theme || getTheme()} card_title title`}>
          {props.title}
        </p>
      }
      {
        props.subtitle &&
        <p className={`card_subtitle text text-${props.theme ? props.theme : getTheme()}`}>
          {
            props.subtitle.split('\n').map((line, i) => {
              return <p key={i}>{line}</p>;
            })
          }
        </p>
      }
      <div className="card_items">
        {props.children}
      </div>
    </div>
  );
};
