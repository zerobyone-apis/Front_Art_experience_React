import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Text } from '../text';
import './card.scss';
import '../../theme/theme.scss';

export const Card = (props: {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: any;
  id?: string;
  theme?: 'dark' | 'light';
}) => {

  return (
    <div
      id={props.id}
      className={`card ${props.className}`}
    >
      {
        props.title &&
        <Text type="title" className="card_title">{props.title}</Text>
      }
      {
        props.subtitle &&
        <Text type="subtitle" className="card_subtitle">{props.subtitle}</Text>
      }
      <div className="card_content">
        {props.children}
      </div>
    </div>
  );
};
