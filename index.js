const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

/// Not recommended as we will have to name every route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

/// Init Middleware
app.use(logger);

/// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

/// Members API Routes
app.use('/api/members', require('./routes/api/members'));

/// PORT Setup and listen
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
