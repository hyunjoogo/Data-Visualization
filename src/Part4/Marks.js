export const Marks = ({data, xScale, yScale, xValue, yValue, toolTipFormat, circleRadius}) =>
  data.map((d, index) => (
    <circle // 원 그리기
      className="mark"
      key={index}
      cx={xScale(xValue(d))} // 원의 중심의 x좌표
      cy={yScale(yValue(d))} // 원의 중심의 y좌표
      r={circleRadius} // 반지름
    >
      {/* 중간에 , 찍고 싶으면 함수(d.Population) */}
      <title>{toolTipFormat(d.Population)}</title>

    </circle>
  ))