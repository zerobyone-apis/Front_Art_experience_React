import { styled } from '@material-ui/core';
import React from 'react';
import './google-maps.scss';

function Maps(props: { className: string; subtitle: string }) {
  return (
    <section>
      <div className="circle maps">
        <iframe
          className="circle__map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.4746052670516!2d-55.96159518423412!3d-34.71842947108484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a027c52f4ce27f%3A0xb629ac8b2693f26a!2sArt%20Experience!5e0!3m2!1sen!2suy!4v1601491948311!5m2!1sen!2suy"
          width="500"
          height="500"
          aria-hidden="false"
        />
      </div>
      <div className="container__text">
        {props.subtitle.split('\n').map((line, i) => {
          return (
            <p key={i}>
              <img src="https://img.icons8.com/fluent/15/000000/chevron-right.png" />
              {line}
            </p>
          );
        })}
      </div>
    </section>
  );
}

export default Maps;
