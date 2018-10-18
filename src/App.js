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

  toggleOnDisplay = id => e => {
    const target = e.target;

    // Update the state first
    this.setState((state => {
      const record = state.records.filter(record => record.id === id)[0];
      record.fields['On Display?'] = target.checked;
      return {
        ...state.records,
        record
      }
    }))

    // Update via Airtable API proxy
    // If it fails, show the error page
    axios
      .patch("/.netlify/functions/api-proxy", {
        params: {
          url: `https://api.airtable.com/v0/${
            process.env.REACT_APP_AIRTABLE_BASE_ID
          }/Artists/${id}`
        },
        data: {
          fields: {
            "On Display?": target.checked
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
