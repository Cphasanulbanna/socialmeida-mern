import React from 'react';
import Lottie from 'react-lottie';
import Loader from "../../assets/animations/button-loader.json";

function ButtonLoader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loader,
      };
    return (
        <Lottie options={defaultOptions} height={80} width={200} />
    );
  }
  
export default ButtonLoader;