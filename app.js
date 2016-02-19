var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    publicDir = __dirname + '/public',
    port = parseInt(process.env.PORT, 10) || 4567,
    path = require('path');


app.use(methodOverride());
app.use(bodyParser.json());         // support json encoded bodies
app.use(bodyParser.urlencoded({     // support encoded bodies
    extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.get("/", function (req, res) {
    res.sendFile("public/index.html", { root: __dirname });
  
});

app.post('/', function(req, res) {
    console.dir(req.body);

      res.redirect("dashboard")
});
app.get('/dashboard', function(req, res) {
    console.dir(req.body);

      res.sendFile("public/dashboard.html",{ root: __dirname })
});
console.log("server running on:" + port);

app.listen(port, hostname);
