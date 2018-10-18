import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    const { record } = this.props;
    return (
      <div className="card">
        <div className="artwork">
          {record.fields.Attachments.map(attachment => (
            <img
              key={attachment.id}
              src={attachment.thumbnails.large.url}
              alt={attachment.filename}
            />
          ))}
        </div>
        <h2 className="name">{record.fields.Name}</h2>
        <div className="on-display">
          <input
            type="checkbox"
            name="on-display"
            checked={record.fields["On Display?"]}
            data-record-id={record.id}
            onChange={this.props.toggleOnDisplay}
          />
          <label htmlFor="on-display">On Display</label>
        </div>
      </div>
    );
  }
}

export default Card;
