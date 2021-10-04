import React, {useCallback, useState} from 'react';
import {csv, csvFormat} from "d3";


const loadData = () => {
  const CSVURL = "https://gist.githubusercontent.com/hyunjoogo/60002b0cfa55940ba486ba8c55850b7d/raw/66b02acd4f34d6c6718dd535829b0e41e827dd30/cssNamedColors.csv"

  // d3 기능으로 할 때
  csv(CSVURL).then(data => {
    let message = '';
    message = message + Math.round(csvFormat(data).length / 1024) + ' kb\n';
    message = message + data.length + ' rows\n';
    message = message + data.columns.length + ' columns\n';
    document.body.textContent = message;
  })

  // fetch, async, await 사용하였을 때
  //   const fetchText = async (url) => {
  //     const response = await fetch(url);
  //     return await response.text();
  //   }
  //
  //   fetchText(CSVURL)
  //     .then(text => {
  //       const data = csvParse(text);
  //       let message = '';
  //       message = message + Math.round(text.length / 1024) + ' kb\n';
  //       message = message + data.length + ' rows\n';
  //       message = message + data.columns.length + ' columns\n';
  //       document.body.textContent = message;
  //     });


  // 피라미드 오브 둠 ㅋㅋㅋㅋㅋ
  // indent 모양이 피라미드라서 ㅋㅋㅋ
  // fetch(url)
  //   .then(result => {
  //     result.text()
  //       .then(text => {
  //         console.log(text);
  //       })
  //   });

}
loadData();


const width = 960;
const height = 500;
const circleX = width / 2;
const circleY = height / 2;
const circleRadius = 30;
const initialMousePosition = {x: circleX, y: circleY};

export const Part2 = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition);

  const handleMouseMove = useCallback(event => {
    const {clientX, clientY} = event;
    setMousePosition({x: clientX, y: clientY})
  }, []);

  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle cx={mousePosition.x}
              cy={mousePosition.y}
              r={circleRadius}
      />
    </svg>
  )
}
