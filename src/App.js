import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import LoadingIndicator from "./components/LoadingIndicator";
import Error from "./components/Error";
import Gallery from "./components/Gallery";

class App extends Component {
  state = {
    records: [],
    loading: false,
    error: null
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/.netlify/functions/api-proxy", {
        params: {
          url: `https://api.airtable.com/v0/${
            process.env.REACT_APP_AIRTABLE_BASE_ID
          }/Artists`
        }
      })
      .then(response =>
        this.setState({ loading: false, records: response.data.records })
      )
      .catch(error => {
        this.setState({ loading: false, error });
      });
  }

  toggleOnDisplay = e => {
    const { recordId } = e.target.dataset;
    axios
      .patch("/.netlify/functions/api-proxy", {
        params: {
          url: `https://api.airtable.com/v0/${
            process.env.REACT_APP_AIRTABLE_BASE_ID
          }/Artists/${recordId}`
        },
        data: {
          fields: {
            "On Display?": e.target.checked
          }
        }
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };

  render() {
    const { records, loading, error } = this.state;

    if (error !== null) {
      return <Error error={error} />;
    }

    if (loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="App">
        <Gallery records={records} toggleOnDisplay={this.toggleOnDisplay} />
      </div>
    );
  }
}

export default App;
