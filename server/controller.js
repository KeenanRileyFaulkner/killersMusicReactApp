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

    addAlbum: (req, res) => {
        if(req.body.serverKey === '') {
            res.status(401).send('You are not authorized to make this request');
        }

        const compareKey = req.body.serverKey;
        let album_name;
        let release_year;
        let image_url;

        if(req.body.album_name === '') {
            res.status(400).send('An album_name must be included in your request');
            return;
        } else if (req.body.release_year === '') {
            res.status(400).send('A release_year must be included in your request');
            return;
        } else if (req.body.image_url === '') {
            res.status(400).send('An image_url must be included in your request');
            return;
        } else {
            album_name = req.body.album_name;
            release_year = req.body.release_year;
            image_url = req.body.image_url;
        }

        sequelize.query(`
            SELECT access_key FROM connection_data
            WHERE access_key = '${compareKey}'`)
        .then(dbRes => {
            if(typeof dbRes[0][0].access_key !== 'undefined') {
                sequelize.query(`
                    INSERT INTO albums (album_name, release_year, image_url, num_tracks)
                    VALUES
                    ('${album_name}', ${release_year}, '${image_url}', 0)`)
                .then(() => {
                    res.status(200).send('The album was successfully added. Go to "View Albums" in nav to see it.');
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send('An unknown error occurred while adding the album to the database.');
                })
            } else {
                res.status(401).send('You are not authorized to make that request');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(401).send('You are not authorized to make that request');
        })


    },

    getAllAlbums: (req, res) => {
        sequelize.query(`
            SELECT * FROM albums`)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
        .catch(err => console.log(err));
    },

    addSong: (req, res) => {
        if(req.body.serverKey === '') {
            res.status(401).send('You are not authorized to make this request');
            return;
        }

        const compareKey = req.body.serverKey;
        let song_name;
        let album_name;
        let audio_url;
        if(req.body.song_name === '') {
            res.status(400).send('A song_name must be included in your request');
            return;
        } else if (req.body.album_name === '') {
            res.status(400).send('An album_name must be included in your request');
            return;
        } else if (req.body.audio_url === '') {
            res.status(400).send('An audio_url must be included in your request');
            return;
        } else {
            song_name = req.body.song_name;
            album_name = req.body.album_name;
            audio_url = req.body.audio_url;
        }

        sequelize.query(`
            SELECT access_key FROM connection_data
            WHERE access_key = '${compareKey}'`)
        .then(dbRes => {
            if(typeof dbRes[0][0].access_key !== 'undefined') {
                let album_id;
                sequelize.query(`
                    SELECT album_id fROM albums
                    WHERE album_name = '${album_name}'`)
                .then(dbRes => {
                    if (typeof dbRes[0][0].album_id !== 'undefined') {
                        album_id = dbRes[0][0].album_id;
                        sequelize.query(`
                            INSERT INTO audios (url, album_id, song_name)
                            VALUES
                            ('${audio_url}', ${album_id}, '${song_name}');
                            
                            UPDATE albums
                            SET num_tracks = num_tracks + 1
                            WHERE album_id = ${album_id}`)
                        .then(() => {
                            res.status(200).send('Song successfully added to db. Go to "View Songs" in nav to view.');
                        })
                    } else {
                        res.status(400).send('No album was found with that name.');
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(503).send('No album was found with that name');
                })
                
            } else {
                res.status(401).send('You are not authorized to make this request');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(401).send('You are not authorized to make this request');
        })
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

    addCover: (req, res) => {
        let compareKey;
        let cover_name;
        let image_url;
        let audio_url;
        if(req.body.serverKey === '') {
            res.status(401).send('You are not authorized to make this request');
            return;
        }

        compareKey = req.body.serverKey;

        if(req.body.cover_name === '') {
            res.status(400).send('A cover_name must be included in your request');
            return;
        } else if (req.body.image_url === '') {
            res.status(400).send('An image_url must be included in your request');
            return;
        } else if (req.body.audio_url === '') {
            res.status(400).send('An audio_url must be included in your request');
            return;
        } else {
            cover_name = req.body.cover_name;
            image_url = req.body.image_url;
            audio_url = req.body.audio_url;
        }

        sequelize.query(`
            SELECT access_key FROM connection_data
            WHERE access_key = '${compareKey}'`)
        .then(dbRes => {
            if(typeof dbRes[0][0].access_key !== 'undefined') {
                sequelize.query(`
                    INSERT INTO covers (image_url, audio_url, cover_name, total_plays)
                    VALUES
                        ('${image_url}', '${audio_url}', '${cover_name}', 0);`)
                .then(() => {
                    res.status(200).send('New record succesfully created. Go to "Get Play Count" in nav to view.');
                })
                .catch(err => console.log(err));
            } else {
                res.status(401).send('You are not authorized to make this request');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(401).send('You are not authorized to make this request');
        });
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