import React from "react";
import {max, scaleBand, scaleLinear, format} from "d3";
import {useData} from "./useData";
import {AxisBottom} from "./AxisBottom";
import {AxisLeft} from "./AxisLeft";
import {Marks} from "./Marks";

const width = 960;
const height = 500;
const margin = {top: 20, bottom: 60, left: 220, right: 30};
const xAxisLabelOffset = 60;

export const Part3 = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  const yScale = scaleBand()
    .domain(data.map(d => d.Country)) // array형태
    .range([0, innerHeight]) // 범위
    .padding(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, innerWidth])

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'M')
  // format(".2s")(n) : x축에 적히는 tick들
  // .replace('G', 'M') : 그 중에 G를 원으로 바꿔죠


  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          //
        />
        <AxisLeft yScale={yScale}/>
        <text className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle">Population
        </text>
        <Marks data={data} xScale={xScale} yScale={yScale} toolTipFormat={xAxisTickFormat}/>
      </g>
    </svg>
  )
}