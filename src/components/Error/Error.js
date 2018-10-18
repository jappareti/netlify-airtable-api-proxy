import React from 'react';
import "./Error.css";

const Error = ({error}) => {
  return <div className="error-container">
      <h2>
        Oh <span role="img" aria-labelledby="poop">💩</span>! There was an error.
      </h2>
    <p>Here's the entire response object, if that helps <span role="img" aria-labelledby="shrug">🤷‍</span></p>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>;
};

export default Error;