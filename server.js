// Dependency
require(`dotenv`).config();
const express = require(`express`);
const app = express();
const session = require(`express-session`)
const mongoose = require(`mongoose`);
const methodOverride = require(`method-override`);
const Class = require(`./models/class`)

// Middleware;
// Has to be the first middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(`_method`));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(`/sessions`, require(`./controllers/sessionController`))
app.use(`/users`, require(`./controllers/userController`))
app.use(`/classes`, require(`./controllers/classController`))
app.use(`/studios`, require(`./controllers/studioController`))
app.use(`/search`, require(`./controllers/api`))
app.use(express.static(__dirname + `/public`));

// Setup mongoose db
let DB_url = process.env.DATABASE_URL;
let database = mongoose.connection;
mongoose.connect(DB_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// Check db connection 
database.on(`error`, console.error.bind(console, `connection error`));
database.once(`open`, function () {
  console.log(`connected to db`)
})

// Root
app.get(`/somatic`, function (req, res) {
  Class.find({}, function (error, classes) {
    res.render(`index.ejs`, {
      classes,
      currentUser: req.session.currentUser
    })
  })
})

// Render Account/dashboard page
app.get('/', (req, res) => {
  if (req.session.currentUser) {
    res.render('sessions/show.ejs', {
      currentUser: req.session.currentUser
    });
  } else {
    Class.find({}, function (error, classes) {
      res.render('index.ejs', {
        classes: classes,
        currentUser: req.session.currentUser
      })
    })
  }
});

// Port listen
let PORT = process.env.PORT
app.listen(PORT, function () {
  console.log(`listening to ${PORT}`)
})