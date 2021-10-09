export const AxisLeft = ({yScale}) =>
  yScale.domain().map(ticksValue => (
    <g className="tick">
      <text
        key={ticksValue}
        style={{textAnchor: "end"}}
        x="-3"
        dy=".32em"
        y={yScale(ticksValue) + yScale.bandwidth() / 2}
      >
        {ticksValue}
      </text>
    </g>
  ))