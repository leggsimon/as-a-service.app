# as-a-service.app

A web service that offers small things as a service

## Local Development

```
git clone git@github.com:leggsimon/as-a-service.app.git
cd as-a-service.app
npm install
```

### Functions

The services are lambda functions. New services must be added in the `/src` directory, they must export a default function called `handler` which accepts an `event` and a `context`

## Deployment

Deployments are made automatically by Netlify, a PR will build a new trial deploy. A merge into the master branch will deploy into production.
