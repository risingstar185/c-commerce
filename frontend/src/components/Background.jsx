import React, { useState, useEffect } from "react";
import image1 from "../assets/images 1.jpeg";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.avif";
import image4 from "../assets/image4.webp";
import image5 from '../assets/image5.jpeg'

const Background = () => {
  const images = [
    image3,

     image2,
      image3, 
    
    ]
      
  const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
  const interval = setInterval(() => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
  }, 3000);

  return () => clearInterval(interval);
}, [currentIndex]);


  return (
<div className="w-full aspect-[16/9] ">
  <img
    src={images[currentIndex]}
    alt="slideshow"
    className="w-full h-full object-cover rounded-xl shadow-lg"
  />
</div>



  );
};

export default Background;
