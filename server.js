const express = require("express");
const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// linking the route js files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function(){
    console.log("Listening on PORT: " + PORT);
})

