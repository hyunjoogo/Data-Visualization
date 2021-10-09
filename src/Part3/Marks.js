export const Marks = ({data, xScale, yScale, toolTipFormat}) =>
  data.map(d => (
    <rect key={d.Country}
          x={0}
          y={yScale(d.Country)}
          width={xScale(d.Population)}
          height={yScale.bandwidth()}
    >
      {/* 중간에 , 찍고 싶으면 함수(d.Population) */}
      <title>{toolTipFormat(d.Population)}</title>

    </rect>
  ))