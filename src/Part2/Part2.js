import React, {useEffect, useState} from 'react';
import {csv, arc, csvFormat} from "d3";


const CSVURL = "https://gist.githubusercontent.com/hyunjoogo/60002b0cfa55940ba486ba8c55850b7d/raw/66b02acd4f34d6c6718dd535829b0e41e827dd30/cssNamedColors.csv"

const width = 960;
const height = 500;

const message = data => {
  let message = '';
  message = message + Math.round(csvFormat(data).length / 1024) + ' kb\n';
  message = message + data.length + ' rows\n';
  message = message + data.columns.length + ' columns\n';
  return message;
}

export const Part2 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(CSVURL).then(setData)
  }, [])

  if (!data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  const pieArc = arc()
    .innerRadius(0)
    .outerRadius(width)


  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        {data.map((value, index) => {
          if (index === 149) {
            console.log(index, data.length * 2 * Math.PI, index / data.length * 2 * Math.PI)
            console.log((index+1) / data.length * 2 * Math.PI)
          }
          return <path
            key={index}
            fill={value['RGB hex value']}
            d={pieArc({
              // 안 원이 없으니까 꼬깔모양이 나오고
              // 시작각도는 0 ~ 6.24
              // 끝 각도는 0.04 ~6.28
              startAngle: index / data.length * 2 * Math.PI,
              endAngle: (index+1) / data.length * 2 * Math.PI
            })}
          />
        })}
      </g>
    </svg>

  )
}
