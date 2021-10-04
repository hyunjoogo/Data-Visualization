import React from "react";
import {Eyes} from "./Eyes";
import {CircleBackground} from "./BackGroundCircle";
import {Mouth} from "./Mouth";


const centerX = 480;
const centerY = 250;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 100;
const eyeRadius = 40;
const mouthWidth = 20;
const mouthRadius = 140;


const Part1 = () => {
  return (
    <>
      <svg width="960" height="500">
        <g transform={`translate(${centerX},${centerY})`}>
          <CircleBackground radius={centerY - strokeWidth / 2} strokeWidth={strokeWidth}/>
          <Eyes eyeOffsetX={eyeOffsetX} eyeOffsetY={eyeOffsetY} eyeRadius={eyeRadius} />
          <Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth}/>
        </g>
      </svg>
    </>
  )
}
export default Part1;