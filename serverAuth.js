const jsonServer = require('json-server');
const auth = require('json-server-auth')
const server = jsonServer.create();
const localDb = require('./generate');
const routes = require('./routes.json');
const path = require('path');
const port  = process.env.PORT || 9001;


// Router
// const router = jsonServer.router('db.json')
const router = jsonServer.router(localDb());

const middlewares = jsonServer.defaults();


// Passport Authentication

var passport = require('passport'); // <1>
var Strategy = require('passport-http').BasicStrategy;
var db = require('./db/index');



// // Configure the Basic strategy for use by Passport.    // <2>
// passport.use(new Strategy(
//     function (username, password, cb) {
//         db.users.findByUsername(username, function (err, user) {
//             if (err) {
//                 return cb(err);
//             }
//             if (!user) {
//                 return cb(null, false);
//             }
//             if (user.password != password) {
//                 return cb(null, false);
//             }
//             return cb(null, user);
//         });
//     }));
// // http -a jack:secret localhost:3000/email     // <3>
// server.get('/email',
//     passport.authenticate('basic', {
//         session: false
//     }),
//     function (req, res) {
//         res.json({
//             username: req.user.username,
//             email: req.user.emails[0].value
//         });
//     });



// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

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

// /!\ Bind the router db to the app
server.db = router.db;
// http localhost:3000/wines

const rules = auth.rewriter({
    // Permission rules
    users: 600,
    messages: 640,
    // Other rules
    '/posts/:category': '/posts?category=:category',
})

// Use default router

//server.use(rules);
//server.use(auth);
server.use(router);
server.listen(port, () => {
    console.log(`JSON Server is running on ${port}`)
})