import axios from "axios";

require("dotenv").config();

export function handler(event, context, callback) {
  console.log(event);
  if (event.httpMethod === "PATCH") {
    const body = JSON.parse(event.body);
    const { params, data } = body;
    axios({
      method: "patch",
      url: params.url,
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-type": "application/json"
      },
      data: {
        fields: {
          "On Display?": data.fields["On Display?"]
        }
      }
    })
      .then(response => {
        console.log(response);
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ ...response.data })
        });
      })
      .catch(err => {
        console.log(err);
        callback(null, {
          statusCode: err.response.status,
          body: JSON.stringify({ ...err.response.data })
        });
      });
  }

  axios
    .get(event.queryStringParameters.url, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
      }
    })
    .then(response => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ ...response.data })
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: err.response.status,
        body: JSON.stringify({ ...err.response.data })
      });
    });
}
