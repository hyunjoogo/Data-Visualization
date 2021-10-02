import React from "react";

const centerX = 480;
const centerY = 250;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 100;
const eyeRadius = 40;


const Part1 = () => {
  return (
    <>
      <svg width="960" height="500">
        <circle cx={centerX}
                cy={centerY}
                r={centerY - strokeWidth / 2}
                fill={"yellow"}
                stroke={"black"}
                strokeWidth={strokeWidth}
        />
        <circle cx={centerX - eyeOffsetX}
                cy={centerY - eyeOffsetY}
                r={eyeRadius}
        />
        <circle cx={centerX + eyeOffsetX}
                cy={centerY - eyeOffsetY}
                r={eyeRadius}
        />
      </svg>
    </>
  )
}
export default Part1;