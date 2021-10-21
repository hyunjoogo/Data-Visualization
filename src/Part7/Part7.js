import React, {useEffect, useRef, useState} from "react";
import * as d3 from 'd3';
import {geoMercator, geoPath, json} from 'd3';

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

const height = 500;
const width = 1000;
const radius = 6;
const step = radius * 2;
const theta = Math.PI * (3 - Math.sqrt(5))

const data = Array.from({length: 2000}, (_, i) => {
  const radius = step * Math.sqrt(i += 0.5), a = theta * i;
  return {
    x: width / 2 + radius * Math.cos(a),
    y: height / 2 + radius * Math.sin(a)
  };
})


const chart = () => {
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);

  const g = svg.append("g")
    .attr("cursor", "grab");

  g.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", ({x}) => x)
    .attr("cy", ({y}) => y)
    .attr("r", radius)
    .attr("fill", (d, i) => d3.interpolateRainbow(i / 360))
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  svg.call(d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 8])
    .on("zoom", zoomed));

  function dragstarted() {
    d3.select(this).raise();
    g.attr("cursor", "grabbing");
  }

  function dragged(event, d) {
    d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
  }

  function dragended() {
    g.attr("cursor", "grab");
  }

  function zoomed({transform}) {
    g.attr("transform", transform);
  }

  return svg.node();
}


const Part7 = () => {
  const width = 618;
  const height = 1000;
  const margin = {top: 20, right: 30, bottom: 65, left: 90,};

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const [data, setData] = useState(null);
  const zoomRef = useRef();
  const [zoomTransform, setZoomTransform] = useState(null);

  const svgRef = useRef();

  useEffect(() => {
    // json(koreaMap)
    //   .then(topojsonData => {
    //     setData(topojsonData)
    //   });
    //
    // zoomRef.current = d3.zoom()
    //   .scaleExtent([-5, 5])
    //   .translateExtent([[-100, -100], [width + 100, height + 100]])
    //   .extent([[-100, -100], [width + 100, height + 100]])
    //   // .on("zoom", this.zoomed.bind(this))
    //   .on("zoom", (event) => setZoomTransform(event.transform));
    //

    // const svg = d3.select(svgRef.current);
    //
    // const g = svg.append("g")
    //   .attr("cursor", "grab");
    //
    // g.selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("cx", ({x}) => x)
    //   .attr("cy", ({y}) => y)
    //   .attr("r", radius)
    //   .attr("fill", (d, i) => d3.interpolateRainbow(i / 360))
    //   .call(d3.drag()
    //     .on("start", dragstarted)
    //     .on("drag", dragged)
    //     .on("end", dragended));
    //
    // svg.call(d3.zoom()
    //   .extent([[0, 0], [width, height]])
    //   .scaleExtent([1, 8])
    //   .on("zoom", zoomed));
    //
    // function dragstarted() {
    //   d3.select(this).raise();
    //   g.attr("cursor", "grabbing");
    // }
    //
    // function dragged(event, d) {
    //   d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
    // }
    //
    // function dragended() {
    //   g.attr("cursor", "grab");
    // }
    //
    // function zoomed({transform}) {
    //   g.attr("transform", transform);
    // }
    const data = [25, 30, 45, 60, 20];
    const svg = d3.select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join(
        enter => enter.append("circle"),
        update => update.attr("class", "updated"),
        exit => exit.remove()
      );

  }, []);

  // useEffect(() => {
  //   if (!svgRef.current) {
  //     return;
  //   }
  //
  //   d3.select(svgRef.current).call(zoomRef.current);
  // });

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

  const transform = () => {
    console.log('transform');
    let transform;
    let x = 0;
    let y = 0;

    if (zoomTransform) {
      transform = `translate(${x + zoomTransform.x}, ${y + zoomTransform.y}) scale(${zoomTransform.k})`;
    } else {
      transform = `translate(${x}, ${y})`;
    }

    return transform;
  };

  return (
<svg ref={svgRef}>

</svg>
    // <div style={{width: "100%", height: "1000px"}}>
    //   <svg width={width} height={height} ref={svgRef}>
    //     <g transform={transform()}>
    //       <g className="marks">
    //         {data.features.map((feature, index) => {
    //           return <path d={path(feature)} onClick={() => console.log(index)}/>
    //         })}
    //       </g>
    //       <g>
    //         {mapInfo.map((d) => {
    //           const xLocation = projection([d.lon, d.lat])[0]
    //           const yLocation = projection([d.lon, d.lat])[1]
    //           return <image href="./logo192.png" x={xLocation} y={yLocation} height="50px" width="50px"/>
    //         })}
    //       </g>
    //     </g>
    //   </svg>
    // </div>
  );
}

export default Part7