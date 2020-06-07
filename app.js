//================================================================================
//                     libraries and frameworks
const passportLocalMongoose = require("passport-local-mongoose"),
      localStrategy         = require("passport-local"),
      passport              = require("passport"),
      methodOverride        = require("method-override"),
      mongoose              = require("mongoose"),
      bodyParser            = require("body-parser"),
      flash                 = require("connect-flash"),
      express               = require("express"),
      app                   = express();  

//================================================================================
//                     Require Module express
const Todos               = require("./models/tasks"),
      User                = require("./models/user"),
      todoRoutes          = require("./routes/tasks"),
      autenticationRoutes = require("./routes/index"),
      resetPassword       = require("./routes/passwordReset");


//=================================================================================
//                              Settings
mongoose.connect(process.env.DATABASEURL,
{useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true}); //depracation prevent

app.use(bodyParser.urlencoded({extended: true})); //get data from the form
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash());

//==================================================================================
//                            PASSPORT SET UP
app.use(require("express-session")({
    secret: "Secret that I do not know",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); // come from passpor local mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});
//==================================================================================
//                               ROUTES
app.use(autenticationRoutes);
app.use("/index", todoRoutes);
app.use(resetPassword);

//==================================================================================
//                              SERVER
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server ON!!!");
})




