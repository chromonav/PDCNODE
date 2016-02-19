var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    publicDir = __dirname + '/public',
    port = parseInt(process.env.PORT, 10) || 4567,
    path = require('path');
    
//database setup
    
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pdcnode');

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


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var FeedbackSchema = new Schema({
    id: ObjectId,
    name: String,
    email: String,
    feedback: String
});

var FeedbackModel = mongoose.model('feedbacks', FeedbackSchema);

app.get("/", function (req, res) {
    res.sendFile("public/index.html", { root: __dirname });
});

app.post('/', function (req, res) {

    var feedbackmodelJson = req.body;

    var feedbackmodel = new FeedbackModel(feedbackmodelJson);
    feedbackmodel.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
    res.redirect("dashboard");
});

app.get('/dashboard', function (req, res) {
    FeedbackModel.find({}, function (err, docs) {

        res.json(docs);
    });

 
});
console.log("server running on:" + port);

app.listen(port, hostname);
