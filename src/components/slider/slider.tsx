import React, { useState, useEffect, useContext } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import './slider.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

export const Slider = (props: {
    items: { url: string }[],
    auto: boolean,
    className?: string
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const [wizard, setWizard] = useState(0);

    useEffect(() => {
        if (props.auto) {
            automaticSlide()
        }
    }, [])

    const automaticSlide = () => {
        while (true) {
            setTimeout(() => {
                wizard < props.items.length ? setWizard(wizard + 1) : setWizard(0)
            }, 2000);
        }
    }

    const goLeft = () => {
        wizard > 0 ? setWizard(wizard - 1) : setWizard(props.items.length - 1)
    }

    const goRight = () => {
        wizard < props.items.length ? setWizard(wizard + 1) : setWizard(0)
    }

    return (
        <div className={`slider${props.className ? ' ' + props.className : ''}`}>
            <div className="slider_item">
                <img
                    src={props.items[wizard].url}
                    className="slider_item-image" />
                {props.items.length > 1 ? (
                    <div className="arrows-box">
                        <div className="arrow_left-box" onClick={() => { goLeft() }}>
                            <FiArrowLeft className="arrow" />
                        </div>
                        <div className="arrow_right-box" onClick={() => { goRight() }}>
                            <FiArrowRight className="arrow" />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}