# recap-be
Back end of the [Recap](https://github.com/yathindrakodithuwakku/recap) application.

## Table of Contents
- [Getting Started](#getting-started)
- [Build Setup](#build-setup)
- [Tech Stack](#tech-stack)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Getting Started

## Build Setup

###Yarn

``` bash
# install dependencies
yarn

# start dev server at localhost:4000
yarn start

# build project
yarn build
```

###Bundling For Production

It needs to run `yarn build` or `npm run build` to build this backend project and need to add the frontend build distribution in to a new folder called build-fe inside build folder.


###Serve In Production
Here [PM2](https://pm2.io/doc/en/runtime/overview/) has used as the process manager. So mention 
environment variables in the ecosystem.config.js file, which has created in .env file 
(.env.default has needed variables) in the development stage.


## Tech Stack

- Express.js
- ms sql server (Can change to any sql based database)
- Apollo Graphql with subscriptions

## Automatic restart the pm2 served app
Go through below link
https://blog.cloudboost.io/nodejs-pm2-startup-on-windows-db0906328d75?gi=e094e569457e

## Maintainers
[@yathindra123](https://www.linkedin.com/in/yathindra-kodithuwakku-651403133/)

## Contribute

Warmly welcome pull requests from any contributor

## Links

- [Frontend](https://bitbucket.pearson.com/users/urawyya/repos/retro/browse)

## License

MIT © 2018 Yathindra Kodithuwakku
