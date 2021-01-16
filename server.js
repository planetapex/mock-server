//POST  = Content-Type : application/x-www-form-urlencoded

const jsonServer = require('json-server');
const server = jsonServer.create();
const bodyParser = require('body-parser');
const middlewares = jsonServer.defaults();
const path = require('path');
const fs = require('fs');
const program = require("commander-plus");
const localDb = require('./generate');
const DB = "db.json";
const routes = require('./routes.json');
const { request } = require('http');
const PORT  = process.env.PORT || 9001;




console.log(`POST  = Content-Type : application/x-www-form-urlencoded`)

// Router

// For File based db.json 
// =====================================

// const fileServerRoot = path.join(__dirname, './public');
// const dbPath = path.join(__dirname, DB);
// fs.writeFileSync(dbPath, '{"posts": []}');
// const router = jsonServer.router(dbPath)
// const middlewares = jsonServer.defaults({static: fileServerRoot})

// For In Memory
// =====================================
const router = jsonServer.router(localDb());
server.use(jsonServer.rewriter({
    '/api/v1/platforms': '/platforms'
  }));

server.use(middlewares);
server.use(bodyParser.urlencoded({extended:true}));
// server.use(jsonServer.bodyParser);





// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})




server.use((req, res, next) => {
    // if (req.method === 'POST') {
    //     req.body.createdAt = Date.now();
    // }
    // Continue to JSON Server router
    console.log(req.body);
    next();
});




server.use(router);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server

server.listen(PORT, () => {
    console.log(`JSON Server is running on localhost:${PORT}`)
})