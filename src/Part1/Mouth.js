import {arc} from "d3";

export const Mouth = ({mouthRadius, mouthWidth}) => {
  const start = 0;
  const end = Math.PI * 3 / 2;
  console.log(start, end)
  const mouthArc = arc()
    .innerRadius(mouthRadius) // 안쪽 원 반지름
    .outerRadius(mouthWidth + mouthRadius) // 바깥쪽 원 반지름
    .startAngle(start) // 시작점 각도 // 3.14이면 180도
    .endAngle(end); // 끝점 각도

  return <path d={mouthArc()}/>
}

