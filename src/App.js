import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import LoadingIndicator from "./components/LoadingIndicator";
import Error from "./components/Error";
import Gallery from "./components/Gallery";

class App extends Component {
  state = {
    records: [],
    loading: true,
    pageSize: 6,
    offset: "",
    error: null
  };

  componentDidMount() {
    this.getRecords();
  }

  getRecords = () => {
    this.setState({ loading: true });
    axios
      .get("/.netlify/functions/api-proxy", {
        params: {
          url: `https://api.airtable.com/v0/${
            process.env.REACT_APP_AIRTABLE_BASE_ID
          }/Artists?pageSize=${this.state.pageSize}&offset=${this.state.offset}`
        }
      })
      .then(
        response =>
          console.log(response) ||
          this.setState(state => {
            const records = state.records.concat(response.data.records);
            return {
              loading: false,
              records,
              offset: response.data.offset || "stop"
            };
          })
      )
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };

  toggleOnDisplay = id => e => {
    const target = e.target;

    // Update the state first
    this.setState(state => {
      const record = state.records.filter(record => record.id === id)[0];
      record.fields["On Display?"] = target.checked;
      return {
        ...state.records,
        record
      };
    });

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
    const { records, loading, error, offset } = this.state;

    if (error !== null) {
      return <Error error={error} />;
    }

    if (loading && records.length === 0) {
      return <LoadingIndicator />;
    }

    return <div className="App">
        <h1>Airtable API Proxy Demo</h1>
        <Gallery records={records} toggleOnDisplay={this.toggleOnDisplay} />
        {offset !== "stop" && <button onClick={this.getRecords} className="btn-more">
            {loading ? "Loading..." : "More..."}
          </button>}
        <footer>
          Built by <a href="https://www.jeffappareti.com">Jeff Appareti</a>. View the <a href="https://github.com/jappareti/netlify-airtable-api-proxy">
            code on github
          </a>. View the <a href="https://airtable.com/shr13XLtk89rGnXN1">
            Airtable Base
          </a>.
        </footer>
      </div>;
  }
}

export default App;
