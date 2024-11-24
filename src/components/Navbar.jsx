import React, { useEffect, useRef, useState } from "react";

function Navbar({ showCanvas }) {
    const [playAudio, setPlayAudio] = useState(false);
    const audioRef = useRef(null);
    
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      audioRef.current = new Audio(showCanvas ? "./audio/world2.mp3" : "./audio/world1.mp3");
      if (showCanvas) {
        audioRef.current.play();
        setPlayAudio(true);
      }
      else{
        setPlayAudio(false);
      }
    }, [showCanvas]);
    
    useEffect(() => {
      if (audioRef.current) {
        if (playAudio) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    }, [playAudio]);
    
    

  return (
    <nav
      className={`w-[98%] px-8 py-3 flex items-center justify-between z-50 border-b mx-4 ${
        showCanvas ? "border-black" : "border-gray-300"
      } `}
    >
      <div className="brand text-2xl font-md">thirtysixstudios</div>
      <div className="links flex gap-10">
        {["What we do", "Who we are", "How we give back", "Talk to us"].map(
          (link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className="text-md hover:text-gray-300"
            >
              {link}
            </a>
          )
        )}
        <div
          onClick={() => setPlayAudio(!playAudio)}
          className={`border  ml-10 rounded-[50%] ${showCanvas ? "hover:border-[#c4c1c1] border-black" : "hover:border-[#707070] "}`}
        >
          {playAudio ? (
            <svg
              className="on"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.1"
                cx="15"
                cy="15"
                r="14.5"
                stroke="black"
              ></circle>
              <path
                d="M11.9091 9V21M9 13.3636V16.6364M15 11.9091V18.0909M18.0909 10.4545V19.5455M21 13.3636V16.6364"
                stroke="black"
                strokeLinecap="round"
              ></path>
            </svg>
          ) : (
            <svg
              className="off"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.1"
                cx="15"
                cy="15"
                r="14.5"
                stroke="black"
              ></circle>
              <path
                d="M11.9091 14V15M9 14V15M15 14V15M18.0909 14.0002V15M21 14V15"
                stroke="black"
                strokeLinecap="round"
              ></path>
            </svg>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
