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

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../build')));

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

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || 4002;
app.listen(port, () => {
    console.log(`Serving you on port ${port}`);
})