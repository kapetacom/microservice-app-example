'use strict';
const express = require('express')
const bodyParser = require("body-parser")
const jwt = require('express-jwt')

const ZIPKIN_URL = process.env.ZIPKIN_URL;
const {Tracer, 
  BatchRecorder,
  jsonEncoder: {JSON_V2}} = require('zipkin');
  const CLSContext = require('zipkin-context-cls');  
const {HttpLogger} = require('zipkin-transport-http');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

const logChannel = process.env.REDIS_CHANNEL || 'log_channel';
const redisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,

    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            console.log('reattemtping to connect to redis, attempt #' + options.attempt)
            return undefined;
        }
        return Math.min(options.attempt * 100, 2000);
    }
};

const redisClient = require("redis").createClient(redisOptions);
const port = process.env.TODO_API_PORT || 8082
const jwtSecret = process.env.JWT_SECRET || "foo"

const app = express()
app.use(jwt({ secret: jwtSecret }))

let tracer = null;

// tracing
if (ZIPKIN_URL) {
    const ctxImpl = new CLSContext('zipkin');
    const recorder = new  BatchRecorder({
      logger: new HttpLogger({
        endpoint: ZIPKIN_URL,
        jsonEncoder: JSON_V2
      })
    });
    const localServiceName = 'todos-api';
    tracer = new Tracer({ctxImpl, recorder, localServiceName});
    app.use(zipkinMiddleware({tracer}));
}

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'invalid token' })
  }
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = require('./routes')
routes(app, {tracer, redisClient, logChannel})

app.listen(port, function () {
  console.log('todo list RESTful API server started on: ' + port)
})
