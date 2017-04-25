const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const runServer = require('./server').runServer;
console.log("THIS RAN");
if (process.env.NODE_ENV === 'production') {
    // Just run the server
    runServer(process.env.PORT || 8080);
}
else {

    const app = express();
    // Proxy everything through to Create React App
    app.use(proxy('http://localhost:3000/', {
        logLevel: 'debug', // Keep the logs clean
        ws: true, // Proxy websockets too
        router: {
            // Anything to /api goes to our backend
            'http://localhost:8080/graphql': 'http://localhost:3001',
            'http://localhost:8080/api' : 'http://localhost:3001'
        }
    }));

    console.log('ACTIVE');
    app.listen(process.env.PORT || 8080);
};
