import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Routes
app.get("/", (req, res) => {
  res.render("landing");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
