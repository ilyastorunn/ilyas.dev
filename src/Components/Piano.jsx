import React from "react";

const sounds = {
  e6: new Audio("../assets/sounds/e6.wav"),
  f6: new Audio("../assets/sounds/f6.wav"),
  "f#6": new Audio("../assets/sounds/f#6.wav"),
  g6: new Audio("../assets/sounds/g6.wav"),
  "g#6": new Audio("../assets/sounds/g#6.wav"),
  a6: new Audio("../assets/sounds/a6.mp3"),
  "a#6": new Audio("../assets/sounds/a#6.wav"),
  b6: new Audio("../assets/sounds/b6.wav"),
};

const Piano = () => {
  const playSound = (note) => {
    sounds[note].currentTime = 0;
    sounds[note].play();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex">
        <div
          onClick={() => playSound("e6")}
          className="w-[60px] h-[200px] bg-white border-black border-[1px]"
        ></div>
        <div
          onClick={() => playSound("f6")}
          className="w-[60px] h-[200px] bg-black relative -ml-[30px] z-10"
        ></div>
        <div
          onClick={() => playSound("f#6")}
          className="w-[60px] h-[200px] bg-white border-black border-[1px]"
        ></div>
        <div
          onClick={() => playSound("g6")}
          className="w-[60px] h-[200px] bg-white border-black border-[1px]"
        ></div>
        <div
          onClick={() => playSound("g#6")}
          className="w-[60px] h-[200px] bg-black relative -ml-[30px] z-10"
        ></div>
        <div
          onClick={() => playSound("a6")}
          className="w-[60px] h-[200px] bg-white border-black border-[1px]"
        ></div>
        <div
          onClick={() => playSound("a#6")}
          className="w-[60px] h-[200px] bg-black relative -ml-[30px] z-10"
        ></div>
        <div
          onClick={() => playSound("b6")}
          className="w-[60px] h-[200px] bg-white border-black border-[1px]"
        ></div>
      </div>
    </div>
  );
};

export default Piano;
