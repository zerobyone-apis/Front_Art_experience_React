import React, { useContext, useState, Fragment } from 'react';
import { Card } from '../../card/card';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Button } from '../../button/button';
import { DialogModal } from '../../dialog-modal/dialog-modal';
import { Divider } from '../../divider/divider';
import './courses-card.scss';
import '../../../styles/theme-buttons.scss';
import { ContainerPage } from '../container-page/container-page';

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
            <ContainerPage className="container-page"
                key={i}
                title={course.name}
                info={course.info}
                img={course.img}
                align={"left"} />
        )
    }

    return (
        <Divider
            title="Nuestros Cursos"
            img="https://scontent.fmvd4-1.fna.fbcdn.net/v/t1.0-9/s960x960/45230851_310326229560512_8082084365997178880_o.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=LwkdhjYPttcAX8sw6hk&_nc_ht=scontent.fmvd4-1.fna&_nc_tp=7&oh=e90cde8ea10295ce8a00a64d7e1cae1a&oe=5F565319"
            align="left">
            <div className="divider-content">
                {/* Nuestros cursos estan enfocados a personas que desean aprender con la mejor atencion y rapidez */}
                <div className="courses-card">
                    {getCourses()}
                </div>
            </div>
        </Divider>



        // <Fragment>
        //     <Card className="courses-card" title={props.title} subtitle={props.subtitle}>
        //         {getCourses()}
        //     </Card>
        //     {
        //         !showDialog ? null :
        //             <DialogModal
        //                 className="dialog"
        //                 title={selected.name}
        //                 onClose={() => { setShowDialog(false) }} >
        //                 {selected.info.split('\n').map((item, i) => {
        //                     return <p className={`course-info text text-${getTheme()}`} key={i}>{item}</p>
        //                 })}
        //                 <div className="divider"></div>
        //                 {selected.cost.split('\n').map((item, i) => {
        //                     return <p className={`course-info text text-${getTheme()}`} key={i}>{item}</p>
        //                 })}
        //             </DialogModal>
        //     }
        // </Fragment>
    );
}