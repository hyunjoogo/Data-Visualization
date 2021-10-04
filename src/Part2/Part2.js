import React from 'react';


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


export const Part2 = () => {

  return (
    <h1>2</h1>
  )
}
