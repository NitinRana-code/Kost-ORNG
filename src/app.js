const express = require("express")
const path = require("path")
const hbs = require("hbs")

const app = express();
const port = process.env.PORT || 3000

// bootstrap path
const cssPath = path.join(__dirname, "/node_modules/bootstrap/dist/css")
const jsPath = path.join(__dirname, "/node_modules/bootstrap/dist/js")
// jquery path
const jqueryPath = path.join(__dirname, "/node_modules/jquery/dist")

// setting path
const viewPath = path.join(__dirname, "../templates/views")

const partialPath = path.join(__dirname, "../templates/partials")


// middleware
app.use(express.static(path.join(__dirname, "../public")))
app.use("/css", express.static(cssPath))
app.use("/jquery", express.static(jqueryPath))

app.set("view engine", "hbs")
app.set("views", viewPath)

hbs.registerPartials(partialPath)


// routing 
app.get("/", (req, res) =>{
    res.render("index");
}) 

app.listen(port, () =>{
    console.log("listening on http://localhost:3000")
})