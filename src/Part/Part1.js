import React from "react";
import {arc} from 'd3';


const centerX = 480;
const centerY = 250;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 100;
const eyeRadius = 40;
const mouthWidth = 20;
const mouthRadius = 140;

const mouthArc = arc()
  .innerRadius(mouthRadius) // 안쪽 원 반지름
  .outerRadius(mouthWidth + mouthRadius) // 바깥쪽 원 반지름
  .startAngle(Math.PI / 2) // 시작점 각도
  .endAngle(Math.PI * 3 / 2);

const Part1 = () => {
  return (
    <>
      <svg width="960" height="500">
        <g transform={`translate(${centerX},${centerY})`}>
          <circle
            r={centerY - strokeWidth / 2}
            fill={"yellow"}
            stroke={"black"}
            strokeWidth={strokeWidth}
          />
          <circle cx={-eyeOffsetX}
                  cy={-eyeOffsetY}
                  r={eyeRadius}
          />
          <circle cx={eyeOffsetX}
                  cy={-eyeOffsetY}
                  r={eyeRadius}
          />
          <path d={mouthArc()}/>
        </g>
      </svg>
    </>
  )
}
export default Part1;