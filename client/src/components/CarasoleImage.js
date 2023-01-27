import React from 'react'
import { useTheme,  } from '@material-ui/core/styles';
import { CarasouleImageStyles } from '../styles/muiStyles';
import Carousel from 'better-react-carousel'


export default function CarasoleImage() {
    const classes = CarasouleImageStyles();
    return (

        <Carousel cols={1} rows={1} gap={10} loop={true} autoplay={2000} hideArrow={true}showDots={true} >

            <Carousel.Item style={{
                height: '100px'


            }} >
                <img className={classes.img} width="100%" src="https://picsum.photos/800/600?random=1" />
            </Carousel.Item>
            <Carousel.Item >
                <img className={classes.img} width="100%" src="https://picsum.photos/800/600?random=2" />
            </Carousel.Item >
            <Carousel.Item >
                <img className={classes.img} width="100%" src="https://picsum.photos/800/600?random=2" />
            </Carousel.Item >

        </Carousel>

    );
}
