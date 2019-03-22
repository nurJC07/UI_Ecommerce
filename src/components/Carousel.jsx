import React from "react";
import { Carousel } from "react-responsive-carousel";
import carousel1 from '../supports/img/Promo.png';
import carousel2 from '../supports/img/promo ovo.jpg'

export default () => (
    
    <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
        <div>
        <img src={carousel1} 
        alt="Promo" width={800}  className="img-responsive" />
        </div>
        <div>
        <img src={carousel2}
        alt="Promo Ovo" width={800}  className="img-responsive" />
        </div>
    </Carousel>
  
);
