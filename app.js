var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    publicDir = __dirname + '/public',
    port = parseInt(process.env.PORT, 10) || 4567,
    path = require('path');

app.get("/", function (req, res) {
    res.sendFile("public/index.html", { root: __dirname });
});

app.post('/api/users', function(req, res) {
	var user_id = req.body.id;
	var token = req.body.token;
	var geo = req.body.geo;


});

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
console.log("server running on:" + port);

app.listen(port, hostname);
