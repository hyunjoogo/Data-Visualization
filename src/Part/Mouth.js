import {arc} from "d3";

export const Mouth = ({mouthRadius, mouthWidth}) => {
  const mouthArc = arc()
    .innerRadius(mouthRadius) // 안쪽 원 반지름
    .outerRadius(mouthWidth + mouthRadius) // 바깥쪽 원 반지름
    .startAngle(Math.PI / 2) // 시작점 각도
    .endAngle(Math.PI * 3 / 2); // 끝점 각도

  return <path d={mouthArc()}/>
}

