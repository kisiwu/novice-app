# @novice1/app

[![license](https://img.shields.io/npm/l/@novice1/app)](./LICENSE)
[![node](https://img.shields.io/node/v/@novice1/app)](https://nodejs.org)

Build [Express v5](https://expressjs.com) applications on top of [@novice1/routing](https://www.npmjs.com/package/@novice1/routing).

`FrameworkApp` wraps an Express application and gives you:

- **Routers** from `@novice1/routing`, registered by options or created on the fly.
- **Framework-level `middlewares`, `auth` and `validators`**, applied to every registered router.
- **Route metadata** (`name`, `tags`, ...) available through `app.meta`.
- **Deferred server creation**: `http`/`https` servers are created for you, so the Express app never has to be wired by hand.
- **Typed, chainable API** written in TypeScript.

## Table of contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Configuration](#configuration)
- [Defining routes](#defining-routes)
- [Error handling](#error-handling)
- [Starting the server](#starting-the-server)
- [Express settings](#express-settings)
- [API overview](#api-overview)
- [Development](#development)
- [References](#references)
- [License](#license)

## Installation

`express` and `@novice1/routing` are peer dependencies.

```bash
npm install @novice1/app @novice1/routing express
```

Requires Node.js 18 or later.

## Quick start

```js
import routing from '@novice1/routing';
import { FrameworkApp } from '@novice1/app';

const router = routing()
  .get({ path: '/', name: 'Home', tags: ['Index'] }, (req, res) => {
    res.send('Hello world');
  });

const app = new FrameworkApp({
  routers: [router]
});

app.listen(8000, '0.0.0.0', () => {
  console.log('Application started ...');
  console.log(app.meta); // metadata of every registered route
});
```

CommonJS works too:

```js
const { FrameworkApp } = require('@novice1/app');
```

## Configuration

Pass options to the constructor, or add them later with `addOptions()`.

```js
const app = new FrameworkApp({
  framework: {
    // regular Express middlewares, registered before the routers' routes
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
  routers: [router]
});
```

| Option                 | Description                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `middlewares` | Express middlewares added to the main router.                                           |
| `auth`       | Authorization handlers, set on each router that does not define its own.                 |
| `validators` | Validation handlers, set on each router that does not define its own.                    |
| `routers`              | `@novice1/routing` routers to register.                                                  |

> `auth` and `validators` are only applied to routers that have none of their own.

### Adding options later

`addOptions()` concatenates new options with the current ones. Routers can be added even after the application is built.

```js
app.addOptions({
  routers: [anotherRouter]
});

// or, only routers
app.addRouters([anotherRouter]);
```

## Defining routes

Besides registering routers, you can declare routes directly on the application. They are added to an internal router created with `lazyrouter()`.

```js
app.get({
  path: '/index',
  name: 'Home',
  tags: ['Index']
}, function homepage(req, res) {
  res.send('Home');
});

app.put('/add', (req, res) => {
  // ...
});

app.use((req, res, next) => {
  next();
});
```

Supported methods: `all`, `get`, `post`, `put`, `delete`, `patch`, `options`, `head`, `use` and `param`.

You can also create and keep a reference to the router yourself. It is added to the application immediately:

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
```

## Error handling

Use `useError()` to register error-handling middlewares. They are mounted after all routes when the application is built (or immediately if it is already built).

```js
app.useError((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
```

## Starting the server

### `listen()`

`listen()` builds the application and starts an `http.Server`. It accepts the same arguments as `server.listen()` and returns the server.

```js
const server = app.listen(8000, '0.0.0.0', () => {
  console.log('Application started ...');
});
```

### `build()`

`build()` builds the application and returns the `http.Server` **without** starting it. Calling it again returns the same server. Pass `http.ServerOptions`, and optionally another module such as `https`:

```js
const server = app.build({ keepAlive: true });
server.listen(8000);
```

```js
import https from 'https';

const httpsServerOptions = {
  // key, cert, ...
};

const server = app.build(httpsServerOptions, https);
server.listen(8443);
```

After building, `app.server` returns the server, and `app.built` is `true`.

## Express settings

The usual Express application helpers are available and chainable:

```js
app
  .set('trust proxy', true)
  .enable('etag')
  .disable('x-powered-by');

app.enabled('etag');  // true
app.get('trust proxy'); // true
app.engine('html', renderFn);
```

## API overview

| Member                               | Description                                                       |
| ------------------------------------ | ----------------------------------------------------------------- |
| `new FrameworkApp(options?)`         | Creates the application.                                          |
| `addOptions(options)`                | Concatenates options with the current ones.                       |
| `addFrameworkOptions(options)`       | Sets `middlewares`, `auth` and/or `validators`.                   |
| `addRouters(routers)`                | Adds one or several routers.                                      |
| `lazyrouter(options?)`               | Creates a router, adds it to the app and returns it.              |
| `all / get / post / put / delete / patch / options / head / use / param` | Declare routes and middlewares. |
| `useError(...handlers)`              | Registers error-handling middlewares.                             |
| `build(options?, mod?)`              | Builds the app and creates the server (without listening).        |
| `listen(...)`                        | Builds the app and starts listening.                              |
| `set / enable / disable / enabled / disabled / engine / on('mount')` | Express settings.  |
| `meta`                               | Metadata of the registered routes.                                |
| `server`, `building`, `built`        | Server instance and build state.                                  |

Full documentation is available at [kisiwu.github.io/novice-app](https://kisiwu.github.io/novice-app/latest/).

## Development

```bash
npm run build       # compile TypeScript to lib/
npm test            # run tests against the sources
npm run test:lib    # run tests against the compiled output
npm run lint        # lint
npm run format      # format with Prettier
npm run doc         # generate the documentation
```

## References

- [Express](https://expressjs.com)
- [@novice1/routing](https://www.npmjs.com/package/@novice1/routing)
- [Documentation](https://kisiwu.github.io/novice-app/latest/)

## License

[MIT](./LICENSE)
