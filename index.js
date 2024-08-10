const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// Use process.env.PORT for deployment environments
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "hardikksrivastava",
    content: "I am a passionate developer",
  },
  {
    id: uuidv4(),
    username: "shraddhakhapra",
    content: "She is a software engineer",
  },
];

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  const id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => id === p.id);
  if (post) {
    res.render("show", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const newContent = req.body.content;
  const post = posts.find(p => id === p.id);
  if (post) {
    post.content = newContent;
    res.redirect("/posts");
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => id === p.id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter(p => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  if (!port) {
    console.error("PORT environment variable is not set.");
    process.exit(1);
  }
  console.log(`Listening on port ${port}`);
});
