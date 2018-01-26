var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var router = require('./routes');
var models = require('./models');

var app = express();
var server;

models.Page.sync({ force: true })
.then(function () {
  return models.User.sync({ force: true })
})
.then(function () {
  server = app.listen(3000, () => console.log('Server listening'));
})
.catch(console.error.bind(console));

app.use(morgan('dev'));

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// and then include these two lines of code to add the extension:
var AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use('/', router)
