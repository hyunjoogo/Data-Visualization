export const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset = 3}) =>
  xScale.ticks().map(ticksValue => (
    <g className="tick" key={ticksValue} transform={`translate(${xScale(ticksValue)},0)`}>
      <line y2={innerHeight}/>
      <text dy="0.71em" y={innerHeight + tickOffset} style={{textAnchor: "middle"}}>
        {tickFormat(ticksValue)}</text>
    </g>
  ))