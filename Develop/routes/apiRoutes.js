const fs = require ('fs')
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json')

module.exports = (app) => {

  // API route for displaying notes in HTML
  app.get('/api/notes', (req, res) => {
    // reading the current note db file
    fs.readFile(("./db/db.json"), (err, data) => {
      if (err) throw err;
      res.send(JSON.parse(data));
    });
  });

  // API route for adding a new note
  app.post('/api/notes', (req, res) => {
    // generates an ID for each note
    req.body.id = `${uuidv4()}`;
    // pushes the note with the id to the database
    db.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
      if (err) throw err;
    })
    // returns the db with the added note
    res.json(db);
  });

  // APT route for deleting a note
  app.delete('/api/notes/:id', (req,res) => {
    let noteId = req.params.id;
    // reading the current note db file and looking for matching ID
    fs.readFile('./db/db.json', (err, data) => {
      const parsedData = JSON.parse(data)
      // filtering out note with matching ID (to what has been clicked and selected in front-end code)
      const filteredNotes = parsedData.filter(filteredNote => filteredNote.id != noteId);
      if (err) throw err;
      // re-writes file after removing filtered note
      fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
        if (err) throw err;
      })
      // returns the db with the deleted note
      res.json(filteredNotes)
    })    
  })

};