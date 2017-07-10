var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override");
    
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://akber:123abc@ds153352.mlab.com:53352/restfulblogsite");

var blogSchema = new mongoose.Schema({
   title : String,
   image : String,
   body : String,
   created : {type : Date , default : Date.now()}
    
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title : "First Blog",
//     image : "data:image/jpeg;base64,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",
//     body : "This is a picture of a puppy sleeping",
// });


    // INDEX
app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

app.get("/blogs", function(req, res){
   Blog.find({}, function(err, allBlogs){
      if(err){
          console.log("Error!!!");
      } 
      else{
          res.render("index",{blogs: allBlogs});
      }
   }); 
});
    // NEW
app.get("/blogs/new", function(req, res){
  res.render("newBlog");
});
    // CREATE
app.post("/blogs",function(req, res){
   Blog.create(req.body.blog, function(err, blog){
      if(err){
          res.render("newBlog");
      }
      else{
          res.redirect("/blogs");
      }
   }); 
});
            // SHOW
app.get("/blogs/:id",function(req, res) {
        Blog.findById(req.params.id, function(err, foundBlog){
           if(err){
               res.redirect("/blogs");
           } 
           else{
               res.render("show",{blog:foundBlog});
           }
        }); 
});
        
        // EDIT
        
app.get("/blogs/:id/edit", function (req, res){
   Blog.findById(req.params.id, function (err, foundBlog){
      if(err){
          res.redirect("/blogs");
      }
      else{
          res.render("edit", {blog:foundBlog});
      }
   });
    
});

        // UPDATE
        
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs")
       }
       else{
           res.redirect("/blogs/"+ req.params.id);
       }
    });
      
});       


            // DESTROY
            

app.delete("/blogs/:id",function(req, res){
        Blog.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/blogs");
            }
            else{
                res.redirect("/blogs");
            }
        })      
})
            
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Running !!!");
});