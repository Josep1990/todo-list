const express    = require("express"),
      router     = express.Router(),
      Todos      = require("../models/tasks");
      middleware = require("../middlesware");


//----------------------------------------------------------------------------------
//                              SHOW route

router.get("/", middleware.isLoggedin,function(req, res){
    //find all the objects in the database 
    Todos.find({}, function(err, allTasks){
        if(err){ 
            req.flash("error", "Sorry we could not find it");
            console.log(err + "from get route");
        }else{ //tasks is our variable on tje index.ejs
                         
            res.render("index", {tasks: allTasks});
        }
    });
    
});

//------------------------------------------------------------------------------------
//                       CREATE ROUTE
router.post("/", middleware.isLoggedin, function(req, res){
    const name   = req.body.task,
          author = { //req.user contains the information about the current logged in user
              id: req.user._id,
              username: req.user.username
          }
        
    const newTask = {name:name, author:author}; //object to be add to the database
    //add new task to the list and database
    Todos.create(newTask, function(err, newTodos){
        if(err){
            req.flash("error", "Sorry, please try again");
            console.log(err + "error from post route");
            res.redirect("/index");
        }else{                
            res.redirect("/index");
        }
    });    
});

//-------------------------------------------------------------------------------------
//                      DELETE ROUTE
router.delete("/:id", middleware.isLoggedin, function(req, res){

    Todos.findByIdAndDelete(req.params.id, function(err, deletedTask){
        if(err){
            req.flash("error", "Sorry, please try again");
            console.log(err + "error from delete route");
            res.redirect("/index");
        }else{
            res.redirect("/index");
        }
    });
})

module.exports = router;