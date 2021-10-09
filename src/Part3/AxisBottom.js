export const AxisBottom = ({xScale, innerHeight, tickFormat}) =>
  xScale.ticks().map(ticksValue => (
    <g className="tick" key={ticksValue} transform={`translate(${xScale(ticksValue)},0)`}>
      <line y2={innerHeight} stroke="black"/>
      <text dy="0.71em" y={innerHeight + 9} style={{textAnchor: "middle"}}>
        {tickFormat(ticksValue)}</text>
    </g>
  ))