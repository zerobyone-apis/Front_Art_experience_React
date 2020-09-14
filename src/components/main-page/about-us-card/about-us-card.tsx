import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { SubContainerImage, SubContainerInfo, ContainerPage } from '../../test/container-page/container-page';
import '../../../styles/theme.scss';
import './about-us-card.scss';

export const AboutUsCard = (props: {
    title: string,
    info: string,
    picture: string
}) => {
    const screenSize = useWindowSize();
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className="about-us-card">
            <ContainerPage
                className={`container-about-us`}
            >
                <SubContainerInfo
                    title={props.title}
                    info={props.info}
                />
                <SubContainerImage
                    img={props.picture}
                />
            </ContainerPage>
        </div>
    )
}