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
    getAlbumsForDisplay: (req, res) => {
        sequelize.query(`
            SELECT album_id, album_name, image_url FROM albums
            ORDER BY album_id`)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    },

    getSong: (req, res) => {
        const { id } = req.params;
        sequelize.query(`
            SELECT url FROM audios
            WHERE ${Number(id)} = album_id`)
        .then(dbRes => {
            const randomTrack = calcRandomTrackNum(dbRes[0]);
            res.status(200).send(dbRes[0][randomTrack].url);
        })
        .catch(err => console.log(err));
    },

    getCoversForDisplay: (req, res) => {
        sequelize.query(`
            SELECT image_url, cover_name, audio_url, cover_id FROM covers
            ORDER BY cover_id`)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
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

    authenticateUser: (req, res) => {
        if(req.body.serverKey === '') {
            res.status(401).send('You are not authorized to make this request');
            return;
        } else if (req.body.username === '') {
            res.status(400).send('You must include your username to make this request');
            return
        } else if (req.body.password === '') {
            res.status(400).send('You must include your password to make this request');
            return;
        }

        const username = req.body.username;
        const password = req.body.password;
        const compareKey = req.body.serverKey;

        sequelize.query(`
            SELECT access_key FROM connection_data
            WHERE access_key = '${compareKey}'`)
        .then(dbRes => {
            if(typeof dbRes[0][0].access_key !== 'undefined') {
                sequelize.query(`
                    SELECT password FROM passwords
                    WHERE user_name = '${username}'`)
                .then(dbRes => {
                    if(typeof dbRes[0][0] === 'undefined') {
                        res.status(401).send('There was a problem authenticating your request');
                        return;
                    }
                    let storedPassword = dbRes[0][0].password;
                    let matching = bcrypt.compareSync(password, storedPassword);
                    if(!matching) {
                        res.status(401).send('There was a problem verifying your password');
                        return;
                    }

                    res.status(200).send('Successful auth');
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send('An unknown error has occurred.');
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('An unknown error has occurred');
        })
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

        let num_tracks;
        if(req.body.num_tracks === '') {
            num_tracks = 0;
        } else {
            num_tracks = req.body.num_tracks;
        }

        sequelize.query(`
            SELECT access_key FROM connection_data
            WHERE access_key = '${compareKey}'`)
        .then(dbRes => {
            if(typeof dbRes[0][0].access_key !== 'undefined') {
                sequelize.query(`
                    INSERT INTO albums (album_name, release_year, image_url, num_tracks)
                    VALUES
                    ('${album_name}', ${release_year}, '${image_url}', ${num_tracks})`)
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

    updateAlbum: (req, res) => {
        if(req.body.serverKey === '') {
            res.status(401).send('You are not authorized to make this request');
            return;
        }

        const compareKey = req.body.serverKey;
        const album_id = req.body.album_id;
        const columnsToUpdate = Object.keys(req.body).filter(key => (key !== 'serverKey') && (key !== 'album_id'));
        const columnNames = columnsToUpdate.join(', ');

        let valuesInOrder = [];
        columnsToUpdate.forEach(column => {
            if (column === 'release_year' || column === 'num_tracks') {
                valuesInOrder.push((Number(req.body[column])));
            } else {
                valuesInOrder.push((`'${req.body[column]}'`));
            }
        });

        let updateValues = valuesInOrder.join(", ");

        const moreThanOneUpdate = (valuesInOrder.length > 1);

        sequelize.query(`
            SELECT access_key FROM connection_data
            WHERE access_key = '${compareKey}'`)
        .then(dbRes => {
            if(typeof dbRes[0][0].access_key !== 'undefined') {
                if (moreThanOneUpdate) {
                    sequelize.query(`
                        UPDATE albums SET (${columnNames}) = (${updateValues})
                        WHERE album_id = ${album_id}
                        RETURNING *`)
                    .then(dbRes => {
                        if (dbRes[1].rowCount > 0) {
                            res.status(200).send('Album information successfully updated. Go to "View Albums" in nav to see it.');
                        } else {
                            res.status(400).send('That album could not be found');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send('An unknown error occurred');
                    })
                } else {
                    sequelize.query(`
                        UPDATE albums SET ${columnNames} = ${updateValues}
                        WHERE album_id = ${album_id}
                        RETURNING *`)
                    .then(() => {
                        if (dbRes[1].rowCount > 0) {
                            res.status(200).send('Album information successfully updated. Go to "View Albums" in nav to see it.');
                        } else {
                            res.status(400).send('That album could not be found');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send('An unknown error has occurred');
                    })
                }
                
            } else {
                res.status(401).send('You are not authorized to make that request');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(401).send('There was a problem authenticating your request');
        });
    },

    deleteAlbum: (req, res) => {
        const {id} = req.params;
        sequelize.query(`
            DELETE FROM albums
            WHERE album_name = '${id}'`)
        .then(() => {
            res.status(200).send('Album successfully deleted from database.');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('There was a problem deleting the album from the database.');
        });
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

    updateSong: (req, res) => {
        if(req.body.serverKey === '') {
            res.status(401).send('You are not authorized to make this request');
            return;
        }

        const compareKey = req.body.serverKey;
        const song_id = req.body.song_id;
        const columnsToUpdate = Object.keys(req.body).filter(key => (key !== 'serverKey') && (key !== 'song_id'));
        const columnNames = columnsToUpdate.join(', ');

        let valuesInOrder = [];
        columnsToUpdate.forEach(column => {
            if (column === 'album_id') {
                valuesInOrder.push((Number(req.body[column])));
            } else {
                valuesInOrder.push((`'${req.body[column]}'`));
            }
        });

        let updateValues = valuesInOrder.join(", ");

        const moreThanOneUpdate = (valuesInOrder.length > 1);

        sequelize.query(`
            SELECT access_key FROM connection_data
            WHERE access_key = '${compareKey}'`)
        .then(dbRes => {
            if(typeof dbRes[0][0].access_key !== 'undefined') {
                if (moreThanOneUpdate) {
                    sequelize.query(`
                        UPDATE audios SET (${columnNames}) = (${updateValues})
                        WHERE song_id = ${song_id}
                        RETURNING *`)
                    .then((dbRes) => {
                        if (dbRes[1].rowCount > 0) {
                            res.status(200).send('Song information successfully updated. Go to "View Songs" in nav to see it.');
                        } else {
                            res.status(400).send('That song could not be found');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send('An unknown error has occurred. You may have entered an invalid album id');
                    })
                } else {
                    sequelize.query(`
                        UPDATE audios SET ${columnNames} = ${updateValues}
                        WHERE song_id = ${song_id}
                        RETURNING *`)
                    .then((dbRes) => {
                        if (dbRes[1].rowCount > 0) {
                            res.status(200).send('Song information successfully updated. Go to "View Songs" in nav to see it.');
                        } else {
                            res.status(400).send('That song could not be found');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send('An unknown error has occurred. You may have entered an invalid album id.');
                    })
                }
                
            } else {
                res.status(401).send('You are not authorized to make that request');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(401).send('There was a problem authenticating your request');
        });
    },

    deleteSong: (req, res) => {
        const {id} = req.params;
        sequelize.query(`
            UPDATE albums
            SET num_tracks = num_tracks - 1
            WHERE album_id IN (SELECT album_id FROM audios WHERE song_name = '${id}');

            DELETE FROM audios
            WHERE song_name = '${id}'`)
        .then(() => {
            res.status(200).send('Song successfully deleted from database.');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('There was a problem deleting the song from the database.');
        });
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

    updateCover: (req, res) => {
        if(req.body.serverKey === '') {
            res.status(401).send('You are not authorized to make this request');
            return;
        }

        const compareKey = req.body.serverKey;
        const cover_id = req.body.cover_id;
        const columnsToUpdate = Object.keys(req.body).filter(key => (key !== 'serverKey') && (key !== 'cover_id'));
        const columnNames = columnsToUpdate.join(', ');

        let valuesInOrder = [];
        columnsToUpdate.forEach(column => {
            valuesInOrder.push((`'${req.body[column]}'`));
        });

        let updateValues = valuesInOrder.join(", ");

        const moreThanOneUpdate = (valuesInOrder.length > 1);

        sequelize.query(`
            SELECT access_key FROM connection_data
            WHERE access_key = '${compareKey}'`)
        .then(dbRes => {
            if(typeof dbRes[0][0].access_key !== 'undefined') {
                if (moreThanOneUpdate) {
                    sequelize.query(`
                        UPDATE covers SET (${columnNames}) = (${updateValues})
                        WHERE cover_id = ${cover_id}
                        RETURNING *`)
                    .then((dbRes) => {
                        if (dbRes[1].rowCount > 0) {
                            res.status(200).send('Cover information successfully updated. Go to "Get Play Count" in nav to see it.');
                        } else {
                            res.status(400).send('That cover could not be found');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send('An unknown error has occurred. No apostrophes are allowed in any field')
                    })
                } else {
                    sequelize.query(`
                        UPDATE covers SET ${columnNames} = ${updateValues}
                        WHERE cover_id = ${cover_id}
                        RETURNING *`)
                    .then((dbRes) => {
                        if (dbRes[1].rowCount > 0) {
                            res.status(200).send('Cover information successfully updated. Go to "Get Play Count" in nav to see it.');
                        } else {
                            res.status(400).send('That cover could not be found');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send('An unknown error has occurred. No apostrophes are allowed in any field');
                    })
                }
                
            } else {
                res.status(401).send('You are not authorized to make that request');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(401).send('There was a problem authenticating your request');
        });
    },

    deleteCover: (req, res) => {
        const {id} = req.params;
        sequelize.query(`
            DELETE FROM covers
            WHERE cover_name = '${id}'`)
        .then(() => {
            res.status(200).send('Cover successfully deleted from database.');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('There was a problem deleting the cover from the database.');
        });
    }
}