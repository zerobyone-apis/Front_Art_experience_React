import React, { ReactChild, Fragment } from 'react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './container-page.scss';
import { Grid } from '@material-ui/core';

// compoents used into ContainerPage component

export const SubContainerInfo = (props: {
  title: string;
  info: string;
  cost: string | undefined;
}) => {
  return (
    <div className="info-box">
      <p className={`title`}>{props.title}</p>

      {props.info.split('\n').map((line, i) => {
        return (
          <p key={i} className={`text info`}>
            {line}
          </p>
        );
      })}
      {props.cost ? (
        <p className={`cost__info`}>
          {props.cost.split('\n').map((line, i) => {
            return (
              <p key={i} className={`text info`}>
                {line}
              </p>
            );
          })}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export const SubContainerImage = (props: {
  imgClassName?: string;
  img: string;
  imgFooter?: any;
}) => {
  const screenSize = useWindowSize();
  return (
    <div className={`img-box ${props.imgClassName}`}>
      <div className="image">
        {typeof props.img === 'string' ? (
          <Fragment>
            <img
              style={
                screenSize.size.width > 1100
                  ? { width: `${(screenSize.size.width - 520) / 2}px` }
                  : null
              }
              src={props.img}
            />
            {props.imgFooter ? (
              <div className="image-footer">{props.imgFooter}</div>
            ) : null}
          </Fragment>
        ) : (
          props.img
        )}
      </div>
    </div>
  );
};

export const ContainerPage = (props: {
  children: ReactChild[];
  leftContent?: any;
  RightContent?: Element;
  key?: number;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div key={props.key} className={`container-page ${props.className}`}>
      <div className="left-box">{props.leftContent}</div>
      <div className={`containers ${props.containerClassName}`}>
        {props.children.map((child, i) => {
          return (
            <div
              style={{ width: `${100 / props.children.length}%` }}
              key={i}
              className="sub-container"
            >
              {child}
            </div>
          );
        })}
      </div>
      <div className="right-box">{props.RightContent}</div>
    </div>
  );
};
