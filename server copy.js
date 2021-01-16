const jsonServer = require('json-server');
const server = jsonServer.create();
const auth = require('json-server-auth')
const localDb = require('./generate');
const routes = require('./routes.json');
const path = require('path');
const port  = process.env.PORT || 9001;


// Router
// const router = jsonServer.router('db.json')
const router = jsonServer.router(localDb());





// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next()
})



// Use default router

//server.use(rules);
//server.use(auth);
server.use(router);
server.listen(port, () => {
    console.log(`JSON Server is running on localhost:${port}`)
})