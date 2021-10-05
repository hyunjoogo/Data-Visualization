import React, {useEffect, useState} from 'react';
import {csv, csvFormat} from "d3";


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

  return (
    <>
      {data.map((value)=>{
        return <div style={{backgroundColor: value['RGB hex value'], width:'960px', height:'3px'}}/>
      })}
    </>

  )
}
