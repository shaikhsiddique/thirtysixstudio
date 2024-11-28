import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import CircularText from "./components/CircularText";
import Nominee from "./components/Nominee";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const growingSpan = useRef(null);
  const textRef = useRef(null);
  const pointRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPointer({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const childElement = pointRef.current.querySelector("#img");

    gsap.set(childElement, {
      opacity: 0,
    });

    const handleMouseHover = () => {
      gsap.to(pointRef.current, {
        scale: 4,
        duration: 0.2,
      });
      gsap.to(childElement, {
        opacity: 1,
        duration: 0.2,
      });
    };

    const handleMouseOut = () => {
      gsap.to(pointRef.current, {
        scale: 1,
        duration: 0.2,
      });
      gsap.to(childElement, {
        opacity: 0,
        duration: 0.2,
      });
    };

    const textElement = textRef.current;

    textElement.addEventListener("mouseenter", handleMouseHover);
    textElement.addEventListener("mouseleave", handleMouseOut);

    return () => {
      textElement.removeEventListener("mouseenter", handleMouseHover);
      textElement.removeEventListener("mouseleave", handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (pointRef.current) {
      gsap.to(pointRef.current, {
        x: pointer.x,
        y: pointer.y,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [pointer]);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          // Set the position of the growing span based on the mouse click position
          gsap.set(growingSpan.current, {
            position: "absolute",
            top: e.clientY - 25, // Adjust for center alignment
            left: e.clientX - 25, // Adjust for center alignment
            backgroundColor: " #fd2c2a",
          });

          gsap.to("body", {
            duration: 1,
            color: "#000",
            backgroundColor: "#fd2c2a",
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 150,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(growingSpan.current, {
                delay: -1,
                clearProps: "all",
                opacity: 0,
                onComplete: () => {
                  gsap.to(growingSpan.current, {
                    delay: -1,
                    scale: 0,
                  });
                },
              });
            },
          });

          gsap.to(pointRef.current, {
            backgroundColor: "white",
            duration: 0.5,
          });
        } else {
          gsap.to("body", {
            color: "black",
            backgroundColor: "#FFFAFA",
            duration: 1.2,
            ease: "power2.inOut",
          });
          gsap.to(pointRef.current, {
            backgroundColor: "#DC2626",
            duration: 0.5,
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
      <div className="fixed top-[35%] right-0 z-50">
        <Nominee />
      </div>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed w-5 h-5 z-50"
      ></span>
      <div
        className={`fixed flex items-center justify-center bg-red-600 w-5 h-5 rounded-full  `}
        ref={pointRef}
      >
        <img
          id="img"
          src="https://thirtysixstudio.com/peppers/pepperA/132.png"
          alt=""
        />
      </div>
      <div
        className="w-full relative min-h-screen font-['Helvetioca_Now_Display'] "
        style={{ userSelect: "none" }}
      >
        {showCanvas &&
          data[0].map((canvasdets, index) => {
            return <Canvas key={index} details={canvasdets} />;
          })}

        <div className="w-full h-screen z-[1] relative">
          <Navbar showCanvas={showCanvas} />
          <div className="textcontainer mt-10 w-full px-[20%]">
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
          <div className=" absolute h-32 w-32 top-72 right-[20%]">
            <CircularText />
          </div>
          <div className="w-full absolute bottom-0 -z-0">
            <h1
              ref={textRef}
              className="text-[15rem] font-normal tracking-tight leading-none pl-5 "
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div
        className="w-full relative min-h-screen font-['Helvetioca_Now_Display']"
        style={{ userSelect: "none" }}
      >
        {showCanvas &&
          data[2].map((canvasdets, index) => {
            return <Canvas key={index} details={canvasdets} />;
          })}
        <hr className="w-[98%] border-t border-gray-400 mt-14 z-0"></hr>
        <div className="content w-full text-black flex flex-col items-center justify-center absolute top-[40%] px-4">
          <p className="text-3xl font-semibold mb-4">OUR SERVICES</p>
          <p className="w-full md:w-[60%] text-lg md:text-[34px] font-medium text-center leading-tight">
            We provide captivating design, interactive animations, advanced
            usability, reliable code, and immaculate project coordination.
            Whether you need a campaign built from scratch or assistance at a
            specific phase, we’ve got you covered.
          </p>
        </div>
      </div>
      <div className="w-full relative h-screen mt-32 px-10 ">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <div className="relative z-[1]">
          <h1 className="text-8xl tracking-tighter">about the brand</h1>
          <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
            We are a team of designers, developers, and strategists who are
            passionate about creating digital experiences that are both
            beautiful and functional.
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
