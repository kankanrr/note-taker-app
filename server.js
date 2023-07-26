const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

// middleware data for jsons
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware setup
app.use(express.static("public"));

//post request
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let userNote = req.body;
    userNote.id = Math.floor(Math.random() * 5000);
    notes.push(userNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
      res.json(userNote);
    });
  });
});

//delete req
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const newNotes = notes.filter(
      (note) => note.id !== parseInt(req.params.id)
    );

    fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err, data) => {
      res.json({ msg: "successful" });
    });
  });
});

//GET
app.get("api/notes/:id", (req, res) => {
  res.json(notes[req.params.id]);
});

//GET
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    res.json(notes);
  });
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});
