import React, {useEffect, useState} from "react";
import {json, geoMercator} from 'd3';
import {feature} from 'topojson';

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

const Note = () => {
  const width = 1000;
  const height = 1000;
  const margin = {top: 20, right: 30, bottom: 65, left: 90,};

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  useEffect(() => {
    const koreaMap = '/public/TL_SCCO_CTPRVN.json';
    json(koreaMap).then(console.log)
    // const geojson = topojson.feature(koreaMap, koreaMap.objects.skorea_provinces_2018_geo);
  }, [])


  const projection = geoMercator()
    .scale(1)
    .translate([0, 0]);
  //
  // const path = d3.geoPath().projection(projection);
  // const bounds = path.bounds(geojson);
  // const widthScale = (bounds[1][0] - bounds[0][0]) / width;
  // const heightScale = (bounds[1][1] - bounds[0][1]) / height;
  // const scale = 1 / Math.max(widthScale, heightScale);
  // const xoffset = width / 2 - scale * (bounds[1][0] + bounds[0][0]) / 2 + 10;
  // const yoffset = height / 2 - scale * (bounds[1][1] + bounds[0][1]) / 2 + 80;
  // const offset = [xoffset, yoffset];
  // projection.scale(scale).translate(offset);


  return (
    <svg width={width} height={height}>
      <g>

      </g>
    </svg>
  )
}

export default Note