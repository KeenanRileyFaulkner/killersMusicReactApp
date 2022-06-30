const express = require('express');
const cors = require('cors');
const path = require('path');
const { 
    getSong, 
    getCoverAudio, 
    incrPlays, 
    getKey, 
    authenticateUser,
    addAlbum, 
    getAllAlbums, 
    deleteAlbum, 
    addSong, 
    getAllSongs, 
    addCover, 
    getAllCovers 
} = require('./controller');
const { seed } = require('./seed');

const app = express();
app.use(cors());
app.use(express.json());

//How do I get the files for my app? By giving express access to src or public?
app.use(express.static(path.join(__dirname, '../build')));

app.post('/seed', seed);
app.get('/albums/:id', getSong);
app.get('/covers/:id', getCoverAudio);
app.put('/covers/:id', incrPlays);

app.post('/login', getKey);
app.post('/authenticate', authenticateUser);

app.post('/albums', addAlbum);
app.get('/albums', getAllAlbums);
app.delete('/albums/:id', deleteAlbum);

app.post('/songs', addSong);
app.get('/songs', getAllSongs);

app.post('/covers', addCover);
app.get('/covers', getAllCovers);

const port = process.env.PORT || 4002;
app.listen(port, () => {
    console.log(`Serving you on port ${port}`);
})