import React from 'react';
import {
  SubContainerImage,
  SubContainerInfo,
  ContainerPage,
} from '../../test/container-page/container-page';

import './about-us-card.scss';
import './about-us-card-mobile.scss';
import '../../../styles/theme.scss';


export const AboutUsCard = (props: {
  title: string;
  info: string;
  picture: string;
}) => {
  return (
    <div className="about-us-card">
      <ContainerPage className={`container-about-us`}>

        <SubContainerInfo
          className="sub-container-info"
          title={props.title}
          info={props.info}
          cost={''} />

        <SubContainerImage img={props.picture} />

      </ContainerPage>
    </div>
  );
};
