import React, {useEffect, useRef, useState} from "react";
import {geoMercator, geoPath, json, zoom, select} from 'd3';
import {feature} from 'topojson';

const mapInfo = [
  {
    "name": "서울",
    "lat": "37.532600",
    "lon": "127.024612"
  },
  {
    "name": "대전",
    "lat": "36.3730178",
    "lon": "127.2483736"
  }
]

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';
const koreaMap = './TL_SCCO_CTPRVN.json';

const Part7 = () => {
  const width = 618;
  const height = 1000;
  const margin = {top: 20, right: 30, bottom: 65, left: 90,};

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const [data, setData] = useState(null);
  const [tos, setTos] = useState(null);
  const [currentZoomState, setCurrentZoomState] = useState();

  const svgRef = useRef();
  const svg = select(svgRef.current);
  console.log(data, tos)

  useEffect(() => {
    json(koreaMap)
      .then(topojsonData => {
        setData(topojsonData)
      })

    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event) => {
        console.log(event)
        const zoomState = event.transform;
        setCurrentZoomState(zoomState);
      });

    svg.call(zoomBehavior);
  }, [currentZoomState])

  if (!data) {
    return null;
  }

  let projection = geoMercator()
    .scale(1)
    .translate([0, 0]);

  const path = geoPath(projection)
  const bounds = path.bounds(data);
  const widthScale = (bounds[1][0] - bounds[0][0]) / width;
  const heightScale = (bounds[1][1] - bounds[0][1]) / height;
  const scale = 1 / Math.max(widthScale, heightScale);
  const xOffset = width / 2 - scale * (bounds[1][0] + bounds[0][0]) / 2 + 10;
  const yOffset = height / 2 - scale * (bounds[1][1] + bounds[0][1]) / 2 + 80;
  const offset = [xOffset, yOffset];
  projection.scale(scale).translate(offset);

  return (
    <div style={{width: "100%", height: "1000px"}}>
      <svg width={width} height={height} ref={svgRef}>
        <g className="marks">
          {data.features.map((feature, index) => {
            return <path d={path(feature)} onClick={() => console.log(index)}/>
          })}
        </g>
        <g>
          {mapInfo.map((d) => {
            const xLocation = projection([d.lon, d.lat])[0]
            const yLocation = projection([d.lon, d.lat])[1]
            return <image href="./logo192.png" x={xLocation} y={yLocation} height="50px" width="50px"/>
          })}
        </g>
      </svg>
    </div>
  )
}

export default Part7