const express = require("express");
const con = require("../backend/conn.js");
const path = require("path");
const hbs = require("hbs");


const app = express();
const port = process.env.PORT || 3000;

// bootstrap path
const cssPath = path.join(__dirname, "/node_modules/bootstrap/dist/css");
const jsPath = path.join(__dirname, "/node_modules/bootstrap/dist/js");
// jquery path
const jqueryPath = path.join(__dirname, "/node_modules/jquery/dist");

// setting path
const viewPath = path.join(__dirname, "../templates/views");

const partialPath = path.join(__dirname, "../templates/partials");

// middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use("/apps/:proj", express.static(path.join(__dirname, "../public")));

app.use("/css", express.static(cssPath));
app.use("/jquery", express.static(jqueryPath));

app.set("view engine", "hbs");
app.set("views", viewPath);

const Handlebars = require('handlebars');

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});


hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerPartials(partialPath);
// routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/apps/:proj/:app", (req, res) => {
  con.connect();
  const db = con.db("Kost");
  const proj = req.params.proj;
  const app = req.params.app;
  async function get(app) {
    const data = await db
      .collection("apps")
      .find({ name: { $regex: new RegExp(app, "i") } })
      .toArray();
    res.render("index", {data} );
    // res.json(data)
    // con.close()
  }
  get(app);
});

app.listen(port, () => {
  console.log("listening on http://localhost:3000");
});
