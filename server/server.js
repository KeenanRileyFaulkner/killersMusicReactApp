const express = require('express');
const cors = require('cors');
const path = require('path');

const { 
    getAlbumsForDisplay,
    getSong, 
    getCoversForDisplay,
    getCoverAudio, 
    incrPlays, 
    getKey, 
    authenticateUser,
    addAlbum, 
    getAllAlbums,
    updateAlbum,
    deleteAlbum, 
    addSong, 
    getAllSongs,
    updateSong,
    deleteSong, 
    addCover, 
    getAllCovers,
    updateCover,
    deleteCover
} = require('./controller');

const { seed } = require('./seed');

const app = express();
app.use(cors());
app.use(express.json());

//How do I get the files for my app? By giving express access to src or public?
app.use(express.static(path.join(__dirname, '../build')));

app.post('/seed', seed);
app.get('/albumsForDisplay', getAlbumsForDisplay);
app.get('/albums/:id', getSong);
app.get('/coversForDisplay', getCoversForDisplay);
app.get('/covers/:id', getCoverAudio);
app.put('/covers/:id', incrPlays);

app.post('/login', getKey); //this will check the password sent against a stored hash and return the key if there's a match
app.post('/authenticate', authenticateUser); //this will check the key that has been received against the stored one, as well as the username and password

app.post('/albums', addAlbum);
app.get('/albums', getAllAlbums);
app.put('/albums', updateAlbum);
app.delete('/albums/:id', deleteAlbum);

app.post('/songs', addSong);
app.get('/songs', getAllSongs);
app.put('/songs', updateSong);
app.delete('/songs/:id', deleteSong);

app.post('/covers', addCover);
app.get('/covers', getAllCovers);
app.put('/covers', updateCover);
app.delete('/covers/:id', deleteCover);

const port = process.env.PORT || 4002;
app.listen(port, () => {
    console.log(`Serving you on port ${port}`);
})