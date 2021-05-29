/*jshint esversion: 6 */
const port = 3000;
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

let items = ["buy food", "eat food"];
let workItems = ["get to work"];

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  day = today.toLocaleDateString("en-US", options);
  res.render('list', { listTitle: day, newListItems: items });
});

app.post('/', function (request, response) {
  let item = request.body.newItem;
  if (request.body.list == "Work") {
    workItems.push(item);
    response.redirect("/work");
  }
  else {
    items.push(item);
    response.redirect("/");
  }

});

app.get("/work", function (req, res) {
  res.render('list', { listTitle: "Work", newListItems: workItems });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});