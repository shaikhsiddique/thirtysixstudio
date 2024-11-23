import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const growingSpan = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  });

  useEffect(() => {
    const handleClick = (e) => {
      console.log(e.clientY, e.clientX);
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          // Set the position of the growing span based on the mouse click position
          gsap.set(growingSpan.current, {
            position: "absolute",
            top: e.clientY - 25,  // Adjust for center alignment
            left: e.clientX - 25, // Adjust for center alignment
            backgroundColor:" #fd2c2a",
          });

          gsap.to("body", {
            duration:1,
            color: "#000",
            backgroundColor: "#fd2c2a",
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 150,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(growingSpan.current,{
                delay:-1,
                clearProps: "all",
                opacity:0,
                onComplete:()=>{
                  gsap.to(growingSpan.current,{
                    delay:-1,
                    scale:0,
                  })
                }
              })
            },
          
          });
        } else{
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }
        

        return !prevShowCanvas;
      });
    };

    const headingElement = textRef.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen font-['Helvetioca_Now_Display']">
        {showCanvas &&
          data[0].map((canvasdets, index) => {
            return <Canvas key={index} details={canvasdets} />;
          })}

        <div className="w-full h-screen z-[1] relative">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">thirtysixstudios</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-md mt-10">scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 ">
            <h1 ref={textRef} className="text-[15rem] font-normal tracking-tight leading-none pl-5">
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen mt-32 px-10 ">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <div className="relative z-[1]">
          <h1 className="text-8xl tracking-tighter">about the brand</h1>
          <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
            We are a team of designers, developers, and strategists who are
            passionate about creating digital experiences that are both beautiful
            and functional.
          </p>
          <img
            className="w-[80%] mt-10 z-[1]"
            src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default App;
