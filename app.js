//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
let homeStartingContent = "We are what we think. All that we are arises with our thoughts. With our thoughts, we make the world.";
const aboutContent = "I am Abbina Supriya from Andhra Pradesh, India. I have a strong interest in problem-solving and logical puzzles. I am proficient in programming languages like C and C++, and currently, I am working on projects involving JS, EJS, MongoDB, MySQL, and React.\n";
const contactContent = "email: supriyaabbinastudy@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var posts=[];
app.get("/",function(req,res){
  res.render("home",{StartingContent:homeStartingContent,posts:posts});
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:topic",function(req,res){
  const topic = req.params.topic;
  for(var i=0;i<posts.length;i++){
    if(_.lowerCase(posts[i].title)===_.lowerCase(topic)){
        res.render("post",{postTitle:posts[i].title , postContent:posts[i].content,postdate :posts[i].date});
        break;
    }
  }
});

app.post("/compose",function(req,res){
  let date = new Date;
  const options ={
    weekday : "long",
    day : "numeric",
    month :"long",
    year : "numeric"
  };
  date= date.toLocaleDateString("en-US",options);
  const post={
    title : req.body.titletext,
    content : req.body.posttext,
    date : date
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/edithome",function(req,res){
  res.render("editHome");
});

app.post("/edithome",function(req,res){
  homeStartingContent=req.body.hometext;
  res.redirect("/");
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
