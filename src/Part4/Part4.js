import React, {useEffect, useState} from "react";
import {csv, extent, format, scaleLinear} from "d3";
import {AxisBottom} from "../Part4/AxisBottom";
import {AxisLeft} from "../Part4/AxisLeft";
import {Marks} from "../Part4/Marks";


const csvURL = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv"
const width = 960;
const height = 500;
const margin = {top: 20, right: 30, bottom: 65, left: 90,};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;

export const Part4 = () => {
  const [data, setData] = useState();
  const [category, setCategory] = useState(0)
  const [xAxisLabel, setXAxisLabel] = useState("Sepal Length")

  useEffect(() => {
    const row = d => {
      d.sepal_length = +d.sepal_length; // +를 추가하면 타입을 숫자로
      d.sepal_width = +d.sepal_width
      d.petal_length = +d.petal_length
      d.petal_width = +d.petal_width
      return d
    }

    csv(csvURL, row).then(setData)
  }, [])

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => {
    if (category === 0) {
      return d.sepal_length;
    } else {
      return d.petal_length;
    }
  }

  const yValue = d => d.sepal_width;
  const yAxisLabel = "Sepal width";


  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    // 참조범위([최소값, 최대값])
    // extent(배열) => return [최소값,최대값] : 배열 안에 값 중에
    .range([0, innerWidth])

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'M')
  // format(".2s")(n) : x축에 적히는 tick들
  // .replace('G', 'M') : 그 중에 G를 원으로 바꿔죠


  return (
    <>
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
      <button onClick={() => {
        if (category === 0) {
          setXAxisLabel("Petal Length")
          return setCategory(1);
        } else {
          setXAxisLabel("Sepal Length")

          return setCategory(0);
        }
      }}>ChangeX
      </button>
    </>
  )
}