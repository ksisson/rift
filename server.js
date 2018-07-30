const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const multer = require("multer");
var upload = multer({ dest: 'uploads/' });



var session = require("express-session");

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup session
app.use(session({
  secret: "whateverwewant",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: "auto", maxAge: 999999999}
}));


app.post("/upload", upload.single('file'), function(req, res){
  // console.log(req.IncomingMessage.client.ReadableState.buffer);
  console.log(req.file);
  // console.log(req.body);
  console.log("file uploaded");


  // // Connecting to the database
  // mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mytest2")
  // .then(() => {
  //     console.log("inside connect then");
      
  //     // empty the collection
      // Note.remove(err => {
      //     if (err) throw err;
      //     console.log("Removed all documents in notes collection.");
          var noteData = fs.readFileSync(req.file.path);
          
          // Create an Image instance
          const note = new Note({
              // type: 'image/png',
              data: noteData
          });
  
          // Store the Image to the MongoDB
          note.save()
          .then(n => {
              console.log("Saved an note to MongoDB.");
              // Find the stored image in MongoDB, then save it in '/static/assets/tmp' folder
              Note.findById(n, (err, findOutNote) => {
                  if (err) throw err;
                  try{
                      fs.writeFileSync("uploads/" + req.file.originalname, findOutNote.data);
                      console.log("Stored an image 'tmp-jsa-header.png' in '/static/assets/tmp' folder.");
                      // exit node.js app
                      console.log("Exit!");
                      process.exit(0);
                  }catch(e){
                      console.log(e);
                  }
              });
          }).catch(err => {
              console.log(err);
              throw err;
          });
      // })
      
  // }).catch(err => {
  //     console.log('Could not connect to MongoDB this time.');
  //     process.exit();
  // });
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
const routes = require("./routes/api.js");
app.use(routes);

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rift");
mongoose.Promise = Promise;


app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
