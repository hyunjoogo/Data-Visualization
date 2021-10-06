import React, {useEffect, useState} from "react";
import {csv, scaleBand, scaleLinear, max} from "d3";

const CSVURL = "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv"
const width = 960;
const height = 500;

export const Part3 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.Population = +d['2020'];
      return d;
    }
    csv(CSVURL, row).then(data => {
      // setData(data);
      setData(data.slice(0, 10));
    })
  }, [])

  if (!data) {
    return <pre style={{fontSize: "7em"}}>Loading...</pre>
  }

  const yScale = scaleBand()
    .domain(data.map(d => d.Country)) // array형태
    .range([0, height]); // 범위

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, width])


  return (
    <svg width={width} height={height}>
      {data.map(d => {
        return <rect x={0} y={yScale(d.Country)} width={xScale(d.Population)} height={yScale.bandwidth()}/>
      })}
    </svg>
  )
}