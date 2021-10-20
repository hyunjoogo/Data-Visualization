import React from "react";
import {geoMercator} from 'd3';

const DetailMap = () => {
  const width = 1000;
  const height = 1000;

  let projection = geoMercator()
    .scale(1)
    .translate([0, 0]);

  // const path = d3.geoPath().projection(projection);
  // const bounds = path.bounds(geojson);
  // const widthScale = (bounds[1][0] - bounds[0][0]) / width;
  // const heightScale = (bounds[1][1] - bounds[0][1]) / height;
  // const scale = 1 /Math.max(widthScale, heightScale);
  // const xoffset = width/2 - scale * (bounds[1][0] + bounds[0][0]) /2 + 10;
  // const yoffset = height/2 - scale * (bounds[1][1] + bounds[0][1])/2 + 80;
  // const offset = [xoffset, yoffset];
  // projection.scale(scale).translate(offset);

  console.log(projection)
  return (
    <svg width={width} height={height}>
      <g>
        {/*<path*/}
        {/*fill={"#000000"}*/}
        {/*d={}>*/}
        {/*</path>*/}
      </g>
    </svg>
  )
}

export default DetailMap