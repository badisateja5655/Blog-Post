import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let posts = [];

app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
  const post = posts[req.params.index];
  res.render("edit", { post, index: req.params.index });
});

app.post("/update/:index", (req, res) => {
  const { title, content } = req.body;
  posts[req.params.index] = { title, content };
  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  posts.splice(req.params.index, 1);
  res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
