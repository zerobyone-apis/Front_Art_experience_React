import React, { useContext, useState } from 'react';
import { Card } from '../../card/card';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Slider } from '../../slider/slider';
import { ContainerPage } from '../container-page/container-page';
import './services-card.scss';
import '../../../styles/theme.scss';


export const ServicesCard = (props: {
    services: any[],
    // pics: [[{url: ''}], [{url: ''}]]
    // servicesImages: { url: string }[][],
    title: string,
    subTitle: string
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const [wizard, setWizard] = useState(0);

    const pics = [
        [{ url: 'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/41621777_162535654697678_3365624419975168000_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=1gcP_fXpcRgAX-utQij&oh=fd5a820c28ec950221c2f040ea4b83c2&oe=5F713BC3' }, { url: 'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/43817515_183935092515961_6000014555973943296_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=GsEMwfSAdrEAX8rP_7F&oh=7952270fb7e35ab940fdeff380e681a6&oe=5F710FA2' }],
        [{ url: 'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/53043245_1118958604953788_1153703094338858479_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=mQoqnLANrDEAX95RGNM&oh=5909d697980329b43567f07fda780b01&oe=5F70D18E' }],
        [{ url: 'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.2885-15/e35/44923579_335221280590668_8175979085596459008_n.jpg?_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=F_Pwt8V5EaoAX8c8If0&oh=68625cf572a290c9fa72af14bafa1968&oe=5F72DCDF' }]
    ];

    return (
        <ContainerPage title={props.title} info={props.subTitle} align="left" img={pics[0][0].url} />




        // <Card className="services-card" title={props.title} subtitle={props.subTitle}>
        //     {
        //         props.services.map((service, i) =>
        //             <div>
        //                 <div onClick={() => setWizard(i)} className={`service-item`} key={i}>
        //                     {service.icon}
        //                     <p className={`service-name text text-${getTheme()}`}>{service.name}</p>
        //                     {/* <p className={`service-info text text-${getTheme()}`}>{service.info}</p> */}
        //                 </div>
        //                 <hr />
        //             </div>
        //         )
        //     }
        //     <Slider className="slider" items={[pics[wizard][0]]} auto={false} />
        // </Card>
    )

}