//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');


const homeStartingContent = "Welcome to my blog site. Here I'll post about the little things happen in my daily life. Thank you for being here. Enjoy Life :) ";
const aboutContent = "Vaishnav is a Graduate Computer Science Engineer from MIT, Aurangabad. While struggling through the college life as a sophomore, he realised that choosing Front End Development as a career is the only escape. He is fond of making digital illustrations, web apps, website and mobile application designs, instagram camera filters and playing with javascript libraries. His experience in product strategy, visual designs and client management inform his mindful but competitive approach. Fueled by his passion for understanding the nuances of cross-platform web development. Vaishnav believes mindfulness in the workplace is key to success - a tenet he lives out through his interests in design and development.";
const contactContent = "Contact me at vaishnavrodi@gmail.com";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser:true});

const postSchema = {
 title: String,
 content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req,res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});

app.get("/compose", function(req,res){
  res.render("compose");

})

app.post("/compose",function(req,res){

    const post = new Post ({
   title: req.body.postTitle,
   content: req.body.postBody
  });

  post.save(function(err){

   if (!err){
     res.redirect("/");
   }

});

});



app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});



app.get("/about", function(req,res){
  res.render("about",{aboutContent: aboutContent});
});

app.get("/contact", function(req,res){

  res.render("contact", {contactContent: contactContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// app.listen(4000, function(){
//   console.log("Server started on port 4000");
// });
