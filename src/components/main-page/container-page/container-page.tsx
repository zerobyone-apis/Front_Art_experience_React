import React, { useContext, Fragment } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useWindowSize } from '../../../hooks/useWindowSize';
import '../../../styles/theme.scss';
import './container-page.scss';


export const ContainerPage = (props: {
    title: string,
    info: string,
    img: string,
    key?: number,
    align: 'left' | 'right',
    className?: string,
    theme?: 'dark' | 'light'
}) => {
    const screenSize = useWindowSize();
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const InfoBox = () => {
        return (
            <div className="info-box">
                <p className={`title`}>{props.title}</p>
                {
                    props.info.split('\n').map((line, i) => {
                        return <p key={i} className={`text info text-${getTheme()}`}>{line}</p>
                    })
                }
                {/* <p className={`text info text-${getTheme()}`}>{props.info}</p> */}
            </div>
        );
    }

    const ImageBox = () => {
        return (
            <div className="img-box">
                <div className="image">
                    <img style={
                        (screenSize.size.width > 1100 ?
                            ({ width: `${(screenSize.size.width - 520) / 2}px` })
                            : null)}
                        src={props.img} />
                </div>
            </div>
        );
    }

    const LeftContentBox = () => {
        return (
            <Fragment>
                {InfoBox()}
                {/* <div className={`line_divider`}><div /></div> */}
                {ImageBox()}
            </Fragment>
        )
    }

    const RightContentBox = () => {
        return (
            <Fragment>
                {ImageBox()}
                {/* <div className={`line_divider`}><div /></div> */}
                {InfoBox()}
            </Fragment>
        )
    }

    return (
        <div key={props.key} className={`${props.className}${props.theme ? ' ' + props.theme : ''}`}>
            <div className={`container`}>
                <div className={`content-box`}>
                    <div className={props.align}>
                        {props.align === 'left' ?
                            (LeftContentBox()) :
                            (RightContentBox())}
                    </div>
                </div>
            </div>
        </div>
    )
}