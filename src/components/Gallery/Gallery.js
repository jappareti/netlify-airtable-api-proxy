import React, { Component } from "react";
import Card from "../Card";
import "./Gallery.css";

class Gallery extends Component {
  render() {
    const { records, toggleOnDisplay } = this.props;
    return (
      <div className="gallery">
        {records.map(record => {
          return <Card record={record} key={record.id} toggleOnDisplay={toggleOnDisplay} />;
        })}
      </div>
    );
  }
}

export default Gallery;
