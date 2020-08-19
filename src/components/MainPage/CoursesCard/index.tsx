import React, { useContext, useState, Fragment } from 'react';
import { Card } from '../../Card';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Button } from '../../Button';
import { DialogModal } from '../../DialogModal';

export const CoursesCard = (props: {
    courses: any[],
    title: string,
    subtitle: string
}) => {
    const [showDialog, setShowDialog] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const getCourses = () => {
        return props.courses.map((course, i) =>
            <div className="course-item" key={i}>
                <p className={`course-name text-${getTheme()}`}>{course.name}</p>
                <img className="course-img" aspect-ratio="1" src={course.img}></img>
                <p className={`course-duration text-${getTheme()}`}>Duracion: {course.duration}</p>
                <Button className="see_more-btn art_experience-button_outlined"
                    label="Ver mas"
                    onClick={() => {
                        setSelected(course);
                        setShowDialog(true);
                    }} />
            </div >
        )
    }

    return (
        <Fragment>
            <Card title={props.title} subtitle={props.subtitle}>
                {getCourses()}
            </Card>
            {
                !showDialog ? null :
                    <DialogModal
                        className="dialog"
                        title={selected.name}
                        onClose={() => { setShowDialog(false) }} >
                        {selected.info.split('\n').map((item, i) => {
                            return <p className="course-info art_experience-text-light" key={i}>{item}</p>
                        })}
                        <div className="divider"></div>
                        {selected.cost.split('\n').map((item, i) => {
                            return <p className="course-info art_experience-text-light" key={i}>{item}</p>
                        })}
                    </DialogModal>
            }
        </Fragment>
    );
}