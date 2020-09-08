import React, { useContext, useState, Fragment } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Divider } from '../../divider/divider';
import { ContainerPage } from '../container-page/container-page';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './courses-card.scss';
import '../../../styles/theme-buttons.scss';
import '../../../styles/effects.scss';

export const CoursesCard = (props: {
    courses: any[],
    title: string,
    subTitle: string
}) => {

    const [selectedCourse, setSelectedCourse] = useState(undefined);
    const [effects, setEffects] = useState('');
    const screenSize = useWindowSize();

    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);


    const CourseItem = (props: {
        img: any,
        name: string,
        info: string,
        key?: number,
        course?: any
    }) => {
        const {
            // @ts-ignore
            getTheme,
        } = useContext(ThemeContext);
        return (
            <div className={`course-item`} key={props.key || 1}>
                <img
                    onMouseEnter={() => {
                        setEffects(screenSize.size.width > 1100 ? 'effect-slide-left' : 'effect-slide-top');
                        setSelectedCourse(props.course);
                    }}
                    onMouseLeave={() => { setEffects('') }}
                    className="course-img" src={props.img} alt="" />
                <p className={`course-name text text-light`}>{props.name}</p>
            </div>
        )
    }

    const getCourses = () => {
        return props.courses.map((course, i) => <div
            className={`${course === selectedCourse ? 'selected' : null}`}>
            <CourseItem key={i}
                name={course.name}
                info={course.info}
                img={course.img}
                course={course}
            />
        </div>
        )
    }

    return (
        <Divider
            title="Nuestros Cursos"
            img="https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/40756317_547596808994027_4028564252884205568_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=G9NtG88ekgYAX-ZqNF_&oh=6b1c52b718d5107bcbd7f30a4233ac08&oe=5F7EA78C"
            align="left"
            className="divider"
        >
            <div className="course-card">
                <div className="courses-items">
                    <p className="help-action">Cursos</p>
                    {getCourses()}
                </div>
                <div className="course-info">
                    {selectedCourse ?
                        (
                            <ContainerPage
                                className={`couse-container ${effects}`}
                                align="left"
                                title={selectedCourse.name}
                                info={selectedCourse.info}
                                img={selectedCourse.img} />
                        ) : (
                            <ContainerPage
                                className="couse-container"
                                align="left"
                                title={``}
                                info={`Nuestros cursos son la mejor opcion para entrar en el mundo de la barberia profesional.\n
                                Contamos con 3 cursos con la mejor calidad y asesoramiento personalizado.\n
                                -Curso Intensivo\n
                                -Perfeccionamiento de Colorimetria\n
                                -Perfeccionamiento de Corte`}
                                img={"https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/43984597_349284282317504_392973023499517952_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=PKoXQpRr41AAX8wq00j&oh=db7ea1933aaf5c5bd91254931763c15f&oe=5F7BC29B"} />
                        )}
                </div>
            </div>
        </Divider>
    )
}
