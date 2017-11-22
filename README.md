# ideaboard

> A Vue.js project

## Build setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Push changes

``` bash
# Push to origin
git push origin master
# Pull changes in hook
sudo ./hooks/post-receive
```

## Push changes to production

``` bash
# Push to origin
git push production
# Move into repo folder
sudo cd /home/edjenkins/repos/ideaboard
# Pull changes in hook
sudo ./hooks/post-receive
```

## Adding an instance

Add the appropriate configuration to the Caddyfile, this will create a subdomain for the instance (e.g. 'example.ideaboard.co.uk').

Add a homepage component to the instances directory - /app/src/components/instances/example.vue.

Add configuration for instance - app/src/config.js.