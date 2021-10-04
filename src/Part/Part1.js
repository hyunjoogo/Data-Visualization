import React from "react";
import {Face} from "./Face";
import {range} from 'd3';

const width = 166;
const height = 166;

const arrayThis = range(50);

console.log(Math.random())

const Part1 = () => arrayThis.map((index) => (
  <Face
    key={index}
    width={width}
    height={height}
    centerX={width / 2}
    centerY={height / 2}
    strokeWidth={10}
    eyeOffsetX={30}
    eyeOffsetY={30}
    eyeRadius={10}
    // 난수를 추가해 각자다르게 만들 수 있음
    mouthWidth={7 + Math.random() * 10}
    mouthRadius={40}/>
));

export default Part1;