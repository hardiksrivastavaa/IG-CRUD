// Import required modules
const express = require("express");
// Create an instance of express
const app = express(); 
// Node.js module to work with file and directory paths
const path = require("path"); 
// To generate unique IDs for posts
const { v4: uuidv4 } = require("uuid"); 
// To override HTTP methods for forms (like PATCH, DELETE)
const methodOverride = require("method-override"); 

// Use process.env.PORT for deployment environments (e.g., Heroku, Vercel)
const port = process.env.PORT;

// Parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true })); 
// Use query param to override methods (e.g., for PATCH, DELETE requests)
app.use(methodOverride("_method")); 

// Set EJS as the view engine
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views")); 

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// In-memory array to hold post data
let posts = [
  {
    id: uuidv4(), // Unique ID for each post
    username: "hardikksrivastava",
    content: "I am a passionate developer",
  },
  {
    id: uuidv4(),
    username: "shraddhakhapra",
    content: "She is a software engineer",
  },
];

// Route to redirect to /posts
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// Route to show all posts
app.get("/posts", (req, res) => {
  // Render the index.ejs template with posts
  res.render("index", { posts }); 
});

// Route to show form for creating a new post
app.get("/posts/new", (req, res) => {
  // Render the form to create a new post
  res.render("new"); 
});

// Route to handle the creation of a new post
app.post("/posts", (req, res) => {
  // Extract form data
  const { username, content } = req.body; 
  // Generate a unique ID for the new post
  const id = uuidv4(); 
  // Add the new post to the posts array
  posts.push({ id, username, content });
  // Redirect to the posts page
  res.redirect("/posts"); 
});

// Route to show a single post by ID
app.get("/posts/:id", (req, res) => {
  const { id } = req.params; 
  // Get the post ID from the request parameters
  const post = posts.find(p => id === p.id); 
  // Find the post with the matching ID
  if (post) {
    // Render the show.ejs template with the post
    res.render("show", { post }); 
  } else {
    // Handle case where post is not found
    res.status(404).send("Post not found"); 
  }
});

// Route to handle updating a post's content (PATCH)
app.patch("/posts/:id", (req, res) => {
  // Get the post ID from the request parameters
  const { id } = req.params; 
  // Get the new content from the form data
  const newContent = req.body.content; 
  // Find the post with the matching ID
  const post = posts.find(p => id === p.id); 
  if (post) {
    // Update the post's content
    post.content = newContent;
    // Redirect to the posts page
    res.redirect("/posts"); 
  } else {
    // Handle case where post is not found
    res.status(404).send("Post not found");   }
});

// Route to show the edit form for a post
app.get("/posts/:id/edit", (req, res) => {
  // Get the post ID from the request parameters
  const { id } = req.params; 
  // Find the post with the matching ID
  const post = posts.find(p => id === p.id); 
  if (post) {
  // Render the edit.ejs template with the post
    res.render("edit", { post }); 
  } else {
  // Handle case where post is not found
    res.status(404).send("Post not found"); 
  }
});

// Route to delete a post by ID
app.delete("/posts/:id", (req, res) => {
// Get the post ID from the request parameters
  const { id } = req.params; 
// Remove the post from the posts array
  posts = posts.filter(p => id !== p.id); 
// Redirect to the posts page
  res.redirect("/posts"); 
});

// Start the server on the specified port
app.listen(port, () => {
  if (!port) {
    // Check if port is set
    console.error("PORT environment variable is not set."); 
    // Exit the process if port is not set
    process.exit(1); 
  }
  // Log the port the server is running on
  console.log(`Listening on port ${port}`); });
