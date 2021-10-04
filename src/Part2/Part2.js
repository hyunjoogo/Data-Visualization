import React, {useCallback, useState} from 'react';


const loadData = () => {
  const fetchText = async (url) => {
    const response = await fetch(url);
    return await response.text();
  }
  const SCVURL = "https://gist.githubusercontent.com/hyunjoogo/60002b0cfa55940ba486ba8c55850b7d/raw/66b02acd4f34d6c6718dd535829b0e41e827dd30/cssNamedColors.csv"


  fetchText(SCVURL).then(text => console.log(text));
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
