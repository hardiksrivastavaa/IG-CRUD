// Import required modules
const express = require("express");
const app = express(); // Create an instance of express
const path = require("path"); // Node.js module to work with file and directory paths
const { v4: uuidv4 } = require("uuid"); // To generate unique IDs for posts
const methodOverride = require("method-override"); // To override HTTP methods for forms (like PATCH, DELETE)

// Use process.env.PORT for deployment environments (e.g., Heroku, Vercel)
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data (from forms)
app.use(methodOverride("_method")); // Use query param to override methods (e.g., for PATCH, DELETE requests)

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the views directory

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
  res.render("index", { posts }); // Render the index.ejs template with posts
});

// Route to show form for creating a new post
app.get("/posts/new", (req, res) => {
  res.render("new"); // Render the form to create a new post
});

// Route to handle the creation of a new post
app.post("/posts", (req, res) => {
  const { username, content } = req.body; // Extract form data
  const id = uuidv4(); // Generate a unique ID for the new post
  posts.push({ id, username, content }); // Add the new post to the posts array
  res.redirect("/posts"); // Redirect to the posts page
});

// Route to show a single post by ID
app.get("/posts/:id", (req, res) => {
  const { id } = req.params; // Get the post ID from the request parameters
  const post = posts.find(p => id === p.id); // Find the post with the matching ID
  if (post) {
    res.render("show", { post }); // Render the show.ejs template with the post
  } else {
    res.status(404).send("Post not found"); // Handle case where post is not found
  }
});

// Route to handle updating a post's content (PATCH)
app.patch("/posts/:id", (req, res) => {
  const { id } = req.params; // Get the post ID from the request parameters
  const newContent = req.body.content; // Get the new content from the form data
  const post = posts.find(p => id === p.id); // Find the post with the matching ID
  if (post) {
    post.content = newContent; // Update the post's content
    res.redirect("/posts"); // Redirect to the posts page
  } else {
    res.status(404).send("Post not found"); // Handle case where post is not found
  }
});

// Route to show the edit form for a post
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params; // Get the post ID from the request parameters
  const post = posts.find(p => id === p.id); // Find the post with the matching ID
  if (post) {
    res.render("edit", { post }); // Render the edit.ejs template with the post
  } else {
    res.status(404).send("Post not found"); // Handle case where post is not found
  }
});

// Route to delete a post by ID
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params; // Get the post ID from the request parameters
  posts = posts.filter(p => id !== p.id); // Remove the post from the posts array
  res.redirect("/posts"); // Redirect to the posts page
});

// Start the server on the specified port
app.listen(port, () => {
  if (!port) {
    console.error("PORT environment variable is not set."); // Check if port is set
    process.exit(1); // Exit the process if port is not set
  }
  console.log(`Listening on port ${port}`); // Log the port the server is running on
});
