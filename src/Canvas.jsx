import React, { useEffect, useRef, useState } from 'react'
import canvasImages from "./canvasImages";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Canvas({details}) {
   
    const [index, setIndex] = useState({value:details.startIndex})
    const canvasRef = useRef();

    useEffect(()=>{
    const scale = window.devicePixelRatio;    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function() {
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        canvas.style.width = canvas.offsetWidth + "px";
        canvas.style.height = canvas.offsetHeight + "px";
  
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
    img.src = canvasImages[index.value];
    },[index]);

    useGSAP(()=>{
        gsap.to(index,{
            value:details.startIndex+149,
            duration:details.duration,
            repeat:-1,
            ease:"linear",
            onUpdate:()=>{
               setIndex({value:Math.round(index.value)})
            }
        });

        gsap.from(canvasRef.current,{
            opacity:0,
            scale:0.8,
            duration:1,
            ease:"power2.inOut"
        })
    })

  return (
    <div>
        <canvas data-scroll data-scroll-speed={Math.random().toFixed(2)} ref={canvasRef} className=' absolute' id='canvas' style={{width: `${details.size*1.4}px`, height: `${details.size*1.4}px`, top: `${details.top}%`, left: `${details.left}%`, zIndex: `${details.zIndex}`}}>

        </canvas>
    </div>
  )
}

export default Canvas