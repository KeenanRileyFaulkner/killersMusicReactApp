require('dotenv').config();
const bcrypt = require('bcryptjs');
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const calcRandomTrackNum = arr => {
    return (Math.floor(Math.random() * arr.length));
}

module.exports = {
    getSong: (req, res) => {
        const { id } = req.params;
        sequelize.query(`
            SELECT url FROM audios
            WHERE ${Number(id) + 1} = album_id`)
        .then(dbRes => {
            const randomTrack = calcRandomTrackNum(dbRes[0]);
            res.status(200).send(dbRes[0][randomTrack].url);
        })
        .catch(err => console.log(err));
    },

    getCoverAudio: (req, res) => {
        const { id } = req.params;
        sequelize.query(`
            SELECT audio_url FROM covers
            WHERE ${id} = cover_id`)
        .then(dbRes => {
            res.status(200).send(dbRes[0][0].audio_url);
        })
        .catch(err => console.log(err));
    },

    incrPlays: (req, res) => {
        const { id } = req.params;
        sequelize.query(`
            UPDATE covers
            SET total_plays = total_plays + 1
            WHERE ${id} = cover_id`)
        .then(res.status(200).send('Thanks for listening!'))
        .catch(err => console.log(err));
    },

    getKey: (req, res) => {
        const receivedPassword = req.body.password;
        const userID = req.body.username;
        let storedPassword;
        sequelize.query(`
            SELECT password FROM passwords
            WHERE user_name = '${userID}'`)
        .then(dbRes => {
            if(typeof dbRes[0][0] === 'undefined') {
                res.status(401).send('There was a problem authenticating your request');
                return;
            }
            storedPassword = dbRes[0][0].password;
            let matching = bcrypt.compareSync(receivedPassword, storedPassword);
            if(!matching) {
                res.status(401).send('There was a problem authenticating your request');
            } else {
                sequelize.query(`
                    SELECT access_key FROM connection_data
                    WHERE key_id = 1`)
                .then(dbRes => {
                    res.status(200).send(dbRes[0][0].access_key);
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    },

    getAllAlbums: (req, res) => {
        sequelize.query(`
            SELECT * FROM albums`)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
        .catch(err => console.log(err));
    },

    getAllSongs: (req, res) => {
        sequelize.query(`
            SELECT url, song_name, song_id, album_name FROM audios
            JOIN albums ON audios.album_id = albums.album_id`)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
        .catch(err => console.log(err));
    },

    getAllCovers: (req, res) => {
        sequelize.query(`
            SELECT * FROM covers`)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
        .catch(err => console.log(err));
    },
}