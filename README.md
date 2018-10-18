# Airtable API Proxy with Netlify Functions

This demo uses a [Netlify Function](https://www.netlify.com/docs/functions/) as a proxy for the Airtable API. I was inspired to build this after discovering [Airtable's API Proxy Demo](https://github.com/Airtable/airtable_api_proxy) built with Ruby. I wanted an even simpler way to obfuscate the Airtable API Key on a front-end app, so I built this demo.

I bootstrapped the project with [Create React App](https://github.com/facebook/create-react-app).

![Airtable API Proxy Demo](screenshot.jpg?raw=true)

## Buy... why?

Well, I wanted a dead simple way to use the Airtable API on a client facing React app, but not expose the Airtable API key. A server can act as the middleman (a.k.a proxy) to communicate with the API and your frontend. The server holds the key in an environment variable so it's not exposed to the front-end.

You could setup an instance on Heroku, like Airtable did in their [Ruby demo](https://github.com/Airtable/airtable_api_proxy), or setup a Digital Ocean droplet with a Node server, **or you could use a Netlify Function**! Which is what this demo is all about.

## Getting started

This demo is meant to be used with this [Art Gallery template](https://airtable.com/templates/featured/art-gallery-example). I recommend adding that template to your own Airtable account and playing around with it.

If you want to use this for a different base, then you'll need to change some configurations in the lambda proxy function and the React app.

### Deploy to Netlify

The easiest way to get started is to deploy to Netlify! Click the button below.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/jappareti/netlify-airtable-api-proxy"><img src="https://www.netlify.com/img/deploy/button.svg"></a>

You'll be asked for your Airtable API Key and the Airtable Base ID.

**Where is your API key?**

Your **Airtable API Key** can be found at <https://airtable.com/account> (scroll down to **<> API**)

The **Airtable Base ID** can be found at <https://airtable.com/api>. Select the base that you want to use. Each base has it's own API associated with it, so you'll need this ID. After you click on the base, the ID is in the URL, like this:

`https://airtable.com/THIS_IS_YOUR_AIRTABLE_BASE_ID__COPY_ME/api/docs`

### Install Locally

To install this locally, first clone this repo and install the dependencies

```sh
git clone git@github.com:jappareti/netlify-airtable-api-proxy.git
yarn install
```

Or use `npm install` if you don't have `yarn` installed.

#### Update the environment variables

Create your own `.env` file with your **API key** and **Airtable Base ID**

```sh
cp .env.example .env
```

#### Start the app in development mode

##### `npm start` or `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Try toggling the **On Display?** checkboxes and watch them update in your Airtable base!
