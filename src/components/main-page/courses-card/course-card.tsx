import React, { useContext, useState, Fragment } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Divider } from '../../divider/divider';
import { ContainerPage, SubContainerInfo, SubContainerImage } from '../../test/container-page/container-page';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './courses-card.scss';
import '../../../styles/theme-buttons.scss';
import '../../../styles/effects.scss';

export const CoursesCard = (props: {
    courses: any[],
    title: string,
    subTitle: string
}) => {

    const [selectedCourse, setSelectedCourse] = useState(props.courses[0]);
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
            <div className={`course-item`} key={props.key}>
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
        return props.courses.map((course, i) =>
            <div
                key={i}
                className={`${course === selectedCourse ? 'selected' : null}`}>

                <CourseItem
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
                <ContainerPage
                    className={`container-course`}
                    containerClassName={`${effects}`}
                    leftContent={
                        <div className="courses-items">
                            <p className="help-action">Cursos</p>
                            {getCourses()}
                        </div>
                    }
                >
                    <SubContainerInfo
                        title={selectedCourse.name}
                        info={selectedCourse.info}
                    />
                    <SubContainerImage
                        img={selectedCourse.img}
                    />
                </ContainerPage>
            </div>
        </Divider>
    )
}
