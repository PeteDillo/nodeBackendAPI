//imports
const express = require("express");
const cors = require("cors");
const repoContext = require("./repository/repository-wrapper");
const songValidate = require("./middleware/song-validation");
const songLogger = require("./middleware/song-logger");
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//Endpoints

//GET songs
//http://localhost:5005/api/songs
app.get("/api/songs", (req, res) => {
  const songs = repoContext.songs.findAllSongs();
  console.log(req.headers);
  return res.send(songs);
});

//GET songs by ID
//http://localhost:5005/api/songs/:id
app.get("/api/songs/:id", (req, res) => {
  const id = req.params.id;
  const song = repoContext.songs.findSongById(id);
  return res.send(song);
});

//POST new song
//http://localhost:5005/api/songs
app.post("/api/songs", [songLogger, songValidate], (req, res) => {
  const newSong = req.body;
  const addedSong = repoContext.songs.createSong(newSong);
  return res.status(201).send(addedSong);
});

//PUT songs by ID
//http://localhost:5005/api/songs/:id
app.put("/api/songs/:id", [songValidate], (req, res) => {
  const id = parseInt(req.params.id);
  const songPropertiesToModify = req.body;
  const song = repoContext.songs.updateSong(id, songPropertiesToModify);
  return res.send(song);
});

//DELETE songs by ID
//http://localhost:5005/api/songs/:id
app.delete("/api/songs/:id", (req, res) => {
  const id = req.params.id;
  const song = repoContext.songs.deleteSong(id);
  return res.send(song);
});

//Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server is running! on Port: ${PORT}`);
});
