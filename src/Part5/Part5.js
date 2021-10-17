import React, {useEffect, useState} from 'react';
import {csv, extent, format, scaleTime, scaleLinear, timeFormat} from "d3";

import {AxisBottom} from "../Part4/AxisBottom";
import {AxisLeft} from "../Part4/AxisLeft";
import {Marks} from "../Part4/Marks";

const csvURL = "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv"
const width = 960;
const height = 500;
const margin = {top: 20, right: 30, bottom: 65, left: 90,};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;

const Part5 = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const row = d => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
      return d
    }

    csv(csvURL, row).then(setData)
  }, [])

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.timestamp;
  const xAxisLabel = "Timestamp";

  const yValue = d => d.temperature;
  const yAxisLabel = "Temperature";

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])

  const xAxisTickFormat = timeFormat('%a')

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
          //
        />
        <text className="axis-label"
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
          // 돌리고 움직이지 말고 움직이고 돌려라
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5}/>
        <text className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle">
          {xAxisLabel}
        </text>
        <Marks data={data} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue}
               toolTipFormat={xAxisTickFormat} circleRadius={7}/>
      </g>
    </svg>
  )
}

export default Part5;