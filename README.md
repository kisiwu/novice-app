# novice-app

Create [Express](https://expressjs.com) applications.

## Installation

```bash
$ npm install @novice1/app
```

## Usage

```js
const routing = require('@novice1/routing'),
  { FrameworkApp } = require('../../lib/index');

// Router
const router = routing().get('/', (req, res) => {
  // ...
}).put('/', (req, res) => {
  // ...
});

// FrameworkApp
const app = new FrameworkApp({
  framework: {
    // middlewares
    middlewares: [
      (req, res, next) => {
        next();
      }
    ],
    // authorization middlewares
    auth: [
      (req, res, next) => {
        next();
      }
    ],
    // validation middlewares
    validators: [
      (req, res, next) => {
        next();
      }
    ]
  },
  // routers
  routers: [
    router
  ]
});

// http.Server
const server = app.listen(8000, '0.0.0.0', () => {
  console.log('Application started ...');
  console.log(app.meta)
});
```

### addOptions
Concatenate current application options with new options.
```js
app.addOptions({
  // add more routers
  routers: [router]
});
```

### Routing
```js
app.addRouters([router]);
```
```js
app.get({
  path: '/index',
  name: 'Home',
  tags: ['Index']
}, function homepage(req, res) {
  // ...
});

app.put('/add', (req, res) => {
  // ...
});

app.use((err, req, res) => {
  // ...
});
```
```js
const lazyRouter = app.lazyrouter();
lazyRouter.get({
  path: '/index',
  name: 'Home',
  tags: ['Index']
}, function homepage(req, res) {
  // ...
});

lazyRouter.put('/add', (req, res) => {
  // ...
});

lazyRouter.use((err, req, res) => {
  // ...
});
```

### http ServerOptions
```js
const httpServerOptions = {};

const server = app.build(httpServerOptions);
server.listen(8000, '0.0.0.0', () => {
  console.log('Application started ...');
  console.log(app.meta)
});
```
## References

- [Express](https://expressjs.com)
- [@novice1/app](https://novice1.000webhostapp.com/app/)
