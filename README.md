# as-a-service.app

A web service that offers small things as a service

## Local Development

```
git clone git@github.com:leggsimon/as-a-service.app.git
cd as-a-service.app
npm install
```

### Website

The website is a next.js application that lives in `/web`.

To work on the website run `npm run dev-web`, this will run the app on [http://localhost:3000](http://localhost:3000). New pages must be added in `/web/pages` with a `.jsx` extension.

### Functions

The services are lambda functions. New services must be added in the `/src` directory, they must export a default function called `handler` which accepts an `event` and a `context`.

To run the functions locally run `npm run dev-functions`. This will serve them on [http://localhost:9000](http://localhost:9000) and watch and reload on file changes.

## Deployment

Deployments are made automatically by Netlify, a PR will build a new trial deploy. A merge into the master branch will deploy into production.
