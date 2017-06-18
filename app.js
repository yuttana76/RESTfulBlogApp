var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express()

mongoose.connect("mongodb://localhost/restful_blog_app");

app.use(express.static('public'))

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// Create SCHEMA
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    Created: { type: Date, default: Date.now }
});

// Create MODEL
var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "Blog title",
    image: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5292405.jpg",
    body: "Blog body"
});

//RESTFUL ROUTES
app.get("/", function (req, res) {
    res.redirect("/blogs");
});

//INDEX
app.get("/blogs", function (req, res) {

    Blog.find({}, function (err, foundBlogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { blogs: foundBlogs });
        }

    });
});

//NEW ROUTE
app.get("/blogs/new",function(req,res){
    res.render("newBlog",{title: " Create New Blog:"});
});

app.listen(3000, function () {
    console.log("RESTful is running !!!");
});