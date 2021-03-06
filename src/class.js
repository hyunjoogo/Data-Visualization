import React from "react";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: d3.range(200).map(_ => [random(), random()]),
      zoomTransform: null
    }
    this.zoom = d3.zoom()
      .scaleExtent([-5, 5])
      .translateExtent([[-100, -100], [props.width+100, props.height+100]])
      .extent([[-100, -100], [props.width+100, props.height+100]])
      .on("zoom", this.zoomed.bind(this))
  }
  componentDidMount() {
    d3.select(this.refs.svg)
      .call(this.zoom)
  }
  componentDidUpdate() {
    d3.select(this.refs.svg)
      .call(this.zoom)
  }
  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform
    });
  }
}