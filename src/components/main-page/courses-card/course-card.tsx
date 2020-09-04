import React, { useContext, useState, Fragment } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Divider } from '../../divider/divider';
import { ContainerPage } from '../container-page/container-page';
import './courses-card.scss';
import '../../../styles/theme-buttons.scss';
import '../../../styles/effects.scss';

export const CourseItem = (props: {
    img: any,
    name: string,
    info: string,
    key?: number,
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className={`course-item`} key={props.key || 1}>
            <img className="course-img" src={props.img} alt="" />
            <p className={`course-name text text-light`}>{props.name}</p>
        </div>
    )
}

export const CoursesCard = (props: {
    courses: any[],
    title: string,
    subTitle: string
}) => {

    const [selectedCourse, setSelectedCourse] = useState(undefined);

    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const getCourses = () => {
        return props.courses.map((course, i) => <div
            onMouseEnter={() => { setSelectedCourse(course) }} className={`${course === selectedCourse ? 'selected' : null}`}>
            <CourseItem key={i}
                name={course.name}
                info={course.info}
                img={course.img}
            />
        </div>
        )
    }

    return (
        <Divider
            title="Nuestros Cursos"
            img="https://scontent.fmvd4-1.fna.fbcdn.net/v/t1.0-9/s960x960/45230851_310326229560512_8082084365997178880_o.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=LwkdhjYPttcAX8sw6hk&_nc_ht=scontent.fmvd4-1.fna&_nc_tp=7&oh=e90cde8ea10295ce8a00a64d7e1cae1a&oe=5F565319"
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
                                className="couse-container"
                                align="right"
                                title={selectedCourse.name}
                                info={selectedCourse.info}
                                img={selectedCourse.img} />
                        ) : (
                            <ContainerPage
                                className="couse-container"
                                align="right"
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
