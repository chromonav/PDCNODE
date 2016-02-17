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

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));


app.listen(port, hostname);